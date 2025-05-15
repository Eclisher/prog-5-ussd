# prog-5-ussd
# YAS USSD Simulation

This project is a Node.js simulation of a USSD (Unstructured Supplementary Service Data) interface, designed to mimic mobile money operations such as checking balance, sending money, buying credit, and accessing services. It simulates a real-life mobile USSD service flow through the command line.


## Objective

The goal of this project is to implement and enforce development best practices, including code style consistency and automated linting, for the `prog-5-ussd` application.

---

##  Naming Conventions

To ensure consistency and readability across the codebase, the following naming conventions are applied:

### Variables & Functions
- **Format:** `camelCase`
- **Example:** `airtimeAmount`, `getBalance()`


### File Names
- **Format:** `PascalCase.js`
- **Example:** `UssdServce.js`

##  Features

-  **PIN Verification** – Secure access via a 4-digit PIN (`1234`)
- **Check Account Balance**
- **Transfer Money** with optional fee inclusion
-  **Buy Credit or YAS Offer**
  - For own number
  - For another number
-  **Withdraw Cash via Agent**
-  **YAS Services**
  - Check available credit
  - View personal number
-  **Back Navigation** – Ability to return to the previous menu
-  **Timeout Handling** – Session expires if user doesn't respond within 10 seconds

## How It Works

### 1. Start the App

User is prompted to enter the USSD code:
Only `#111#` is accepted to proceed.

### 2. PIN Verification

Before accessing services, the user must enter the correct PIN. Three attempts are allowed.

### 3. Main Menu
==== YAS et Moi ====
1 - Mvola
2 - Services YAS

### 4. Mvola Menu
==== Mvola ====
1 - Acheter Crédit ou Offre YAS
2 - Transférer argent
3 - Retrait d'argent
4 - Mon compte
0 - Retour

### 5. Services YAS
==== Services YAS ====
1 - Info Crédit
2 - Mon numéro
0 - Retour

##  Navigation

- Press `0` at any menu level to go **back to the previous menu**
- Invalid inputs or lack of response will lead to appropriate prompts or timeout

##  Data Handling

- **Balance** and **Credit** are stored in memory:

```js
let balance = ourBalance;
let credit = ourCredit;
```

- Known **contacts** are saved in an object for name recognition:
```js
const contacts = {
  '0387799787': 'Deux',
  '0349069645': 'Koloina',
  and more if you want to add
};
```
##  Timeout
If the user does not respond within 10 seconds, the session will end automatically with this message:
```bash
Timeout atteint. Excusez, vous dever redemmarer le programme
```

##  PIN Logic
- PIN is always 1234
- User gets 3 attempts before the account is "locked" and access is denied

##   Installation & Running
- Make sure you have Node.js installed
- Clone the repository or copy the files
- Run the application from the terminal:
    ```bash
    node UssdService.js
    ```
##   Author
Developed by ***Haingo*** __Harizo__ ***Andrianaivo***




