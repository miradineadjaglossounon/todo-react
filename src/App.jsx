import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Construction } from "lucide-react";

const PRIORITIES = ["Urgente", "Moyenne", "Basse"];

function App() {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Moyenne");
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [filtre, setFiltre] = useState("Tous");
  const [selectTasks, setSelectTasks] = useState(new Set());

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const nouvelletache = () => ({
    id: Date.now(),
    text,
    priority,
  });

  const ajoutTache = () => {
    if (!text.trim()) return;
    setTasks([nouvelletache(), ...tasks]);
    setText("");
    setPriority("Moyenne");
  };

  const supprimetasks = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    const newSelect = new Set(selectTasks);
    newSelect.delete(id);
    setSelectTasks(newSelect);
  };

  const toggleSelectTasks = (id) => {
    const newSelect = new Set(selectTasks);
    if (newSelect.has(id)) newSelect.delete(id);
    else newSelect.add(id);
    setSelectTasks(newSelect);
  };

  const tachefiltrer =
    filtre === "Tous" ? tasks : tasks.filter((task) => task.priority === filtre);

  const UrgentCount = tasks.filter((t) => t.priority === "Urgente").length;
  const mediumCount = tasks.filter((t) => t.priority === "Moyenne").length;
  const lowCount = tasks.filter((t) => t.priority === "Basse").length;
  const TotalCount = tasks.length;

  function finirselection () {
    const newtache = tasks.filter((task) => {
      if(selectTasks.has(task.id)){
        return false
      }else{
        return true
      }
    })
    setTasks(newtache)
    setSelectTasks(new Set())

  }

  return (
    <div
      className="flex justify-center my-6 p-8 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg.webp')" }}
    >
      <div className="w-2/3 flex flex-col p-5 my-3">
        <div className="flex gap-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ajouter des tâches"
            className="input w-full rounded-lg"
            type="text"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="select w-full"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <button
            onClick={ajoutTache}
            className="btn rounded-lg text-black p-5 bg-white"
          >
            Ajouter
          </button>
        </div>
        <div className=" btn btn-primary flex items-center justify-between">
              <button onClick={finirselection} className="btn btn-primary self-start mt-2 bg-white" disabled = {selectTasks.size === 0}> 
                  Finir la sélection ({selectTasks.size})
              </button>
        </div>
        <div className="space-y-2 flex-1 h-fit">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setFiltre("Tous")}
              className={`btn rounded-lg px-3 mt-3 ${
                filtre === "Tous" ? "bg-primary text-white" : "bg-gray-700 text-white"
              }`}
            >
              Tous ({TotalCount})
            </button>
            <button
              onClick={() => setFiltre("Urgente")}
              className={`btn rounded-lg px-3 mt-3 ${
                filtre === "Urgente" ? "bg-primary text-white" : "bg-gray-700 text-white"
              }`}
            >
              Urgente ({UrgentCount})
            </button>
            <button
              onClick={() => setFiltre("Moyenne")}
              className={`btn rounded-lg px-3 mt-3 ${
                filtre === "Moyenne" ? "bg-primary text-white" : "bg-gray-700 text-white"
              }`}
            >
              Moyenne ({mediumCount})
            </button>
            <button
              onClick={() => setFiltre("Basse")}
              className={`btn rounded-lg px-3 mt-3 ${
                filtre === "Basse" ? "bg-primary text-white" : "bg-gray-700 text-white"
              }`}
            >
              Basse ({lowCount})
            </button>
          </div>
        </div>

        {tachefiltrer.length > 0 ? (
          <ul className="divide-y divide-primary/20">
            {tachefiltrer.map((task) => (
              <li key={task.id}>
                <TodoItem
                  task={task}
                  isSelected={selectTasks.has(task.id)}
                  onDelete={() => supprimetasks(task.id)}
                  onToggleSelect={toggleSelectTasks}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center flex-col p-5">
            <Construction
              strokeWidth={1}
              className="w-40 h-40 text-primary -mt-5"
            />
            <p className="text-sm text-white">Aucune tâche pour ce filtre</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
