//grabs the div holding the cards
const tasksList = document.querySelector('.tasks-list');
//grabs the ul list in the card
const cardTextP = document.querySelector('.card-text')
//grabs form for the 
const addTaskForm = document.querySelector('.add-task-form')
const url = 'http://localhost:3000/tasker/tasks';
let output = '';
//All the input boxes
const whoValue = document.getElementById('who-value');
const phoneValue = document.getElementById('phone-value');
const emailValue = document.getElementById('email-value');
const taskValue = document.getElementById('task-value');
const dateValue = document.getElementById('date-value');
const timeValue = document.getElementById('time-value');
const addyValue = document.getElementById('addy-value');
const xtraInfoValue = document.getElementById('body-value');
//grabs submit button
const submitButton = document.querySelector('.buttn')

const modifyTasking = document.getElementById('modify-task');
const deleteTasking = document.getElementById('delete-task');

//Create function to return output
const renderTasks = (tasks) => {
    tasks.forEach(task => {
        output += `
        <div class="card mt-4 col-md-4 bg-light">
            <div class="card-body" data-id=${task.task_id}>
                <h5 class="card-title">${task.what}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${task.who}</h6>
                <ul class="card-text">
                    <p id='email-p'>${task.email}</p>
                    <p id='phone-p'>${task.phone_number}</p>
                    <p id='where-p'>${task.where_at}</p>
                    <p id='when-p'>${task.when_at}</p>
                    <p id='time-p'>${task.time_at}</p>
                    <p class='extra-info' id='info-p'>${task.extra_info}</p>
                </ul>
                <a href="#" class="card-link" id="modify-task">Modify Task</a>
                <a href="#" class="card-link" id="delete-task">Delete Task</a>
            </div>
        </div>
        `;
    });
    tasksList.innerHTML = output;

}

//GET REQUEST- Read the tasks
fetch(url)
    .then(response => response.json())
    .then(data => renderTasks(data))

//Create delete
tasksList.addEventListener('click', (e) => {
    e.preventDefault();

    //targets the a elements
    let deleteButtonPressed = e.target.id =='delete-task';
    let modifyButtonPressed = e.target.id =='modify-task';

    //grabs the element of that row
    let id = e.target.parentElement.dataset.id;
    

    //DELETE post
    //method: DELETE
    if(deleteButtonPressed){
        fetch(`${url}/delete/${id}`)
        .then(response =>response.json())
        .then(() => location.reload())
     }

    //PATCH Request, update tasks
     if(modifyButtonPressed){
        //grabs the card
        const parentEl = e.target.parentElement;
        //grabs the text inside the element
        let taskContent = parentEl.querySelector('.card-title').textContent;
        let whoContent = parentEl.querySelector('.card-subtitle').textContent;
        let phoneContent = parentEl.querySelector('#phone-p').textContent;
        let emailContent = parentEl.querySelector('#email-p').textContent;
        let whenContent = parentEl.querySelector('#when-p').textContent;
        let timeContent = parentEl.querySelector('#time-p').textContent;
        let whereContent = parentEl.querySelector('#where-p').textContent;
        let xtraInfoContent = parentEl.querySelector('#info-p').textContent;
        
        //when modify link is clicked: assign the text content to the appropiate form box for editing
        taskValue.value = taskContent;
        whoValue.value = whoContent;
        phoneValue.value = phoneContent;
        emailValue.value = emailContent;
        dateValue.value = whenContent;
        timeValue.value = timeContent;
        addyValue.value = whereContent;
        xtraInfoValue.value = xtraInfoContent;
     }

    //when modify link is clicked: after fields have the data from the card, 
    //then the button should patch instead of post

    //FIX
     submitButton.addEventListener('click', () => {
        
        fetch(`${url}/${id}`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                who: whoValue.value,
                phone_number: phoneValue.value,
                email: emailValue.value,
                what: taskValue.value,
                when_at: dateValue.value,
                time_at: timeValue.value,
                where_at: addyValue.value,
                extra_info: xtraInfoValue.value
            })    
        })
        .then(response => response.json())
        .then(() => location.reload())
     
     })

});    

//CREATE - Insert new post
//Method - POST
addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            who: whoValue.value,
            phone_number: phoneValue.value,
            email: emailValue.value,
            what: taskValue.value,
            when_at: dateValue.value,
            time_at: timeValue.value,
            where_at: addyValue.value,
            extra_info: xtraInfoValue.value    
        })
    })
    .then(response => response.json())
    .then(data => {
        const dataArray = [];
        dataArray.push(data);
        console.log(dataArray);
        renderTasks(dataArray);
    })
})












