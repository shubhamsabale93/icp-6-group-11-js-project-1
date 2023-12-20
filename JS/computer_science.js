const questions = [
    {
        question:"which is th largest animal in the world?",
        answer:[
        {text:"shark",correct:false},
        {text:"Blue whale",correct:true},
        {text:"Elephant",correct:false},
        {text:"Giraffe",correct:false},
        ],

        question:"which is th largest continent in the world?",
        answer:[
        {text:"Asia",correct:true},
        {text:"Antartica",correct:false},
        {text:"Eroupe",correct:false},
        {text:"Agrica",correct:false},
        ],

        question:"which is th largest country in the world?",
        answer:[
        {text:"india",correct:false},
        {text:"china",correct:false},
        {text:"Russia",correct:true},
        {text:"America",correct:false},
        ],

        question:"which is the most populated country in the world?",
        answer:[
        {text:"india",correct:true},
        {text:"china",correct:false},
        {text:"Russia",correct:false},
        {text:"America",correct:false},
        ],
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("ans-btns");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score =0;

function startQuiz(){
    currentQuestionIndex =0;
    score=0;
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "."+ currentQuestion.question;


    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==='true';
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display ="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();