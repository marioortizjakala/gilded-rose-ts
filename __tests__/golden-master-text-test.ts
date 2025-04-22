import { items } from "../__fixtures__/gilded-rose.data";
import { GildedRose } from "../app/gilded-rose";

const gildedRose = new GildedRose(items);
var days: number = 2;
for (let i = 0; i < days; i++) {
  console.log("-------- day " + i + " --------");
  console.log("name, sellIn, quality");
  items.forEach((element) => {
    console.log(element.name + " " + element.sellIn + " " + element.quality);
  });
  console.log();
  gildedRose.updateQuality();
}
