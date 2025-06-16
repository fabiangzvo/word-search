/**
 * Extracts and converts a JSON object from a text string.
 * @param str - The string containing the JSON object.
 * @returns - Return JSON if found and valid, otherwise `null`.
 */
export function extractJsonObject<T>(str: string): T {
  const regex = /\{[\s\S]*\}/g;
  const match = str.match(regex);

  if (!match || match.length <= 0) {
    console.error("json was not found.");

    return {} as T;
  }

  try {
    const json = JSON.parse(match[0]) as T;

    return json;
  } catch (error) {
    console.error("error parsing json:", error);

    return {} as T;
  }
}
