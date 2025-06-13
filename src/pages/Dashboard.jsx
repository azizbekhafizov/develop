import AddStudent from "../components/AddStudent";
import DailyReport from "../components/DailyReport";
import StudentList from "../components/StudentList";
import { useAppContext } from "../context/AppContext";

export default function Dashboard() {
  const {
    state: { currentTeacher },
    dispatch,
  } = useAppContext();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });

    // Barcha localStorage emas, faqat teacher'ni o‘chiramiz:
    localStorage.removeItem("currentTeacher");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">
          {currentTeacher?.subject} o‘qituvchisi paneli
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
        >
          Chiqish
        </button>
      </header>

      <div className="space-y-6">
        <AddStudent />
        <StudentList />
        <DailyReport />
      </div>
    </div>
  );
}
