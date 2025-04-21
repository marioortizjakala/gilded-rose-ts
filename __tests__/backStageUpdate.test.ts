import { GildedRose, Item } from "../app/gilded-rose";

describe("backstageUpdate", () => {
  it("should increase quality by 1 when more than 10 days left", () => {
    const item = new Item("Backstage passes", 15, 20);
    const gildedRose = new GildedRose();
    const updated = gildedRose.backstageUpdate(item);

    expect(updated.quality).toBe(21);
  });

  it("should increase quality by 2 when 10 days or fewer", () => {
    const item = new Item("Backstage passes", 10, 20);
    const gildedRose = new GildedRose();
    const updated = gildedRose.backstageUpdate(item);

    expect(updated.quality).toBe(22);
  });

  it("should increase quality by 3 when 5 days or fewer", () => {
    const item = new Item("Backstage passes", 5, 20);
    const gildedRose = new GildedRose();
    const updated = gildedRose.backstageUpdate(item);

    expect(updated.quality).toBe(23);
  });

  it("should drop quality to 0 after concert", () => {
    const item = new Item("Backstage passes", 0, 20);
    const gildedRose = new GildedRose();
    const updated = gildedRose.backstageUpdate(item);

    expect(updated.quality).toBe(0);
  });
});
