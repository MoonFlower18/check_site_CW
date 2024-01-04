const { google } = require('googleapis');
const keys = require('./credentials.json'); // Уточнение пути к файлу с учетными данными

// Аутентификация клиента
const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

// Функция для записи ответа в Google Sheets
async function writeToSheet(answer, questionNumber) {
  try {
    await client.authorize(); // Дожидаемся успешной аутентификации
    const sheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1SCBclO9a-fSsOc0ZJyNfxl3IEOLTGFRKsP5rv7t1_10';
    const range = `Responses!A${questionNumber + 1}`;
    const valueInputOption = 'RAW';
    const values = [[answer]];
    const resource = { values };
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption,
      resource,
    });
    console.log(`Ответ ${answer} успешно записан в Google Sheets!`);
  } catch (err) {
    console.error('Ошибка записи данных:', err);
  }
}

// Update answer on input change
document.getElementById('answer-input').addEventListener('input', function() {
  updateAnswer();
});

// Modified updateAnswer function to trigger writeToSheet with the updated answer
function updateAnswer() {
  questions[currentQuestion].answer = document.getElementById('answer-input').value;
}

let currentQuestion = 0;
const questions = [
  { question: "What is the capital of France?", answer: "" },
  { question: "Who painted the Mona Lisa?", answer: "" },
  { question: "What is the powerhouse of the cell?", answer: "" }
];

function displayQuestion(questionNumber) {
  const questionTitle = document.getElementById('question-title');
  questionTitle.textContent = `Question ${questionNumber + 1}: ${questions[questionNumber].question}`;
  document.getElementById('answer-input').value = questions[questionNumber].answer;
}

// Modified nextQuestion and previousQuestion functions to call writeToSheet after updating the answer
function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    updateAnswer();
    currentQuestion++;
    displayQuestion(currentQuestion);
    updateProgressBar(currentQuestion);
    writeToSheet(questions[currentQuestion].answer, currentQuestion); // Вызов функции для отправки ответа в Google Sheets
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    updateAnswer();
    currentQuestion--;
    displayQuestion(currentQuestion);
    updateProgressBar(currentQuestion);
    writeToSheet(questions[currentQuestion].answer, currentQuestion); // Вызов функции для отправки ответа в Google Sheets
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
