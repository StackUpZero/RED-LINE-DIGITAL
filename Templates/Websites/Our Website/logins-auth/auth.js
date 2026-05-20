// Import Firebase authentication tools
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Import the Firebase auth connection from firebase.js
import { auth } from "./firebase.js";

// Find login form elements
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");
const errorMessage = document.getElementById("login-error");
const logoutButton = document.getElementById("logout-button");

// LOGIN LOGIC
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (errorMessage) {
      errorMessage.textContent = "";
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Send client to private page after successful login
      window.location.href = "client.html";
    } catch (error) {
      console.error("Login failed:", error);

      if (errorMessage) {
        errorMessage.textContent = "Login failed. Check your email and password.";
      }
    }
  });
}

// PROTECT CLIENT PAGE
onAuthStateChanged(auth, (user) => {
  const isClientPage = window.location.pathname.includes("client.html");

  if (isClientPage && !user) {
    window.location.href = "login.html";
  }
});

// LOGOUT LOGIC
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "login.html";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  });
}