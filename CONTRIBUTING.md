# Contributing to nuxoa-client

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Commit Message Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated semantic versioning and changelog generation.

### Commit Message Format

Each commit message consists of a **type**, an optional **scope**, and a **description**:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat` | A new feature | Minor |
| `fix` | A bug fix | Patch |
| `perf` | Performance improvement | Patch |
| `refactor` | Code refactoring | Patch |
| `docs` | Documentation changes | None |
| `style` | Code style changes (formatting) | None |
| `test` | Adding or updating tests | None |
| `chore` | Maintenance tasks | None |

### Breaking Changes

To trigger a **major** version bump, add `BREAKING CHANGE:` in the commit body or footer, or add `!` after the type:

```
feat!: remove deprecated API endpoints

BREAKING CHANGE: The `/v1/legacy` endpoints have been removed.
```

### Examples

```bash
# Feature (minor version bump: 1.0.0 → 1.1.0)
git commit -m "feat(cloud): add support for snapshots"

# Bug fix (patch version bump: 1.1.0 → 1.1.1)
git commit -m "fix(dns): correct record validation"

# Breaking change (major version bump: 1.1.1 → 2.0.0)
git commit -m "feat!: redesign client initialization"

# Documentation (no version bump)
git commit -m "docs: update API examples in README"
```

## Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes
4. Run tests: `bun test`
5. Commit using conventional commits
6. Push and create a Pull Request

## Running Tests

```bash
# Run all tests
bun test

# Run unit tests only
bun test:unit

# Run integration tests
bun test:integration
```

## Building

```bash
bun run build
```

## Questions?

Feel free to open an issue for any questions or concerns.
