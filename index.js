const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2"),
  overlay: document.getElementById("overlay"),
};

const texts = [
  "",
  "",
  "",
  "HANSEI",
  "SEMYEONG",
  "E-SPORTS",
  "LUCKYDRAW",
  "START",
  "",
];
const morphTime = 1;
const cooldownTime = 0.1;

let textIndex = 0;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;
let isAnimating = false;
elts.text1.style.display = "none";
elts.text2.style.display = "none";

function startAnimation() {
  elts.overlay.style.opacity = "1";

  setTimeout(() => {
    elts.text1.style.display = "block";
    elts.text2.style.display = "block";
    isAnimating = true;
    animate();
  }, 3000);
}

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;
  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }
  setMorph(fraction);
}

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;
  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";
  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
  if (!isAnimating) return;
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime.getTime() - time.getTime()) / 1000;
  time = newTime;
  cooldown -= dt;

  if (cooldown <= 0) {
    if (shouldIncrementIndex) textIndex++;

    if (textIndex >= texts.length - 1) {
      elts.text1.textContent = texts[textIndex];
      elts.text2.textContent = texts[textIndex];

      elts.text1.style.opacity = "100%";
      elts.text1.style.filter = "";
      elts.text2.style.opacity = "100%";
      elts.text2.style.filter = "";
      isAnimating = false;
      window.location.href = "https://getwinner.vercel.app/";
    } else {
      doMorph();
    }
  } else {
    doCooldown();
  }
}

document.addEventListener("click", startAnimation);
