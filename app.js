const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const quizBox = document.querySelector(".quiz-box");
const homeBox = document.querySelector(".home-box");
const resultBox = document.querySelector(".result-box");
const answerIndicatorContainer = document.querySelector(".answer-indicator");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOption = [];
let correctAnswers = 0;
let attempt = 0;
let score = 0;

function startQuiz() {
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resultBox.classList.add("hide"); // Hide the result box
    questionCounter = 0;
    score = 0;
    correctAnswers = 0; // Reset correctAnswers
    attempt = 0; // Reset attempt
    availableQuestions = [...quiz];
    document.querySelector(".total-question").innerHTML = quiz.length;
    getNewQuestion();
    answerIndicator();
}

function getNewQuestion() {
    if (availableQuestions.length === 0) {
        endQuiz();
        return;
    }

    questionNumber.innerHTML = `Question ${questionCounter + 1} of ${quiz.length}`;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    availableQuestions.splice(questionIndex, 1);
    questionText.innerHTML = currentQuestion.q;

    // Log the question and answer in the console
    console.log(currentQuestion);

    optionContainer.innerHTML = ""; // Clear previous options
    let animationDelay = 0.1; // Initial animation delay
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.innerHTML = option;
        optionElement.className = "option";
        optionElement.setAttribute("data-id", index);
        optionElement.style.animationDelay = animationDelay + "s"; // Set animation delay
        animationDelay += 0.1; // Increment animation delay for next option
        optionElement.addEventListener("click", () => {
            checkAnswer(index, currentQuestion);
            getResults(optionElement);
        });
        optionContainer.appendChild(optionElement);
    });

    questionCounter++;
}

function answerIndicator() {
    answerIndicatorContainer.innerHTML = ""; // Clear previous indicators
    const totalQuestions = quiz.length;
    for (let i = 0; i < totalQuestions; i++) {
        const indicator = document.createElement("div");
        answerIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType) {
    answerIndicatorContainer.children[questionCounter - 1].classList.add(markType);
}

function checkAnswer(selectedIndex, currentQuestion) {
    const options = document.querySelectorAll(".option");
    options.forEach(option => option.removeEventListener("click", checkAnswer));

    let isCorrect = false;
    if (selectedIndex === currentQuestion.answer) {
        options[selectedIndex].classList.add("correct");
        score++;
        isCorrect = true;
    } else {
        options[selectedIndex].classList.add("wrong");
    }

    updateAnswerIndicator(isCorrect ? "correct" : "wrong");
}

function getResults(optionElement) {
    const id = parseInt(optionElement.getAttribute("data-id"));
    if (id === currentQuestion.answer) {
        // Set green color if correct
        optionElement.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAnswers++;
    } else {
        optionElement.classList.add("wrong");
        updateAnswerIndicator("wrong");

        // Highlight the correct answer
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].getAttribute("data-id")) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}

function unclickableOptions() {
    const optionsLen = optionContainer.children.length;
    for (let i = 0; i < optionsLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function nextQuestion() {
    getNewQuestion();
}

function endQuiz() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");

    document.querySelector(".total-correct").innerHTML = score;
    document.querySelector(".total-wrong").innerHTML = quiz.length - score;
    document.querySelector(".total-question").innerHTML = quiz.length;
    document.querySelector(".percentage").innerHTML = `${((score / quiz.length) * 100).toFixed(2)}%`;
    document.querySelector(".total-score").innerHTML = `${score} / ${quiz.length}`;
}

function goHome() {
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
}

function setAvailableQuestions() {
    // Add your logic to initialize the available questions here
    availableQuestions = [...quiz]; // Ensure availableQuestions is set correctly
    console.log("setAvailableQuestions function is called");
}

function quizOver() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
}

window.onload = function() {
    // First, we will set all questions in availableQuestions Array
    setAvailableQuestions();
    // Second, we will call getNewQuestion() function
    getNewQuestion();
    // Initialize the answer indicator
    answerIndicator();
};
