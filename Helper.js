/* eslint-env node */
const readline = require('node:readline');
const process = require('node:process');

function askWithTimeout(question, timeout = 10000) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        const timer = setTimeout(() => {
            console.log('\n Timeout atteint. Excusez, vous dever redemmarer le programme\n');
            rl.close();
            resolve(null);
        }, timeout);

        rl.question(question, (answer) => {
            clearTimeout(timer);
            rl.close();
            resolve(answer.trim());
        });
    });
}

async function verifyPin(maxAttempts = 3) {
    const correctPin = '1234';
    let attempts = 0;

    while (attempts < maxAttempts) {
        const enteredPin = await askWithTimeout('Entrez votre code PIN : ', 10000);
        if (enteredPin === correctPin) return true;

        attempts += 1;
        console.log(` Code incorrect (${attempts}/${maxAttempts})`);
    }

    console.log(' Trop de tentatives. Veuillez vous rendre à une agence YAS pour débloquer votre puce.');
    return false;
}

module.exports = {
    askWithTimeout,
    verifyPin
};