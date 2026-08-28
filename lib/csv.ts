export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += char;
    } else if (char === '"') inQuotes = true;
    else if (char === ",") { row.push(field); field = ""; }
    else if (char === "\r") { if (text[i + 1] === "\n") i++; row.push(field); field = ""; rows.push(row); row = []; }
    else if (char === "\n") { row.push(field); field = ""; rows.push(row); row = []; }
    else field += char;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ""));
}

export function parseCsvWithHeaders(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const all = parseCsv(text.trim());
  if (!all.length) return { headers: [], rows: [] };
  const [headers, ...data] = all;
  return { headers, rows: data.map((values) => Object.fromEntries(headers.map((header, i) => [header, values[i] ?? ""]))) };
}
