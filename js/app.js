
//seleciona os elementos
const clear = document.querySelector(".clear")
const dataElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")

//nome das classes
const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle-thin"
const LINE_THROUGH = "lineThrough"

//Variáveis
let LIST = []
    , id

//mostra a data de hoje
const options = {weekday: "long", month:"short", day:"numeric"}
const today = new Date()

    dataElement.innerHTML = today.toLocaleDateString("pt-br", options)


// add a função to do

function addToDo(toDo, id, done, trash){

    if(trash){return}

    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? LINE_THROUGH: ""

    const item = `  
                    <li class="item"> 
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
    
                `
    
    const position = "beforeend";

    list.insertAdjacentHTML(position, item)
}

//add an item to the list user the enter key 

document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value

        //if the input isn't empty
        //se o input não é vazio
        if(toDo){
            addToDo(toDo)

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false,
            });
            id++
        }
        input.value=""
    }
})

//complete to do
function completeToDo(element){
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)

    LIST[element.id].done = LIST[element.id].done ? false : true

}

//remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode)

    LIST[element.id].trash = true 
}

//target tehe itens created dynamically
list.addEventListener("click", function(event){
    const element = event.target // return the clicked element inside list
    const elementJob = element.attributes.job.value // complete or delete

    if(elementJob == "complete"){
        completeToDo(element)
    }else if(elementJob == "delete"){
        removeToDo(element)
    }

})