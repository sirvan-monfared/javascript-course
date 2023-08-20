const modalElm = document.getElementById("modal");
const addCarButtonElm = document.getElementById("add-car");

const cancelModalButtonElm = document.getElementById("cancel-modal");
const submitModalButtonElm = document.getElementById("submit-modal");

const modalInputs = modalElm.querySelectorAll("input");

const listUI = document.getElementById("list-wrapper");

const cars = [];

const resetModal = () => {
  const modalInputs = modalElm.querySelectorAll("input");

  for (let input of modalInputs) {
    input.value = "";
  }
};

const toggleModal = () => {
  resetModal();

  modalElm.classList.toggle("hidden");
};

const renderAllCars = (searchParam = null) => {
  listUI.innerHTML = "";

  let output = "";

  const filteredCars = (!searchParam) ? cars : cars.filter((car) => car.info.name.includes(searchParam));


  filteredCars.forEach((car) => {

    let { info, fullName } = car;

    

    output += `
      <div>
        <div class="flex items-center h-10 px-2 rounded cursor-pointer group bg-gray-900">
          <div class="flex items-center justify-between w-full">
            <p class="ml-4 text-sm">${fullName.call(car)}</p>`;


            for (let key in info) {
                if (key !== 'name') {
                  output += `<p class="text-gray-500">${key}: ${info[key]}</p>`;
                }
            }

    output += `
          </div>
        </div>
      </div>
    `;
  });

  listUI.innerHTML = output;
};

const addNewCarHandler = () => {
  const name = document.getElementById("name-input").value;
  const optionName = document.getElementById("option-name").value;
  const optionValue = document.getElementById("option-value").value;

  if (
    name.trim() === "" ||
    optionName.trim() === "" ||
    optionValue.trim() === ""
  ) {
    alert("please fill all required inputs");
    return;
  }

  console.log(this);

  const newCar = {
    id: new Date().getTime().toString(),
    info: {
      name,
      [optionName]: optionValue,
    },
    fullName() {
      return this.info.name.toUpperCase()
    }
  };

  cars.push(newCar);
  toggleModal();

  renderAllCars();
};

console.log(this);

const searchHandler = () => {

  console.log(this);

  const searchParam = document.getElementById('search-input').value;

  renderAllCars(searchParam);

}

addCarButtonElm.addEventListener("click", toggleModal);

cancelModalButtonElm.addEventListener("click", toggleModal);

submitModalButtonElm.addEventListener("click", addNewCarHandler);

document.getElementById('search-button').addEventListener('click', searchHandler);
