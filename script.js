let sentences = [];
let currentSlide = 0;
const slider = document.getElementById('slider');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const textInput = document.getElementById('textInput');
const toggleInput = document.getElementById('toggleInput');
const timeDisplay = document.getElementById('time');

// Real-time clock update
function updateClock() {
    const now = new Date();
    timeDisplay.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

setInterval(updateClock, 1000);

// Toggle input visibility
toggleInput.addEventListener('click', () => {
    const inputContainer = document.getElementById('inputContainer');
    if (inputContainer.style.display !== 'none') {
        inputContainer.style.display = 'none';
        toggleInput.textContent = 'Show Input';
    } else {
        inputContainer.style.display = 'block';
        toggleInput.textContent = 'Hide Input';
    }
});

textInput.addEventListener('input', () => {
    sentences = textInput.value.split('\n');
    createSliderItems();
    showSlide(currentSlide);
});

function createSliderItems() {
    slider.innerHTML = '';
    sentences.forEach(sentence => {
        const sliderItem = document.createElement('div');
        sliderItem.classList.add('slider-item');
        sliderItem.textContent = sentence;
        slider.appendChild(sliderItem);
    });
}

function showSlide(index) {
    const items = document.querySelectorAll('.slider-item');
    items.forEach(item => item.style.display = 'none');
    if(items.length > 0) {
        items[index].style.display = 'block';
    }
}

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + sentences.length) % sentences.length;
    showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % sentences.length;
    showSlide(currentSlide);
});
// Add event listener for keyboard arrow keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        // Left arrow key pressed - go to previous slide
        currentSlide = (currentSlide - 1 + sentences.length) % sentences.length;
        showSlide(currentSlide);
    } else if (event.key === 'ArrowRight') {
        // Right arrow key pressed - go to next slide
        currentSlide = (currentSlide + 1) % sentences.length;
        showSlide(currentSlide);
    }
});
// Initialize with default text if needed
// textInput.value = `Default text here...`;
// textInput.dispatchEvent(new Event('input'));

updateClock(); // Set initial time
