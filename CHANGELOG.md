# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/) and uses semantic versioning.

## [1.0.0] - 2026-03-29

### Added
- OpenClaw setup cost calculator for estimating daily and monthly spend.
- Primary model cost estimation based on model choice, message volume, token usage, and thinking intensity.
- Heartbeat budget calculator for idle/background token burn.
- Fallback cost modeling with blended spend based on fallback trigger rate.
- Multi-agent cost scaling for simultaneous agent workloads.
- Risk labels and cost warnings for high-spend setups.
- Cost-reduction tips with one-click optimizations.
- Shareable URL state for exact configuration replay.
- Copyable result summary for posting or comparing setups.
- GuardClaw landing page and ecosystem framing for the tool.

### Changed
- Moved cost estimation from vague budgeting to a structured model/heartbeat/fallback breakdown.
- Framed the tool around visibility into hidden burn instead of simple token math.
- Added a more editorial, problem-first presentation around real OpenClaw pain points.

### Fixed
- Reduced the chance of underestimating spend from background heartbeats and fallback paths.
- Clarified the difference between free-tier, local, and pay-per-token models.
- Improved decision visibility for users comparing similar setup choices.

### Removed
- No prior shipped release features to remove in the initial version.

### Deprecated
- No deprecated behavior in the initial version.

## [Unreleased]

### Added
- Future changes will be listed here before release.

### Changed

### Fixed

### Removed

### Deprecated

