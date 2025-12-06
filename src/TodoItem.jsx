import { Trash } from "lucide-react";

const PRIORITIES = ["Urgente", "Moyenne", "Basse"];

// Fonction qui crée une nouvelle liste
const nouvelletache = (text, priority) => {
  return {
    id: Date.now(),
    text: text,
    priority: priority,
  };
};


// Composant TodoItem en JSX
const TodoItem = ({ task, onDelete, isSelected, onToggleSelect}) => {
  return (
    <div className="p-3">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <input 
                 type="checkbox"
                 checked = {isSelected}
                 onChange={()=> onToggleSelect(task.id) }
               
                 
                 />
                 <span className="text-md font-bold">
                    <span>
                        {task.text}
                    </span>

                 </span>
                 <span className= {`badge badge-sm ${task.priority === "Urgente" ? "bg-red-500" : task.priority === "Moyenne" 
                 ? "bg-yellow-400" 
                : "bg-green-500"} `} >
                        {task.priority}
                 </span>

            </div>
             <button onClick={onDelete} className="btn btn-sm bg-red-500 btn-soft"> 
                <Trash className="w-4 h-4"/>
             </button>

        </div>
    </div>
  );
};

export default TodoItem;
