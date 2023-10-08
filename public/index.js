"use strict";
const addUserBtn = document.getElementById("add-user-btn");
const addUserModal = document.getElementById("add-user-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const form = document.getElementById("form");
const container = document.getElementById("container");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const genderSelect = document.getElementById("gender");
const btnSubmit = document.getElementById("submit");
let editMode = false;
let userEditId = null;
const sortBtn = document.getElementById("sort-btn");
addUserModal.style.display = "none";
const handleShowModal = () => {
    addUserModal.style.display = "flex";
};
const handleHideModal = (event) => {
    if (event.target === closeModalBtn || event.target === addUserModal) {
        addUserModal.style.display = "none";
    }
};
addUserBtn.addEventListener("click", handleShowModal);
closeModalBtn.addEventListener("click", handleHideModal);
addUserModal.addEventListener("click", handleHideModal);
const date = new Date().getTime();
// ایجاد ارایه خالی
// let user:User[]=[]
let users = JSON.parse(localStorage.getItem("users")) || [];
const getUserData = () => {
    let newDate = new Date().getTime();
    return {
        name: nameInput.value,
        age: ageInput.value,
        gender: genderSelect.value,
        id: newDate - date,
    };
};
const renderUI = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
    container.innerHTML = "";
    users.forEach((user) => {
        const divItem = document.createElement("div");
        divItem.setAttribute("class", "item");
        const nameSpan = document.createElement("span");
        nameSpan.innerText = user.name;
        const ageSpan = document.createElement("span");
        ageSpan.innerText = user.age;
        const genderSpan = document.createElement("span");
        genderSpan.innerText = user.gender;
        divItem.append(nameSpan, ageSpan, genderSpan);
        const btnEdit = document.createElement("button");
        btnEdit.innerText = "Edit";
        btnEdit.classList.add("btn");
        btnEdit.addEventListener("click", () => editUser(user));
        const btnDelete = document.createElement("button");
        btnDelete.innerText = "Delete";
        btnDelete.classList.add("btn");
        btnDelete.addEventListener("click", () => deleteUser(user.id));
        divItem.append(btnDelete, btnEdit);
        container.append(divItem);
    });
};
renderUI(users);
const addUser = (edit) => {
    if (edit) {
        const myUser = users.find((user) => user.id === userEditId);
        myUser.name = nameInput.value;
        myUser.age = ageInput.value;
        myUser.gender = genderSelect.value;
        editMode = false;
        userEditId = null;
        btnSubmit.innerText = "submit";
    }
    else {
        const myUser = getUserData();
        users = [...users, myUser];
    }
    renderUI(users);
    emptyForm();
};
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addUser(editMode);
});
const emptyForm = () => {
    nameInput.value = "";
    ageInput.value = "";
    genderSelect.value = "male";
};
// اونایی که مخالف این آی دی هستند را نگه دار
const deleteUser = (id) => {
    users = users.filter((user) => user.id !== id);
    renderUI(users);
};
const editUser = (user) => {
    nameInput.value = user.name;
    ageInput.value = user.age;
    genderSelect.value = user.gender;
    btnSubmit.innerText = "Edit";
    editMode = true;
    userEditId = user.id;
};
sortBtn === null || sortBtn === void 0 ? void 0 : sortBtn.addEventListener("click", () => sortContact());
const sortContact = () => {
    console.log(users);
    users.sort((a, b) => {
        return Number(a.age) - Number(b.age);
    });
    console.log(users);
    renderUI(users);
};
