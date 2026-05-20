import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import { auth } from "./firebase.js";

const signupForm = document.getElementById("signup-form");
const emailInput = document.getElementById("signup-email");
const passwordInput = document.getElementById("signup-password");
const confirmPasswordInput = document.getElementById("signup-confirm-password");
const signupMessage = document.getElementById("signup-message");

if (signupForm) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    signupMessage.textContent = "";

    if (password !== confirmPassword) {
      signupMessage.textContent = "Passwords do not match.";
      return;
    }

    if (password.length < 6) {
      signupMessage.textContent = "Password must be at least 6 characters.";
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await sendEmailVerification(userCredential.user);

      signupMessage.textContent = "Account created. Check your email verification link before logging in.";

      await signOut(auth);
    } catch (error) {
      console.error("Signup failed:", error);

      if (error.code === "auth/email-already-in-use") {
        signupMessage.textContent = "That email already has an account.";
        return;
      }

      if (error.code === "auth/invalid-email") {
        signupMessage.textContent = "Enter a valid email address.";
        return;
      }

      if (error.code === "auth/weak-password") {
        signupMessage.textContent = "Password is too weak.";
        return;
      }

      signupMessage.textContent = "Signup failed. Try again.";
    }
  });
}