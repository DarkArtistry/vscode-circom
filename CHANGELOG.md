# Changelog

## [0.1.0] - 2026-02-28

### Added
- Syntax highlighting for Circom 2.x language
  - Keywords, types, modifiers, control flow
  - Constraint operators (`<==`, `==>`, `<--`, `-->`, `===`) with distinct styling
  - Template and function definitions with name highlighting
  - Signal tags (`{binary}`, `{maxbit}`)
  - `component main` with public signal annotations
  - Pragma and include directives
  - Numeric literals (decimal and hexadecimal)
  - String literals with escape sequences
  - Line and block comments
- 28 code snippets covering:
  - Boilerplate (pragma, include, full file template)
  - Template and function declarations
  - Signal and component declarations
  - Constraint and assignment operators
  - Control flow (for, while, if, if-else)
  - Built-ins (log, assert)
  - Advanced Circom 2.1+ features (anonymous components, tuples)
  - Common patterns (IsZero gadget)
- Language configuration
  - Comment toggling (`//` and `/* */`)
  - Bracket matching and auto-closing
  - Indentation rules
  - Code folding
