import * as vscode from "vscode";
import * as fs from "fs";
import { parseIncludes, parseSymbols, IncludeInfo, SymbolInfo } from "./parser";
import { resolveIncludePath } from "./resolver";

interface FileCache {
  includes: IncludeInfo[];
  symbols: SymbolInfo[];
}

const cache = new Map<string, FileCache>();

function getText(uri: vscode.Uri): string {
  const openDoc = vscode.workspace.textDocuments.find(
    (d) => d.uri.toString() === uri.toString()
  );
  if (openDoc) {
    return openDoc.getText();
  }
  return fs.readFileSync(uri.fsPath, "utf-8");
}

function getFileCache(uri: vscode.Uri): FileCache {
  const key = uri.toString();
  const cached = cache.get(key);
  if (cached) return cached;

  const text = getText(uri);
  const entry: FileCache = {
    includes: parseIncludes(text),
    symbols: parseSymbols(text, uri),
  };
  cache.set(key, entry);
  return entry;
}

export function invalidate(uri: vscode.Uri): void {
  cache.delete(uri.toString());
}

export function invalidateAll(): void {
  cache.clear();
}

export function getIncludes(uri: vscode.Uri): IncludeInfo[] {
  return getFileCache(uri).includes;
}

export function getSymbols(uri: vscode.Uri): SymbolInfo[] {
  return getFileCache(uri).symbols;
}

export function findSymbol(
  name: string,
  fromUri: vscode.Uri,
  visited: Set<string> = new Set()
): SymbolInfo | undefined {
  const key = fromUri.toString();
  if (visited.has(key)) return undefined;
  visited.add(key);

  const fileCache = getFileCache(fromUri);

  // Check local symbols first
  const local = fileCache.symbols.find((s) => s.name === name);
  if (local) return local;

  // Recurse into includes
  for (const inc of fileCache.includes) {
    const resolved = resolveIncludePath(inc.path, fromUri);
    if (!resolved) continue;
    const found = findSymbol(name, resolved, visited);
    if (found) return found;
  }

  return undefined;
}

export function createWatcher(): vscode.Disposable {
  const watcher = vscode.workspace.createFileSystemWatcher("**/*.circom");
  const onChange = (uri: vscode.Uri) => invalidate(uri);
  return vscode.Disposable.from(
    watcher,
    watcher.onDidChange(onChange),
    watcher.onDidDelete(onChange),
    watcher.onDidCreate(onChange)
  );
}
