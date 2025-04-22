import { GildedRose, Item } from "../app/gilded-rose";

describe("sulfurasUpdate", () => {
  it("should return unchanged item for Sulfuras", () => {
    const item = new Item("Sulfuras, Hand of Ragnaros", 10, 80);
    const gildedRose = new GildedRose([item]);

    const result = gildedRose.computeUpdate(item);
    expect(result).toBe(item);
  });
});
