import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function resolveIncludePath(
  includePath: string,
  fromUri: vscode.Uri
): vscode.Uri | undefined {
  // 1. Relative to the including file
  const relative = path.resolve(path.dirname(fromUri.fsPath), includePath);
  if (fs.existsSync(relative)) {
    return vscode.Uri.file(relative);
  }

  // 2. Workspace node_modules
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders) {
    for (const folder of workspaceFolders) {
      const nmPath = path.join(folder.uri.fsPath, "node_modules", includePath);
      if (fs.existsSync(nmPath)) {
        return vscode.Uri.file(nmPath);
      }
    }
  }

  // 3. User-configured include paths
  const configPaths =
    vscode.workspace.getConfiguration("circom").get<string[]>("includePaths") ??
    [];
  for (const base of configPaths) {
    const resolved = path.resolve(base, includePath);
    if (fs.existsSync(resolved)) {
      return vscode.Uri.file(resolved);
    }
  }

  return undefined;
}
