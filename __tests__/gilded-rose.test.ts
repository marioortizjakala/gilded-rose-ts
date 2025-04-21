import { items } from "../__fixtures__/gilded-rose.data";
import { Item, GildedRose } from "../app/gilded-rose";
import * from './golden-master-text-test'
describe("Gilded Rose", function () {
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
