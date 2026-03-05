import * as vscode from "vscode";
import { CircomDefinitionProvider } from "./definitionProvider";
import { CircomDocumentLinkProvider } from "./documentLinkProvider";
import { createWatcher, invalidate } from "./symbolIndex";

const CIRCOM_SELECTOR: vscode.DocumentSelector = { language: "circom" };

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(
      CIRCOM_SELECTOR,
      new CircomDefinitionProvider()
    ),
    vscode.languages.registerDocumentLinkProvider(
      CIRCOM_SELECTOR,
      new CircomDocumentLinkProvider()
    ),
    createWatcher(),
    vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document.languageId === "circom") {
        invalidate(e.document.uri);
      }
    })
  );
}

export function deactivate(): void {}
