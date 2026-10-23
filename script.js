const birthdayCopy = {
  headerNote: "A little celebration, just for you",
  heroEyebrow: "Today is all about you",
  heroHeadline: "Happy birthday",
  recipient: "reine",
  heroIntro:
    "Here’s to a day filled with all the little things that make you smile, and a year full of wonderful surprises.",
  wishButtonLabel: "Make a birthday wish",
  wishHint: "Go on — the candles are waiting.",
  messageLabel: "A note from the heart",
  messageHeading: "A little note for your big day",
  letterDate: "With love, today and always",
  letterGreeting: "Dear",
  letterBody:
    "I hope your year ahead like the sun brings you laughter that lingers, people who make you feel at home, and plenty of reasons to celebrate. You make the world a brighter place just by being you. Today, I hope some of that brightness finds its way back to you.",
  signoff: "Wishing you the loveliest birthday,",
  joyLabel: "The good things",
  joyHeading: "Wishing you more of what you love",
  joyIntro: "May the year ahead bring a little extra of everything that makes life lovely.",
  joyOne: "Sunshine-filled mornings",
  joyTwo: "Little moments worth remembering",
  joyThree: "People who make you feel loved",
  joyFour: "More reasons to dance",
  celebrateEyebrow: "One more thing",
  celebrateHeading: " i love you and i hope your birthday is as wonderful as you are.",
  celebrateCopy:
    "So take a deep breath, make a wish, and let today be every bit as wonderful as you are.",
  celebrateButtonLabel: "Celebrate again",
  footerLead: "Made with love for",
  footer: "and all the joy you bring.",
  dialogEyebrow: "A wish for you",
  dialogHeading: "May your wish come true",
  dialogCopy:
    "Here’s to a year filled with happy surprises, big-hearted laughter, and all the things you’ve been wishing for.",
  dialogButtonLabel: "Thank you!"
};

document.querySelectorAll("[data-config]").forEach((element) => {
  const key = element.dataset.config;
  const value = birthdayCopy[key];

  if (value !== undefined) {
    element.textContent = value;
  }
});

const wishDialog = document.querySelector("#wishDialog");
const wishButton = document.querySelector("#wishButton");
const closeDialog = document.querySelector("#closeDialog");
const closeDialogButton = document.querySelector("#closeDialogButton");
const celebrateAgain = document.querySelector("#celebrateAgain");
const celebrationStatus = document.querySelector("#celebrationStatus");
const confettiCanvas = document.querySelector("#confettiCanvas");
const context = confettiCanvas.getContext("2d");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let confetti = [];
let animationFrame = 0;

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  confettiCanvas.width = Math.floor(window.innerWidth * pixelRatio);
  confettiCanvas.height = Math.floor(window.innerHeight * pixelRatio);
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function drawConfetti() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  confetti = confetti.filter((piece) => piece.y < window.innerHeight + 20);

  confetti.forEach((piece) => {
    piece.x += piece.speedX;
    piece.y += piece.speedY;
    piece.rotation += piece.rotationSpeed;
    piece.speedY += 0.035;

    context.save();
    context.translate(piece.x, piece.y);
    context.rotate(piece.rotation);
    context.fillStyle = piece.color;
    context.fillRect(-piece.size / 2, -piece.size / 3, piece.size, piece.size * 0.65);
    context.restore();
  });

  if (confetti.length > 0) {
    animationFrame = window.requestAnimationFrame(drawConfetti);
  } else {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    animationFrame = 0;
  }
}

function celebrate() {
  celebrationStatus.textContent = "Birthday confetti! Wishing you a very happy birthday.";

  if (reducedMotion.matches) {
    return;
  }

  window.cancelAnimationFrame(animationFrame);
  resizeCanvas();

  const colors = ["#f16e62", "#f7d982", "#a9b997", "#e8a1a8", "#fffaf1"];
  confetti = Array.from({ length: 100 }, () => ({
    x: Math.random() * window.innerWidth,
    y: -Math.random() * window.innerHeight * 0.45,
    size: 5 + Math.random() * 7,
    speedX: (Math.random() - 0.5) * 2.8,
    speedY: 1.7 + Math.random() * 2.5,
    rotation: Math.random() * Math.PI,
    rotationSpeed: (Math.random() - 0.5) * 0.12,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  if (animationFrame === 0) {
    animationFrame = window.requestAnimationFrame(drawConfetti);
  }
}

wishButton.addEventListener("click", () => {
  wishDialog.showModal();
  celebrate();
});

function dismissWish() {
  wishDialog.close();
}

closeDialog.addEventListener("click", dismissWish);
closeDialogButton.addEventListener("click", dismissWish);
celebrateAgain.addEventListener("click", celebrate);

wishDialog.addEventListener("click", (event) => {
  if (event.target === wishDialog) {
    dismissWish();
  }
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
