const questions = [
    {
       question: "Which god is also known as 'Gauri Nandan'?",
       answers: [
           { text: "Agni", correct: false},
           { text: "Indra", correct: false},
           { text: "Hanuman", correct: false},
           { text: "Ganesha", correct: true},
       ]
    },
    {
       question: "Which city is known as Pink City?",
       answers: [
           { text: "Banglore", correct: false},
           { text: "Mysore", correct: false},
           { text: "Jaipur", correct: true},
           { text: "Kochi", correct: false},
       ]
    },
    {
       question: "The language of Lakshdweep.a Union Territory of India,is:",
       answers: [
           { text: "Malyalam", correct: true},
           { text: "Tamil", correct: false},
           { text: "Hindi", correct: false},
           { text: "Telugu", correct: false},
       ]
    },
    {
       question: "Current Railway Minister of India is:",
       answers: [
           { text: "Ashwini Vaishnaw", correct: true},
           { text: "Mamta Banarjee", correct: false},
           { text: "Ram Vilash", correct: false},
           { text: "Piyush Goyal", correct: false},
       ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetstate()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1 ;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetstate(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if(iscorrect){
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showscore(){
    resetstate();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showscore();
    }
}



nextButton.addEventListener("click", ()=> {
    if (currentQuestionIndex < questions.length){
         handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();


