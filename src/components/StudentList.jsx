import { useAppContext } from "../context/AppContext";

export default function StudentList() {
  const { state, dispatch } = useAppContext();
  const students = state.students;

  const handleScoreChange = (id, score) => {
    const updated = students.map((s) =>
      s.id === id ? { ...s, score } : s
    );
    dispatch({ type: "UPDATE_STUDENTS", payload: updated });
    localStorage.setItem(
      `students-${state.currentTeacher.subject}`,
      JSON.stringify(updated)
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">O‘quvchilar ro‘yxati</h2>
      {students.length === 0 ? (
        <p className="text-gray-500">Hozircha o‘quvchi yo‘q.</p>
      ) : (
        <table className="w-full table-auto border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Ismi Familyasi</th>
              <th className="px-4 py-2">Guruh</th>
              <th className="px-4 py-2">Ball</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.group}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={student.score || ""}
                    onChange={(e) => handleScoreChange(student.id, e.target.value)}
                    className="w-20 px-2 py-1 border rounded-md"
                    min={0}
                    max={100}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
