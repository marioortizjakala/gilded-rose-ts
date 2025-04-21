import { items } from "../__fixtures__/gilded-rose.data";
import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toEqual("foo");
  });

  it("updates quality and sellIn at the end of day", function () {
    const item = new Item("Normal Item", 10, 20);
    const gilderedRose = new GildedRose([item]);
    gilderedRose.updateQuality();
    expect(item.sellIn).toBe(9);
    expect(item.quality).toBe(19);
  });

  it("should degrade quality twice as fast after sellIn date passes", () => {
    const item = new Item("Normal Item", 0, 10);
    const gilderedRose = new GildedRose([item]);
    gilderedRose.updateQuality();
    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(8);
  });

  it("should not reduce quality below 0 for normal items", () => {
    const item = new Item("Normal Item", 5, 0);
    const gilderedRose = new GildedRose([item]);
    gilderedRose.updateQuality();
    expect(item.quality).toBe(0);
  });
  it("should increase quality of Aged Brie as it gets older", () => {
    const item = new Item("Aged Brie", 5, 10);
    const gildedRose = new GildedRose([item]);
    gildedRose.updateQuality();
    expect(item.quality).toBe(11);
    expect(item.sellIn).toBe(4);
  });
  it("should increase quality of Aged Brie twice as fast after sellIn date passes", () => {
    const item = new Item("Aged Brie", 0, 10);
    const gildedRose = new GildedRose([item]);
    gildedRose.updateQuality();
    expect(item.quality).toBe(12);
    expect(item.sellIn).toBe(-1);
  });
  it("should not increase Aged Brie quality above 50", () => {
    const item = new Item("Aged Brie", 5, 50);
    const gildedRose = new GildedRose([item]);
    gildedRose.updateQuality();
    expect(item.quality).toBe(50);
  });
  it("should not change Sulfuras quality or sellIn", () => {
    const item = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    const gildedRose = new GildedRose([item]);
    gildedRose.updateQuality();
    expect(item.sellIn).toBe(0);
    expect(item.quality).toBe(80);
  });
  it("should increase Backstage pass quality by 1 if sellIn > 10", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20);
    const gilderedRose = new GildedRose([item]);
    gilderedRose.updateQuality();
    expect(item.quality).toBe(21);
  });
  it("should increase Backstage pass quality by 2 if sellIn <= 10 and > 5", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20);
    const shop = new GildedRose([item]);
    shop.updateQuality();
    expect(item.quality).toBe(22);
  });

  it("should increase Backstage pass quality by 3 if sellIn <= 5", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20);
    const shop = new GildedRose([item]);
    shop.updateQuality();
    expect(item.quality).toBe(23);
  });

  it("should drop Backstage pass quality to 0 after concert", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20);
    const shop = new GildedRose([item]);
    shop.updateQuality();
    expect(item.quality).toBe(0);
  });

  it("should not increase Backstage pass quality beyond 50", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49);
    const shop = new GildedRose([item]);
    shop.updateQuality();
    expect(item.quality).toBe(50);
  });
});
