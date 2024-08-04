// tracking cards count
let clickedCardCount = 0;
let card1 = null;
let card2 = null;

// create array of all imgs
function createArray(elements, emptyArr) {
  for (let i = 0; i < elements.length; i++) {
    emptyArr.push(elements[i]);
    elements[i].classList.add("hidden");
  }
}

// function: random order of cards
function shuffleArray(arr) {
  for (let currentIndex = arr.length - 1; currentIndex > 0; currentIndex--) {
    let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    let swap = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = swap;
  }
}
// function: flip card on click
function flipCards(img) {
  if (clickedCardCount === 2 || !img.classList.contains("hidden")) return;
  img.setAttribute("src", img.getAttribute("data-image"));
  img.classList.remove("hidden");
  clickedCardCount++;
  if (clickedCardCount === 1) {
    card1 = img;
  } else if (clickedCardCount === 2) {
    card2 = img;
    setTimeout(() => compareCards(card1, card2), 1000); // Delay comparison to allow user to see both cards
  }
}

// function: reset counter and img1,img2
function resetGameState() {
  clickedCardCount = 0;
  card1 = null;
  card2 = null;
}
// function: compare cards
function compareCards(img1, img2) {
  if (img1.getAttribute("data-image") === img2.getAttribute("data-image")) {
    // Cards match
    resetGameState();
  } else {
    // Cards do not match
    img1.setAttribute("src", "./imgs/placeholder.png");
    img1.classList.add("hidden");
    img2.setAttribute("src", "./imgs/placeholder.png");
    img2.classList.add("hidden");
    resetGameState();
  }
}

// function: initiate game
function initiateGame() {
  let animalImgs = Array.from(document.getElementsByClassName("animal_img"));
  const animalImgsArr = [];
  createArray(animalImgs, animalImgsArr);
  shuffleArray(animalImgsArr);

  // Reorder the images in the DOM according to the shuffled array
  const container = document.querySelector(".animal_cards-wrapper");
  animalImgsArr.forEach((img) => {
    container.appendChild(img.parentElement); // Reorder figure elements
  });

  // Set up event listeners for each image
  animalImgs.forEach((img) => {
    img.addEventListener("click", function () {
      flipCards(img);
    });
  });
}

window.onload = initiateGame;
