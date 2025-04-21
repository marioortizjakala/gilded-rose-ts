import { GildedRose, Item } from "../app/gilded-rose";

describe("sulfurasUpdate", () => {
  it("should degrade quality by 2 before sellIn date", () => {
    const item = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    const gildedRose = new GildedRose();
    const spy = jest.spyOn(gildedRose, "sulfurasUpdate");

    gildedRose.computeUpdate(item);

    expect(spy).toHaveBeenCalledWith(item);
  });
});
