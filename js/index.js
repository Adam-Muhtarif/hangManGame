// ============================================================
// letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get letters Array
let lettersArray = Array.from(letters);

// Select letters Container
let lettersContainer = document.querySelector(".letters");
// ============================================================

// Generate letters
// ============================================================
lettersArray.forEach((letter) => {
  let a = document.createElement("a");
  a.className = "letter";
  let theLetter = document.createTextNode(letter);
  a.appendChild(theLetter);
  lettersContainer.appendChild(a);
});
// ============================================================

// Important variables for celebrating / fail Popup
// ============================================================
let howManyWrongs = 0;
let howManyCorrects = 0;
// ============================================================

// Fetch Words From Json File Or Any Api You Want
// ============================================================================================
getData("json/words.json");
async function getData(link) {
  try {
    let data = await fetch(link);
    let words = await data.json();

    // Get Random Category
    // ================================================
    let allCategories = Object.keys(words);
    let randomCategoryIndex = Math.floor(Math.random() * allCategories.length);
    let randomCategory = allCategories[randomCategoryIndex];
    // ================================================

    // Get Random Value From Random Category
    // ==================================================
    let randomCategoryValue = words[randomCategory];
    let randomArrayIndex = Math.floor(
      Math.random() * randomCategoryValue.length
    );
    let randomArrayValue = randomCategoryValue[randomArrayIndex];
    // ==================================================

    // Print Random Category + Random Word
    // ==========================================================================
    document.querySelector(".category span").innerHTML = randomCategory;
    // ==========================================================================

    // Create Guess Spans Boxes
    // Loop On The Chosen Random Word So We Can Append To Guess Section
    // ==========================================================================
    randomArrayValue.split("").forEach((letter) => {
      let span = document.createElement("span");
      if (letter === " ") {
        span.className = "space";
      } else {
        span.className = "hasValue";
      }
      document.querySelector(".guess-section").append(span);
    });
    // ==========================================================================

    // Increase When Ever Player Makes Wrong Attempt
    //==========================================================================
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

        // Search Function Letter In Chosen Word
        //=======================================================================
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

        // Play Wright Sound If We Found The Letter
        // Play Wrong Sound If We Found The Letter And Add Class To The Parent Element
        // ======================================================================
        if (foundLetter === true) {
          document.getElementById("right").play();
        } else {
          document.getElementById("wrong").play();

          wrongAttempts++;
          howManyWrongs = wrongAttempts;

          document
            .querySelector(".hangman-draw")
            .classList.add(`wrong-${wrongAttempts}`);
          // ==================================================================

          // If Wrong Attempts Reach Maximum
          // ==================================================================
          if (wrongAttempts === 11) {
            blockLetters(document.querySelectorAll(".letter"));
            setTimeout(() => {
              document.getElementById("fail").play();
              // Looser Popup
              fail();
            }, 1500);
          }
        }
        // ==================================================================

        // Check Guess Spans If All Span Are Correct Play Success Sound And End Game
        // ==================================================================
        document.querySelectorAll(".hasValue").forEach((e, i, arr) => {
          if (e.innerHTML) {
            correctAttempts++;
            howManyCorrects = correctAttempts;
          }

          if (correctAttempts === arr.length) {
            blockLetters(document.querySelectorAll(".letter"));

            setTimeout(() => {
              document.getElementById("success").play();
              // Start Celebration Canvas
              startConfetti();
              // Stop Celebration Canvas
              setTimeout(() => {
                stopConfetti();
              }, 1500);

              // Winner Popup
              celebrate();
            }, 1500);
          }
        });
        // ==================================================================
      });
    });
    // ====================================================================================

    // Block All Letters Function
    // ====================================================================================
    function blockLetters(letters) {
      letters.forEach((letter) => {
        letter.classList.add("blocked");
      });
    }
    // ====================================================================================
  } catch (reason) {
    console.log(reason);
  }
}
// ============================================================================================


// Popups
// ============================================================================================
// Celebration Popup
function celebrate() {
  Swal.fire({
    title: "You Win The Game",
    text: "Good Job",
    imageUrl: "images/celebrate.gif",
    imageWidth: 150,
    imageHeight: 150,
    imageAlt: "Custom image",
    footer: `
    You made "<span class="wrongNumbers"> ${howManyWrongs} </span>" Wrong Attempts,
    And "<span class="correctNumbers"> ${howManyCorrects} </span>" Correct Attempts
    `,
  });
}

// Fail Popup
function fail() {
  Swal.fire({
    title: "You Lost The Game",
    text: "You Piece Of Shit",
    imageUrl: "images/fail.gif",
    imageWidth: 150,
    imageHeight: 150,
    imageAlt: "Custom image",
    footer: `
    You made "<span class="wrongNumbers"> ${howManyWrongs} </span>" Wrong Attempts,
    And "<span class="correctNumbers"> ${howManyCorrects} </span>" Correct Attempts
    `,
  });
}
// ============================================================================================



