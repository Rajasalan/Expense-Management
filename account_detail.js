const accountField = {
    incomeOption: document.querySelector('#income'),
    expenseOption: document.querySelector('#expense'),
    addingBtn: document.querySelector('#add-btn'),


    balance: document.querySelector('#balance-output'),
    totalIncome: document.querySelector('#total-income'),
    totalExpense: document.querySelector('#total-expense')


};

//displaying date and time

function displayDateandTime() {
    var currentDate = new Date(),
        day = currentDate.getDate(),
        month = "0" + (currentDate.getMonth() + 1),
        year = currentDate.getFullYear(),
        hours = currentDate.getHours(),
        minutes = currentDate.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (day < 10) {
        day = "0" + day;
    }

    return day + "/" + month + "/" + year + " " + hours + ":" + minutes;
}

console.log(displayDateandTime());

// creating the account object

const personalAccount = {
    incomes: [],
    expenses: [],

    addIncome(description, income) {
        this.incomes.push({
            description,
            income
        });
        console.log(this.incomes);

        //stringifying the income

        let incomeString = JSON.stringify(this.incomes);
        localStorage.setItem("income", incomeString);

        console.log(incomeString);
    },

    addExpense(description, expense) {
        this.expenses.push({
            description,
            expense
        });
        let expenseString = JSON.stringify(this.expenses);
        localStorage.setItem("expense", expenseString);
    },

    /* Below is the example how reduce work
    const array1 = [1, 2, 3, 4];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    // 1 + 2 + 3 + 4
    console.log(array1.reduce(reducer));
    // expected output: 10

    // 5 + 1 + 2 + 3 + 4
    console.log(array1.reduce(reducer, 5));
    // expected output: 15 */

    incomeSum() {
        const sum = this.incomes.reduce((acc, curr) => {
            return acc + curr.income;
        }, 0);
        console.log(this.incomes);
        return sum;
    },

    expenseSum() {
        const sum = this.expenses.reduce((acc, curr) => {
            return acc + curr.expense;
        }, 0);
        console.log(this.expenses);
        return sum;
    },

    accountBalance() {
        const balance = this.incomeSum() - this.expenseSum();
        return balance;
    },
};

const incomesDisplay = () => {

    if (localStorage.getItem("income")) {
        let incomeObj = JSON.parse(localStorage.getItem("income"));
        return incomeObj.map(transaction => {

            return `<p><span>${transaction.description}</span>: <span>${transaction.income}</span> $ on  ${displayDateandTime()}</p>`;
        }).join("  ");
    } else {
        return '';
    }

};

const expensesDisplay = () => {
    if (localStorage.getItem("expense")) {
        let expenseObj = JSON.parse(localStorage.getItem("expense"));
        return expenseObj.map(transaction => {
            return `<p><span>${transaction.description}</span>: <span>${transaction.expense}</span> $ on ${displayDateandTime()}</p>`;
        }).join(" ");
    } else {
        return '';
    }
};


const balanceDisplay = () => {
    let balance = parseInt(personalAccount.accountBalance());
    return accountField.balance.innerHTML = `${balance}`;
};


incomesumDisplay = () => {
    let incomeSum = parseInt(personalAccount.incomeSum());
    return accountField.totalIncome.innerHTML = `Total Income: ${incomeSum}`;
};

expensesumDisplay = () => {
    let expenseSum = parseInt(personalAccount.expenseSum());
    return accountField.totalExpense.innerHTML = `Total Expense: ${expenseSum}`;

};

accountField.addingBtn.addEventListener('click', function () {
    const description = document.querySelector('#description').value;
    const amount = parseInt(document.querySelector('#amount').value);
    const incomeOutput = document.querySelector('#income-output');
    const expenseOutput = document.querySelector('#expense-output');


    if (accountField.incomeOption.selected == true) {
        personalAccount.addIncome(description, amount);
        let incomeData = document.createElement('div');
        incomeOutput.innerHTML = '';
        incomeData.innerHTML = incomesDisplay();
        incomeOutput.appendChild(incomeData);

    } else if (accountField.expenseOption.selected == true) {
        personalAccount.addExpense(description, amount);
        let expenseData = document.createElement('div');
        expenseOutput.innerHTML = '';
        expenseData.innerHTML = expensesDisplay();
        expenseOutput.appendChild(expenseData);
    }
    balanceDisplay();
    incomesumDisplay();
    expensesumDisplay();

    document.querySelector('#description').value = "";
    document.querySelector('#amount').value = "";

});

if (localStorage.getItem('income')) {
    personalAccount.incomes = JSON.parse(localStorage.getItem('income'))
    // console.log(personalAccount.incomes);
}

if (localStorage.getItem('expense')) {
    personalAccount.expenses = JSON.parse(localStorage.getItem('expense'))
}

const incomeOutput = document.querySelector('#income-output');
let incomeData = document.createElement('div');
incomeOutput.innerHTML = '';
incomeData.innerHTML = incomesDisplay();
incomeOutput.appendChild(incomeData);

const expenseOutput = document.querySelector('#expense-output');
let expenseData = document.createElement('div');
expenseOutput.innerHTML = '';
expenseData.innerHTML = expensesDisplay();
expenseOutput.appendChild(expenseData);

balanceDisplay();
incomesumDisplay();
expensesumDisplay();