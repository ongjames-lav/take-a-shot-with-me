// Add event listener for the start button
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const pageContent = document.querySelector('.page-content'); // Get the page content div
    
    if (startButton && pageContent) {
        startButton.addEventListener('click', function() {
            pageContent.classList.add('fade-out'); // Add fade-out class
            // Wait for the transition to finish before navigating
            pageContent.addEventListener('transitionend', function() {
                window.location.href = 'photobooth.html';
            });
        });
    }
});
 
// Add more JavaScript functionality here as needed 