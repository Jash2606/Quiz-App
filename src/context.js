import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
  science: 18,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
    type: "multiple",
  });

  const fetchApi = async (url) => {
    setWaiting(false);
    setLoading(true);
    try {
      const response = await axios.get(url);
      if (response) {
        const data = response.data.results;
        if (data.length > 0) {
          const modifiedData = data.map(question => {
            if (quiz.type === 'single') {
              return {
                ...question,
                type: 'single',
                incorrect_answers: question.incorrect_answers.slice(0, 3),
              };
            }
            return question;
          });
          setQuestions(modifiedData);
          setLoading(false);
          setWaiting(false);
          setError(false);
        } else {
          setWaiting(true);
          setError(true);
        }
      } else {
        setWaiting(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const nextQuestion = () => {
    setIndex((prevIndex) => {
      if (prevIndex === questions.length - 1) {
        openModal();
        return questions.length - 1;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((prev) => prev + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIndex(0);
    setCorrect(0);
    setWaiting(true);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty, type } = quiz;
    let url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=${type === 'single' ? 'multiple' : type}`;
    fetchApi(url);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkTheme);
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        index,
        questions,
        error,
        correct,
        nextQuestion,
        checkAnswer,
        isModalOpen,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
        isDarkTheme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };