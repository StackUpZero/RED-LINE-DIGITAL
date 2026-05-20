// Wait until the page HTML is ready
document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash-screen");

  // Safety check so the page does not break if splash is missing
  if (!splash) return;

  // Keep splash visible for a moment, then fade it out
  setTimeout(() => {
    splash.classList.add("hide");
  }, 2600);
});