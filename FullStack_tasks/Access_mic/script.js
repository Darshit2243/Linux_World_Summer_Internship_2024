// Check for browser compatibility
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if ('SpeechRecognition' in window) {
    console.log('Speech Recognition is supported by this browser.');

    // Create a new instance of SpeechRecognition
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Set the language
    recognition.interimResults = false; // Show interim results
    recognition.maxAlternatives = 1; // Maximum number of alternatives

    // Select DOM elements
    const startBtn = document.getElementById('start-btn');
    const resultArea = document.getElementById('result');

    // Start recognition on button click
    startBtn.addEventListener('click', () => {
        recognition.start();
        console.log('Speech recognition started...');
    });

    // Handle recognition result
    recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript;
        resultArea.value = transcript; // Display the recognized text in the textarea
        console.log('Speech recognized: ', transcript);
    });

    // Handle recognition end
    recognition.addEventListener('end', () => {
        console.log('Speech recognition ended.');
    });

    // Handle recognition errors
    recognition.addEventListener('error', (event) => {
        console.error('Speech recognition error: ', event.error);
    });

} else {
    console.error('Speech Recognition is not supported by this browser.');
}
