// const modalElm = document.querySelector('#modal');
const modalElm = document.getElementById("modal");
const addTaskButtonElm = document.getElementById("add-task");
// const cancelModalButtonElm = modalElm.querySelectorAll('button')[1];
const cancelModalButtonElm = document.getElementById("cancel-modal");
const submitModalButtonElm = document.getElementById("submit-modal");

const modalInputs = modalElm.querySelectorAll("input");

const listUI = document.getElementById('list-wrapper');

const todoItems = [];

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

const deleteItem = (id) => {
  let index = 0;
  for(item of todoItems) {
      if (item.id === id) {
          break;
      }

      index++;
  }

  todoItems.splice(index, 1);
  

  // listUI.children[index].remove();
  document.getElementById(`task_${id}`).remove();
}

const deleteItemHandler = (id) => {
    
    const userChoice = confirm('are you sure you want to delete this item?');


    if (userChoice) {
      deleteItem(id);
    }
}

const createNewTasUI = (id, title, date) => {
  const newDiv = document.createElement("div");

  newDiv.className = "relative";

  newDiv.id = `task_${id}`;

  newDiv.innerHTML = `
        <input class="hidden" type="checkbox" id="item_${id}">
        <label class="flex items-center h-10 px-2 rounded cursor-pointer group hover:bg-gray-900"
        for="item_${id}">
            <span
                class="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full">
                <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
            </span>
            <div class="flex items-center justify-between w-full">
                <p class="ml-4 text-sm">${title}</p>
                <p class="text-xs text-gray-500 mt-1">${date}</p>
            </div>
        </label>
        <i class="absolute -right-6 cursor-pointer top-1 text-red-500 px-2 text-lg">x</i>
    `;

    const checkbox = newDiv.firstElementChild;
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            checkbox.nextElementSibling.classList.add('line-through');
        } else {
            checkbox.nextElementSibling.classList.remove('line-through');
        }
    });

    newDiv.lastElementChild.addEventListener('click', deleteItemHandler.bind(null, id))

    listUI.append(newDiv);
};

const addNewTaskHandler = () => {
  const modalInputs = modalElm.querySelectorAll("input");

  if (!modalInputs[0].value.trim()) {
    alert(" title is required");
    return;
  }

  const newItem = {
    id: new Date().getTime().toString(),
    title: modalInputs[0].value.trim(),
    date: modalInputs[1].value,
  };

  todoItems.push(newItem);

  createNewTasUI(newItem.id, newItem.title, newItem.date);

  toggleModal();
};

addTaskButtonElm.addEventListener("click", toggleModal);

cancelModalButtonElm.addEventListener("click", toggleModal);

submitModalButtonElm.addEventListener("click", addNewTaskHandler);
