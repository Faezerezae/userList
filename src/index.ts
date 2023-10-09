const addUserBtn = <HTMLButtonElement>document.getElementById("add-user-btn");
const addUserModal =<HTMLDivElement>document.getElementById("add-user-modal");
const closeModalBtn =<HTMLButtonElement>document.getElementById("close-modal-btn");

const form = <HTMLFormElement>document.getElementById("form");
const container = <HTMLDivElement>document.getElementById("container");
const nameInput = <HTMLInputElement>document.getElementById("name");
const ageInput = <HTMLInputElement>document.getElementById("age");
const genderSelect = <HTMLInputElement>document.getElementById("gender");
const btnSubmit = <HTMLButtonElement>document.getElementById("submit");
let editMode = false;
let userEditId: null | number = null;

const sortBtn = <HTMLButtonElement>document.getElementById("sort-btn");

addUserModal.style.display = "none";

const handleShowModal = () => {
  addUserModal.style.display = "flex";
};

const handleHideModal = (event:any) => {
  if (event.target === closeModalBtn || event.target === addUserModal) {
    addUserModal.style.display = "none";
  }
};

addUserBtn.addEventListener("click", handleShowModal);
closeModalBtn.addEventListener("click", handleHideModal);
addUserModal.addEventListener("click", handleHideModal);


const date = new Date().getTime();
// مشخص کردن نوع داده ها
type User = {
  id: number;
  name: string;
  age: string;
  gender: string;
};

// ایجاد ارایه خالی
// let user:User[]=[]
let users: Array<User> = JSON.parse(localStorage.getItem("users")!) || [];

const getUserData = (): User => {
  let newDate = new Date().getTime();
  return {
    name: nameInput.value,
    age: ageInput.value,
    gender: genderSelect.value,
    id: newDate - date,
  };
};

const renderUI = (users: User[]): void => {
  localStorage.setItem("users", JSON.stringify(users));
  container.innerHTML = "";
  users.forEach((user: User) => {
    const divItem = <HTMLDivElement>document.createElement("div");
    divItem.setAttribute("class", "item");
    const nameSpan = <HTMLSpanElement>document.createElement("span");
    nameSpan.innerText = user.name;
    const ageSpan = <HTMLSpanElement>document.createElement("span");
    ageSpan.innerText = user.age;
    const genderSpan = <HTMLSpanElement>document.createElement("span");
    genderSpan.innerText = user.gender;
    divItem.append(nameSpan, ageSpan, genderSpan);
    const btnEdit = <HTMLButtonElement>document.createElement("button");
    btnEdit.innerText = "Edit";
    btnEdit.classList.add("btn")
    btnEdit.addEventListener("click", () => editUser(user));
    const btnDelete = <HTMLButtonElement>document.createElement("button");
    btnDelete.innerText = "Delete";
    btnDelete.classList.add("btn")
    btnDelete.addEventListener("click", () => deleteUser(user.id));
    divItem.append(btnDelete, btnEdit);
    container.append(divItem);
  });
};

renderUI(users);

const addUser = (edit: boolean) => {
  if (edit) {
    const myUser: User = users.find((user: User) => user.id === userEditId)!;
    myUser.name = nameInput.value;
    myUser.age = ageInput.value;
    myUser.gender = genderSelect.value;
    editMode = false;
    userEditId = null;
    btnSubmit.innerText = "submit";
  } else {
    const myUser: User = getUserData();
    users = [...users, myUser];
  }
  renderUI(users);
  emptyForm();
};

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  addUser(editMode);
});

const emptyForm = () => {
  nameInput.value = "";
  ageInput.value = "";
  genderSelect.value = "male";
};
// اونایی که مخالف این آی دی هستند را نگه دار
const deleteUser = (id: number) => {
  users = users.filter((user: User) => user.id !== id);
  renderUI(users);
};

const editUser = (user: User) => {
  handleShowModal()
  nameInput.value = user.name;
  ageInput.value = user.age;
  genderSelect.value = user.gender;
  btnSubmit.innerText = "Edit";
  editMode = true;
  userEditId = user.id;
  
};

sortBtn?.addEventListener("click", () => sortContact());

const sortContact = () => {
  console.log(users);
  users.sort((a: User, b: User) => {
    return Number(a.age) - Number(b.age);
  });
  console.log(users);
  renderUI(users);
};
