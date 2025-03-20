

function updateImageBasedOnTheme() {
	const theme = localStorage.getItem('theme'); // Retrieve theme from local storage
	const image = document.getElementById('logo-img');

	if (theme === 'light') {
		// If the theme is light, make the image black
		image.classList.add('darken-image');
	} else {
		// Do nothing for dark theme
		image.classList.remove('darken-image');
	}
}

// Run the function on page load
window.onload = updateImageBasedOnTheme;
