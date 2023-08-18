
const modalElm = document.getElementById("modal");
const addCarButtonElm = document.getElementById("add-car");

const cancelModalButtonElm = document.getElementById("cancel-modal");
const submitModalButtonElm = document.getElementById("submit-modal");

const modalInputs = modalElm.querySelectorAll("input");

const listUI = document.getElementById('list-wrapper');

const cars = [];

const resetModal = () => {
  const modalInputs = modalElm.querySelectorAll("input");

  for (input of modalInputs) {
    input.value = "";
  }
};

const toggleModal = () => {
  resetModal();

  modalElm.classList.toggle("hidden");
};


const addNewCarHandler = () => {
  
};

addCarButtonElm.addEventListener("click", toggleModal);

cancelModalButtonElm.addEventListener("click", toggleModal);

submitModalButtonElm.addEventListener("click", addNewCarHandler);
