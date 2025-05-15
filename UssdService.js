/* eslint-env node */
const { askWithTimeout, verifyPin } = require('./Helper');

let balance = 10000;
let credit = 0;
const contacts = {
    '0387799787': 'Deux',
    '0349069645': 'Koloina'
};

async function ussdStart() {
    const initCode = await askWithTimeout('Composez #111# pour accéder au service : ');
    if (initCode !== '#111#') {
        console.log(' Code invalide. Fin du programme.');
        return;
    }

    const isVerified = await verifyPin();
    if (!isVerified) return;

    return showMainMenu();
}

async function showMainMenu() {
    console.log('\n==== YAS et Moi ====');
    console.log('1 - Mvola');
    console.log('2 - Services YAS');

    const choice = await askWithTimeout('Votre choix : ');
    if (choice === '1') return mvolaMenu();
    if (choice === '2') return servicesYas();

    console.log('Choix invalide.');
    return showMainMenu();
}

async function mvolaMenu() {
    console.log('\n==== Mvola ====');
    console.log('1 - Acheter Crédit ou Offre YAS');
    console.log('2 - Transférer argent');
    console.log('3 - Retrait d\'argent');
    console.log('4 - Mon compte');
    console.log('0 - Retour');

    const choice = await askWithTimeout('Votre choix : ');

    switch (choice) {
        case '1':
            return achatCreditOuOffre();
        case '2':
            return transfertArgent();
        case '3':
            return retraitArgent();
        case '4': {
            const isVerified = await verifyPin();
            if (isVerified) console.log(`Solde actuel : ${balance} Ar`);
            return mvolaMenu();
        }
        case '0':
            return showMainMenu();
        default:
            console.log('Choix invalide.');
            return mvolaMenu();
    }
}


async function achatCreditOuOffre() {
    console.log('\n1 - Crédit pour mon numéro');
    console.log('2 - Crédit pour un autre numéro');
    console.log('0 - Retour');
    
    const type = await askWithTimeout('Votre choix : ');
    if (type === '0') return mvolaMenu();

    const montant = await askWithTimeout('Montant : ');
    if (!montant || isNaN(montant)) {
        console.log('Montant invalide.');
        return achatCreditOuOffre();
    }

    let destinataire = '038 67 491 19 ';
    if (type === '2') {
        destinataire = await askWithTimeout('Numéro destinataire : ');
    }

    const isVerified = await verifyPin();
    if (!isVerified) return;

    if (parseInt(montant, 10) > balance) {
        console.log(' Solde insuffisant.');
        return mvolaMenu();
    }

    balance -= parseInt(montant, 10);
    credit += parseInt(montant, 10);

    console.log(`Achat de ${montant} Ar pour le numéro ${destinataire}. Solde restant : ${balance} Ar`);
    return mvolaMenu();
}

async function transfertArgent() {
    const numero = await askWithTimeout('Numéro destinataire : ');
    const montant = await askWithTimeout('Montant à envoyer : ');
    const frais = 300;

    console.log('\n1 - Oui, je prends en charge les frais de retrait');
    console.log('2 - Non');
    console.log('0 - Retour');
    

    const priseEnCharge = await askWithTimeout('Choix : ');
    const isVerified = await verifyPin();
    if (!isVerified) return;

    const nom = contacts[numero] || numero;

    let total = parseInt(montant, 10);
    if (priseEnCharge === '1') total += frais;
    if (priseEnCharge === '0') { return mvolaMenu(); }

    if (total > balance) {
        console.log(' Solde insuffisant.');
        return mvolaMenu();
    }

    balance -= total;
    console.log(`Transfert de ${montant} Ar à ${nom}. Solde restant : ${balance} Ar`);
    return mvolaMenu();
}

async function retraitArgent() {
    console.log('\n1 - Retrait via Agent');
    console.log('0 - Retour');
    
    const choice = await askWithTimeout('Choix : ');
    if (choice === '1') {
        const agentNum = await askWithTimeout('Numéro Agent : ');
        const montant = await askWithTimeout('Montant : ');
        const isVerified = await verifyPin();
        if (!isVerified) return;

        if (parseInt(montant, 10) > balance) {
            console.log(' Solde insuffisant.');
        } else {
            balance -= parseInt(montant, 10);
            console.log(`Retrait de ${montant} Ar via agent ${agentNum}. Solde restant : ${balance} Ar`);
        } if(choice === '0') {
            return mvolaMenu();
        }
    }
    return mvolaMenu();
}

async function servicesYas() {
    console.log('\n==== Services YAS ====');
    console.log('1 - Info Crédit');
    console.log('2 - Mon numéro');
    console.log('0 - Retour');

    const choice = await askWithTimeout('Votre choix : ');
    if (choice === '1') {
        console.log(` Crédit actuel : ${credit} Ar`);
    } else if (choice === '2') {
        console.log(' Votre numéro : +261385698574');
    } else if(choice === '0') {
        return showMainMenu();
    } else{
        console.log('Choix invalide.');
    }
    return showMainMenu();
}

ussdStart();