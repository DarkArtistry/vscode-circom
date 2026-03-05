import * as vscode from "vscode";

export interface IncludeInfo {
  path: string;
  range: vscode.Range;
}

export interface SymbolInfo {
  name: string;
  kind: "template" | "function";
  uri: vscode.Uri;
  range: vscode.Range;
}

const INCLUDE_RE = /include\s+"([^"]+)"/g;
const TEMPLATE_RE = /^\s*template\s+(\w+)\s*\(/;
const FUNCTION_RE = /^\s*function\s+(\w+)\s*\(/;

export function parseIncludes(text: string): IncludeInfo[] {
  const results: IncludeInfo[] = [];
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    INCLUDE_RE.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = INCLUDE_RE.exec(lines[i])) !== null) {
      const pathStart = lines[i].indexOf(match[1], match.index);
      results.push({
        path: match[1],
        range: new vscode.Range(i, pathStart, i, pathStart + match[1].length),
      });
    }
  }
  return results;
}

export function parseSymbols(text: string, uri: vscode.Uri): SymbolInfo[] {
  const results: SymbolInfo[] = [];
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let match = TEMPLATE_RE.exec(lines[i]);
    if (match) {
      const col = lines[i].indexOf(match[1]);
      results.push({
        name: match[1],
        kind: "template",
        uri,
        range: new vscode.Range(i, col, i, col + match[1].length),
      });
      continue;
    }
    match = FUNCTION_RE.exec(lines[i]);
    if (match) {
      const col = lines[i].indexOf(match[1]);
      results.push({
        name: match[1],
        kind: "function",
        uri,
        range: new vscode.Range(i, col, i, col + match[1].length),
      });
    }
  }
  return results;
}
