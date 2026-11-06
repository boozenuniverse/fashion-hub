import { describe, it, expect } from "vitest";
import { addRecentSearch, MAX_RECENT, removeRecentSearch } from "@/lib/recent-searches";

describe("recent searches", () => {
  it("puts the newest first, ignores case duplicates and trims whitespace", () => {
    let list = addRecentSearch([], "  lace   front wig ");
    list = addRecentSearch(list, "Dress");
    list = addRecentSearch(list, "LACE FRONT WIG");
    expect(list).toEqual(["LACE FRONT WIG", "Dress"]);
  });
  it("ignores very short queries and caps the list", () => {
    expect(addRecentSearch(["a1"], "x")).toEqual(["a1"]);
    let list: string[] = [];
    for (let i = 0; i < 12; i++) list = addRecentSearch(list, `query ${i}`);
    expect(list.length).toBe(MAX_RECENT);
    expect(list[0]).toBe("query 11");
  });
  it("removes one entry", () => {
    expect(removeRecentSearch(["a b", "c d"], "a b")).toEqual(["c d"]);
  });
});
