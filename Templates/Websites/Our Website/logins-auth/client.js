import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import { auth, db } from "./firebase.js";

const clientName = document.getElementById("client-name");
const clientProject = document.getElementById("client-project");
const clientStatus = document.getElementById("client-status");
const clientNextStep = document.getElementById("client-next-step");
const clientMessage = document.getElementById("client-message");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  await user.reload();

  if (!user.emailVerified) {
    window.location.href = "login.html";
    return;
  }

  try {
    const clientDocRef = doc(db, "clients", user.uid);
    const clientDocSnap = await getDoc(clientDocRef);

    if (!clientDocSnap.exists()) {
      if (clientMessage) {
        clientMessage.textContent = "No client project data found for this account yet.";
      }
      return;
    }

    const clientData = clientDocSnap.data();

    if (clientName) {
      clientName.textContent = clientData.name || "Client";
    }

    if (clientProject) {
      clientProject.textContent = clientData.project || "No project set";
    }

    if (clientStatus) {
      clientStatus.textContent = clientData.status || "No status set";
    }

    if (clientNextStep) {
      clientNextStep.textContent = clientData.nextStep || "No next step set";
    }

    if (clientMessage) {
      clientMessage.textContent = "Client data loaded successfully.";
    }
  } catch (error) {
    console.error("Could not load client data:", error);

    if (clientMessage) {
      clientMessage.textContent = "Could not load client data. Check Firestore rules and document ID.";
    }
  }
});