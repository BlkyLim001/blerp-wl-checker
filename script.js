// script.js - Complete Logic with SUPABASE INTEGRATION

// ============================================================
// 1. SUPABASE CONFIGURATION
// ============================================================
const SUPABASE_URL = "https://pnmwunwtgjxjfiqnoafh.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubXd1bnd0Z2p4amZpcW5vYWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3OTY4OTcsImV4cCI6MjA3OTM3Mjg5N30.hAxDTRoAdbim7uleRvFmWLEvORk-W9T83ryoEvuyPjo"; 

// Initialize Supabase client
const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

// ============================================================
// 2. GLOBAL STATE & METADATA
// ============================================================
const SUPPORTER_CARD_DATA = {
    r: '---', 
    h: 'BLERP_USER',
    s: 'N/A', 
    rarity: 'VERIFIED',
    title: 'A true Midener now'
};

// --- 3. GLOBAL STAGE MANAGEMENT ---

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

    if(stageId === 'card-generator') resetFlow();
    if (stageId === 'word-game') resetGame();
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

// --- 4. CARD GENERATOR LOGIC ---

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

// --- 5. MIDEN WORD GAME LOGIC ---

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
    document.getElementById('score-display').querySelector('b').innerText = score;
    document.getElementById('timer-display').querySelector('b').innerText = `${time}s`;
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
    document.getElementById('start-game-btn').style.display = 'block';
    document.getElementById('next-word-btn').style.display = 'none';
    updateGameDisplay("P R I V A C Y", "Let's test your ZK knowledge!", "Click START GAME to begin!", 0, TIME_LIMIT);
    document.getElementById('game-message').classList.remove('message-success', 'message-error');
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
    document.getElementById('start-game-btn').innerText = 'PLAY AGAIN';
    document.getElementById('start-game-btn').style.display = 'block';
    updateGameDisplay("GAME OVER", "Your knowledge has been tested.", `Final Score: ${currentScore}. Click PLAY AGAIN!`, currentScore, 0);
    alert(`Game Over! Your Final Score is: ${currentScore}`);
}

// ============================================================
// 6. CONFESSIONS LOGIC (SUPABASE DATABASE)
// ============================================================

// --- A. Real-time Time Formatter ---
function getLiveTimeAgo(dateString) {
    // Handle Supabase timestamp format
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return "Just now";

    const now = new Date();
    const diffMs = now - dateObj;
    const diffSeconds = Math.floor(diffMs / 1000);

    if (diffSeconds < 60) {
        return `${Math.max(0, diffSeconds)}s ago`;
    }
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
        return `${diffMinutes}m ago`;
    }
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
        return dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    return dateObj.toLocaleDateString(); 
}

// --- B. Submit to Supabase ---
window.submitConfession = async function() {
    const textarea = document.getElementById('confession-text');
    const confessionText = textarea.value.trim();
    
    if (confessionText.length < 10) {
        alert("Confession must be at least 10 characters long.");
        return;
    }
    
    const randomId = Math.floor(Math.random() * 1000) + 100;

    // INSERT into 'confessions' table
    const { data, error } = await sb
        .from('confessions')
        .insert([{ text: confessionText, prover_id: randomId }])
        .select();

    if (error) {
        console.error("Error saving:", error);
        alert("Error saving confession. Check console.");
    } else {
        console.log("Confession saved:", data);
        textarea.value = '';
        window.updateCharCount();
        loadConfessions(); // Refresh list immediately
    }
}

// --- C. Load Confessions (Persistent) ---
async function loadConfessions() {
    const feed = document.getElementById('confession-feed');
    
    // SELECT * FROM confessions ORDER BY created_at DESC LIMIT 50
    const { data, error } = await sb
        .from('confessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

    if (error) {
        console.error("Error loading:", error);
        return;
    }

    // Clear and rebuild feed
    feed.innerHTML = ''; 
    
    data.forEach((item) => {
        const timeString = getLiveTimeAgo(item.created_at);
        
        const entryHTML = `
            <div class="confession-entry" data-time="${item.created_at}">
                <span class="confession-text">${item.text}</span>
                <span class="confession-timestamp">— Anonymized Prover #${item.prover_id} (<span class="live-time">${timeString}</span>)</span>
            </div>
        `;
        feed.insertAdjacentHTML('beforeend', entryHTML);
    });
}

// --- D. Update Times Every Second ---
function startLiveTimeUpdates() {
    setInterval(() => {
        const entries = document.querySelectorAll('.confession-entry');
        entries.forEach((entry) => {
            const dateString = entry.getAttribute('data-time');
            if (dateString) {
                const newTime = getLiveTimeAgo(dateString);
                const span = entry.querySelector('.live-time');
                if (span) span.innerText = newTime;
            }
        });
    }, 1000); 
}

window.updateCharCount = function() {
    const textarea = document.getElementById('confession-text');
    const maxLength = textarea.maxLength || 200;
    const remaining = maxLength - textarea.value.length;
    document.getElementById('char-count').innerText = `${remaining} characters remaining`;
}

// --- 7. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Navigation
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
    
    // PFP Upload
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
    
    // Confession Setup
    const confessionTextarea = document.getElementById('confession-text');
    if (confessionTextarea) {
        confessionTextarea.setAttribute('maxlength', '200');
        updateCharCount(); 
        confessionTextarea.addEventListener('input', updateCharCount);
        
        // Initial Load & Auto-Refresh Polling (every 10s)
        loadConfessions();
        setInterval(loadConfessions, 10000); 
        startLiveTimeUpdates();
    }

    // Initial Stage
    handlePortalStageSwitch('card-generator');
});