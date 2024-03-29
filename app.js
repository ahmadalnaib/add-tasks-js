const form= document.querySelector("#task-form");
const taskInput=document.querySelector('#task');
const taskList=document.querySelector(".collection");
const filter=document.querySelector("#filter");
const clearBtn=document.querySelector(".clear-tasks");

loadevent();

 function loadevent(){
   document.addEventListener("DOMContentLoaded",getTasks);
   form.addEventListener("submit",addTask);
   taskList.addEventListener("click",removeTask);
   clearBtn.addEventListener("click",clearTasks);
   filter.addEventListener("keyup",filterTasks);


  }


 function getTasks(){

  let tasks;

   if(localStorage.getItem("tasks") ===null){
     tasks=[];
   }else {
     tasks=JSON.parse(localStorage.getItem("tasks"))
   }
   tasks.forEach(function(task){
     
    const li =document.createElement("li");
    li.className="collection-item";
    li.appendChild(document.createTextNode(task));

    const link=document.createElement("a");
    link.className="delete-item secondary-content";

    link.innerHTML="<i class='fa fa-remove'></i>"
    li.appendChild(link);

    taskList.appendChild(li);
     
   })
  }


  function addTask(e){

    if(taskInput.value === ''){
      alert("add task")
    }


    const li =document.createElement("li");
    li.className="collection-item";
    li.appendChild(document.createTextNode(taskInput.value));

    const link=document.createElement("a");
    link.className="delete-item secondary-content";

    link.innerHTML="<i class='fa fa-remove'></i>"
    li.appendChild(link);

    taskList.appendChild(li);
    taskList.value=" "

     

    storeTaskInLocalStorage(taskInput.value);



   e.preventDefault();
  }



  function removeTask(e){
   if(e.target.parentElement.classList.contains("delete-item")){

    if(confirm("ARE YOU SURE?")){
      e.target.parentElement.parentElement.remove();
    }
   }

  }


  function storeTaskInLocalStorage(task){
   let tasks;

   if(localStorage.getItem("tasks") === null){
     tasks=[];
   }else {
     tasks=JSON.parse(localStorage.getItem("tasks"))
   }

   tasks.push(task);
   localStorage.setItem("tasks",JSON.stringify(tasks));
  }


  function clearTasks(e) {
    taskList.innerHTML=""
  }


  function filterTasks (e) {
   const text = e.target.value.toLowerCase();

   document.querySelectorAll('.collection-item').forEach((task)=>{
     
    const item= task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) !=-1){
      task.style.display="block";
    }else {
      task.style.display="none";
    }
   })
  }