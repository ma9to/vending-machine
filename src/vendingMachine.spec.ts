// 飲み物自動販売機
// done 飲み物を選んで購入できる
// done お金を入れると、入金額が見られる
// - お金が足りないときは、購入できない
// - 連続で入れると、入金額が加算される
// done 飲み物の在庫を追加できる
// - 飲み物の在庫を確認できる
// - 使えないお金がある(1,5,2000,5000,10000)

// given: [x]自動販売機の一覧にコーラがある
// コーラの値段(100円)が決まっている
// コーラを買うお金を持っている
// コーラの在庫がある
// when: 100円をいれる
//   - 100円入ったよね確認
//   - 100円で購入できる飲み物がわかる
// コーラを選択する
// then: コーラがでてくる

import { VendingMachine } from "./vendingMachine";

fdescribe('飲み物自動販売機', () => {
  describe('コーラを購入する', () => {
    it('自動販売機が存在する', () => {
      const vendingMachine = new VendingMachine();
      expect(vendingMachine).toBeDefined();
    });
    it('自動販売機の一覧にコーラがある', () => {
        const vendingMachine = new VendingMachine();
        const bool = vendingMachine.drinkList.some(drink => drink.name === 'cola');
        expect(bool).toBeTruthy();
    });

    it ('100円入れたら入金額が100円になる', () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.postMoney(100);
        expect(vendingMachine.currentMoney).toEqual(vendingMachine.getMoney());
    });

    describe('買える飲み物がわかる', () => {
        it('100円で買える飲み物が分かる', () => {
            [
                    {price: 100, expected: ['cola']},
                    {price: 300, expected: ['cola', 'monster']}
            ].forEach((data) =>{
                const vendingMachine = new VendingMachine();
                vendingMachine.postMoney(data.price);
                expect(vendingMachine.canBuyDrinkList()).toEqual(  data.expected);
            })

        });
    });


    it('コーラを選択するとコーラが出てくる', () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.addDrink('cola');
        vendingMachine.buyDrink('cola');
        const drink = vendingMachine.drinkList.filter(drink => drink.name === 'cola');
        // [{name; 'cola', ...}, {}, {}, {}]
        expect(drink[0].count).toEqual(0);
    });

    describe('投入金額から購入したドリンク分の金額が減る', () => {
        [
            {
                name: 'cola',
                expected: 400,
            },
            {
                name: 'monster',
                expected: 290,
            }
         ].forEach((data) => {
            it(`500円入れて${data.name}を買うと残金が${data.expected}`, () => {
                const vendingMachine = new VendingMachine();
                vendingMachine.postMoney(500);
                vendingMachine.buyDrink(data.name);
                const money = vendingMachine.getMoney();
                expect(money).toBe(data.expected);
            });
        })
    })

    it('monsterの在庫が追加できる', () => {
        const vendingMachine = new VendingMachine();
        vendingMachine.addDrink('monster');
        vendingMachine.addDrink('monster');
        expect(vendingMachine.countDrink('monster')).toBe(2);
    });

      it('お金が足りないと購入できない', () => {
          const vendingMachine = new VendingMachine();
          vendingMachine.addDrink('monster');
          vendingMachine.postMoney(100);
          const bool = vendingMachine.buyDrink('monster');
          expect(bool).toBeTruthy();
      });
  });
});