const fs=require('fs')
const path=require('path');
const { stdin } = require('process');
const readline=require('readline')

const taskPath=path.join(__dirname,"task.json");
if(!fs.existsSync(taskPath)){
    console.log("no task.json  creating one")
    fs.writeFileSync(taskPath,'[]')
}
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout

})
const getMytask=()=>{
    const gettasks=JSON.parse(fs.readFileSync(taskPath,'utf-8'))
    return gettasks;
}
const setMytask=(tasks)=>{
    fs.writeFileSync(taskPath,JSON.stringify(tasks))

}
const addTodo=(todoname)=>{
    const tasks=getMytask()
    tasks.push({"todoname":todoname,"completed":false})
    setMytask(tasks)


}
const removeTodo=(todoNumber)=>{
    // console.log(typeof todoNumber)
    const tasks=getMytask();
    const filteredTasks=tasks.filter((task,index)=>{
        return index!==todoNumber-1

    })
    setMytask(filteredTasks)

}
const diplayList=()=>{
    const tasks=getMytask()
    tasks.forEach((task,index)=>{
        console.log(`${index+1}: ${task.todoname} - [${task.completed?"X":""}]`)

    })
}


const completeTodo=(todoNumber)=>{
    const tasks=getMytask();
  console.log(tasks[todoNumber-1].todoname)
  tasks[todoNumber-1].completed=true
  setMytask(tasks)

}


const todoManager=()=>{
    rl.question("Enter a tak\n 1 : Add todo \n 2 : delete todo\n 3 : DisplayTodo\n 4 : completetask\n 5 : Exit \n",((task)=>{
       switch(task){
        case "1":
            rl.question("Enter a to do name \n",(todoname)=>{
                addTodo(todoname)
                todoManager();

            })
            break;
            case "2":
                rl.question("enter the todo that you watt to delete\n",((todoNumber)=>{
                    removeTodo(+todoNumber)
                todoManager();


                }))
                break;
                case '3':
                    diplayList()
                    todoManager()
                    break;
                    case "4":
                        rl.question("Enter to do number that you want to complete",((todonmuber)=>{
                            completeTodo(+todonmuber)
                            todoManager()

                        }))
                        break;

                    case "5":
                        rl.close();
                        break;
                default:
                    consdole.log("invalid option")
                    todoManager();
       }
    }))
    
}
todoManager()