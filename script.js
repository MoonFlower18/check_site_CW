let currentQuestion = 1;
const totalQuestions = 5; // Replace with actual total number of questions

function nextQuestion() {
  if (currentQuestion < totalQuestions) {
    currentQuestion++;
    displayQuestion(currentQuestion);
    updateProgressBar(currentQuestion);
  }
}

function previousQuestion() {
  if (currentQuestion > 1) {
    currentQuestion--;
    displayQuestion(currentQuestion);
    updateProgressBar(currentQuestion);
  }
}

function displayQuestion(questionNumber) {
  // Implement logic to display the question based on the questionNumber
}

function updateProgressBar(questionNumber) {
  const progressBar = document.getElementById('progress-bar');
  const progressPercentage = (questionNumber / totalQuestions) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}
