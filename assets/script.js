var highscoresEl = document.querySelector("#highscores");
var timerEl = document.querySelector("#timeleft");
var welcomeScreenEl = document.querySelector("#welcomeScreen");
var questionScreenEl = document.querySelector("#questionScreen");
var endScreenEl = document.querySelector("#endScreen");
var highscoresScreenEl = document.querySelector("#highscoresScreen");
var startBtnEl = document.querySelector("#start");
var nextBtnEl = document.querySelector("#next");
var submitAnswersBtnEl = document.querySelector("#submitAnswers");
var backWelcomeBtnEl = document.querySelector("#backtowelcome");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#multiplechoice");
var userScore = 0;
var userNameInput = document.querySelector("#username");

var timeLeft = 15;

var questions = [
    {
      question: "What house was Harry Potter in?",
      answers: ["Gryffindoor", "Ravenclaw", "Slytherin", "Hufflepuff"],
      answer: 0
    },
    {
      question: "What was Hermione's cat's name?",
      answers: ["Crookshanks", "Peter Pettigrew", "Scabbers", "Harry"],
      answer: 3
    },
    {
        question:"",
        answers:[],
        answer: 0
    }
  ];

var currentQuestion = 0;

function populateQuestion() {
    var questionObj = questions[currentQuestion];
    // Remove the current list items
    answersEl.innerHTML = "";
    questionEl.textContent = (questionObj.question);
    questionObj.answers.forEach(function (question) {
      var li = document.createElement("li");
      li.textContent = question;
      answersEl.appendChild(li);
    });
    if (currentQuestion != questions.length - 1) {
      currentQuestion++;
    } else if (currentQuestion === questions.length-1) {
        questionScreenEl.setAttribute("style", "display:none");
        endScreenEl.removeAttribute("style", "display");
        timerEl.setAttribute("style", "display:none");
    };
    
    countdown();

    // if (currentQuestion === questions.length -1) {
    //     questionScreenEl.setAttribute("style", "display:none");
    //     highscoresScreenEl.removeAttribute("style", "display");
    // }

    answersEl.addEventListener("click", function(event){
        var userAnswerSel = event.target;
        if (userAnswerSel.matches("li")) {
            if (userAnswerSel.innerHTML === questionObj.answers[questionObj.answer]) {
                console.log("correct");
                userScore +=5
                console.log(userScore);
                populateQuestion();
            } else { // incorrect answer
                timeLeft -= 5;
            }
        }
    });
};

  function userAnswer(){
      answersEl.addEventListener("click", function(event){
        var userAnswerSel = event.target;
        if (userAnswerSel.matches("li")) { 
        // console.log(userAnswerSel.innerHTML);
            if (userAnswerSel === questions[currentQuestion].answer) {
                alert("Correct");
            } else {
                alert("incorrect");
            }

        }
      });
  }

// welcomeScreenEl.setAttribute("style", "display:none");

function init() {
    // welcomeScreenEl.removeAttribute("style", "display");
    questionScreenEl.setAttribute("style", "display:none");
    endScreenEl.setAttribute("style", "display:none");
    highscoresScreenEl.setAttribute("style", "display:none");
    timerEl.setAttribute("style", "display:none");
    // setEventListeners();

    startBtnEl.addEventListener("click", function(event) {
        welcomeScreenEl.setAttribute("style", "display:none");
        questionScreenEl.removeAttribute("style", "display");
        timerEl.removeAttribute("style", "display");
        // countdown();
        populateQuestion();
        // userAnswer();
        submitAnswersBtnEl.addEventListener("click", function(event){
            event.preventDefault();
    
            var user = {
                userName: userNameInput.value.trim(),
                userScoreFinal: userScore
            };
    
            localStorage.setItem("user", JSON.stringify(user));
            endScreenEl.setAttribute("style", "display:none");
            highscoresScreenEl.removeAttribute("style", "display");
        });
        

    })
};

function countdown() {
    // var timeLeft = 5;
  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = timeLeft + ' seconds remaining';
        // Decrement `timeLeft` by 1
        timeLeft--;
      } else if (timeLeft === 1) {
        // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else if (currentQuestion === questions.length-1) {
        clearInterval(timeInterval);
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = '';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        gameOver();
      }
    }, 1000);
  };

  function stopTimer () {
    countdown();
  };

  function gameOver() {
    questionScreenEl.setAttribute("style", "display:none");
    endScreenEl.removeAttribute("style", "display");


    // endScreenEl.textContent("Game Over");
  };
// function setEventListeners() {
//     startBtnEl.addEventListener("click", function (evt) {
//     evt.preventDefault();
 
//     var element = evt.target;

//     // if (element.matches(".box")) {
//         var state = element.getAttribute("data-state");
    
//         if (state === "hidden") {
//           element.textContent = element.dataset.number;
//           element.dataset.state = "visible";
//         } else {
//           element.textContent = "";
//           element.dataset.state = "hidden";
//           // element.setAttribute("data-state", "hidden");
//         };
//     //   }
//     // screen1ButtonEle.addEventListener("click", function () {
//     //   setState(2);
//     // });
//     // screen2ButtonEle.addEventListener("click", function () {
//     //   setState(0);
//     // });
// });

init();