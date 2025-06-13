import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export default function AddStudent() {
  const { state, dispatch } = useAppContext();
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");

  useEffect(() => {
    if (!state.currentTeacher) return;

    const saved = localStorage.getItem(`students-${state.currentTeacher.subject}`);
    if (saved) {
      dispatch({ type: "UPDATE_STUDENTS", payload: JSON.parse(saved) });
    }
  }, [state.currentTeacher]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !group || !state.currentTeacher) return;

    const newStudent = {
      id: Date.now(),
      name,
      group,
      score: "", // baho boshlanishda bo‘sh bo‘ladi
    };

    const updated = [...state.students, newStudent];
    dispatch({ type: "ADD_STUDENT", payload: newStudent });
    localStorage.setItem(`students-${state.currentTeacher.subject}`, JSON.stringify(updated));

    setName("");
    setGroup("");
  };

  if (!state.currentTeacher) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">O‘quvchi qo‘shish</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Ismi Familyasi"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl"
          required
        />
        <input
          type="text"
          placeholder="Guruh nomi"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Qo‘shish
        </button>
      </form>
    </div>
  );
}
