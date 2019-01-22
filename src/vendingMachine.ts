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
        this.reduceDrink(drinkName);

        const drinkMomey = this.getPrice(drinkName);

        this.currentMoney = this.getBalance(drinkMomey);
    }

    private getBalance(drinkMomey) {
        return this.getMoney() - drinkMomey;
    }

    private getPrice(drinkName: string) {
        return this.drinkList.find(drink => drink.name === drinkName).price;
    }

    private reduceDrink(drinkName: string) {
        this.drinkList.map(drink => {
            if (drink.name === drinkName) {
                drink.count -= 1;
            }
        });
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