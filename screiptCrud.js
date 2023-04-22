//This variable is used to keep track of the row that is currently being edited.
let selectedRow = null;






/* This function is used to display alerts with a message and a class name 
to set the color of the alert. It creates 
a new div element with the alert message and class, appends it to the 
container element, and removes it after 3 seconds.*/
function showAlert(message, className){
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${className}`;

  alertDiv.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(alertDiv, main);

  setTimeout(() => alertDiv.remove(), 3000); 
}

// this function is used to clear the input fields for first name, last name, and roll number.
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const rollNoInput = document.querySelector("#rollNo");

function clearFields(){
  firstNameInput.value = "";
  lastNameInput.value = "";
  rollNoInput.value = "";
}

// This function is used to add a new student to the list.creates a new row with the student data, adds it to the table,
const studentForm = document.querySelector("#student-form");
function addStudent(e) {
  e.preventDefault();

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const rollNo = rollNoInput.value;

  // Validate input
  if(firstName === "" || lastName === "" || rollNo === ""){
    showAlert("Please fill in all fields", "danger");
    return;
  }

  // Add student to list
  const studentList = document.querySelector("#student-list");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td>${rollNo}</td>
    <td>
    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
  `;

  studentList.appendChild(row);
  showAlert("Student Added", "success");

  // Clear input fields
  clearFields();
};

studentForm.addEventListener("submit", addStudent);

// This function is used to edit and delete of existing student data.
const studentList = document.querySelector("#student-list");
//edit
function editStudent(e) {
  const target = e.target;

  if(target.classList.contains("edit")){
    selectedRow = target.parentElement.parentElement;
    firstNameInput.value = selectedRow.children[0].textContent;
    lastNameInput.value = selectedRow.children[1].textContent;
    rollNoInput.value = selectedRow.children[2].textContent;
  }
}
//delete 
function deleteStudent(e) {
  const target = e.target;

  if(target.classList.contains("delete")){
    target.parentElement.parentElement.remove();
    showAlert("Student Data Deleted", "danger");
  }
}
//eventlistener
studentList.addEventListener("click", editStudent);
studentList.addEventListener("click", deleteStudent);

/*
fetch('https://644047cc792fe886a88bff46.mockapi.io/CrudAPP')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  
 
*/

