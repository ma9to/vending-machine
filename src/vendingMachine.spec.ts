// 飲み物自動販売機
// - 飲み物を選んで購入できる
// - お金を入れると、入金額が見られる
// - お金が足りないときは、購入できない
// - 連続で入れると、入金額が加算される
// - 飲み物の在庫を追加できる
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
    describe('100円をいれる', () => {

        beforeEach(() => {
            // 前処理
        });

        it ('100円入ったよね確認', () => {
            const vendingMachine = new VendingMachine();
            vendingMachine.postMoney(100);
            expect(vendingMachine.currentMoney).toEqual(vendingMachine.getMoney());
        });

        it('100円で買える飲み物が分かる', () => {
            const vendingMachine = new VendingMachine();
            vendingMachine.postMoney(100);
            expect(vendingMachine.filterDrink()).toEqual(  [{name: 'cola', count: 1, price: 100}]);
        });

        it('コーラを選択するとコーラが出てくる', () => {
            const vendingMachine = new VendingMachine();
            vendingMachine.buyDrink('cola');
            const drink = vendingMachine.drinkList.filter(drink => drink.name === 'cola');
            // [{name; 'cola', ...}, {}, {}, {}]
            expect(drink[0].count).toEqual(0);
        });

        it('500円入れてコーラを買うとお金が100円減る', () => {
            const vendingMachine = new VendingMachine();
            vendingMachine.postMoney(500);
            const money = vendingMachine.getMoney();
            vendingMachine.buyDrink('cola');
            expect(money).toBe(400);
        });
    });

  });
});