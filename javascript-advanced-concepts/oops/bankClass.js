class BankAccount {
  constructor(balance, accNum, accHolder) {
    this.balance = balance;
    this.accNum = accNum;
    this.accHolder = accHolder;
  }
  deposit(amount) {
    this.balance = this.balance + amount;
    return this.balance;
  }
  withdraw(amount) {
    if (amount > this.balance) {
      return 'Insufficient balance';
    }
    this.balance = this.balance - amount;
    return this.balance;
  }
}

const myAccount = new BankAccount(1000, 123456, 'John Doe');
console.log('myAccount :>> ', myAccount);
console.log('myAccount.deposit(500) :>> ', myAccount.deposit(500));
console.log('myAccount.withdraw(200) :>> ', myAccount.withdraw(200));
