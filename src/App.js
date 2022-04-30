
import './App.css';
import quizData from './api/multipleChoice.json';
import { useState } from 'react'
import React from 'react'

let score = 0
let answers = []

//comment out this section if you dont want to shuffle the answers
quizData.options.sort(() => Math.random() - 0.5);

function App() {

  const [questionID, setQuestionID] = useState(0)
  let data = quizData.options[questionID];
  const [savedAnswer, setSavedAnswer] = useState([])
  if (questionID !== 5) {
    answers = quizData.options[questionID].answers;
  }

  function handleAnswer(id) {
    let prev = [...savedAnswer]
    prev[questionID] = parseInt(id)
    setSavedAnswer(prev)
  }
  // console.log(savedAnswer);

  function handleScore() {
    if (savedAnswer.length === 0) {
      alert("You have not selected any answers yet")
    }
    else {
      if (questionID < 5) { setQuestionID(questionID + 1); }
      for (var i = 0; i < quizData.options.length; i++) {
        if (savedAnswer[i] === quizData.options[i].correctAnswerID) {
          score++
        }
      }
    }
    // console.log(savedAnswer);
  }

  function handleSelectedAnswer(id) {

    let className = `answers`

    if (savedAnswer[questionID] && savedAnswer[questionID] === parseInt(id)) {
      className = 'answers-selected'
    }
    return className

  }


  let answerMap = answers.map(item => {
    return <div >
      <button className={handleSelectedAnswer(item.id)} key={item.id} onClick={() => handleAnswer(item.id)}>{item.answer}</button>
    </div>
  })

  function handlePrev() {
    if (questionID > 0) { setQuestionID(questionID - 1); }
  }

  function handleNext() {
    if (questionID < 5) { setQuestionID(questionID + 1); }
  }


  return (
    <div className="App">
      <div className="Header">
        <h1>Sample Quiz</h1>
      </div>
      {questionID !== 5 &&
        <div>
          <div><b>Question Number: {questionID + 1} out of {(quizData.options.length)}</b></div>
          <br></br>
          <div className="question"> <i>{data.question}</i></div>
          <br></br>
          <div className="question"><b> {data.subQuestion}</b></div>
          <br></br>
          <div>
            {answerMap}
          </div>
          <br></br>
          <div>
            {questionID > 0 && <button className="button" onClick={handlePrev}> Previous</button>} { }
            {questionID !== 4 && <button className="button" onClick={handleNext}> Next</button>}
            {questionID === 4 && <button className="button" onClick={handleScore}> Score</button>}
          </div>
        </div>
      }
      {questionID === 5 &&
        <header className="App-header">
          <h2>Score: {score} out of {(quizData.options.length)} </h2>
          <button className="button" onClick={() => window.location.reload()}>Reload Quiz</button>
          <br></br>
        </header>
      }
    </div>
  );
}

export default App;
