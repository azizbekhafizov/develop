// src/context/AppContext.jsx
import { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext();

const initialState = {
  currentTeacher: null,
  students: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("currentTeacher", JSON.stringify(action.payload));
      return { ...state, currentTeacher: action.payload };
    case "LOGOUT":
      localStorage.removeItem("currentTeacher");
      return { ...state, currentTeacher: null, students: [] };
    case "ADD_STUDENT":
      return { ...state, students: [...state.students, action.payload] };
    case "UPDATE_STUDENTS":
      return { ...state, students: action.payload };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedTeacher = localStorage.getItem("currentTeacher");

    if (savedTeacher) {
      const teacher = JSON.parse(savedTeacher);
      dispatch({ type: "LOGIN", payload: teacher });

      const subject = teacher.subject;
      const today = new Date().toLocaleDateString("uz-UZ");
      const lastSavedDate = localStorage.getItem(`last-date-${subject}`);
      const savedStudents = localStorage.getItem(`students-${subject}`);

      if (savedStudents) {
        const parsed = JSON.parse(savedStudents);

        // Agar sana o‘zgargan bo‘lsa, ballarni tozalaymiz
        if (lastSavedDate !== today) {
          const clearedScores = parsed.map((s) => ({
            ...s,
            score: "", // faqat score ni tozalaymiz
          }));
          localStorage.setItem(`students-${subject}`, JSON.stringify(clearedScores));
          localStorage.setItem(`last-date-${subject}`, today);
          dispatch({ type: "UPDATE_STUDENTS", payload: clearedScores });
        } else {
          // Sana o‘zgarmagan bo‘lsa, mavjudini yuklaymiz
          dispatch({ type: "UPDATE_STUDENTS", payload: parsed });
        }
      }
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
