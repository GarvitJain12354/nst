const backButton = document.createElement("button");
backButton.textContent = "Back";
backButton.style.position = "absolute";
backButton.style.top = "10px";
backButton.style.right = "10px";
backButton.style.padding = "10px 20px";
backButton.style.fontSize = "16px";
backButton.style.backgroundColor = "#ff5733";
backButton.style.color = "white";
backButton.style.border = "none";
backButton.style.borderRadius = "5px";
backButton.style.cursor = "pointer";
backButton.style.zIndex = "1000"; // Ensure it appears on top of the AR scene

document.body.appendChild(backButton);

// Back button click event
backButton.addEventListener("click", () => {
  // Exit XR session if active
  if (renderer.xr.getSession()) {
    renderer.xr.getSession().end();
  }
  // Navigate back to the previous page or perform custom action
  window.history.back(); // Or replace with window.location.href = 'your-url';
});