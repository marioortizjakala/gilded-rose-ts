export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  computeUpdate(item: Item) {
    const { name, quality, sellIn } = item;
    if (name === "Sulfuras, Hand of Ragnaros") {
      return item;
    }
    item.sellIn = item.sellIn - 1;
    if (name === "Aged Brie") {
      item.quality = Math.min(50, item.quality + (item.sellIn < 0 ? 2 : 1));
      return item;
    }

    if (name === "Backstage passes to a TAFKAL80ETC concert") {
      let itemIncrease = 1;
      item.quality = Math.min(50, item.quality + 1);

      if (sellIn < 11) {
        item.quality = Math.min(50, item.quality + 1);
      }
      if (sellIn < 6) {
        item.quality = Math.min(50, item.quality + 1);
      }
      if (sellIn === 0) {
        item.quality = 0;
      }
      return item;
    }
    item.quality = Math.max(item.quality - (item.sellIn < 0 ? 2 : 1), 0);

    return item;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i] = this.computeUpdate(this.items[i]);
    }

    return this.items;
  }
}
