import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import { auth } from "./firebase.js";

const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");
const errorMessage = document.getElementById("login-error");
const logoutButton = document.getElementById("logout-button");
const resendVerificationButton = document.getElementById("resend-verification-button");
const userEmail = document.getElementById("user-email");

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await user.reload();

      if (!user.emailVerified) {
        if (errorMessage) {
          errorMessage.textContent = "Please verify your email before entering the client area.";
        }

        await signOut(auth);
        return;
      }

      window.location.href = "client.html";
    } catch (error) {
      console.error("Login failed:", error);

      if (errorMessage) {
        errorMessage.textContent = "Login failed. Check your email and password.";
      }
    }
  });
}

// CLIENT PAGE PROTECTION
onAuthStateChanged(auth, async (user) => {
  const isClientPage = window.location.pathname.includes("client.html");

  if (!isClientPage) return;

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  await user.reload();

  if (!user.emailVerified) {
    await signOut(auth);
    window.location.href = "login.html";
    return;
  }

  if (userEmail) {
    userEmail.textContent = user.email;
  }
});

// RESEND VERIFICATION EMAIL
if (resendVerificationButton) {
  resendVerificationButton.addEventListener("click", async () => {
    const user = auth.currentUser;

    if (!user) {
      if (errorMessage) {
        errorMessage.textContent = "Log in first, then resend verification.";
      }
      return;
    }

    try {
      await sendEmailVerification(user);

      if (errorMessage) {
        errorMessage.textContent = "Verification email sent. Check your inbox.";
      }
    } catch (error) {
      console.error("Could not resend verification:", error);

      if (errorMessage) {
        errorMessage.textContent = "Could not send verification email right now.";
      }
    }
  });
}

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

