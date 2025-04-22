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
    const { name } = item;
    const keyName = name.toLowerCase();

    if (keyName.includes("sulfuras")) {
      return this.sulfurasUpdate(item);
    }

    if (keyName.includes("aged brie")) {
      return this.agedBrieUpdate(item);
    }

    if (keyName.includes("backstage")) {
      return this.backstageUpdate(item);
    }

    if (keyName.includes("conjured")) {
      return this.conjuredUpdate(item);
    }

    return this.defaultUpdate(item);
  }

  sulfurasUpdate(item: Item) {
    return item;
  }

  agedBrieUpdate(item: Item) {
    item.sellIn -= 1;
    item.quality = Math.min(50, item.quality + (item.sellIn < 0 ? 2 : 1));
    return item;
  }

  conjuredUpdate(item: Item): Item {
    item.sellIn -= 1;

    item.quality = Math.max(item.quality - (item.sellIn < 0 ? 4 : 2), 0);

    return item;
  }

  backstageUpdate(item: Item) {
    item.sellIn -= 1;
    const { sellIn } = item;
    item.quality = Math.min(50, item.quality + 1);

    if (sellIn < 11) {
      item.quality = Math.min(50, item.quality + 1);
    }
    if (sellIn < 6) {
      item.quality = Math.min(50, item.quality + 1);
    }
    if (sellIn <= 0) {
      item.quality = 0;
    }
    return item;
  }

  defaultUpdate(item: Item) {
    item.sellIn -= 1;
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
