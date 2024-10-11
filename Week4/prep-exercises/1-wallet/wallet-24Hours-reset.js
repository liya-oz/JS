// This code is an extended version 1 of the original prep-exercises/1-wallet/ex2-classes.js file.
// It tries to improve method of the daily allowance reset by comparing the
// saved  date of the last transaction with the current date.

// Here in short how the logic works:

// 1. A new Wallet object is created with properties: name, cash, daily allowance (40), withdrawals (0),
//    and #savedDate, which stores the current date and time.
// 2. ResetDailyAllowance() is used every time the limit needs to be reset (typically before a transaction or deposit).
// 3. It checks if 24 hours passed from the last reset by comparing the current time with #savedDate.
// 4. If 24 hours have passed, #dayTotalWithdrawals is reset to zero and #savedDate is updated to the current time.
// 5. If not, Withdrawals and Transfers transactions occur if there are sufficient funds and within the daily limit.

import eurosFormatter from './euroFormatter.js';

class Wallet {
  #name;
  #cash;
  #dailyAllowance;
  #dayTotalWithdrawals;
  #savedDate;

  constructor(name, cash) {
    this.#name = name;
    this.#cash = cash;
    this.#dailyAllowance = 40;
    this.#dayTotalWithdrawals = 0;
    this.#savedDate = new Date();
  }

  get name() {
    return this.#name;
  }

  isNewDay() {
    const now = new Date();

    if (!this.#savedDate) {
      this.#savedDate = now;
      return true;
    }

    const timeDifference = now - this.#savedDate;
    const hoursDifference = timeDifference / (1000 * 60 * 60); // Convert to milliseconds

    console.log(`CHECKING DATE: it is ${now}`);

    if (hoursDifference >= 24) {
      this.#savedDate = now;
      return true;
    }

    return false;
  }

  deposit(amount) {
    this.#cash += amount;
  }

  withdraw(amount) {
    this.resetDailyAllowance();

    if (this.#cash - amount < 0) {
      console.log(` Withdraw: Insufficient funds!`);
      return 0;
    }

    if (this.#dayTotalWithdrawals + amount > this.#dailyAllowance) {
      console.log(`Withdraw: Insufficient remaining daily allowance!`);
      return 0;
    }

    this.#cash -= amount;
    this.#dayTotalWithdrawals += amount;
    return amount;
  }

  transferInto(wallet, amount) {
    this.resetDailyAllowance();

    console.log(
      `Transfer: Transferring ${eurosFormatter.format(amount)} from ${
        this.name
      } to ${wallet.name}`,
    );
    const withdrawnAmount = this.withdraw(amount);
    wallet.deposit(withdrawnAmount);
  }

  setDailyAllowance(newAllowance) {
    this.#dailyAllowance = newAllowance;
    console.log(
      `Daily allowance set to: ${eurosFormatter.format(newAllowance)}`,
    );
  }

  resetDailyAllowance() {
    if (this.isNewDay()) {
      this.#dayTotalWithdrawals = 0;
      console.log('Daily allowance has been reset for a new day.');
    }
  }

  reportBalance() {
    console.log(
      `Name: ${this.name}, balance: ${eurosFormatter.format(this.#cash)}`,
    );
  }
}

function main() {
  const walletJack = new Wallet('Jack', 100);
  const walletJoe = new Wallet('Joe', 10);
  const walletJane = new Wallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50);
  walletJane.transferInto(walletJoe, 25);

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
}

main();
