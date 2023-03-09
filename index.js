let questions = []
let answers = []
function Question(questionText, questionType, answers) {
  this.questionText = questionText;
  this.questionType = questionType;
  this.answers = answers;
}

let modal = document.getElementById("myModal");

let btn = document.getElementById("myBtn");

let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let addAnswer = () => {
  let answer = document.getElementById("answers")
  if (answer.value === '') {
    alert('fullfill the answers')
  } else {
    answers.push(answer.value)
    localStorage.setItem("questions", JSON.stringify(questions));

    let answersList = document.getElementById("answersList")
    answersList.innerHTML += `<li>${answer.value}</li>`
    answer.value = ''
  }

}

function displayQuestions() {
  let unansweredDiv = document.getElementById("unanswered");
  let answeredDiv = document.getElementById("answered");

  unansweredDiv.innerHTML = "";
  answeredDiv.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    let question = questions[i];

    if (question.answers.length === 0) {
      let questionDiv = document.createElement("div");
      questionDiv.innerHTML = `${question.questionText} <button onclick="addAnswer(${i})">Add answers</button>`;
      unansweredDiv.appendChild(questionDiv);
    } else {
      let questionDiv = document.createElement("div");
      questionDiv.innerHTML = `${question.questionText}`;
      answeredDiv.appendChild(questionDiv);
    }
  }
}
function loadQuestionsFromStorage() {
  const storedQuestions = JSON.parse(localStorage.getItem("questions"));
  if (storedQuestions) {
    questions = storedQuestions;
    displayQuestions();
  }
}
window.onload = function () {
  let questionList = document.getElementById("questionList")
  let answered = document.createElement('div')
  let unanswered = document.createElement('div')
  unanswered.id = "unanswered"
  answered.id = "answered"
  questionList.appendChild(unanswered)
  questionList.appendChild(answered)
  console.log("The web page has finished loading!");
  loadQuestionsFromStorage();
}


let createQuestion = () => {
  let questionText = document.getElementById("questionText")
  let questionType = document.getElementById("questionType")
  let questionBlock = document.createElement('div')
  questionBlock.id = ("questionBlock")
  unanswered.appendChild(questionBlock)
  let index = questions.length;
  let question = new Question(questionText.value, questionType.value, answers)
  question.state = false
  question.index = index
  if (question.questionText === '' || question.questionType === '' || question.answers === []) {
    alert('fullfill the form')
  } else {
    questions.push(question)
    console.log(questions)
    localStorage.setItem("questions", JSON.stringify(questions));
    questionText.value = ''
    questionType.value = ''
    let answersList = document.getElementById("answersList")
    answersList.innerHTML = ''
    if (question.questionType === 'single') {
      questionBlock.innerHTML += `
        <h3>Ur question ${questions.indexOf(question) + 1}</h3>
        <p>Question text : ${question.questionText}</p>
        <input type="button" id ="submit" value="Submit Answer" onclick="submitAnswer()">
        `
      for (i = 0; i < question.answers.length; i++)
        questionBlock.innerHTML += `
        <input type="radio" id="answer" name="${questionText}" value="${question.answers[i]}">
        <label for="html">${question.answers[i]}</label><br>
      `
      answers = []
    }
    else if (question.questionType === 'multi') {
      questionBlock.innerHTML += `
        <h3>Ur question ${questions.indexOf(question) + 1}</h3>
        <p>Question text : ${question.questionText}</p>
        `
      for (i = 0; i < question.answers.length; i++)
        questionBlock.innerHTML += `
        <input type="checkbox" id="answer" name="${questionText}" value="${question.answers[i]}">
        <label for="html">${question.answers[i]}</label><br>
      `
      answers = []
    }
    else {
      questionBlock.innerHTML += `
        <h3>Ur question ${questions.indexOf(question) + 1}</h3>
        <p>Question text : ${question.questionText}</p>
        `
      for (i = 0; i < question.answers.length; i++)
        questionBlock.innerHTML += `
        answer #${i + 1}
        <p>${question.answers[i]}</p> 
      `
      answers = []
    }
    
  }
  displayQuestions();
  modal.style.display = "none";
}


const submitAnswer = () => {
  let submit = document.getElementById("submit")
  let block = submit.parentNode
  let answered = document.getElementById('answered')
  answered.appendChild(block)
  block.removeChild(submit)
}