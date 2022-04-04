const getQuoteBtn = document.getElementById("random-question-btn");
const submitBtn = document.getElementById("submit-btn");
const checkAnswerBtn = document.getElementById("check-answer-btn");
const seeAnswer = document.getElementById("get-answer");
const currentQuestion = document.getElementById("gw-question");
const score = document.getElementById("score");
const hint = document.getElementById("hint");
const userAnswer = document.getElementById("user-answer");
let globalRightAnswer = "";

getQuoteBtn.addEventListener("click", getQuote);

submitBtn.addEventListener("click", checkAnswer);

checkAnswerBtn.addEventListener("click", () => {
  seeAnswer.innerText = globalRightAnswer;
});

userAnswer.addEventListener("keydown", checkKey);

function getQuote() {
  try {
    fetch("https://hargrimm-wikihow-v1.p.rapidapi.com/steps?count=1", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "hargrimm-wikihow-v1.p.rapidapi.com",
        "x-rapidapi-key": "API_KEY",
      },
    })
      .then((response) => response.json())
      .then((json) => appendQuestion(json))
      .catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
  }
}

function appendQuestion(json) {
  score.innerHTML = "";
  const question = json[1];
  const array = question
    .split(" ")
    .filter((e) => e.length > 2 && e.length < 9 && !e.includes(`${/[1-9]/g}`));
  const rightAnswer = array[Math.floor(Math.random() * array.length)].replace(
    /[.;,]/g,
    ""
  );
  globalRightAnswer = rightAnswer;
  currentQuestion.innerText = question.replace(
    rightAnswer,
    "_".repeat(rightAnswer.length)
  );
  hint.innerText = `Hint: The word is ${
    rightAnswer.length
  } letters long and it starts with '${rightAnswer[0].toUpperCase()}'.`;
  seeAnswer.innerText = "";
  score.className = "";
  document.getElementById("user-answer").value = "";
}

function checkAnswer() {
  const userAnswer = document.getElementById("user-answer").value;
  if (globalRightAnswer === "") return;
  if (userAnswer.toLowerCase() === globalRightAnswer.toLowerCase()) {
    score.innerHTML = `<p class="m-5 mt-5">Correct!</p>`;
    score.className = "bg-success";
  } else {
    score.innerHTML = `<p class="m-5 mt-5">Oops! You got it wrong</p>`;
    score.className = "bg-danger answer-wrong";
    setTimeout(() => {
      score.classList.remove("answer-wrong");
    }, 350);
  }
}

function checkKey(e) {
  if (e.keyCode === 13) {
    checkAnswer();
  }
}
