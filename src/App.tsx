import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<boolean | undefined>(undefined);

  const generateColors = () => {
    const actualColor = getRandomColor();
    setColor(actualColor);
    setAnswers(
      [actualColor, getRandomColor(), getRandomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  };

  useEffect(() => {
    generateColors();
  }, []);

  const getRandomColor = () => {
    let ColorSymbols = "0123456789ABCDEF";
    let NewColor = "#";
    for (let counter = 0; counter < 6; counter++) {
      NewColor = NewColor + ColorSymbols[Math.floor(Math.random() * 16)];
    }
    return NewColor;
  };
  function handleAnswerClicked(answer: string) {
    if (answer === color) {
      setResult(true);
      generateColors();
    } else {
      setResult(false);
    }
  }
  return (
    <div className="App">
      <div className="guess-me-box">
        <div className="guess-me" style={{ background: color }}></div>
        <div className="guess-me-buttonsBlock">
          {answers.map((answer) => (
            <button
              onClick={() => handleAnswerClicked(answer)}
              key={answer}
              className="guess-me-button"
            >
              {answer}
            </button>
          ))}
        </div>
        {result === false && (
          <div className="wrongAnswer">Wrong answer</div>
        )}
        {result === true && (
          <div className="correctAnswer">Correct answer!</div>
        )}
      </div>
    </div>
  );
}

export default App;
