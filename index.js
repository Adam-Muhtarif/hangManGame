// letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get letters Array
let lettersArray = Array.from(letters);

// Select letters Container
let lettersContainer = document.querySelector(".letters");

// Generate letters
lettersArray.forEach((letter) => {
  let a = document.createElement("a");
  a.className = "letter";
  let theLetter = document.createTextNode(letter);
  a.appendChild(theLetter);
  lettersContainer.appendChild(a);
});

// Object Of Words And Category's
const words = {
  programming: ["javaScript", "html", "css", "php"],
  people: ["adam", "albert einstein", "alexander", "saytama"],
  anime: ["boku no hero", "naruto", "demon slayer", "parasite"],
  countries: ["somaliland", "somalia", "saudi arabia", "egypt"],
};

// ============= Random =============================
// Get Random Category
let allCategories = Object.keys(words);
let randomCategoryIndex = Math.floor(Math.random() * allCategories.length);
let randomCategory = allCategories[randomCategoryIndex];

// Get Random Value From Random Category
let randomCategoryValue = words[randomCategory];
let randomArrayIndex = Math.floor(Math.random() * randomCategoryValue.length);
let randomArrayValue = randomCategoryValue[randomArrayIndex];
// ==================================================

// Print Random Category + Random Word
// ==========================================================================
document.querySelector(".category span").innerHTML = randomCategory;
// ==========================================================================

// Create Guess Spans Boxes
// ==========================================================================
// Select Guess Section
guessSection = document.querySelector(".guess-section");
// Loop On The Chosen Random Word So We Can Append To Guess Section
randomArrayValue.split("").forEach((letter) => {
  let span = document.createElement("span");
  if (letter === " ") {
    span.className = "space";
  } else {
    span.className = "hasValue";
  }
  guessSection.append(span);
});
// ==========================================================================

//==========================================================================
// Increase When Ever Player Makes Wrong Attempt
let wrongAttempts = 0;
//==========================================================================

// OnClick On Letter
// ====================================================================================
document.querySelectorAll(".letter").forEach((letter) => {
  letter.addEventListener("click", () => {
    let correctAttempts = 0;
    let foundLetter = false;
    letter.classList.add("blocked");
    let clickedLetter = letter.textContent.toLowerCase();
    let chosenWord = randomArrayValue;

    //======================= Call Below Function ===========================
    searchLetterInChosenWord(clickedLetter, Array.from(chosenWord));
    function searchLetterInChosenWord(clickedLetter, arrOfChosenWord) {
      arrOfChosenWord.forEach((letter, letterIndex) => {
        if (letter.toLowerCase() === clickedLetter) {
          foundLetter = true;

          // Set Value To The Span In Guess Section
          document
            .querySelectorAll(".guess-section span")
            .forEach((span, spanIndex, arr) => {
              if (letterIndex === spanIndex) {
                span.innerHTML = letter;
              }
            });
        }
      });
    }
    //=======================================================================

    // Play Sound Correct Or Wrong Depend On If Clicked Letter Inside Chosen Random Word
    // ======================================================================
    if (foundLetter === true) {
      document.getElementById("right").play();
    } else {
      document.getElementById("wrong").play();
      wrongAttempts++;
      document
        .querySelector(".hangman-draw")
        .classList.add(`wrong-${wrongAttempts}`);

      // If WrongAttempts Reach Maximum
      if (wrongAttempts === 11) {
        document.querySelectorAll(".letter").forEach((e) => {
          e.classList.add("blocked");
          setTimeout(() => {
            document.getElementById("fail").play();
            // Looser Popup
          }, 1500);
        });
      }
    }
    // ==================================================================

    // Check Guess Spans If All Span Correct Play Success Sound And End Game
    // ==================================================================
    document.querySelectorAll(".hasValue").forEach((e, i, arr) => {
      if (e.innerHTML) {
        correctAttempts++;
      }
      if (correctAttempts === arr.length) {
        setTimeout(() => {
          document.getElementById("success").play();

          // Winner Popup
        }, 1500);
      }
    });
    // ==================================================================
  });
});
// ====================================================================================
