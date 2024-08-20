const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const micBtn = document.getElementById('mic-btn');

const apiKey = "sk-7Q9_9L3UUm0oMrV9rcTOxJ3lLZ6Vd22MWdUB14NkJoT3BlbkFJ1hmdgfOo_UpDFAGCRUfFRlkW8vU2LAC0-SZFdnANYA";  // Replace with your actual API key

// Function to send a query and get a response from ChatGPT
async function getGPTResponse(query) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{"role": "user", "content": query}]
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const answer = data.choices[0].message.content;
        return answer;

    } catch (error) {
        console.error('Detailed Error:', error);
        return `Sorry, something went wrong: ${error.message}`;
    }
}

// Function to handle sending the message
async function sendMessage() {
    const message = userInput.value;
    if (message.trim() === "") return;

    appendMessage("You: " + message);
    userInput.value = '';

    const gptResponse = await getGPTResponse(message);
    appendMessage("GPT: " + gptResponse);
}

// Function to append a message to the chat box
function appendMessage(message) {
    const p = document.createElement('p');
    p.textContent = message;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Event listener for the send button
sendBtn.addEventListener('click', sendMessage);

// Speech Recognition API for microphone input
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
    micBtn.textContent = "🎙️ Listening...";
};

recognition.onspeechend = function() {
    recognition.stop();
    micBtn.textContent = "🎤 Start Speaking";
};

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
    sendMessage();  // Automatically send the recognized speech as a message
};

// Event listener for the microphone button
micBtn.addEventListener('click', () => {
    recognition.start();
});

// Allow sending the message by pressing Enter
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

