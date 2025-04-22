import { GildedRosePoly, ItemPoly } from "../app/gilded-rose-poly";

describe("Gilded Rose", () => {
  test("Aged Brie increases in quality", () => {
    const items = [new ItemPoly("Aged Brie", 2, 0)];
    const shop = new GildedRosePoly(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(1);
  });

  test("Backstage passes increase in quality by 2 when 10 days or less", () => {
    const items = [
      new ItemPoly("Backstage passes to a TAFKAL80ETC concert", 10, 20),
    ];
    const shop = new GildedRosePoly(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(22);
  });

  test("Backstage passes quality drops to 0 after concert", () => {
    const items = [
      new ItemPoly("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    ];
    const shop = new GildedRosePoly(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(0);
  });

  test("Sulfuras does not change", () => {
    const items = [new ItemPoly("Sulfuras, Hand of Ragnaros", 0, 80)];
    const shop = new GildedRosePoly(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(80);
    expect(shop.items[0].sellIn).toBe(0);
  });

  test("Conjured item degrades twice as fast", () => {
    const items = [new ItemPoly("Conjured Mana Cake", 3, 6)];
    const shop = new GildedRosePoly(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(4);
  });

  test("Normal item degrades by 1 before sellIn", () => {
    const items = [new ItemPoly("+5 Dexterity Vest", 10, 20)];
    const shop = new GildedRosePoly(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(19);
  });

  test("Normal item degrades by 2 after sellIn", () => {
    const items = [new ItemPoly("+5 Dexterity Vest", 0, 20)];
    const shop = new GildedRosePoly(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(18);
  });
});
