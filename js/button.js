const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuClose = document.getElementById('mobileMenuClose');

// Open the mobile menu
mobileMenuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('open');
});

// Close the mobile menu
mobileMenuClose.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
});

document.getElementById("back-button").addEventListener("click", function () {
  console.log("back");
  window.history.back();
});
// document.querySelectorAll(".back-button").addEventListener("click", function () {

//   window.history.back();
// });