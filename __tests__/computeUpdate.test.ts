import { GildedRose, Item } from "../app/gilded-rose";

describe("computeUpdate", () => {
  it("should not update Sulfuras", () => {
    const item = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    const gildedRose = new GildedRose();
    const updated = gildedRose.computeUpdate(item);

    expect(updated.sellIn).toBe(0);
    expect(updated.quality).toBe(80);
  });

  it("should call agedBrieUpdate for Aged Brie", () => {
    const item = new Item("Aged Brie", 2, 0);
    const gildedRose = new GildedRose([item]);
    const spy = jest.spyOn(gildedRose, "agedBrieUpdate");

    gildedRose.computeUpdate(item);

    expect(spy).toHaveBeenCalledWith(item);
  });

  it("should call backstageUpdate for Backstage passes", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20);
    const gildedRose = new GildedRose([item]);
    const spy = jest.spyOn(gildedRose, "backstageUpdate");

    gildedRose.computeUpdate(item);

    expect(spy).toHaveBeenCalledWith(item);
  });

  it("should call conjuredUpdater for Conjured item", () => {
    const item = new Item("Conjured Mana Cake", 5, 10);
    const gildedRose = new GildedRose([item]);
    const spy = jest.spyOn(gildedRose, "conjuredUpdate");

    gildedRose.computeUpdate(item);

    expect(spy).toHaveBeenCalledWith(item);
  });

  it("should call sulfuras for Sulfuras item", () => {
    const item = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    const gildedRose = new GildedRose();
    const spy = jest.spyOn(gildedRose, "sulfurasUpdate");

    gildedRose.computeUpdate(item);

    expect(spy).toHaveBeenCalledWith(item);
  });

  it("should call defaultUpdate for regular items", () => {
    const item = new Item("Elixir of the Mongoose", 5, 7);
    const gildedRose = new GildedRose([item]);
    const spy = jest.spyOn(gildedRose, "defaultUpdate");

    gildedRose.computeUpdate(item);

    expect(spy).toHaveBeenCalledWith(item);
  });
});
