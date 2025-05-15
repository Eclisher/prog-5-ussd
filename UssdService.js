/* eslint-env node */
const readline = require('readline');

function askWithTimeout(question, timeout = 15000) {
    const rl = readline.createInterface({
        input: require('node:process').stdin,
        output: require('node:process').stdout
    });

    return new Promise((resolve) => {
        const timer = setTimeout(() => {
            console.log("\n Timeout reached. Returning to main menu...\n");
            rl.close();
            resolve(null);
        }, timeout);

        rl.question(question, (answer) => {
            clearTimeout(timer);
            rl.close();
            resolve(answer);
        });
    });
}

async function ussd() {
    const pin = "1234";
    const enteredPin = await askWithTimeout("Enter your PIN: ", 10000);
    if (enteredPin === pin) {
        console.log("PIN accepted.");
    } else {
        console.log("Incorrect PIN. Exiting...");
        return;
    }

    console.log("Welcome to the USSD Service");
    console.log("1. Check Balance");
    console.log("2. Send Money");
    console.log("3. Deposit Money");
    console.log("0. Return to Main Menu");

    const choice = await askWithTimeout("Enter your choice: ");
    switch (choice) {
        case '1': {
            console.log("Your balance is $100.");
            ussd();
            return;
        }
        case '2': {
            const number = await askWithTimeout("Enter recipient number or 0 to return menu: ");
            if (number === '0') {
                console.log("Returning to main menu...");
                ussd();
                return;
            }
            const amount = await askWithTimeout("Enter amount to send or 0 to return menu: ");
            if (amount === '0') {
                console.log("Returning to main menu...");
                ussd();
                return;
            }
            console.log(`You have sent $${amount} to ${number}.`);
            break;
        }
        case '3': {
            const airtimeAmount = await askWithTimeout("Enter amount to buy airtime: ");
            if (airtimeAmount === '0') {
                console.log("Returning to main menu...");
                ussd();
                return;
            }
            console.log(`You have purchased $${airtimeAmount} airtime.`);
            break;
        }
        case '0': {
            const returnToMain = await askWithTimeout("Do you want to return to the main menu? (yes/no): ");
            if (returnToMain && returnToMain.toLowerCase() === 'yes') {
                ussd();
            } else {
                console.log("Thank you for using the USSD service. Goodbye!");
            }
            break;
        }
        default: {
            console.log("Invalid choice. Please try again.");
        }
    }
}

ussd();
