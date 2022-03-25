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

var timeLeft = 60;

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
        countdown();
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

  function gameOver() {
    questionScreenEl.setAttribute("style", "display:none");
    endScreenEl.removeAttribute("style", "display");
    endScreenEl.textContent("Game Over");
  }
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