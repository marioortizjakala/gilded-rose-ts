export class ItemPoly {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}

  update(): void {
    this.sellIn -= 1;
    this.quality = Math.max(this.quality - (this.sellIn < 0 ? 2 : 1), 0);
  }
}
function createItem(name: string, sellIn: number, quality: number): ItemPoly {
  const key = name.toLowerCase();

  if (key.includes("aged brie")) return new AgedBrie(name, sellIn, quality);
  if (key.includes("backstage"))
    return new BackstagePass(name, sellIn, quality);
  if (key.includes("sulfuras")) return new Sulfuras(name, sellIn, quality);
  if (key.includes("conjured")) return new Conjured(name, sellIn, quality);

  return new ItemPoly(name, sellIn, quality);
}

class AgedBrie extends ItemPoly {
  update(): void {
    this.sellIn -= 1;
    this.quality = Math.min(50, this.quality + (this.sellIn < 0 ? 2 : 1));
  }
}

class BackstagePass extends ItemPoly {
  update(): void {
    this.sellIn -= 1;
    if (this.sellIn < 0) {
      this.quality = 0;
    } else if (this.sellIn < 5) {
      this.quality = Math.min(50, this.quality + 3);
    } else if (this.sellIn < 10) {
      this.quality = Math.min(50, this.quality + 2);
    } else {
      this.quality = Math.min(50, this.quality + 1);
    }
  }
}

class Sulfuras extends ItemPoly {
  update(): void {}
}

class Conjured extends ItemPoly {
  update(): void {
    this.sellIn -= 1;
    this.quality = Math.max(this.quality - (this.sellIn < 0 ? 4 : 2), 0);
  }
}

export class GildedRosePoly {
  constructor(public items: ItemPoly[]) {
    this.items = items.map((item) =>
      createItem(item.name, item.sellIn, item.quality)
    );
  }

  updateQuality(): ItemPoly[] {
    this.items.forEach((item) => item.update());
    return this.items;
  }
}
