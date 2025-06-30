export function parseJsonText(text: string): Record<string, string> {
    const splitPattern = /\n(?:\d{0,2})?/g;
    const rawLines = text.split(splitPattern).map(line => line.trim()).filter(Boolean);

    const result: Record<string, any> = {};
    result["raw_lines"] = rawLines;
    return result;
}
