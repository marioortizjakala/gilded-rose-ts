import { GildedRose, Item } from "../app/gilded-rose";

describe("agedBrieUpdate", () => {
  it("should increase quality by 1 before sellIn date", () => {
    const item = new Item("Aged Brie", 5, 0);
    const gildedRose = new GildedRose();
    const updated = gildedRose.agedBrieUpdate(item);

    expect(updated.sellIn).toBe(4);
    expect(updated.quality).toBe(1);
  });

  it("should increase quality by 2 after sellIn date", () => {
    const item = new Item("Aged Brie", 0, 0);
    const gildedRose = new GildedRose();
    const updated = gildedRose.agedBrieUpdate(item);

    expect(updated.sellIn).toBe(-1);
    expect(updated.quality).toBe(2);
  });

  it("should not exceed quality 50", () => {
    const item = new Item("Aged Brie", 1, 50);
    const gildedRose = new GildedRose();
    const updated = gildedRose.agedBrieUpdate(item);

    expect(updated.quality).toBe(50);
  });
});
