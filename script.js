let currentQuestion = 0;
const questions = [
  { question: "What is the capital of France?", answer: "" },
  { question: "Who painted the Mona Lisa?", answer: "" },
  { question: "What is the powerhouse of the cell?", answer: "" }
];

function displayQuestion(questionNumber) {
  const questionTitle = document.getElementById('question-title');
  questionTitle.textContent = questions[questionNumber].question;
  document.getElementById('answer-input').value = questions[questionNumber].answer;
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    updateAnswer();
    displayQuestion(currentQuestion);
    updateProgressBar(currentQuestion);
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    updateAnswer();
    displayQuestion(currentQuestion);
    updateProgressBar(currentQuestion);
  }
}

function updateProgressBar(questionNumber) {
  const progressBar = document.getElementById('progress-bar');
  const progressPercentage = ((questionNumber + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

function updateAnswer() {
  questions[currentQuestion].answer = document.getElementById('answer-input').value;
}

// Display the first question when the page loads
displayQuestion(currentQuestion);
updateProgressBar(currentQuestion);

// Save answer on input change
document.getElementById('answer-input').addEventListener('input', function() {
  updateAnswer();
});
