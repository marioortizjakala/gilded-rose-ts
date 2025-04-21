import { items } from "../__fixtures__/gilded-rose.data";
import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  describe("computeUpdate", () => {
    it("should call agedBrieUpdate for Aged Brie", () => {
      const item = new Item("Aged Brie", 2, 0);
      const gildedRose = new GildedRose([item]);
      const spy = jest.spyOn(gildedRose, "agedBrieUpdate");

      gildedRose.computeUpdate(item);

      expect(spy).toHaveBeenCalledWith(item);
    });

    it("should call backstageUpdate for Backstage passes", () => {
      const item = new Item(
        "Backstage passes to a TAFKAL80ETC concert",
        15,
        20
      );
      const gildedRose = new GildedRose([item]);
      const spy = jest.spyOn(gildedRose, "backstageUpdate");

      gildedRose.computeUpdate(item);

      expect(spy).toHaveBeenCalledWith(item);
    });

    it("should call conjuredUpdater for Conjured item", () => {
      const item = new Item("Conjured Mana Cake", 5, 10);
      const gildedRose = new GildedRose([item]);
      const spy = jest.spyOn(gildedRose, "conjuredUpdater");

      gildedRose.computeUpdate(item);

      expect(spy).toHaveBeenCalledWith(item);
    });

    it("should return unchanged item for Sulfuras", () => {
      const item = new Item("Sulfuras, Hand of Ragnaros", 10, 80);
      const gildedRose = new GildedRose([item]);

      const result = gildedRose.computeUpdate(item);
      expect(result).toBe(item); // same instance
    });

    it("should call defaultUpdate for regular items", () => {
      const item = new Item("Elixir of the Mongoose", 5, 7);
      const gildedRose = new GildedRose([item]);
      const spy = jest.spyOn(gildedRose, "defaultUpdate");

      gildedRose.computeUpdate(item);

      expect(spy).toHaveBeenCalledWith(item);
    });
  });
  describe("computeUpdate", () => {
    it("should not update Sulfuras", () => {
      const item = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
      const gildedRose = new GildedRose();
      const updated = gildedRose.computeUpdate(item);

      expect(updated.sellIn).toBe(0);
      expect(updated.quality).toBe(80);
    });
    it("should call agedBrieUpdate with a aged brie name", () => {
      // const spy = jest.spyOn(gildedRose, "agedBrieUpdate");
      // gildedRose.computeUpdate(item);
      // expect(spy).toHaveBeenCalledWith(item);
      // spy.mockRestore();
    });
  });

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
  describe("conjuredUpdater", () => {
    it("should degrade quality by 2 before sellIn date", () => {
      const item = new Item("Conjured Cake", 3, 10);
      const gildedRose = new GildedRose();
      const updated = gildedRose.conjuredUpdater(item);

      expect(updated.sellIn).toBe(2);
      expect(updated.quality).toBe(8);
    });

    it("should degrade quality by 4 after sellIn date", () => {
      const item = new Item("Conjured Cake", 0, 10);
      const gildedRose = new GildedRose();
      const updated = gildedRose.conjuredUpdater(item);

      expect(updated.sellIn).toBe(-1);
      expect(updated.quality).toBe(6);
    });

    it("should not go below 0", () => {
      const item = new Item("Conjured Cake", 0, 3);
      const gildedRose = new GildedRose();
      const updated = gildedRose.conjuredUpdater(item);

      expect(updated.quality).toBeGreaterThanOrEqual(0);
    });
  });
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

  it("should foo", function () {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toEqual("foo");
  });
  describe("updateQuality (integration)", () => {
    it("should update all items", () => {
      const gildedRose = new GildedRose(items);

      const updated = gildedRose.updateQuality();

      expect(updated).toHaveLength(items.length);
    });
  });
});
