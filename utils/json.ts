/**
 * Extracts and converts a JSON object from a text string.
 * @param str - The string containing the JSON object.
 * @returns - Return JSON if found and valid, otherwise `null`.
 */
export function extractJsonObject(str: string): Record<string, any> {
  const regex = /\{[\s\S]*\}/g;
  const match = str.match(regex);

  if (!match || match.length <= 0) {
    console.error("json was not found.");

    return {};
  }

  try {
    const json = JSON.parse(match[0]) as Record<string, any>;

    return json;
  } catch (error) {
    console.error("error parsing json:", error);

    return {};
  }
}
