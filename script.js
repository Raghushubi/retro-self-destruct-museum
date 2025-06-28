// Retro loading messages
const loadingMessages = [
    "Connecting to dial-up internet...",
    "Installing Windows 98...",
    "Loading Netscape Navigator...",
    "Defragmenting hard drive...",
    "Calibrating CRT monitor...",
    "Downloading more RAM...",
    "Initializing Y2K protocols...",
    "Loading AOL Trial CD...",
    "Starting Internet Explorer 4.0...",
    "Connecting to Matrix mainframe...",
    "Booting from floppy disk...",
    "Scanning for viruses..."
];

// Audio elements
const startupAudio = document.getElementById('startup-audio');
const loadingAudio = document.getElementById('loading-audio');
const warningAudio = document.getElementById('warning-audio');
const countdownAudio = document.getElementById('countdown-audio');
const explosionAudio = document.getElementById('explosion-audio');

// Set audio volumes to 100%
if (startupAudio) startupAudio.volume = 1.0;
if (loadingAudio) loadingAudio.volume = 1.0;
if (warningAudio) warningAudio.volume = 1.0;
if (countdownAudio) countdownAudio.volume = 1.0;
if (explosionAudio) explosionAudio.volume = 1.0;

// DOM elements
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('progress-bar');
const loadingMessagesEl = document.getElementById('loading-messages');
const warningSection = document.getElementById('self-destruct-warning');
const countdownDisplay = document.getElementById('countdown-display');
const countdownNumber = document.getElementById('countdown-number');
const explosionSection = document.getElementById('explosion-goodbye');
const progressContainer = document.getElementById('progress-container');

// Global variables
let currentProgress = 0;
let messageIndex = 0;
let countdownValue = 10;
let loadingInterval;
let messageInterval;
let countdownInterval;
let audioContext;

// Initialize audio context
function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    return audioContext;
}

// Start the experience with user interaction
function startExperience() {
    console.log("🚀 Starting Retro Self-Destruct Experience...");
    
    // Initialize audio context with user gesture
    if (!audioContext) {
        initAudio();
    }
    
    // Resume audio context if suspended
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    // Hide start screen
    startScreen.style.display = 'none';
    
    // Show loading screen
    loadingScreen.style.display = 'flex';
    
    // Play startup sound first
    if (startupAudio) {
        startupAudio.play().catch(e => console.log("Startup audio error:", e));
    }
    
    // Wait for startup sound to play, then start loading
    setTimeout(() => {
        startLoading();
    }, 2000); // 2 second delay to let startup play
}

// Loading sequence
function startLoading() {
    // Play loading sound
    if (loadingAudio) {
        loadingAudio.loop = true; // Loop the loading sound
        loadingAudio.play().catch(e => console.log("Loading audio error:", e));
    }
    
    // Show progress bar
    progressContainer.style.display = 'block';
    
    // Update progress bar
    loadingInterval = setInterval(() => {
        currentProgress += Math.random() * 15 + 5; // Random progress jumps
        
        if (currentProgress >= 100) {
            currentProgress = 100;
            progressBar.style.width = currentProgress + '%';
            
            // Stop loading audio
            if (loadingAudio) {
                loadingAudio.pause();
                loadingAudio.currentTime = 0;
                loadingAudio.loop = false;
            }
            
            setTimeout(triggerSelfDestruct, 1000); // Wait 1 second then trigger warning
            clearInterval(loadingInterval);
            clearInterval(messageInterval);
        } else {
            progressBar.style.width = currentProgress + '%';
        }
    }, 800); // Update every 800ms
    
    // Update loading messages
    messageInterval = setInterval(() => {
        loadingMessagesEl.innerHTML = loadingMessages[messageIndex];
        messageIndex = (messageIndex + 1) % loadingMessages.length;
    }, 2000); // Change message every 2 seconds
}

// Trigger self-destruct warning
function triggerSelfDestruct() {
    console.log("⚠️ Triggering self-destruct sequence...");
    
    // Hide loading screen
    loadingScreen.style.display = 'none';
    progressContainer.style.display = 'none';
    
    // Show warning
    warningSection.style.display = 'flex';
    
    // Play warning sound
    if (warningAudio) {
        warningAudio.play().catch(e => console.log("Warning audio error:", e));
    }
    
    // Add screen shake effect
    document.body.classList.add('screen-shake');
    
    // Start countdown audio 1 second earlier (2 seconds instead of 3)
    setTimeout(() => {
        if (countdownAudio) {
            countdownAudio.currentTime = 0;
            countdownAudio.play().catch(e => console.log("Countdown audio error:", e));
        }
    }, 3000);
    
    // Start countdown after 3 seconds
    setTimeout(startCountdown, 3000);
}

// Countdown sequence
function startCountdown() {
    console.log("⏰ Starting countdown...");
    
    // Hide warning, show countdown
    warningSection.style.display = 'none';
    countdownDisplay.style.display = 'flex';
    countdownNumber.textContent = countdownValue;
    
    // Remove shake, add glitch
    document.body.classList.remove('screen-shake');
    document.body.classList.add('glitch');
    
    countdownInterval = setInterval(() => {
        countdownValue--;
        countdownNumber.textContent = countdownValue;
        
        // Play countdown beep
        if (countdownAudio) {
            countdownAudio.currentTime = 0; // Reset to start
            countdownAudio.play().catch(e => console.log("Countdown audio error:", e));
        }
        
        // Increase intensity as countdown gets lower
        if (countdownValue <= 5) {
            countdownNumber.style.color = '#ff0040';
            document.body.style.backgroundColor = '#1a0000'; // Dark red tint
        }
        
        if (countdownValue <= 3) {
            countdownNumber.style.fontSize = '18rem';
            document.body.classList.add('screen-shake');
        }
        
        if (countdownValue <= 0) {
            clearInterval(countdownInterval);
            explodeSequence();
        }
    }, 1000); // Every 1 second
}

// Explosion finale
function explodeSequence() {
    console.log("💥 BOOM! Executing explosion sequence...");
    
    // Hide countdown
    countdownDisplay.style.display = 'none';
    
    // Remove all effects
    document.body.classList.remove('glitch', 'screen-shake');
    
    // Play explosion sound
    if (explosionAudio) {
        explosionAudio.play().catch(e => console.log("Explosion audio error:", e));
    }
    
    // Flash effect
    document.body.style.backgroundColor = '#ffffff';
    setTimeout(() => {
        document.body.style.backgroundColor = '#0a0a0a';
        
        // Show explosion message
        explosionSection.style.display = 'flex';
        
        // Add final effects
        setTimeout(() => {
            showFinalMessage();
        }, 2000);
        
    }, 200); // Quick white flash
}

// Final goodbye message
function showFinalMessage() {
    explosionSection.innerHTML = `
        <h1>💥 SYSTEM DESTROYED 💥</h1>
        <p style="font-size: 1.5rem; margin-top: 2rem; color: #00ff41;">
            Thanks for visiting the Retro Self-Destruct Museum!
        </p>
        <p style="font-size: 1rem; margin-top: 1rem; color: #ffb000;">
            Press F5 to experience the chaos again...
        </p>
        <div style="margin-top: 2rem;">
            <button onclick="location.reload()" style="
                background: #00ff41;
                color: #0a0a0a;
                border: none;
                padding: 10px 20px;
                font-family: 'VT323', monospace;
                font-size: 1.2rem;
                cursor: pointer;
                border: 2px solid #00ff41;
                box-shadow: 0 0 20px #00ff41;
            ">RESTART DESTRUCTION</button>
        </div>
    `;
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated!
        alert("🎮 KONAMI CODE ACTIVATED! Extra retro points awarded!");
        document.body.style.filter = 'hue-rotate(180deg)';
        konamiCode = [];
    }
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log("🎮 Retro Self-Destruct Museum Loaded!");
    
    // Add click event to start button
    if (startBtn) {
        startBtn.addEventListener('click', startExperience);
    }
    
    // Hide other sections initially
    if (loadingScreen) loadingScreen.style.display = 'none';
    if (warningSection) warningSection.style.display = 'none';
    if (countdownDisplay) countdownDisplay.style.display = 'none';
    if (explosionSection) explosionSection.style.display = 'none';
});

// Handle visibility change (tab switching)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause audio when tab is hidden
        [startupAudio, loadingAudio, warningAudio, countdownAudio, explosionAudio].forEach(audio => {
            if (audio && !audio.paused) {
                audio.pause();
            }
        });
    }
});