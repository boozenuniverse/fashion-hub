import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { csvToSeeds, parseCsv } from "@/lib/catalogue-import";
import { buildProduct } from "@/data/seed";

describe("CSV parsing", () => {
  it("handles quotes, commas, escaped quotes and newlines", () => {
    const rows = parseCsv('a,b,c\n"x, y","say ""hi""","line1\nline2"\n');
    expect(rows.length).toBe(2);
    expect(rows[1]).toEqual(["x, y", 'say "hi"', "line1\nline2"]);
  });
});

describe("catalogue import", () => {
  const template = readFileSync(join(process.cwd(), "data/catalogue.template.csv"), "utf8");

  it("converts the template into valid, non-sample products", () => {
    const { seeds, errors } = csvToSeeds(template);
    expect(errors).toEqual([]);
    expect(seeds.length).toBe(3);
    const products = seeds.map(buildProduct);
    expect(products[0].sample).toBe(false);
    expect(products[0].id.startsWith("fh-")).toBe(true);
    expect(products[0].options.map((o) => o.id)).toEqual(["colour", "size"]);
    expect(products[0].images[0].src).toBe("/images/products/clothing/silk-wrap-dress-1.webp");
    const wig = products[1];
    expect(wig.availability).toBe("preorder");
    expect(wig.options.find((o) => o.id === "length")!.values[1]).toEqual({ value: '16"', priceAdjustment: 150 });
    expect(wig.attributes["Hair type"]).toBe("Human hair");
  });

  it("reports clear row-level errors and writes nothing for bad rows", () => {
    const bad = "name,category,subcategory,price,brand,description\nX,nope,dresses,10,B,D\nY,shoes,heels,-5,B,D\nY,shoes,heels,50,B,D\n";
    const { seeds, errors } = csvToSeeds(bad);
    expect(seeds.length).toBe(1);
    expect(errors.length).toBe(2);
    expect(errors[0]).toContain("Row 2");
    expect(errors[0]).toContain('unknown category "nope"');
    expect(errors[1]).toContain("price");
  });

  it("rejects a CSV without required columns", () => {
    expect(csvToSeeds("name,price\nA,1").errors[0]).toContain("Missing required column");
  });
});
