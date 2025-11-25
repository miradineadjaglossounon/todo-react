import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = () => {
  const text = input.trim();
  if (!text) return;

  if (editIndex !== null) {
   
    const updated = [...tasks];
    updated[editIndex].text = text;
    setTasks(updated);
    setEditIndex(null);
  } else {
  
    setTasks([...tasks, { text, completed: true }]);
  }

  setInput("");
};


  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          Gestion des Tâches
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Ajouter une tâche..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition"
          >
            {editIndex !== null ? "Modifier" : "Ajouter"}
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-xl shadow"
            >
             <span
              onClick={() => toggleTask(index)}
              className={`flex-1 cursor-pointer ${
              task.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
              >
              {task.text}
            </span>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
