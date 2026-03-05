import * as vscode from "vscode";
import { getIncludes } from "./symbolIndex";
import { resolveIncludePath } from "./resolver";

export class CircomDocumentLinkProvider implements vscode.DocumentLinkProvider {
  provideDocumentLinks(document: vscode.TextDocument): vscode.DocumentLink[] {
    const includes = getIncludes(document.uri);
    const links: vscode.DocumentLink[] = [];

    for (const inc of includes) {
      const resolved = resolveIncludePath(inc.path, document.uri);
      if (resolved) {
        links.push(new vscode.DocumentLink(inc.range, resolved));
      }
    }

    return links;
  }
}
