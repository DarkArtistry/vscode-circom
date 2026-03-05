import * as vscode from "vscode";
import { parseIncludes } from "./parser";
import { resolveIncludePath } from "./resolver";
import { findSymbol } from "./symbolIndex";

const KEYWORDS = new Set([
  "signal",
  "input",
  "output",
  "var",
  "component",
  "template",
  "function",
  "if",
  "else",
  "for",
  "while",
  "return",
  "include",
  "pragma",
  "circom",
  "log",
  "assert",
  "public",
  "parallel",
  "custom",
  "bus",
]);

export class CircomDefinitionProvider implements vscode.DefinitionProvider {
  provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.Definition | undefined {
    // Check if clicking on an include path
    const line = document.lineAt(position.line).text;
    const includes = parseIncludes(line + "\n");
    // Adjust: parseIncludes works on full text, line numbers will be 0-based
    // But we passed a single line so results have line=0; remap to actual line
    for (const inc of includes) {
      const range = new vscode.Range(
        position.line,
        inc.range.start.character,
        position.line,
        inc.range.end.character
      );
      if (range.contains(position)) {
        const resolved = resolveIncludePath(inc.path, document.uri);
        if (resolved) {
          return new vscode.Location(resolved, new vscode.Position(0, 0));
        }
        return undefined;
      }
    }

    // Otherwise, try symbol lookup
    const wordRange = document.getWordRangeAtPosition(position, /[a-zA-Z_]\w*/);
    if (!wordRange) return undefined;

    const word = document.getText(wordRange);
    if (KEYWORDS.has(word)) return undefined;

    const symbol = findSymbol(word, document.uri);
    if (symbol) {
      return new vscode.Location(symbol.uri, symbol.range);
    }

    return undefined;
  }
}
