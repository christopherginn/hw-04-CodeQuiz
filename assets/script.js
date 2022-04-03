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
var wrongAnswerMsg = document.querySelector(".wrongAnswer");

var timeLeft = 15;
var highscoreList = [];
var questions = [
    {
      question: "The SCRIPT tag enables you to enhance a web page with code written in which programming language?",
      answers: ["SQL", "FORTRAN", "JavaScript", "Pascal"],
      answer: 2
    },
    {
      question: "Which HTML tag hyperlinks text?",
      answers: ["DIV", "A", "IFRAME", "BR"],
      answer: 1
    },
    {
        question:"When elements are positioned absolutely, they can be layered on top of one another. What property determines the stacking order for layered elements?",
        answers:["layer-number", "z-position", "z-index", "layer-order"],
        answer: 2
    },
    {
        question:"In HTML, what symbols are used to create elements?",
        answers:["[ ]", "( )", "< >", "/"],
        answer: 2
    },
    {
        question:"What does CSS stand for?",
        answers:["Cascading Style Sheets", "Coded Styling Sheet", "Color Settings Selection", "Current System Style"],
        answer: 0
    },
    {
        question:"In order use the functionality coded in Javascipt, the file contianining the Javascript does not always need to be linked to the HTML file.",
        answers:["True", "False"],
        answer: 1
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
                wrongAnswerMsg.textContent = ("");
            } else { // incorrect answer
                timeLeft -= 5;
                wrongAnswerMsg.textContent = ("Wrong answer. Please select a different answer.");
                wrongAnswerMsg.setAttribute("style", "color:#ff0000");
            }
        }
    });
};

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
            highscoreList.push(user);
            localStorage.setItem("highScoreList", JSON.stringify(user));
            
            endScreenEl.setAttribute("style", "display:none");
            highscoresScreenEl.removeAttribute("style", "display");




            
            backWelcomeBtnEl.addEventListener("click", function(){
                highscoresScreenEl.setAttribute("style", "display:none");
                welcomeScreenEl.removeAttribute("style", "display");
                currentQuestion = 0;
                populateQuestion();
            });

        });
        

    })
};

function countdown() {
    // var timeLeft = 5;
  
    var timeInterval = setInterval(function () {
      if (timeLeft > 1) {
        timerEl.textContent = timeLeft + ' seconds remaining';
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else if (currentQuestion === questions.length-1) {
        clearInterval(timeInterval);
      } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
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


init();