export class VendingMachine {
    drinkList = [
        {
            name: 'cola',
            count: 0,
            price: 100,
        },
        {
            name: 'monster',
            count: 0,
            price: 210,
        }
    ];

    currentMoney: number = 0;

    postMoney(money: number): void {
        this.currentMoney = money;
    }

    getMoney(): number {
        return this.currentMoney;
    }

    canBuyDrinkList(): any[] {
        return this.drinkList.filter(drink => drink.price <= this.getMoney()).map(drink => drink.name);
    }

    buyDrink(drinkName: string): void {
        this.drinkList.map(drink => {
            if (drink.name === drinkName) {
                drink.count -= 1;
            }
        })

        const drinkMomey = this.drinkList.find(drink => drink.name === drinkName).price;

        this.currentMoney = this.getMoney() - drinkMomey;
    }

    addDrink(drinkName: string): void {
        this.drinkList.map(drink => {
            if (drink.name === drinkName) {
                drink.count += 1;
            }
        })
    }

    countDrink(drinkName: string):number {
        return this.drinkList.find(drink => drink.name === drinkName).count;
    }

}