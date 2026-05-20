const loginForm = document.querySelector(".login-form");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const button = loginForm.querySelector("button");
    const originalText = button.textContent;

    button.textContent = "Checking access...";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = "Demo login only";
    }, 900);

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 2200);
  });
}