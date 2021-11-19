const TIME_LIMIT = 60;
const TEXT =
  "سعی نکنید همه چیز را بدانید. شما ممکن است خیلی چیزها را دیده و انجام داده باشید، اما لزوما به این معنی نیست که شما می دانید بهترین است. سعی نکنید به مردم بگویید که چگونه می توانند کارها را به شیوه ای بهتر انجام دهند یا اینکه بهتر می توانند کاری انجام دهند.";

let wpmText = document.getElementById("wpm");
let errorText = document.getElementById("errors");
let timerText = document.getElementById("time");
let accuracyText = document.getElementById("accuracy");

let typeText = document.getElementById("type-text");

let textArea = document.getElementById("textarea");

let timeLeft = 0;
let timeElapsed = 0;
let errors = 0;
let accuracy = 0;
let typedCharacter = 0;

let timer = null;
let hasStarted = false;

initializeTest({ timeLimit: TIME_LIMIT, text: TEXT });

// textArea.addEventListener("input", update);
textArea.addEventListener("keydown", update);

function initializeTest({ timeLimit, text }) {
  textArea.value = "";
  timeLeft = timeLimit;
  timerText.innerText = timeLimit;

  text.split("").forEach(character => {
    const newTag = document.createElement("span");
    newTag.innerText = character;
    typeText.appendChild(newTag);
  });
}

function update(e) {
  if (!hasStarted) {
    timer = setInterval(updateTimer, 1000);
    hasStarted = true;
  }
  typedCharacter++;
  updateCharactersStatus(e);
  updateErrors();
  updateAccuracy();
}

function updateCharactersStatus(e) {
  // TODO: Complete this function
  // textArea.value.split("").forEach((character, index) => {
  //   const span = typeText.children[index];
  //   console.log(span, character, index);
  //   // if(character === typeText.children[index].innerText) {
  //   //   typeText.children[index].classList.add("correct-char");
  //   // } else {
  //   //   typeText.children[index].classList.add("incorrect-char");
  //   // }
  // });

  var key = e.keyCode || e.charCode;
  if (key !== 8) { // is backspace
    typedCharacter++;
  }

  const characters = textArea.value.split('');
  [...typeText.children].forEach((char, index) => {
    if(index > characters.length - 1) {
      return;
    }
    let typed = characters[index]
    if (typed === char.innerText) {
      char.classList.remove('incorrect-char');
      char.classList.add('correct-char');
    }
    else if (typed === undefined) {
      char.classList.remove('incorrect-char');
      char.classList.remove('correct-char');
    }
    else {
      char.classList.remove('correct-char');
      char.classList.add('incorrect-char');
      errors++;
    }
  });
}

function updateAccuracy() {
  accuracy = Math.round(
    ((
      (typedCharacter - (errors))
     / typedCharacter) * 100)
  );
  accuracyText.innerText = accuracy;
}

function updateErrors() {
  errorText.innerText = errors;
}

function updateWpm() {
  let wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
  wpmText.innerText = wpm;
}

function updateTimer() {
  if (timeLeft > 0) {
    timeElapsed++;
    timeLeft--;
    timerText.innerText = timeLeft;
  }
  else {
    finishTest();
  }
}

function finishTest() {
  textArea.disabled = true;
  clearInterval(timer);
}
