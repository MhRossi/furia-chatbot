// js/quiz.js

let quizDescription;
let questionContainer;
let questionText;
let answerButtonsElement;
let nextButton;
let resultContainer;
let scoreText;
let resultMessage;

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "Qual o nome completo do IGL (In-Game Leader) da FURIA CS2 em 2025?",
        answers: [
            { text: 'Yuri Santos', correct: false },
            { text: 'Gabriel Toledo', correct: true },
            { text: 'Kaike Cerato', correct: false },
            { text: 'Mareks Gaļinskis', correct: false }
        ]
    },
    {
        question: "Antes de 2025, qual o apelido comum de Gabriel Toledo no cenário de CS?",
        answers: [
            { text: 'KSCERATO', correct: false },
            { text: 'yuurih', correct: false },
            { text: 'FalleN', correct: true },
            { text: 'arT', correct: false }
        ]
    },
    {
        question: "Qual bordão da FURIA representa a mentalidade de jogar de forma destemida e criativa?",
        answers: [
            { text: 'VAMO', correct: false },
            { text: 'APLA', correct: false },
            { text: 'FURIOSIDADE', correct: false },
            { text: 'Ousadia e Alegria', correct: true }
        ]
    },
    {
        question: "Em que ano a organização FURIA foi fundada?",
        answers: [
            { text: '2015', correct: false },
            { text: '2016', correct: false },
            { text: '2017', correct: true },
            { text: '2018', correct: false }
        ]
    },
    {
        question: "Qual membro da comissão técnica da FURIA CS2 em 2025 atua como Coach?",
        answers: [
            { text: 'Juan Borges', correct: false },
            { text: 'Sidnei Macedo', correct: true },
            { text: 'Nicholas Nogueira', correct: false },
            { text: 'Jaime Pádua', correct: false }
        ]
    }
];

function initializeQuiz(showChatCallback) {
    quizDescription = document.getElementById('quiz-description');
    questionContainer = document.getElementById('question-container');
    questionText = document.getElementById('question-text');
    answerButtonsElement = document.getElementById('answer-buttons');
    nextButton = document.getElementById('next-button');
    resultContainer = document.getElementById('result-container');
    scoreText = document.getElementById('score-text');
    resultMessage = document.getElementById('result-message');

    window.showChatAreaFromQuiz = showChatCallback;

    nextButton.addEventListener('click', () => {
        handleNextButton();
    });
    answerButtonsElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('answer-btn') && !event.target.disabled) {
            selectAnswer(event.target);
        }
    });

    console.log("Quiz logic initialized.");
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = 'Próxima Pergunta';
    quizDescription.style.display = 'none';
    resultContainer.style.display = 'none';
    questionContainer.style.display = 'block';
    nextButton.style.display = 'block';

    displayQuestion(questions[currentQuestionIndex]);
    console.log("Quiz started. Displaying question 1.");
}

function displayQuestion(question) {
    questionText.textContent = question.question;
    resetAnswerButtons();

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        answerButtonsElement.appendChild(button);
    });
}

function resetAnswerButtons() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(selectedButton) {
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('wrong');
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
    });

    if (questions.length > currentQuestionIndex + 1) {
        nextButton.textContent = 'Próxima Pergunta';
    } else {
        nextButton.textContent = 'Finalizar Quiz';
    }
    nextButton.style.display = 'block';
    console.log(`Answer selected. Correct: ${correct}. Current Score: ${score}.`);
}

function handleNextButton() {
    if (questions.length <= currentQuestionIndex + 1) {
        endQuiz();
    } else {
        currentQuestionIndex++;
        displayQuestion(questions[currentQuestionIndex]);
        console.log(`Moving to question ${currentQuestionIndex + 1}.`);
    }
}

function endQuiz() {
    questionContainer.style.display = 'none';
    nextButton.style.display = 'none';
    resetAnswerButtons();

    scoreText.textContent = `Sua pontuação: ${score}/${questions.length}`;
    if (score === questions.length) {
        resultMessage.textContent = "APLA! Pura FURIOSIDADE! Você acertou todas!";
    } else if (score >= questions.length / 2) {
        resultMessage.textContent = "Boa! Você entende da Pantera! VAMO melhorar na próxima!";
    } else {
        resultMessage.textContent = "Não desanime! Continue acompanhando a FURIA e tente de novo! VAMO aprender!";
    }
    resultContainer.style.display = 'block';
    console.log("Quiz ended. Displaying results.");


}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = 'Próxima Pergunta';
    quizDescription.style.display = 'block';
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    nextButton.style.display = 'none';
    resetAnswerButtons();
    console.log("Quiz reset.");
}

window.startFuriaQuiz = startQuiz;
window.resetFuriaQuiz = resetQuiz;
window.initializeQuiz = initializeQuiz;