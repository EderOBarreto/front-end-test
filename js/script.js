
function getEmployeeList(){
	let employeesList = localStorage.getItem("employeesList");
	if (!employeesList) {
		employeesList = [];
		localStorage.setItem("employeesList",employeesList);
	}else{
		employeesList = JSON.parse(employeesList);
	}
	return employeesList;
}

function employeeLoad(){

	let list = getEmployeeList();

	if ($("#bookTable tbody").length == 0){
			$("#bookTable").append("<tbody></tbody>");
	}
	for (var i = 0; i < list.length; i++) {
		$("#employeeTable tbody").append(
		`<tr class="d-flex">`+
			`<th scope="row" class="col-2">${i+1}</th>`+
			`<td class="col-6">${list[i].name}</td>`+
			'<td class="col-4">'+
				`<button class="m-2" onclick="employeeEdit(${i})">Edit</button>`+
				`<button onclick="employeeRemove(this,${i})">Delete</button>`+
			'</td>'+
		'</tr>'
		);
	}
}

function saveEmployee(){
	let employeeEdit = JSON.parse(localStorage.getItem("employeeEdit"));
	if (!employeeEdit) {
		addEmployee();
	}else{
		modifyEmployee(employeeEdit);
	}
	window.location.replace("index.html");
}

function addEmployee(){
	let employeesList = getEmployeeList();
	let employee;
	if($("#inName").val()){
		employee = getEmployeeData();
		employeesList.push(employee);
		localStorage.setItem("employeesList",JSON.stringify(employeesList));
	}
}

function modifyEmployee(employeeEdit){
	let employeesList = getEmployeeList();
	employee = getEmployeeData();
	employeesList[employeeEdit.id] = employee;
	localStorage.setItem("employeesList",JSON.stringify(employeesList));
	localStorage.removeItem("employeeEdit");
}


function employeeEdit(id){
	let employeesList = getEmployeeList();
	employeesList[id].id = id;
	localStorage.setItem("employeeEdit",JSON.stringify(employeesList[id]));
	window.location.replace("employee-register.html");
}

function employeeRemove(button,id){
	let employeesList = getEmployeeList();
	employeesList.splice(id,1);
	localStorage.setItem("employeesList",JSON.stringify(employeesList));
	$(button).parents("tr").remove();
}

function getEmployeeData(){
	let employee = {
		name:$("#inName").val(),
		age:$("#inAge").val(),
		dataNasc:$("#inBirthDay").val(),
		phone:$("#inPhoneNumber").val(),
		rg:$("#inRG").val(),
		cpf:$("#inCPF").val(),
		adress:$("#inAdress").val(),
		adressNumber:$("#inNumber").val(),
		city:$("#inCity").val(),
		state:$("#inState").val(),
		notes:$("#txtNotes").val()
	}
	return employee;
}

function fillOutFields(){
	let employee = JSON.parse(localStorage.getItem("employeeEdit"));
	if (employee) {
		$("#inName").val(employee.name);
		$("#inAge").val(employee.age);
		$("#inBirthDay").val(employee.dataNasc);
		$("#inPhoneNumber").val(employee.phone);
		$("#inRG").val(employee.rg);
		$("#inCPF").val(employee.cpf);
		$("#inAdress").val(employee.adress);
		$("#inNumber").val(employee.adressNumber);
		$("#inCity").val(employee.city);
		$("#inState").val(employee.state);
		$("#txtNotes").val(employee.notes);
	}
}

function clearFields(){
	$("#inName").val("");
	$("#inAge").val("");
	$("#inBirthDay").val("");
	$("#inPhoneNumber").val("");
	$("#inRG").val("");
	$("#inCPF").val("");
	$("#inAdress").val("");
	$("#inNumber").val("");
	$("#inCity").val("");
	$("#inState").val("");
	$("#txtNotes").val("");
}

function applyMasks(){
	$("#inCPF").mask('000-000-000-00');
	$("#inPhoneNumber").mask('(00)00000-0000');
}