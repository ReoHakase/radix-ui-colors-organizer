import { assertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";
import { camelCaseToWords, extractNumbers } from "./string.ts";

Deno.test("camelCaseToWords can convert a camel case string to words", () => {
  // Arrange
  const str = "camelCase123To456Words789";

  // Act
  const result = camelCaseToWords(str);

  // Assert
  assertEquals(result, ["camel", "case123", "to456", "words789"]);
});

Deno.test("extractNumbers can extract numbers from a string", () => {
  // Arrange
  const str = "hsla(27, 100%, 49.9%, 0.094)";

  // Act
  const result = extractNumbers(str);

  // Assert
  assertEquals(result, [27, 100, 49.9, 0.094]);
});
