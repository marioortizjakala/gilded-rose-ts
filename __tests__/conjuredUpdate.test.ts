import { GildedRose, Item } from "../app/gilded-rose";

describe("conjuredUpdate", () => {
  it("should degrade quality by 2 before sellIn date", () => {
    const item = new Item("Conjured Cake", 3, 10);
    const gildedRose = new GildedRose();
    const updated = gildedRose.conjuredUpdate(item);

    expect(updated.sellIn).toBe(2);
    expect(updated.quality).toBe(8);
  });

  it("should degrade quality by 4 after sellIn date", () => {
    const item = new Item("Conjured Cake", 0, 10);
    const gildedRose = new GildedRose();
    const updated = gildedRose.conjuredUpdate(item);

    expect(updated.sellIn).toBe(-1);
    expect(updated.quality).toBe(6);
  });

  it("should not go below 0", () => {
    const item = new Item("Conjured Cake", 0, 3);
    const gildedRose = new GildedRose();
    const updated = gildedRose.conjuredUpdate(item);

    expect(updated.quality).toBeGreaterThanOrEqual(0);
  });
});
