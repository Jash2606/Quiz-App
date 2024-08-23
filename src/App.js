import { useState, useEffect } from 'react';
import { useGlobalContext } from "./context";
import Form from "./Components/Form";
import Loading from "./Components/Loading";
import Modal from "./Components/Modal";
import ThemeToggle from './ThemeToggle.js';
const App = () => {
  const {
    waiting,
    loading,
    index,
    questions,
    nextQuestion,
    checkAnswer,
    isDarkTheme,
  } = useGlobalContext();

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    if (questions[index]) {
      const { incorrect_answers, correct_answer, type } = questions[index];
      let answers = [...incorrect_answers];
      if (type === 'multiple') {
        const insertIndex = Math.floor(Math.random() * 4);
        answers.splice(insertIndex, 0, correct_answer);
      } else {
        const insertIndex = Math.floor(Math.random() * 2);
        answers.splice(insertIndex, 0, correct_answer);
      }
      setShuffledAnswers(answers);
    }
  }, [questions, index]);

  if (waiting) {
    return <Form />;
  }
  if (loading) {
    return <Loading />;
  }

  const { question, type, correct_answer } = questions[index];
  
  const progress = ((index + 1) / questions.length) * 100;

  const handleAnswerSelection = (answer) => {
    if (type === 'boolean' || type === 'single') {
      setSelectedAnswers([answer]);
    } else {
      if (selectedAnswers.includes(answer)) {
        setSelectedAnswers(selectedAnswers.filter(a => a !== answer));
      } else {
        setSelectedAnswers([...selectedAnswers, answer]);
      }
    }
  };

  const handleSubmit = () => {
    let isCorrect;
    if (type === 'boolean' || type === 'single') {
      isCorrect = selectedAnswers[0] === correct_answer;
    } else {
      isCorrect = selectedAnswers.length === correct_answer.length &&
        selectedAnswers.every(answer => correct_answer.includes(answer));
    }
    checkAnswer(isCorrect);
    setSelectedAnswers([]);
  };

  return (
    <main className={`min-h-screen flex items-center justify-center ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <ThemeToggle />
      <Modal />
      <div className={`p-3 py-5 md:p-8 shadow rounded-lg max-w-[800px] w-11/12 min-h-[300px] ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="relative h-2 w-full bg-gray-300 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-right pb-2 text-green-600 mt-2">
          Number: {" "}
            <span>
              {index + 1}/{questions.length}
            </span>
        </p>
        <div className="mt-3">
          <p
            className="text-center font-medium text-2xl lg:text-3xl leading-loose"
            dangerouslySetInnerHTML={{ __html: question }}
          />
          <div className="grid grid-cols-1 my-5 space-y-2 place-content-center">
            {shuffledAnswers.map((answer, index) => {
              const isSelected = selectedAnswers.includes(answer);
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelection(answer)}
                  className={`bg-blue-500 w-4/5 rounded-lg mx-auto text-white p-2 hover:bg-blue-400 ${
                    isSelected ? 'bg-blue-700' : ''
                  }`}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: answer,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
          {selectedAnswers.length > 0 ? (
            <div className="flex justify-center pt-4">
              <button
                onClick={handleSubmit}
                className="py-2 px-7 text-medium flex rounded-lg text-white bg-yellow-600 hover:bg-green-700 "
              >
                Submit Answer
              </button>
            </div>  
          ):(
            <div className="flex justify-end pt-4 content-end">
              <button
                onClick={nextQuestion}
                className="py-2 px-7 text-medium flex  rounded-lg text-white bg-red-600 hover:bg-red-700  "
              >
                Skip
              </button>
            </div>
          )
          }
      </div>
    </main>
  );
};

export default App;