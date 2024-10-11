// This is another version of the prep-exercises/1-wallet/ex2-classes.js file.

// In this code the method for resetting the daily allowance is based on
// checking if the current date is different from the last saved date.

// It does a day-to-day comparison (date, month, year) to check if a new day has started.
// So, ResetDailyAllowance() method resets #dayTotalWithdrawals to 0 from midnight to midnight.

// INCLUDES A PROBLEM: resets happen multiple times during the same day.

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
    this.#savedDate = null;
  }

  get name() {
    return this.#name;
  }

  isNewDay() {
    const now = new Date();

    if (this.#savedDate) {
      const savedDateDay = this.#savedDate.getDate();
      const currentDay = now.getDate();
      const savedDateMonth = this.#savedDate.getMonth();
      const currentMonth = now.getMonth();
      const savedDateYear = this.#savedDate.getFullYear();
      const currentYear = now.getFullYear();

      if (
        savedDateDay === currentDay &&
        savedDateMonth === currentMonth &&
        savedDateYear === currentYear
      ) {
        return false;
      }
    }
    this.#savedDate = now;
    return true;
  }

  deposit(amount) {
    this.#cash += amount;
  }

  withdraw(amount) {
    if (this.isNewDay()) {
      this.resetDailyAllowance();
    }

    if (this.#cash - amount < 0) {
      console.log('Insufficient funds!');
      return 0;
    }

    if (this.#dayTotalWithdrawals + amount > this.#dailyAllowance) {
      console.log('Insufficient remaining daily allowance!');
      return 0;
    }

    this.#cash -= amount;
    this.#dayTotalWithdrawals += amount;
    return amount;
  }

  transferInto(wallet, amount) {
    if (this.isNewDay()) {
      this.resetDailyAllowance();
    }

    console.log(
      `Transferring ${eurosFormatter.format(amount)} from ${this.name} to ${
        wallet.name
      }`,
    );
    const withdrawnAmount = this.withdraw(amount);
    wallet.deposit(withdrawnAmount);
  }

  setDailyAllowance(newAllowance) {
    this.#dailyAllowance = newAllowance;
    console.log(
      'Daily allowance set to: ${eurosFormatter.format(newAllowance)}',
    );
  }

  resetDailyAllowance() {
    this.#dayTotalWithdrawals = 0;
    console.log('Daily allowance has been reset for a new day.');
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
