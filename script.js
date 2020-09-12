let apiResponse;

makeCard = (employee) => {
    var cardBody = `<div class="card" style="width: 18rem;">
                        <div class="card-body">
                          <h5 class="card-title">Name: ${employee.employee_name}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">Salary: ${employee.employee_salary}</h6>
                          <p class="card-text">Age: ${employee.employee_age}</p>
                        </div>
                    </div>`;
    return cardBody;
}


createView = (employees) => {
    var head = document.getElementById('view-body');
    head.innerHTML = '';
    employees.map((employee) => {
        head.innerHTML += makeCard(employee);
    })
};


searchEmployee = (evnt) => {

    evnt.preventDefault();

    let str = document.getElementById('employeeName').value;

    let dataFromApi = apiResponse.data;

    newData = dataFromApi.filter((employee) => {
        if((employee.employee_name).toLowerCase().startsWith(str.toLowerCase())){
            return employee
        }
    });
    createView(newData);
};


sortBy = () => {

    let sortType = document.getElementById('sort').value;
    let dataFromApi = apiResponse.data;
    if(sortType === 'name') {
        dataFromApi.sort(sortByName);
    }
    if(sortType === 'age') {
        dataFromApi.sort(sortByAge);
    }
    if(sortType === 'salary') {
        dataFromApi.sort(sortBySalary);
    }

    createView(dataFromApi);
 
};


sortByName = (first, second) => {

    if (first.employee_name > second.employee_name){
        return 1;
    } else if(first.employee_name < second.employee_name){
        return -1;
    } else{
        return 0;
    }
};


sortByAge = (first, second) => ( first.employee_age - second.employee_age);

sortBySalary = (first, second) => ( first.employee_salary - second.employee_salary);



async function getData(){
  
    async function getEmployeesDetail() {
  
        let url = "http://dummy.restapiexample.com/api/v1/employees";
  
        return fetch(url)
        .then(res => res.json())
        .then(response => {
            apiResponse = response;
            createView(response.data);
        })
    }
  
    await getEmployeesDetail();
};


window.onload = () => {
    getData();
};
