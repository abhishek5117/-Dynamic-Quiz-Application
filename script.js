const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");
const fileInput = document.getElementById("fileInput");

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

function showQuestion(question) {
    questionElement.textContent = question.question;
    const formElement = document.getElementById("choices");
    formElement.innerHTML = ""; // Clear previous options

    question.choices.forEach((choice, index) => {
        const choiceLabel = document.createElement("label");

        const choiceInput = document.createElement("input");
        choiceInput.type = "radio";
        choiceInput.name = "answer";
        choiceInput.value = choice;

        choiceLabel.appendChild(choiceInput);
        choiceLabel.appendChild(document.createTextNode(choice));
        formElement.appendChild(choiceLabel);
    });
}

function handleAnswerClick(choice) {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = choice.toLowerCase(); // Convert to lowercase for case-insensitive comparison

    if (selectedAnswer === currentQuestion.answer.toLowerCase()) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
}
function endQuiz() {
    questionContainer.style.display = "none";
    nextButton.style.display = "none";
    scoreElement.textContent = `Score: ${score} / ${questions.length}`;
}

nextButton.addEventListener("click", () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
        currentQuestionIndex++;
        showQuestion(currentQuestion);
    } else {
        endQuiz();
    }
});

fileInput.addEventListener("change", (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                questions = JSON.parse(e.target.result);
                currentQuestionIndex = 0;
                score = 0;
                showQuestion(questions[currentQuestionIndex]);
                fileInput.style.display = "none";
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        };
        reader.readAsText(selectedFile);
    }
});
