// --- LIVE NUMBER SIMULATION ---
function simulateLiveNumbers() {
    // Select all percentage elements
    const percents = document.querySelectorAll('.c-percent');
    
    setInterval(() => {
        // Pick a random element to update
        const randomIndex = Math.floor(Math.random() * percents.length);
        const el = percents[randomIndex];
        
        // Parse current value
        let val = parseInt(el.innerText.replace('%', ''));
        
        // Randomly add or subtract 1%
        const change = Math.random() > 0.5 ? 1 : -1;
        val += change;
        
        // Keep within bounds
        if (val > 99) val = 99;
        if (val < 1) val = 1;
        
        // Update DOM
        el.innerText = val + '%';
        
        // Highlight effect
        el.style.color = change > 0 ? '#22c55e' : '#ef4444';
        setTimeout(() => el.style.color = 'white', 500);
        
    }, 2000); // Update every 2 seconds
}

// --- CHART.JS CONFIG FOR TRADE PAGE ---
function initChart() {
    const ctx = document.getElementById('marketChart');
    if (!ctx) return; // Not on trade page

    // Fake Data Generation
    const labels = Array.from({length: 30}, (_, i) => i); // 0 to 29
    const dataVance = [];
    const dataNewsom = [];
    const dataAOC = [];
    
    let v = 30, n = 20, a = 5;
    for (let i = 0; i < 30; i++) {
        v += (Math.random() - 0.4); 
        n += (Math.random() - 0.4);
        a += (Math.random() - 0.4);
        dataVance.push(v);
        dataNewsom.push(n);
        dataAOC.push(a);
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'JD Vance',
                    data: dataVance,
                    borderColor: '#22c55e', // Green
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: 'Gavin Newsom',
                    data: dataNewsom,
                    borderColor: '#f59e0b', // Orange
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: 'AOC',
                    data: dataAOC,
                    borderColor: '#ef4444', // Red
                    borderWidth: 1,
                    tension: 0.4,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }, // Hide default legend (we made a custom one)
            scales: {
                x: { display: false },
                y: { 
                    position: 'right',
                    grid: { color: '#2a2e35' },
                    ticks: { color: '#9ba1a6' }
                }
            },
            animation: {
                duration: 0 // Disable initial animation for "instant load" feel
            }
        }
    });
}

// Start
document.addEventListener('DOMContentLoaded', () => {
    simulateLiveNumbers();
});