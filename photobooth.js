// This file is for photobooth-specific JavaScript.

const cameraFeed = document.getElementById('cameraFeed');
const photoCanvas = document.getElementById('photoCanvas');
const countdownElement = document.getElementById('countdown');
const takeButton = document.getElementById('takeButton');
const retakeButton = document.getElementById('retakeButton');
const continueButton = document.getElementById('continueButton');
const previewFrames = document.querySelectorAll('.preview-frame');
const resetButton = document.getElementById('resetButton');
const pageContent = document.querySelector('.page-content');
const backButton = document.getElementById('backButton');

let stream = null;
let photosTaken = 0;
let isAutoCapturing = false;
let countdownTimer = null;

// Function to access the camera
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraFeed.srcObject = stream;
        cameraFeed.style.display = 'block';
        photoCanvas.style.display = 'none';
        countdownElement.style.display = 'none';
        takeButton.disabled = false;
        retakeButton.disabled = true;
        continueButton.disabled = true;
        isAutoCapturing = false;
        photosTaken = 0; // Reset photos taken when starting camera
    } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Could not access the camera. Please make sure you have a camera connected and have granted permissions.');
        takeButton.disabled = true;
    }
}

// Function to stop the camera
function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }
}

// Function to start the countdown and take photo
function startCountdown() {
    if (countdownTimer) {
        clearInterval(countdownTimer);
    }

    let count = 5;
    countdownElement.textContent = count;
    countdownElement.style.display = 'block';
    cameraFeed.style.display = 'block';
    photoCanvas.style.display = 'none';
    takeButton.disabled = true;

    countdownTimer = setInterval(() => {
        count--;
        countdownElement.textContent = count;

        if (count <= 0) {
            clearInterval(countdownTimer);
            countdownTimer = null;
            countdownElement.style.display = 'none';
            capturePhoto();
        }
    }, 1000);
}

// Function to capture the photo
function capturePhoto() {
    if (photosTaken >= 4) {
        isAutoCapturing = false;
        return;
    }

    const context = photoCanvas.getContext('2d');
    photoCanvas.width = cameraFeed.videoWidth;
    photoCanvas.height = cameraFeed.videoHeight;
    context.drawImage(cameraFeed, 0, 0, photoCanvas.width, photoCanvas.height);

    cameraFeed.style.display = 'none';
    photoCanvas.style.display = 'block';

    if (previewFrames[photosTaken]) {
        previewFrames[photosTaken].innerHTML = '';
        const img = document.createElement('img');
        img.src = photoCanvas.toDataURL('image/png');
        img.alt = `Photo ${photosTaken + 1}`;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '10px';
        previewFrames[photosTaken].appendChild(img);
        photosTaken++;
    }

    // Update button states
    retakeButton.disabled = false;

    if (photosTaken >= 4) {
        isAutoCapturing = false;
        takeButton.disabled = true;
        continueButton.disabled = false;
    } else if (isAutoCapturing) {
        // If we're still auto-capturing, start the next countdown after a short delay
        setTimeout(() => {
            startCountdown();
        }, 1000);
    } else {
        takeButton.disabled = false;
    }
}

// Function to start auto-capture sequence
function startAutoCapture() {
    if (photosTaken >= 4 || isAutoCapturing) return;
    
    isAutoCapturing = true;
    takeButton.disabled = true;
    retakeButton.disabled = true;
    continueButton.disabled = true;
    startCountdown();
}

// Function to retake the last photo
function retakePhoto() {
    if (photosTaken > 0) {
        if (countdownTimer) {
            clearInterval(countdownTimer);
            countdownTimer = null;
        }
        photosTaken--;
        isAutoCapturing = false;
        if (previewFrames[photosTaken]) {
            previewFrames[photosTaken].innerHTML = '';
        }
        startCamera();
        continueButton.disabled = true;
        retakeButton.disabled = photosTaken === 0;
        takeButton.disabled = false;
    }
}

// Function to handle continue button click
function continueFlow() {
    // Here you would navigate to the next page, e.g., a photo editing page
    alert('Proceeding to photo design!'); // Placeholder
    // window.location.href = 'design_page.html'; // Example navigation
}

// Function to reset the photobooth
function resetPhotobooth() {
    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }
    photosTaken = 0;
    isAutoCapturing = false;
    previewFrames.forEach(frame => {
        frame.innerHTML = '';
    });
    startCamera();
    takeButton.disabled = false;
    retakeButton.disabled = true;
    continueButton.disabled = true;
}

// Event Listeners
takeButton.addEventListener('click', startAutoCapture);
retakeButton.addEventListener('click', retakePhoto);
continueButton.addEventListener('click', continueFlow);
resetButton.addEventListener('click', resetPhotobooth);

// Add back button event listener
backButton.addEventListener('click', function() {
    stopCamera();
    if (pageContent) {
        pageContent.classList.add('fade-out');
        pageContent.addEventListener('transitionend', function() {
            window.location.href = 'index.html';
        }, { once: true });
    } else {
        window.location.href = 'index.html';
    }
});

// Start camera and fade in page when the page loads
window.onload = function() {
    if (pageContent) {
        pageContent.classList.add('fade-in');
    }
    startCamera();
};

// Stop camera when navigating away
window.addEventListener('beforeunload', stopCamera); 