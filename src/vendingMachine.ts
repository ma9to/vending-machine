export class VendingMachine {
    drinkList = [
        {
            name: 'cola',
            count: 1,
            price: 100,
        },
        {
            name: 'monster',
            count: 1,
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

    filterDrink(): any[] {
        return this.drinkList.filter(drink => drink.price <= this.getMoney());
    }

    buyDrink(drinkName: string): void {
        this.drinkList.map(drink => {
            if (drink.name === drinkName) {
                drink.count -= 1;
            }
        })

        
    }

}