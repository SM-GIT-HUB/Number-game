let welcomeText = document.getElementById("welcomeText");
let nameInput = document.getElementById("nameInput");
let userName = document.getElementById("userName");
let nameSubmit = document.getElementById("nameSubmit");
let minMaxSubmit = document.getElementById("minMaxSubmit");
let mini = document.getElementById("mini");
let maxi = document.getElementById("maxi");
let guessInput = document.getElementById("guessInput");
let check = document.getElementById("check");
let output = document.getElementById("output");
let restart = document.getElementById("restart");
const checkDisplay = window.getComputedStyle(check).display;
const minMaxDisplay = window.getComputedStyle(minMaxSubmit).display

let minVal, maxVal;
let attempt = 0;

let random = null;

nameSubmit.onclick = () => {
    if (userName.value.length > 0)
    {
        welcomeText.textContent += `, ${userName.value}!`;
        nameInput.style.display = "none";
    }
}

minMaxSubmit.onclick = () => {
    minVal = Number(mini.value);
    maxVal = Number(maxi.value);

    if (mini.value == "" || maxi.value == "") {
        return;
    }

    if (!isNaN(minVal) && !isNaN(maxVal) && minVal < maxVal)
    {
        random = Math.floor(Math.random() * (maxVal - minVal) + minVal);
        minMaxSubmit.style.display = "none";
        guessInput.style.marginTop = "40px";
        output.textContent = "Enter your guess and click check!"
    }
}

check.onclick = () => {
    if (random == null) {
        return;
    }

    let curval = guessInput.value;

    if (curval.trim().length == 0 || isNaN(Number(curval))) {
        return;
    }

    curval = Number(curval);

    if (curval == random || attempt == 10) {
        (() => {
            if (curval == random) {
                output.textContent = `Congratulations! You guessed the correct number ${random}! ${attempt + 1} attempts. Restart to play again.`
            }
            else
                output.textContent = `The correct number is ${random}. Restart to play again.`
            
            check.style.display = "none";
        })();
        return;
    }

    if (curval < random) {
        output.textContent = `Too low, try something higher! ${10 - attempt - 1} attempts left!`;
    }
    else
        output.textContent = `Too high, try something lower! ${10 - attempt - 1} attempts left!`;
    attempt++;
}

restart.onclick = () => {
    random = null;
    mini.value = "";
    maxi.value = "";
    check.style.display = checkDisplay;
    minMaxSubmit.style.display = minMaxDisplay;
    output.textContent = "";
    guessInput.value = "";
    attempt = 0;
}

