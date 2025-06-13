import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";

export default function DailyReport() {
  const { state } = useAppContext();
  const [text, setText] = useState("");

  useEffect(() => {
    const students = state.students;
    const teacher = state.currentTeacher;

    if (!students.length || !teacher) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let result = `📅 ${formattedDate}\n📚 Fan: ${teacher.subject}\n\n`;
    students.forEach((student, i) => {
      result += `${i + 1}) ${student.name} (${student.group}) – ${student.score || 0} ball\n`;
    });

    setText(result);
  }, [state.students, state.currentTeacher]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert("Hisobot nusxalandi!");
  };

  if (!text || !state.currentTeacher) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 text-green-700">📤 Kunlik hisobot</h2>

      <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto max-h-[300px] whitespace-pre-wrap">
        {text}
      </pre>

      <div className="mt-4">
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
        >
          Nusxalash
        </button>
      </div>
    </div>
  );
}
