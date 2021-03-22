class User {
  constructor(name) {
    this.name = name
  }

  greet() {
    return `Hi ${this.name}`;
  }
}

export default User;

export let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const MODULES_BECAME_STANDARD_YEAR = 2015;

const JOHN = {
	name: 'John Doe',
	balance: 1500,
	deduct(amount) {
		return new Promise((res, rej) => {
			setTimeout(() => {
				this.balance = this.balance - amount;
				res(`${this.name} has balance of ${this.balance}`);
			}, 2000)
		})
	}
}

export {JOHN};
