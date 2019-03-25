//variable used to detect if a task has been selected to update
var current = -1;
//variable used to determine if user has hit the delete button
var deletion = -1;


////////////////////////////////////////////////////////////////
//function used to delete a task from the table (first asks user)
function deleteTask(arg){
if(deletion == -1){
	deletion = arg.parentNode.rowIndex;
	var table = document.getElementById("tasks");
	table.rows[arg.parentNode.rowIndex].cells[4].innerHTML = "Are you sure you want to delete?"
}
else{
	deleteTask2(arg.parentNode.rowIndex);
}
}


////////////////////////////////////////////////////////////////
//function used to determine if user decided to delete or not
function deleteTask2(arg){
	var table = document.getElementById("tasks");
//delete task if second time asking
	if(arg == deletion && table.rows[arg].cells[4].innerHTML != "Remove"){
	table.deleteRow(arg);
	if(current == arg){
	current = -1; //ensure a deleted task can not be updated
	}
	}
//user did not delete, revert back to original button
	else{
	table.rows[deletion].cells[4].innerHTML = "Remove";
	}
	deletion = -1;
}

////////////////////////////////////////////////////////////////
//function used to add all the task's state and hour information to the top right so it may be viewed and/or updated
function lookupTask(arg){

//check if remove button has been pressed, if so user has decided not to delete the task (revert button)
if(deletion != -1){
	deleteTask2(-1);
}

var row = arg.parentNode.rowIndex;
current = row;
  var table = document.getElementById("tasks").rows[row];
  var table2 = document.getElementById("lookup");
  table2.rows[2].cells[0].innerHTML = table.cells[0].innerHTML;
  table2.rows[1].cells[1].innerHTML = table.cells[4].id;
  table2.rows[2].cells[1].innerHTML = table.cells[4].getAttribute("name");
  table2.rows[3].cells[1].innerHTML = table.cells[4].getAttribute("value");  
}

////////////////////////////////////////////////////////////////
//function used to update the task should the user add new hours to a given state
function updateTask(){

//check if remove button has been pressed, if so user has decided not to delete the task (revert button)
if(deletion != -1){
	deleteTask2(-1);
}

	var state = document.getElementById("updateState").value;
	var update = parseInt(document.getElementById("updateEst").value);

  if (current != -1){//check task is selected
	if(update != "" && state != "" && Number.isInteger(Number(update))){ //check proper fields filled
	var task = document.getElementById("tasks").rows[current];
	var task2 = document.getElementById("lookup");
	var calc = parseInt(task.cells[2].innerHTML);
calc += update;

	task.cells[2].innerHTML = calc.toString();
if(state == "Planned"){
	task.cells[3].innerHTML = "Planned";		
	calc = update + parseInt(task2.rows[1].cells[1].innerHTML);
	task2.rows[1].cells[1].innerHTML = calc.toString();
	task.cells[4].id = calc.toString();
	}
	else if(state == "In Progress"){	
	task.cells[3].innerHTML = "In Progress";
	calc = update + parseInt(task2.rows[2].cells[1].innerHTML);
	task2.rows[2].cells[1].innerHTML = calc.toString();
	task.cells[4].setAttribute("name", calc.toString());
	}
	else{	
	task.cells[3].innerHTML = "Completed";	  
	calc = update + parseInt(task2.rows[3].cells[1].innerHTML);
	task2.rows[3].cells[1].innerHTML = calc.toString();
	task.cells[4].setAttribute("value", calc.toString());
	}
  }
  else{//error message: fields not filled properly
	alert("Please enter valid values to update");
  }
  }
  else{//error message: no task selected
  	alert("Please select a task to edit");
  }
}

////////////////////////////////////////////////////////////////
//function to add a new task to the table
function printTask(){

//check if remove button has been pressed, if so user has decided not to delete the task (revert button)
if(deletion != -1){
	deleteTask2(-1);
}

//get fields
var name = document.getElementById("Name");
var desc = document.getElementById("Description");
var est = document.getElementById("Estimate");
var state = document.getElementById("State");
var estval = Number(est.value).toString();

//check fields are filled properly
if(name.value != '' && est.value != '' && Number.isInteger(Number(est.value)) && state.value != '')
{
var table = document.getElementById("tasks");
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

//allow new task to be selectable
cell1.addEventListener('click', function(){
    lookupTask(this);});
cell2.addEventListener('click', function(){
    lookupTask(this);});
cell3.addEventListener('click', function(){
    lookupTask(this);});
cell4.addEventListener('click', function(){
    lookupTask(this);});

//hidden values for state hour information
cell5.addEventListener('click', function(){
    deleteTask(this);});
cell5.setAttribute("id", "0 not yet entered");
cell5.setAttribute("name", "0 not yet entered");
cell5.setAttribute("value", "0 not yet entered");

if(state.value == "Planned"){
	cell5.id = estval;
}
else if(state.value == "In Progress"){
	cell5.setAttribute("name", estval);
}
else{
	cell5.setAttribute("value", estval);
}

//fill table cells
  cell1.innerHTML = name.value;
  cell2.innerHTML = desc.value; 
  cell3.innerHTML = estval;
  cell4.innerHTML = state.value;
  cell5.innerHTML = "Remove";

//alert user: created tast succesfully
  alert("New task: '" + name.value + "' created successfully")

//clear fields
  name.value = '';
  desc.value = '';
  est.value = '';  
  state.value = '';
}
else{//error message: if fields not filled properly
alert("please ensure all fields are filled correctly");
}
}

