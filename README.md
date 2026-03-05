# Circom Language Support

Syntax highlighting, code snippets, and language configuration for the [Circom 2.x](https://docs.circom.io/) zero-knowledge circuit language.

**The first Circom extension available on Open VSX Registry** - works with VSCodium, Eclipse Theia, and other open editors.

## Features

### Syntax Highlighting

Full TextMate grammar for Circom 2.x including:

- **Keywords**: `pragma`, `include`, `template`, `function`, `signal`, `var`, `component`, `bus`
- **Modifiers**: `input`, `output`, `public`, `parallel`, `custom`
- **Control flow**: `if`, `else`, `for`, `while`, `do`, `return`
- **Constraint operators**: `<==`, `==>`, `<--`, `-->`, `===` (styled distinctly from standard operators)
- **Signal tags**: `{binary}`, `{maxbit}` annotations
- **Component main**: Special highlighting for `component main {public [...]} = ...`
- **Numeric literals**: Decimal and hexadecimal (`0xFF`)
- **Comments**: Line (`//`) and block (`/* */`)
- **Template/function calls**: Capitalized identifiers recognized as template instantiations

### Code Snippets

28 snippets to accelerate Circom development:

| Prefix | Description |
|---|---|
| `pragma` | Pragma version declaration |
| `include` | Include external circom file |
| `circomfile` | Full circom file boilerplate |
| `template` | Template declaration |
| `templatemain` | Template with component main |
| `templateparallel` | Parallel template declaration |
| `function` | Function declaration |
| `signalinput` | Input signal declaration |
| `signaloutput` | Output signal declaration |
| `signal` | Intermediate signal declaration |
| `signalinputtag` | Input signal with tag annotation |
| `component` | Component instantiation |
| `componentmain` | Main component declaration |
| `componentmainpublic` | Main component with public signals |
| `sca` | Signal constrain-assign `<==` |
| `scr` | Signal constrain-assign (right) `==>` |
| `sal` | Signal assign (no constraint) `<--` |
| `eqc` | Equality constraint `===` |
| `for` | For loop |
| `while` | While loop |
| `if` | If statement |
| `ifelse` | If-else statement |
| `log` | Log for debugging |
| `assert` | Assert statement |
| `vararray` | Variable array declaration |
| `var2d` | Variable 2D array declaration |
| `anon` | Anonymous component (Circom 2.1+) |
| `tuple` | Tuple destructuring assignment |
| `iszero` | Inline IsZero gadget pattern |

### Go-to-Definition

- **Ctrl+Click on `include` paths** to open the imported file
- **Ctrl+Click on template/function names** (e.g., `Poseidon`) to jump to the definition, even across included files
- Resolves paths relative to the file, then `node_modules/`, then user-configured `circom.includePaths`
- Clickable links on include paths for quick navigation

### Language Configuration

- Toggle line comments with `Cmd+/` / `Ctrl+/`
- Toggle block comments with `Shift+Alt+A`
- Auto-closing pairs for `{}`, `[]`, `()`, `""`, `/* */`
- Bracket matching and highlighting
- Smart indentation (C-style)
- Code folding support

## Installation

### From Open VSX (VSCodium / Theia)

Search for **"Circom Language Support"** in the extensions panel, or:

```bash
codium --install-extension darkartistry.circom-lang
```

### From VS Code Marketplace

Search for **"Circom Language Support"** in the extensions panel, or:

```bash
code --install-extension darkartistry.circom-lang
```

### From VSIX

Download the `.vsix` from [Releases](https://github.com/darkartistry/vscode-circom/releases), then:

```bash
codium --install-extension circom-lang-0.2.0.vsix
# or
code --install-extension circom-lang-0.2.0.vsix
```

## Supported Circom Versions

- Circom 2.0.x
- Circom 2.1.x (anonymous components, tuples, signal tags, bus)

## Roadmap

- **v0.3**: Diagnostics - red/yellow squiggly lines from `circom --inspect`
- **v1.0**: LSP integration - hover docs, auto-completion

## Contributing

Issues and pull requests welcome at [github.com/darkartistry/vscode-circom](https://github.com/darkartistry/vscode-circom).

## License

[MIT](LICENSE)
