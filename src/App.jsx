import questions from './questions'
import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  {/* Variável para a questão atual */}
  let [currentQuestion] = useState(0)
  {/* Variável para contagem de questões corretas */}
  let [correctQuestions] = useState(0)

  {/* Função para carregar às questões dinamicamente */}
  const loadQuestions = () => {
    const question = document.getElementById("question")
    const amount = document.getElementById("amount")
    const buttons = document.getElementById("buttons")
    const questionItems = questions[currentQuestion]
    question.textContent = questionItems.question
    amount.textContent = `${currentQuestion + 1} / ${questions.length}`
    questionItems.answers.forEach((answer) => {
      const button = document.createElement("button")
      button.textContent = answer.option
      button.setAttribute("class", "answer")
      button.setAttribute("data-correct", answer.correct)
      buttons.appendChild(button)
      document.querySelectorAll(".answer").forEach((item) => {
        item.addEventListener("click", nextQuestion)
      })
    })
  }
  useEffect(() => {
    loadQuestions()
  }, [])

  {/* Função para próxima questão */}
  const nextQuestion = (event) => {
    const buttons = document.getElementById("buttons")
    buttons.textContent = ""
    if(event.target.getAttribute("data-correct") === "true") {
      correctQuestions ++
    }
    if(currentQuestion < questions.length - 1) {
      currentQuestion ++
    }
    else {
      finishQuiz()
    }
    loadQuestions()
  }

  {/* Função para finalizar/terminar QUIZ */}
  const finishQuiz = () => {
    const quizContent = document.getElementById("quiz-content")
    const exitBox = document.getElementById("exit-box")
    const exitText = document.getElementById("exit-text")
    quizContent.style.display = "none"
    exitBox.style.display = "block"
    if(correctQuestions === 0) {
      exitText.textContent = `Tente novamente!!! Você acertou ${correctQuestions} de ${questions.length} questões!`
    }
    else {
      exitText.textContent = `Parabéns!!! Você acertou ${correctQuestions} de ${questions.length} questões!`
    }
  }

  {/* Função para iniciar QUIZ */}
  const startQuiz = () => {
    const quizContent = document.getElementById("quiz-content")
    const startBox = document.getElementById("start-box")
    quizContent.style.display = "block"
    startBox.style.display = "none"
  }

  {/* Função para reiniciar QUIZ */}
  const refreshQuiz = () => {
    location.reload()
  }

  return (
    <>
      <section className='container'>
        <div className="start-box" id='start-box'>
          <h2>Iniciar Quiz!</h2>
          <button onClick={startQuiz} type='button'>Iniciar</button>
        </div>{/* End start box */}
        <div className="quiz-content" id='quiz-content'>
          <main className='quiz-app'>
            <div className="title">
              <p id='question'></p>
              <span id='amount'></span>
            </div>{/* End title */}
            <div className="buttons" id='buttons'>
              {/* Elements created with javascript */}
            </div>{/* End buttons */}
          </main>{/* End quiz app */}
        </div>{/* End quiz content */}
        <div className="exit-box" id='exit-box'>
          <p id='exit-text'></p>
          <button onClick={refreshQuiz} type='button'>Reiniciar</button>
        </div>{/* End exit box */}
      </section>{/* End container */}
    </>
  )
}