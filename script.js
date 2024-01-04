let currentQuestion = 0;
const questions = [
  "What is the capital of France?",
  "Who painted the Mona Lisa?",
  "What is the powerhouse of the cell?"
];

function displayQuestion(questionNumber) {
  const questionTitle = document.getElementById('question-title');
  questionTitle.textContent = questions[questionNumber];
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    displayQuestion(currentQuestion);
    updateProgressBar(currentQuestion);
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    displayQuestion(currentQuestion);
    updateProgressBar(currentQuestion);
  }
}

function updateProgressBar(questionNumber) {
  const progressBar = document.getElementById('progress-bar');
  const progressPercentage = ((questionNumber + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

// Display the first question when the page loads
displayQuestion(currentQuestion);
updateProgressBar(currentQuestion);
