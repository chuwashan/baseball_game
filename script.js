const startBtn = document.getElementById('startBtn');
const log = document.getElementById('log');

startBtn.addEventListener('click', startGame);

function startGame() {
    log.textContent = '';
    let inning = 1;
    let homeScore = 0;
    let awayScore = 0;
    const plays = [
        'smashes a towering home run',
        'rips a double down the line',
        'bloops a single into center',
        'works a walk after a gritty at-bat',
        'strikes out swinging',
        'launches a sacrifice fly',
        'steals second base',
        'grounds into a double play'
    ];

    while (true) {
        logLine(`Inning ${inning}`);
        // Top half
        let awayRuns = randomRuns();
        awayScore += awayRuns;
        logLine(`Top: Away team ${describePlay(plays, awayRuns)}`);

        let playBottom = true;
        if (inning >= 9 && homeScore > awayScore) {
            playBottom = false; // Home team already leads, game ends
        }

        if (playBottom) {
            let homeRuns = randomRuns();
            homeScore += homeRuns;
            logLine(`Bottom: Home team ${describePlay(plays, homeRuns)}`);
        } else {
            logLine('Bottom: Home team does not bat.');
        }

        if (inning >= 9 && homeScore !== awayScore) {
            break; // game decided
        }
        inning++;
    }

    logLine('\nFinal Score - Away ' + awayScore + ', Home ' + homeScore);
    const winner = homeScore > awayScore ? 'Home' : 'Away';
    logLine(`${winner} team wins in dramatic fashion!`);
}

function randomRuns() {
    const r = Math.random();
    if (r < 0.6) return 0;
    if (r < 0.8) return 1;
    if (r < 0.95) return 2;
    return 3;
}

function describePlay(plays, runs) {
    const event = plays[Math.floor(Math.random() * plays.length)];
    if (runs > 0) {
        return `${event} for ${runs} run${runs > 1 ? 's' : ''}!`;
    }
    return `${event} but fails to score.`;
}

function logLine(text) {
    log.textContent += text + '\n';
}
