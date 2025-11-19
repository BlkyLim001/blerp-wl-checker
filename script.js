// script.js - Cleaned logic and data

// --- 1. REAL DATA (Top 99) ---
const RAW_DATA = [
    // NOTE: Replace the 'https://via.placeholder.com/...' URL for EACH entry below with the user's actual PFP link.
    // Rank 1-10 
    { r:1, h:'azeemk', s:3.14, pfp: 'https://pbs.twimg.com/profile_images/1488985111601332225/63KnqEaJ.jpg' }, 
    { r:2, h:'Telloo55', s:2.07, pfp: 'https://pbs.twimg.com/profile_images/1989818981008490497/oZligqmk.jpg' }, 
    { r:3, h:'0xMarcB', s:1.77, pfp: 'https://pbs.twimg.com/profile_images/1953232729820282882/0h05Cx1c.jpg' },
    { r:4, h:'sandeepnailwal', s:1.64, pfp: 'https://pbs.twimg.com/profile_images/1957857998904205312/SoPgZBdy.jpg' }, 
    { r:5, h:'vpavlin', s:1.48, pfp: 'https://pbs.twimg.com/profile_images/760222053056274432/MwKmK4J7.jpg' }, 
    { r:6, h:'Tajudeen_10', s:1.43, pfp: 'https://pbs.twimg.com/profile_images/1953029269954711552/pRNEXdkZ.jpg' },
    { r:7, h:'EliBenSasson', s:1.43, pfp: 'https://pbs.twimg.com/profile_images/1955695626676527111/zOi8uVPr.jpg' }, 
    { r:8, h:'divine_economy', s:1.42, pfp: 'https://pbs.twimg.com/profile_images/1735741854459514880/CX7vO79Y.jpg' }, 
    { r:9, h:'blkylimm', s:1.37, pfp: 'https://pbs.twimg.com/profile_images/1988717078497366016/kaazpZeb.jpg' },
    { r:10, h:'alexanderlee314', s:1.35, pfp: 'https://pbs.twimg.com/profile_images/1836772779200331776/X8p-4QmC.jpg' },
    // Rank 11-20
    { r:11, h:'zkGaylord', s:1.32, pfp: 'https://pbs.twimg.com/profile_images/1931813968395247616/jAr7rh49.jpg' }, 
    { r:12, h:'y_cryptoanalyst', s:1.30, pfp: 'https://pbs.twimg.com/profile_images/1940912893202944000/CGNonSFc.jpg' }, 
    { r:13, h:'0xAishwary', s:1.30, pfp: 'https://pbs.twimg.com/profile_images/1880917931636486144/AgcbYHbh.jpg' },
    { r:14, h:'Devkrz', s:1.28, pfp: 'https://pbs.twimg.com/profile_images/1950640524957765632/ZfiBCGzk.jpg' }, 
    { r:15, h:'rtk17025', s:1.24, pfp: 'https://pbs.twimg.com/profile_images/1990298443705978880/Lwrvec9u.jpg' }, 
    { r:16, h:'fede_intern', s:1.13, pfp: 'https://pbs.twimg.com/profile_images/1929957638814441472/GvTptJc1.jpg' },
    { r:17, h:'MOODOO_Diary', s:1.09, pfp: 'https://pbs.twimg.com/profile_images/1942237327373242369/W9dmR8FI.png' }, 
    { r:18, h:'lola_mewu', s:1.03, pfp: 'https://pbs.twimg.com/profile_images/1864374430077526016/a7_cM3YJ.jpg' }, 
    { r:19, h:'0xLeBwA', s:1.01, pfp: 'https://pbs.twimg.com/profile_images/1953807813785931776/4AYmoYeC.jpg' },
    { r:20, h:'0xM0RA', s:0.87, pfp: 'https://pbs.twimg.com/profile_images/1922194780013957120/bs5PTwko.jpg' },
    // Rank 21-30
    { r:21, h:'ngjupeng', s:0.84, pfp: 'https://pbs.twimg.com/profile_images/1638767868241395712/wchAbvwf.jpg' }, 
    { r:22, h:'jgonzalezferrer', s:0.80, pfp: 'https://pbs.twimg.com/profile_images/1961316387894304768/QZe8cSsQ.jpg' }, 
    { r:23, h:'tech466', s:0.77, pfp: 'https://pbs.twimg.com/profile_images/1972993843495632896/PTVWf2Oh.jpg' },
    { r:24, h:'0xSunriser', s:0.77, pfp: 'https://pbs.twimg.com/profile_images/1967816108326395904/RL6jS5SW.jpg' }, 
    { r:25, h:'Kreig_DK', s:0.76, pfp: 'https://pbs.twimg.com/profile_images/1974524276846800896/4tqp1GxO.jpg' }, 
    { r:26, h:'Philo_4930', s:0.76, pfp: 'https://pbs.twimg.com/profile_images/1982089305859252224/ha54Vd9_.jpg' },
    { r:27, h:'aesopsolo', s:0.75, pfp: 'https://pbs.twimg.com/profile_images/1799851937073917953/X2z-KX0Y.jpg' }, 
    { r:28, h:'mmagician', s:0.73, pfp: 'https://pbs.twimg.com/profile_images/1867561423674486785/IR7EyC8a.jpg' }, 
    { r:29, h:'pawmacist', s:0.72, pfp: 'https://pbs.twimg.com/profile_images/1889070593863024640/HzjtPJ__.jpg' },
    { r:30, h:'BrianSeong', s:0.71, pfp: 'https://pbs.twimg.com/profile_images/1904971865287966720/mXLxFeJM.jpg' },
    // Rank 31-40
    { r:31, h:'Himess__', s:0.69, pfp: 'https://pbs.twimg.com/profile_images/1932160010101915648/Q5Y4W2U_.jpg' }, 
    { r:32, h:'ighodarod95', s:0.66, pfp: 'https://pbs.twimg.com/profile_images/1964998901426974720/ZTHEmgMx.jpg' }, 
    { r:33, h:'yoheiimf', s:0.60, pfp: 'https://pbs.twimg.com/profile_images/1974720989553688576/HCh6Tl-_.jpg' },
    { r:34, h:'CryptoSense_2', s:0.59, pfp: 'https://pbs.twimg.com/profile_images/1970802949581389824/86gebTIU.jpg' }, 
    { r:35, h:'helpermc', s:0.59, pfp: 'https://pbs.twimg.com/profile_images/1920522532362371072/x6IR3_oq.jpg' }, 
    { r:36, h:'adeets_22', s:0.56, pfp: 'https://pbs.twimg.com/profile_images/1980376198979977216/y6gpe_6M.jpg' },
    { r:37, h:'Tazertronofweb3', s:0.55, pfp: 'https://pbs.twimg.com/profile_images/1872297792405733376/_Junjxei.jpg' }, 
    { r:38, h:'MuhammedAdewa14', s:0.53, pfp: 'https://pbs.twimg.com/profile_images/1808316345836040192/tsar6ROe.jpg' }, 
    { r:39, h:'mrboneseth', s:0.52, pfp: 'https://pbs.twimg.com/profile_images/1897338270603980800/0wBzE1Eg.jpg' },
    { r:40, h:'DvmOnChain', s:0.52, pfp: 'https://pbs.twimg.com/profile_images/1906904467749863425/TO6z6zY8.jpg' },
    // Rank 41-50
    { r:41, h:'omnicryptx', s:0.51, pfp: 'https://pbs.twimg.com/profile_images/1971309668153577472/vU_TfgV4.jpg' }, 
    { r:42, h:'creptosolutions', s:0.50, pfp: 'https://pbs.twimg.com/profile_images/1839764629234327552/fBHshgbl.jpg' }, 
    { r:43, h:'cryptee__', s:0.50, pfp: 'https://pbs.twimg.com/profile_images/1945133338903121920/0Ev69D_6.jpg' },
    { r:44, h:'Traderibo123', s:0.49, pfp: 'https://pbs.twimg.com/profile_images/1980548027732348928/UiWnT9pw.jpg' }, 
    { r:45, h:'leonstern', s:0.49, pfp: 'https://pbs.twimg.com/profile_images/1961382530919067648/MGk-sVjr.jpg' }, 
    { r:46, h:'A_Leutenegger', s:0.49, pfp: 'https://pbs.twimg.com/profile_images/1981464516186472448/09lMPrCG.jpg' },
    { r:47, h:'lykdisairdrop', s:0.45, pfp: 'https://pbs.twimg.com/profile_images/1946997848366546946/XKzw4m3t.jpg' }, 
    { r:48, h:'BadlandYW', s:0.45, pfp: 'https://pbs.twimg.com/profile_images/1989841393888718848/tSxAkAx3.jpg' }, 
    { r:49, h:'Anansutiawan', s:0.42, pfp: 'https://pbs.twimg.com/profile_images/1989755010465607680/bAaQv2Je.jpg' },
    { r:50, h:'hizzy_tonlover', s:0.41, pfp: 'https://pbs.twimg.com/profile_images/1960350321458192384/uIYcFg8T.jpg' },
    // Rank 51-60
    { r:51, h:'MakassjakaMaks', s:0.41, pfp: 'https://pbs.twimg.com/profile_images/1974880235750395904/mKN0rrik.jpg' }, 
    { r:52, h:'RealMissAI', s:0.40, pfp: 'https://pbs.twimg.com/profile_images/1493774243611688961/BxFE2P_d.jpg' }, 
    { r:53, h:'MahCryptoNerd', s:0.40, pfp: 'https://pbs.twimg.com/profile_images/1979504636269604864/ZW6QFnHk.jpg' },
    { r:54, h:'gobinoob_', s:0.40, pfp: 'https://pbs.twimg.com/profile_images/1980974466172653568/GgfDRmnc.jpg' }, 
    { r:55, h:'fareedahoyewale', s:0.40, pfp: 'https://pbs.twimg.com/profile_images/1971726641618436096/lehxuPbh.jpg' }, 
    { r:56, h:'CareFree69_', s:0.38, pfp: 'CareFree69_' },
    { r:57, h:'tiur_eth', s:0.38, pfp: 'https://pbs.twimg.com/profile_images/1947539446959677440/K1QNDbKd.jpg' }, 
    { r:58, h:'KrellWeb3', s:0.38, pfp: 'https://pbs.twimg.com/profile_images/1977807312099106816/zgvC4BG6.jpg' }, 
    { r:59, h:'jacobeverly', s:0.38, pfp: 'https://pbs.twimg.com/profile_images/1932114282394595329/Mv9gc6yt.jpg' },
    { r:60, h:'Aldred999', s:0.38, pfp: 'https://pbs.twimg.com/profile_images/1905914666599002112/et-v1jMl.jpg' },
    // Rank 61-70
    { r:61, h:'NicolasRamsrud', s:0.37, pfp: 'https://pbs.twimg.com/profile_images/1882143422787833857/K9J8mV9j.jpg' }, 
    { r:62, h:'beingRich2000', s:0.37, pfp: 'https://pbs.twimg.com/profile_images/1972596164395700224/GxemWM4H.jpg' }, 
    { r:63, h:'KonstanttinS', s:0.36, pfp: 'https://pbs.twimg.com/profile_images/1952062231148994560/LzcpG-AS.jpg' },
    { r:64, h:'0xbaropintar', s:0.36, pfp: 'https://pbs.twimg.com/profile_images/1973930744935559169/aXHUs0gw.jpg' }, 
    { r:65, h:'0xD1ol', s:0.36, pfp: 'https://pbs.twimg.com/profile_images/1960978759575625729/4dguFmqK.jpg' }, 
    { r:66, h:'LaudTheAvatar', s:0.36, pfp: 'https://pbs.twimg.com/profile_images/1916241177029890048/Pm8VeiKM.jpg' },
    { r:67, h:'Fuugaa01', s:0.33, pfp: 'https://pbs.twimg.com/profile_images/1987763048023494656/Ox1NbMBj.jpg' }, 
    { r:68, h:'NitanshuL', s:0.32, pfp: 'https://pbs.twimg.com/profile_images/1909681579992969216/Pz1qdZ8F.jpg' }, 
    { r:69, h:'youngsun', s:0.31, pfp: 'https://pbs.twimg.com/profile_images/1905564424620179456/psJrscuW.jpg' },
    { r:70, h:'alacheng', s:0.30, pfp: 'https://pbs.twimg.com/profile_images/1909493251935277056/x9KJvVIm.jpg' },
    // Rank 71-80
    { r:71, h:'cukky001', s:0.30, pfp: 'https://pbs.twimg.com/profile_images/1975063602408120320/g2Pt_Egt.jpg' }, 
    { r:72, h:'goodboi_global', s:0.30, pfp: 'https://pbs.twimg.com/profile_images/1988962664123441152/YyZuXvKL.jpg' }, 
    { r:73, h:'HabibiLearn', s:0.30, pfp: 'https://pbs.twimg.com/profile_images/1953744435378081792/uImd5MgG.jpg' },
    { r:74, h:'jundeu00', s:0.29, pfp: 'https://pbs.twimg.com/profile_images/1970434438212268032/MmIVj99o.jpg' }, 
    { r:75, h:'dee_nftarmy', s:0.29, pfp: 'https://pbs.twimg.com/profile_images/1977323052368121856/8_mCej7F.jpg' }, 
    { r:76, h:'Angello3400PRMR', s:0.29, pfp: 'https://pbs.twimg.com/profile_images/1854988871550779393/jCJ3zV7r.jpg' },
    { r:77, h:'steelorian', s:0.29, pfp: 'https://pbs.twimg.com/profile_images/1973748632282382336/2BZVo3vN.jpg' }, 
    { r:78, h:'libra_Saloni22', s:0.29, pfp: 'https://pbs.twimg.com/profile_images/1962928411963166721/Khdbrpog.jpg' }, 
    { r:79, h:'terra_gatsuki', s:0.29, pfp: 'https://pbs.twimg.com/profile_images/1655100423647240194/aBJcvKMg.jpg' },
    { r:80, h:'iamopking', s:0.28, pfp: 'https://pbs.twimg.com/profile_images/1985828152518590464/opYcCvOK.jpg' },
    // Rank 81-90
    { r:81, h:'hangome_sol', s:0.28, pfp: 'https://pbs.twimg.com/profile_images/1980117808823382016/grtDoCcT.jpg' }, 
    { r:82, h:'geverduin', s:0.26, pfp: 'https://pbs.twimg.com/profile_images/1983902226197471232/_zDyhebm.jpg' }, 
    { r:83, h:'Gogogonum', s:0.25, pfp: 'https://pbs.twimg.com/profile_images/1975168595538636800/05kV5jvU.jpg' },
    { r:84, h:'bobbinth', s:0.25, pfp: 'https://pbs.twimg.com/profile_images/1046106111735205889/js199JL0.jpg' }, 
    { r:85, h:'r_1_n_8', s:0.25, pfp: 'https://pbs.twimg.com/profile_images/1980989053446070272/VDH354Bh.jpg' }, 
    { r:86, h:'namnin_kr', s:0.24, pfp: 'https://pbs.twimg.com/profile_images/1978609745021079552/Zr-Of-P6.jpg' },
    { r:87, h:'0xleywing', s:0.24, pfp: 'https://pbs.twimg.com/profile_images/1959234788251795456/G5V4XHxR.jpg' }, 
    { r:88, h:'VaveylaCrypto', s:0.24, pfp: 'https://pbs.twimg.com/profile_images/1951009112528986112/Yy22jx8P.jpg' }, 
    { r:89, h:'mon_sieurr_', s:0.23, pfp: 'https://pbs.twimg.com/profile_images/1984367958068494336/pNRNyaYI.jpg' },
    { r:90, h:'_nityas', s:0.23, pfp: 'https://pbs.twimg.com/profile_images/1639836768995508227/jmGiRg4l.jpg' },
    // Rank 91-99
    { r:91, h:'Mark_Streamr', s:0.23, pfp: 'https://pbs.twimg.com/profile_images/1770446923247271936/MvDZaDkt.jpg' }, 
    { r:92, h:'ThomasCynthi', s:0.23, pfp: 'https://pbs.twimg.com/profile_images/1959972355511390208/jw2uvYc3.jpg' }, 
    { r:93, h:'yeonwooholic', s:0.23, pfp: 'https://pbs.twimg.com/profile_images/1877442710212325377/dHN9rMMm.jpg' },
    { r:94, h:'CTNg_Prince', s:0.23, pfp: 'https://pbs.twimg.com/profile_images/1958448499357302784/-tVE9SLJ.jpg' }, 
    { r:95, h:'hriaznovden', s:0.23, pfp: 'https://pbs.twimg.com/profile_images/1970402297734742016/JilqI8vo.jpg' }, 
    { r:96, h:'isakxbt', s:0.23, pfp: 'https://pbs.twimg.com/profile_images/1988571501755604992/3IYRUBO6.jpg' },
    { r:97, h:'DMheji', s:0.22, pfp: 'https://pbs.twimg.com/profile_images/1983109785194020864/tHDknJjr.jpg' }, 
    { r:98, h:'Sonika_KK', s:0.22, pfp: 'https://pbs.twimg.com/profile_images/1972681007770877952/aDIUygvF.jpg' }, 
    { r:99, h:'umbosip', s:0.22, pfp: 'https://pbs.twimg.com/profile_images/1967859321032642560/IdzrBPT1.jpg' }
];

// --- 2. DATA PROCESSING & RARITY LOGIC (FINALIZED TO R.90) ---
function getRarityAndTitle(rank) {
    if (rank <= 5) return { r: 'RARE', t: 'Transcends the ZK State. Legendary Prover.' };
    if (rank <= 10) return { r: 'MYTHIC', t: 'Architect of the Miden Assembly.' };
    if (rank <= 20) return { r: 'ELITE', t: 'Core Operator of the Client-Side Edge.' };
    if (rank <= 30) return { r: 'PRIME', t: 'Top-Tier Contributor and Verified Source.' };
    if (rank <= 40) return { r: 'CHAMPION', t: 'Skilled Prover, Mastering the Miden Logic.' };
    if (rank <= 50) return { r: 'SENIOR', t: 'Established Verifier in the Miden Network.' };
    if (rank <= 60) return { r: 'MASTER', t: 'Proving the next block of ZK history.' };    // NEW TIER
    if (rank <= 70) return { r: 'EXPERT', t: 'Verified Contributor to the Miden Protocol.' }; // NEW TIER
    if (rank <= 80) return { r: 'VETERAN', t: 'Key Participant in the Miden Testnet.' };  // NEW TIER
    if (rank <= 90) return { r: 'JOURNEYMAN', t: 'Exploring the depths of Miden Assembly.' }; // NEW TIER
    if (rank <= 100) return { r: 'EXPLORER', t: 'Made the cut, new explorer' }; // NEW TIER
    return { r: 'CONTROLLER', t: 'Verifying the future, one proof at a time.' }; // Ranks 91-99
}

// --- 3. FLOW MANAGEMENT ---
function showStage(stageId) {
    // Hide all stages
    document.querySelectorAll('.stage-container').forEach(el => el.style.display = 'none');
    // Show requested stage
    document.getElementById(stageId).style.display = 'block';
}

function resetFlow() {
    document.getElementById('handle-input').value = '';
    showStage('stage-input');
}

// --- 4. CHECK AVAILABILITY ---
function checkAvailability() {
    const inputRaw = document.getElementById('handle-input').value;
    const input = inputRaw.trim().replace('@', '');
    const statusIcon = document.getElementById('status-icon');
    const title = document.getElementById('availability-title');
    const msg = document.getElementById('availability-message');
    const claimBtn = document.getElementById('claim-button');

    if (!input) return alert("Please enter a handle.");

    const found = RAW_DATA.find(u => u.h.toLowerCase() === input.toLowerCase());

    if (found) {
        const meta = getRarityAndTitle(found.r);
        const user = { ...found, rarity: meta.r, title: meta.t };

        statusIcon.innerHTML = '✅';
        title.innerText = "YOU ARE ELIGIBLE";
        title.style.color = 'var(--neon-orange)';
        msg.innerHTML = `Handle <b>@${user.h}</b> found at Rank <b>#${user.r}</b>.<br>You can claim your <b>${user.rarity}</b> Card.`;
        claimBtn.innerText = "CLAIM MY CARD";
        claimBtn.onclick = function() { claimCard(user); };
    } else {
        statusIcon.innerHTML = '⚠️';
        title.innerText = "NOT ON LEADERBOARD";
        title.style.color = '#ffaa00';
        msg.innerHTML = `Handle <b>@${input}</b> is not in the Top 99 data.<br>You can still claim a Supporter Card.`;
        claimBtn.innerText = "CLAIM SUPPORTER CARD";
        
        const newcomer = {
            r: '---',
            h: input,
            s: 'N/A',
            pfp: 'face.png', // Generic PFP for supporter
            rarity: 'CONTROLLER',
            title: 'Did not make the cut, but you are a Future legend.'
        };
        claimBtn.onclick = function() { claimCard(newcomer); };
    }

    showStage('stage-availability');
}

// --- 5. RENDER CARD ---
function claimCard(data) {
    document.getElementById('card-handle').innerText = data.h;
    
   // Update Profile Picture using lazy loading
const pfpElement = document.getElementById('card-pfp');

// 1. Set the actual source only when the card is claimed
pfpElement.src = data.pfp; 

// 2. Handle image loading error 
pfpElement.onerror = () => {
    // Fallback to a plain placeholder if the link fails
    pfpElement.src = 'https://via.placeholder.com/120/5e5e5e/ffffff?text=PFP+Error'; 
};

// Ensure the element is visible if it was hidden
pfpElement.style.display = 'block';

    document.getElementById('card-rank').innerText = '#' + data.r;
    document.getElementById('card-score').innerText = data.s.toLocaleString();
    document.getElementById('card-desc').innerText = data.title;
    
    const footer = document.getElementById('card-footer');
    const rarityText = document.getElementById('card-rarity');
    
    // Reset and set rarity class
    footer.className = 'card-footer'; 
    footer.classList.add('rarity-' + data.rarity);
    rarityText.innerText = data.rarity + ' PROVER';

    // Update Share Link
    const tweetText = `I just claimed my Miden ${data.rarity} Prover Card! My rank is #${data.r}. Get yours: blerp.site`;
    document.getElementById('share-link').href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

    showStage('stage-card-display');
}

// --- 6. DOWNLOAD FUNCTION ---
function downloadCard() {
    const cardElement = document.getElementById('prover-card');
    const btn = document.querySelector('.download-btn');
    
    btn.innerText = "GENERATING...";

    html2canvas(cardElement, {
        scale: 3, // High quality
        backgroundColor: null,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Miden_Card_${document.getElementById('card-handle').innerText}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        btn.innerText = "DOWNLOAD CARD (PNG)";
    });
}