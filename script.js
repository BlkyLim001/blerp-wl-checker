// script.js - Complete Logic for Miden Community Portal

// --- 1. GLOBAL STATE & METADATA ---
const SUPPORTER_CARD_DATA = {
    r: '---', 
    h: 'BLERP_USER',
    s: 'N/A', 
    rarity: 'VERIFIED',
    title: 'A true Midener now'
};

let isAuthenticated = false;
let currentUsername = '';

// --- 2. GLOBAL STAGE MANAGEMENT ---

window.handlePortalStageSwitch = function(stageId) {
    document.querySelectorAll('.portal-stage').forEach(stage => {
        stage.classList.remove('active-stage');
    });

    const activeStage = document.getElementById(`stage-${stageId}`);
    if (activeStage) {
        activeStage.classList.add('active-stage');
    }

    document.querySelectorAll('#main-nav .nav-links a, #mobile-nav-drawer a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-stage') === stageId) {
            link.classList.add('active');
        }
    });

    if(stageId === 'card-generator') {
        resetFlow();
    } else if (stageId === 'word-game') {
        resetGame();
    }
}

window.toggleMobileMenu = function() {
    const drawer = document.getElementById('mobile-nav-drawer');
    drawer.classList.toggle('open');
}

function resetFlow() {
    document.getElementById('handle-input').value = '';
    document.getElementById('pfp-status').textContent = 'No file selected.';
    document.getElementById('pfp-label').textContent = 'Click to Upload PFP (PNG/JPG)';
    document.getElementById('user-pfp').src = ''; 
    document.getElementById('pfp-input').value = null; 
    
    document.querySelectorAll('#stage-card-generator .stage-container').forEach(el => el.style.display = 'none');
    document.getElementById('stage-input').style.display = 'block';
}

// --- 3. CARD GENERATOR LOGIC ---

window.checkAvailability = function() {
    const inputRaw = document.getElementById('handle-input').value;
    const inputHandle = inputRaw.trim().replace('@', '');
    const msg = document.getElementById('message-area');

    if (!inputHandle) {
        msg.innerHTML = '<span style="color: #ffaa00;">Please enter your handle before claiming.</span>';
        return;
    }

    const cardData = { ...SUPPORTER_CARD_DATA, h: inputHandle };
    claimCard(cardData);
}

window.claimCard = function(data) {
    document.getElementById('card-handle').innerText = `@${data.h}`;
    const pfpElement = document.getElementById('user-pfp'); 
    const uploadedPfpSrc = pfpElement.src;

    if (!uploadedPfpSrc || !uploadedPfpSrc.startsWith('data:')) {
        pfpElement.src = 'https://via.placeholder.com/180/5e5e5e/ffffff?text=MIDEN+PFP'; 
    }
    pfpElement.onerror = () => { pfpElement.src = 'https://via.placeholder.com/180/5e5e5e/ffffff?text=PFP+Error'; };
    pfpElement.style.display = 'block';

    document.getElementById('card-rank').innerText = '#' + data.r;
    document.getElementById('card-score').innerText = data.s;
    document.getElementById('card-desc').innerText = data.title;
    
    const footer = document.getElementById('card-footer');
    const rarityText = document.getElementById('card-rarity');
    
    footer.className = 'card-footer'; 
    footer.classList.add('rarity-' + data.rarity);
    rarityText.innerText = data.rarity.replace('_', ' ') + ' PROVER'; 
    
    const tweetText = `I just claimed my Miden ${data.rarity.replace('_', ' ')} Prover Card! Get yours at blerp.site`;
    document.getElementById('share-link').href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

    document.querySelectorAll('#stage-card-generator .stage-container').forEach(el => el.style.display = 'none');
    document.getElementById('stage-card-display').style.display = 'block';
}

window.downloadCard = function() {
    const cardElement = document.getElementById('prover-card'); 
    const btn = document.querySelector('.download-btn');
    const pfpImage = document.getElementById('user-pfp');

    btn.innerText = "GENERATING...";
    
    const captureAndDownload = () => {
        html2canvas(cardElement, {
            scale: 3, backgroundColor: null, useCORS: true 
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `Miden_Card_${document.getElementById('card-handle').innerText}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            btn.innerText = "DOWNLOAD CARD (PNG)";
        }).catch(err => {
            console.error("Error generating card:", err);
            alert("Error generating card. Check the console for details.");
            btn.innerText = "DOWNLOAD CARD (PNG)";
        });
    };

    if (pfpImage.complete) {
        captureAndDownload();
    } else {
        pfpImage.onload = captureAndDownload;
        pfpImage.onerror = captureAndDownload; 
    }
}

// --- 4. MIDEN WORD GAME LOGIC (PRIVACY FOCUSED) ---

const WORD_LIST = [
    { word: "PRIVACY", hint: "The right to keep your data secret." },
    { word: "STARK", hint: "Scalable Transparent Argument of Knowledge." },
    { word: "ZK", hint: "Short for Zero-Knowledge." },
    { word: "NULLIFIER", hint: "Mechanism to prevent double-spending in private transactions." },
    { word: "WITNESS", hint: "Private data used to generate a proof, not revealed to verifier." },
    { word: "CIRCUIT", hint: "The arithmetic path data takes in a ZK proof." },
    { word: "COMMITMENT", hint: "Hiding a value while cryptographically binding to it." },
    { word: "SHIELDED", hint: "A type of transaction where sender, receiver, and amount are hidden." },
    { word: "MIXER", hint: "A tool used to obscure transaction history." },
    { word: "ANONYMITY", hint: "The state of being unidentifiable within a set." },
    { word: "ENCRYPTION", hint: "Encoding data so only authorized parties can read it." },
    { word: "HASH", hint: "A one-way function crucial for commitments and trees." },
    { word: "MERKLE", hint: "Tree structure used to prove set membership efficiently." },
    { word: "TRUSTLESS", hint: "Operating without need for a central authority." },
    { word: "VERIFIER", hint: "The party that checks the proof without seeing the data." },
    { word: "PROVER", hint: "The party that generates the proof using private data." },
    { word: "NONCE", hint: "A number used only once to prevent replay attacks." },
    { word: "SALT", hint: "Random data added to inputs to ensure uniqueness." },
    { word: "FUNGIBLE", hint: "Assets that are interchangeable; privacy protects this property." },
    { word: "DECOY", hint: "Fake inputs used in ring signatures to hide the real one." }
];

let currentWord = '';
let currentScore = 0;
let timer;
const TIME_LIMIT = 20; 
const CORRECT_SCORE = 5; 
const WRONG_PENALTY = 2; 

function shuffleWord(word) {
    let array = word.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join(' ');
}

function updateGameDisplay(scrambled, hint, message, score = currentScore, time = TIME_LIMIT) {
    document.getElementById('scrambled-word').innerText = scrambled;
    document.getElementById('game-word-hint').innerText = `Hint: ${hint}`;
    document.getElementById('game-message').innerText = message;
    
    const scoreEl = document.getElementById('score-display');
    if (scoreEl) scoreEl.querySelector('b').innerText = score;
    
    const timerEl = document.getElementById('timer-display');
    if (timerEl) timerEl.querySelector('b').innerText = `${time}s`;
}

window.resetGame = function() {
    clearInterval(timer);
    currentScore = 0;
    currentWord = '';
    
    const guessInput = document.getElementById('word-guess-input');
    if (guessInput) {
        guessInput.value = '';
        guessInput.disabled = true;
    }
    
    const startGameBtn = document.getElementById('start-game-btn');
    if (startGameBtn) {
        startGameBtn.style.display = 'block';
        startGameBtn.innerText = 'START GAME';
    }
    
    const nextWordBtn = document.getElementById('next-word-btn');
    if (nextWordBtn) nextWordBtn.style.display = 'none';
    
    updateGameDisplay("P R I V A C Y", "Let's test your ZK knowledge!", "Click START GAME to begin!", 0, TIME_LIMIT);
    
    const messageEl = document.getElementById('game-message');
    if (messageEl) messageEl.classList.remove('message-success', 'message-error');
}

window.startTimer = function() {
    let timeLeft = TIME_LIMIT;
    const timerDisplay = document.getElementById('timer-display').querySelector('b');
    if (timerDisplay) timerDisplay.innerText = `${timeLeft}s`;
    
    timer = setInterval(() => {
        timeLeft--;
        if (timerDisplay) timerDisplay.innerText = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

window.nextWord = function() {
    clearInterval(timer);
    startTimer();
    
    document.getElementById('word-guess-input').value = '';
    document.getElementById('word-guess-input').disabled = false;
    document.getElementById('next-word-btn').style.display = 'none';
    document.getElementById('game-message').classList.remove('message-success', 'message-error');

    const newWordObj = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    currentWord = newWordObj.word.toUpperCase();
    
    const scrambled = shuffleWord(currentWord);
    updateGameDisplay(scrambled, newWordObj.hint, 'Time is ticking! Guess the word.');
}

window.checkAuthAndStart = function() {
    document.getElementById('game-message').classList.remove('message-error');
    currentScore = 0;
    document.getElementById('start-game-btn').style.display = 'none';
    document.getElementById('word-guess-input').disabled = false;
    nextWord();
}

window.checkGuess = function() {
    const guessInput = document.getElementById('word-guess-input');
    const guess = guessInput.value.trim().toUpperCase();
    const messageEl = document.getElementById('game-message');

    if (!guess) {
        messageEl.innerText = "Please enter a word.";
        messageEl.classList.remove('message-success');
        messageEl.classList.add('message-error');
        return;
    }

    if (guess === currentWord) {
        currentScore += CORRECT_SCORE; 
        clearInterval(timer); 
        updateGameDisplay(currentWord.split('').join(' '), `Correct! The word was ${currentWord}.`, `PROOF ACCEPTED! (+${CORRECT_SCORE})`, currentScore, TIME_LIMIT);
        
        guessInput.disabled = true;
        document.getElementById('next-word-btn').style.display = 'block';
        messageEl.classList.remove('message-error');
        messageEl.classList.add('message-success');
    } else {
        currentScore = Math.max(0, currentScore - WRONG_PENALTY); 
        const currentTimeText = document.getElementById('timer-display').querySelector('b').innerText;
        const currentTime = parseInt(currentTimeText.replace('s', '')) || 0; 
        
        updateGameDisplay(document.getElementById('scrambled-word').innerText, document.getElementById('game-word-hint').innerText, `PROOF REJECTED. Try again. (-${WRONG_PENALTY})`, currentScore, currentTime);
        messageEl.classList.remove('message-success');
        messageEl.classList.add('message-error');
    }
}

function endGame() {
    document.getElementById('word-guess-input').disabled = true;
    document.getElementById('next-word-btn').style.display = 'none';
    
    const startGameBtn = document.getElementById('start-game-btn');
    if (startGameBtn) {
        startGameBtn.innerText = 'PLAY AGAIN';
        startGameBtn.style.display = 'block';
    }
    
    updateGameDisplay("GAME OVER", "Your knowledge has been tested.", `Final Score: ${currentScore}. Click PLAY AGAIN!`, currentScore, 0);
    alert(`Game Over! Your Final Score is: ${currentScore}`);
}

// --- 5. CONFESSIONS LOGIC (UPDATED TIME FORMATTING) ---

// Helper to format time: "5m ago" or "10:30 AM"
function formatConfessionTime(dateObj) {
    const now = new Date();
    const diffMs = now - dateObj;
    const diffMins = Math.floor(diffMs / 60000); // Minutes difference

    if (diffMins < 60) {
        return `${diffMins}m ago`;
    } else {
        // Format as exact hour/time (e.g. 4:30 PM)
        return dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
}

window.updateCharCount = function() {
    const textarea = document.getElementById('confession-text');
    const maxLength = textarea.maxLength || 200;
    const remaining = maxLength - textarea.value.length;
    document.getElementById('char-count').innerText = `${remaining} characters remaining`;
}

window.submitConfession = function() {
    const textarea = document.getElementById('confession-text');
    const confessionText = textarea.value.trim();
    
    if (confessionText.length < 10) {
        alert("Confession must be at least 10 characters long.");
        return;
    }
    
    const randomId = Math.floor(Math.random() * 1000) + 100;
    
    // CAPTURE CURRENT TIME
    const now = new Date();
    // Initial time string (0m ago)
    const timeString = formatConfessionTime(now);

    const newConfessionHTML = `
        <div class="confession-entry" data-timestamp="${now.toISOString()}">
            <span class="confession-text">${confessionText}</span>
            <span class="confession-timestamp">— Anonymized Prover #${randomId} (<span class="time-display">${timeString}</span>)</span>
        </div>
    `;

    const feed = document.getElementById('confession-feed');
    feed.insertAdjacentHTML('afterbegin', newConfessionHTML);

    textarea.value = '';
    updateCharCount();
    feed.scrollTop = 0; 
}

// Function to update timestamps periodically
function updateConfessionTimes() {
    const entries = document.querySelectorAll('.confession-entry');
    entries.forEach(entry => {
        const timestampStr = entry.getAttribute('data-timestamp');
        if (timestampStr) {
            const dateObj = new Date(timestampStr);
            const newTimeString = formatConfessionTime(dateObj);
            // Find the span where the time is displayed and update it
            const timeSpan = entry.querySelector('.time-display');
            if (timeSpan) {
                timeSpan.innerText = newTimeString;
            }
        }
    });
}


// --- 6. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Stage switching for all navigation links
    document.querySelectorAll('#main-nav .nav-links a, #mobile-nav-drawer a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const stageId = e.target.getAttribute('data-stage');
            handlePortalStageSwitch(stageId);
            
            const drawer = document.getElementById('mobile-nav-drawer');
            if (drawer && drawer.classList.contains('open')) {
                drawer.classList.remove('open');
            }
        });
    });
    
    // PFP Upload Handler
    const pfpInput = document.getElementById('pfp-input');
    const userPfpImage = document.getElementById('user-pfp');
    const pfpLabel = document.getElementById('pfp-label');
    const pfpStatus = document.getElementById('pfp-status');

    pfpInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
                pfpStatus.textContent = 'Error: Only JPEG and PNG files are allowed.';
                pfpInput.value = null; 
                userPfpImage.src = ''; 
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                userPfpImage.src = e.target.result;
                pfpStatus.textContent = `File Ready: ${file.name}`;
                pfpLabel.textContent = 'Change PFP';
            };
            reader.readAsDataURL(file);
        } else {
            pfpStatus.textContent = 'No file selected.';
            pfpLabel.textContent = 'Click to Upload PFP (PNG/JPG)';
            userPfpImage.src = ''; 
        }
    });
    
    // Confession character counter
    const confessionTextarea = document.getElementById('confession-text');
    if (confessionTextarea) {
        confessionTextarea.setAttribute('maxlength', '200');
        updateCharCount(); 
        confessionTextarea.addEventListener('input', updateCharCount);
        
        // Start the interval to update timestamp text every 60 seconds
        setInterval(updateConfessionTimes, 60000);
    }

    // Initial stage setup
    handlePortalStageSwitch('card-generator');
});