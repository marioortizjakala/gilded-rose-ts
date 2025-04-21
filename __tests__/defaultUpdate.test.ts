import { GildedRose, Item } from "../app/gilded-rose";

describe("defaultUpdate", () => {
  it("should decrease quality by 1 before sellIn", () => {
    const item = new Item("Normal Item", 5, 10);
    const gildedRose = new GildedRose();
    const updated = gildedRose.defaultUpdate(item);

    expect(updated.quality).toBe(9);
  });

  it("should decrease quality by 2 after sellIn", () => {
    const item = new Item("Normal Item", 0, 10);
    const gildedRose = new GildedRose();
    const updated = gildedRose.defaultUpdate(item);

    expect(updated.quality).toBe(8);
  });

  it("should not reduce quality below 0", () => {
    const item = new Item("Normal Item", 0, 1);
    const gildedRose = new GildedRose();
    const updated = gildedRose.defaultUpdate(item);

    expect(updated.quality).toBe(0);
  });
});
