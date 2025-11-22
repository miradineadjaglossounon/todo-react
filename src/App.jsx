



import React, { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = () => {
    const text = input.trim().slice(0, 40);
    if (!text) return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = text;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text, completed: false }]);
    }

    setInput("");
  };

  const toggleTask = (i) => {
    const updated = [...tasks];
    updated[i].completed = !updated[i].completed;
    setTasks(updated);
  };

  const handleDelete = (i) => {
    setTasks(tasks.filter((_, index) => index !== i));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex justify-center items-center px-4 py-10">

      
      <div className="backdrop-blur-xl bg-white/60 shadow-2xl border border-white/40 rounded-3xl px-12 py-10 w-full max-w-xl animate-fadeIn">

        
        <h1 className="text-4xl font-extrabold text-blue-800 mb-6 text-center tracking-wide drop-shadow-sm">
          Gestion des Tâches
        </h1>

        
        <p className="text-center text-gray-600 mb-8">
          {tasks.length === 0
            ? "Commencez par ajouter une tâche ✨"
            : `${tasks.length} tâche(s) enregistrée(s)`}
        </p>

        
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={input}
            placeholder="Ajouter une tâche..."
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-5 py-3 bg-white/80 border rounded-2xl border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition shadow-md font-semibold"
          >
            {editIndex !== null ? "Modifier" : "Ajouter"}
          </button>
        </div>

        
        {tasks.length === 0 && (
          <p className="text-gray-500 text-center py-4 italic">
            Aucune tâche ajoutée pour le moment.
          </p>
        )}

        
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                  className="w-5 h-5 accent-blue-600"
                />

                <span
                  className={`text-lg font-medium ${
                    task.completed ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setInput(task.text);
                    setEditIndex(index);
                  }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Modifier
                </button>

                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 font-semibold hover:underline"
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

