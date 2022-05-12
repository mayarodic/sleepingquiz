


// Functions
function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
    (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

        // HTML radio button
        answers.push(
            `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
            </label>`
        );
        }

        // question and its answers to the output
        output.push(
        `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
        </div>`
        );
    }
    );



    // combine output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}

function showHistory(){
 let historyScore = window.localStorage.getItem("Score");
 document.getElementById("results").innerHTML=`The history score is: ${historyScore}.`
}

function showResults(){

    // gathering answers containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
    }
    // if answer is wrong or blank
    else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
    }
    
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    
    if(numCorrect>myQuestions.length/2){
        document.getElementById("advice").innerHTML="You need more sleep! - Check out the Learn More Tab for help";
    }else{
        document.getElementById("advice").innerHTML="You are getting enough sleep!";
    }
    return numCorrect;
}

function storeData(){
    window.localStorage.setItem('Score', showResults());
}

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
    previousButton.style.display = 'none';
    }
    else{
    previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
    }
    else{
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}



// Variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
    {
    question: "I usually wake up feeling..",
    answers: {
        a: "Full of ENERGY!",
        b: "Tired.."
    },
    correctAnswer: "b"
    },
    {
    question: "Do you feel tired throughout the day?",
    answers: {
        a: "Never",
        b: "Yes"
    },
    correctAnswer: "b"
    },
    {
    question: "How many hours of sleep do you get?",
    answers: {
        a: "More than Eight",
        b: "Less than Seven"
    },
    correctAnswer: "b"
}, 
{
    question: "Would you like to get more sleep?",
    answers: {
        a: "I think I get enough sleep",
        b: "I'd like more sleep"
    },
    correctAnswer: "b"
},
{
    question: "Do you have trouble falling alseep?",
    answers: {
        a: "Never",
        b: "Yes"
    },
    correctAnswer: "b"
},
{
    question: "Do you wake up in the middle of the night?",
    answers: {
        a: "Never",
        b: "Yes"
    },
    correctAnswer: "b"
},
{
    question: "Do you snore in your sleep?",
    answers: {
        a: "Never",
        b: "Yes"
    },
    correctAnswer: "b"
},
{
    question: "Do you wish you sleep better?",
    answers: {
        a: "I sleep just fine",
        b: "Yes, better sleep!"
    },
    correctAnswer: "b"

    }
];


buildQuiz();

// Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

// Show the first slide
showSlide(currentSlide);

// Event listeners
submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

