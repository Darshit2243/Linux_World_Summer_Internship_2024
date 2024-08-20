// Select DOM elements
const video = document.getElementById('video');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const recordBtn = document.getElementById('record-btn');
const downloadBtn = document.getElementById('download-btn');
const recordingIcon = document.getElementById('recording-icon');
const soundIcon = document.getElementById('sound-icon');
const muteIcon = document.getElementById('mute-icon');

let mediaStream = null;
let mediaRecorder = null;
let recordedChunks = [];
let audioTrack = null;
let isMuted = false;

// Function to start the video stream
function startStream() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            mediaStream = stream;
            video.srcObject = stream;
            startBtn.disabled = true;
            stopBtn.disabled = false;
            recordBtn.disabled = false;
            
            // Extract audio track
            audioTrack = stream.getAudioTracks()[0];
            soundIcon.style.display = 'block'; // Show sound icon
        })
        .catch(error => {
            console.error('Error accessing the camera and microphone: ', error);
        });
}

// Function to stop the video stream
function stopStream() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        mediaStream = null;
        audioTrack = null;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        recordBtn.disabled = true;
        downloadBtn.style.display = 'none';
        recordingIcon.style.display = 'none'; // Hide recording icon
        soundIcon.style.display = 'none'; // Hide sound icon
        muteIcon.style.display = 'none'; // Hide mute icon
    }
}

// Function to start recording
function startRecording() {
    if (mediaStream) {
        mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            recordedChunks = [];
            const url = URL.createObjectURL(blob);
            
            // Create a temporary link and trigger the download
            const a = document.createElement('a');
            a.href = url;
            a.download = 'recording.webm';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            downloadBtn.style.display = 'none'; // Hide download button
        };
        mediaRecorder.start();
        recordingIcon.style.display = 'block'; // Show recording icon
        recordBtn.textContent = 'Stop Recording';
        recordBtn.removeEventListener('click', startRecording);
        recordBtn.addEventListener('click', stopRecording);
    }
}

// Function to stop recording
function stopRecording() {
    if (mediaRecorder) {
        mediaRecorder.stop();
        recordingIcon.style.display = 'none'; // Hide recording icon
        recordBtn.textContent = 'Start Recording';
        recordBtn.removeEventListener('click', stopRecording);
        recordBtn.addEventListener('click', startRecording);
    }
}

// Function to toggle mute
function toggleMute() {
    if (audioTrack) {
        isMuted = !isMuted;
        audioTrack.enabled = !isMuted;
        muteIcon.style.display = isMuted ? 'block' : 'none'; // Show/hide mute icon
    }
}

// Event listeners for buttons
startBtn.addEventListener('click', startStream);
stopBtn.addEventListener('click', stopStream);
recordBtn.addEventListener('click', startRecording);

// Event listener for mute toggle (clicking the mute icon)
muteIcon.addEventListener('click', toggleMute);
