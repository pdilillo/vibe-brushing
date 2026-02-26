---
name: version-bump
description: Increment semantic version numbers in package.json. Use when the user mentions version bump, version increment, releasing a new version, or asks to update major/minor/patch version.
---

# Version Bump

Increment the semantic version in `package.json` based on the type of changes made.

## When to Bump

| Change Type | Version Part | Example |
|-------------|--------------|---------|
| Breaking changes, major rewrites | **Major** | 2.0.0 → 3.0.0 |
| New features, backwards-compatible | **Minor** | 2.0.0 → 2.1.0 |
| Bug fixes, small tweaks | **Patch** | 2.0.0 → 2.0.1 |

## Process

1. Read current version from `package.json`
2. Parse version as `MAJOR.MINOR.PATCH`
3. Increment the appropriate part:
   - **Major**: increment major, reset minor and patch to 0
   - **Minor**: increment minor, reset patch to 0
   - **Patch**: increment patch only
4. Update `package.json` with new version
5. Confirm the change to the user

## Example

If current version is `2.1.3`:

- Major bump → `3.0.0`
- Minor bump → `2.2.0`
- Patch bump → `2.1.4`

## Determining Bump Type

If the user doesn't specify, ask which type of bump they want. If context from the conversation indicates the change type, suggest the appropriate bump:

- Added new monster types, new screens, new features → **Minor**
- Fixed a bug, corrected a typo, small UI tweaks → **Patch**
- Complete redesign, breaking API changes, major refactor → **Major**
