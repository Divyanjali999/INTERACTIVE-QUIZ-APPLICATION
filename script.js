const questions = [
  {
    question: "Which planet rotates in the opposite direction?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Venus", correct: true },
      { text: "Mars", correct: false },
      { text: "Saturn", correct: false }
    ]
  },
  {
    question: "Which country has the most official languages?",
    answers: [
      { text: "India", correct: false },
      { text: "Switzerland", correct: false },
      { text: "Zimbabwe", correct: true },
      { text: "South Africa", correct: false }
    ]
  },
  {
    question: "Which food is highest in protein?",
    answers: [
      { text: "Banana", correct: false },
      { text: "Almonds", correct: true },
      { text: "Tomato", correct: false },
      { text: "Cabbage", correct: false }
    ]
  },
  {
    question: "Who invented the lightbulb?",
    answers: [
      { text: "Nikola Tesla", correct: false },
      { text: "Thomas Edison", correct: true },
      { text: "James Watt", correct: false },
      { text: "Isaac Newton", correct: false }
    ]
  },
  {
    question: "What is the capital of New Zealand?",
    answers: [
      { text: "Wellington", correct: true },
      { text: "Auckland", correct: false },
      { text: "Christchurch", correct: false },
      { text: "Hamilton", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score-display");
const questionCountEl = document.getElementById("question-count");
const timerDisplay = document.getElementById("timer");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  answered = false;
  let currentQ = questions[currentQuestionIndex];
  questionEl.innerText = currentQ.question;
  questionCountEl.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  currentQ.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.classList.add("answer-btn");
    if (answer.correct) btn.dataset.correct = true;
    btn.addEventListener("click", selectAnswer);
    answersEl.appendChild(btn);
  });

  startTimer();
}

function resetState() {
  clearInterval(timer);
  timeLeft = 15;
  timerDisplay.innerText = "";
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";
  scoreDisplay.innerText = "";
}

function startTimer() {
  timerDisplay.innerText = `Time left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoReveal();
    }
  }, 1000);
}

function autoReveal() {
  if (answered) return;
  answered = true;
  Array.from(answersEl.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });
  nextBtn.style.display = "inline-block";
}

function selectAnswer(e) {
  if (answered) return;
  answered = true;
  clearInterval(timer);

  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";

  if (correct) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answersEl.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });

  nextBtn.style.display = "inline-block";
}

function handleNext() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  resetState();
  questionEl.innerText = "Quiz Completed!";
  questionCountEl.innerText = "";
  const accuracy = Math.round((score / questions.length) * 100);
  const feedback = score >= 4 ? "Well done 👏" : "Job done 👍";
  scoreDisplay.innerHTML = `
    Correct: ${score} / ${questions.length}<br>
    Accuracy: ${accuracy}%<br>
    <strong>${feedback}</strong>
  `;
  nextBtn.innerText = "Restart";
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  if (nextBtn.innerText === "Restart") {
    startQuiz();
  } else {
    handleNext();
  }
});

startQuiz();
