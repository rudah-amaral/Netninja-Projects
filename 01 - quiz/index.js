const correctAnswers = ["B", "B", "B", "B"];
const result = document.querySelector(".result");
const form = document.querySelector(".quiz-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let score = 0;
  const userAnswers = [];

  for (let i = 0; i <= 3; i++) {
    userAnswers[i] = form["q" + (i + 1)].value;
  }

  userAnswers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score += 25;
    }
  });

  scrollTo(0, 0);
  result.classList.remove("d-none");

  let increasingScore = 0;
  const timer = setInterval(() => {
    if (increasingScore > score) {
      clearInterval(timer);
    }

    result.querySelector("span").innerText = `${increasingScore}%`;
    increasingScore++;
  }, 10);
});
