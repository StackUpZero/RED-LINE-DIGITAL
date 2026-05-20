const passwordInput = document.getElementById("login-password");
const showPasswordBtn = document.getElementById("show-password");

if (passwordInput && showPasswordBtn) {
  showPasswordBtn.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    passwordInput.type = "text";
  });

  showPasswordBtn.addEventListener("pointerup", () => {
    passwordInput.type = "password";
  });

  showPasswordBtn.addEventListener("pointerleave", () => {
    passwordInput.type = "password";
  });

  showPasswordBtn.addEventListener("pointercancel", () => {
    passwordInput.type = "password";
  });
}

document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("login-password");
    const showPasswordBtn = document.getElementById("show-password");
  
    if (!passwordInput || !showPasswordBtn) {
      console.log("Password input or VIEW button not found");
      return;
    }
  
    function showPassword(event) {
      event.preventDefault();
      passwordInput.setAttribute("type", "text");
    }
  
    function hidePassword() {
      passwordInput.setAttribute("type", "password");
    }
  
    showPasswordBtn.addEventListener("mousedown", showPassword);
    showPasswordBtn.addEventListener("mouseup", hidePassword);
    showPasswordBtn.addEventListener("mouseleave", hidePassword);
  
    showPasswordBtn.addEventListener("touchstart", showPassword);
    showPasswordBtn.addEventListener("touchend", hidePassword);
    showPasswordBtn.addEventListener("touchcancel", hidePassword);
  });