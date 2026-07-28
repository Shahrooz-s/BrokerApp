# LIXI Public Capture And Development Skill

Last updated: 28 July 2026

## Purpose

This note records the source-safe LIXI public research capture and the Codex skill created to keep future BrokerApp development aligned to LIXI standards without copying restricted LIXI content.

## Capture Boundary

The public capture is deliberately limited to:

- Page URL.
- HTTP status.
- Page title.
- Public headings.
- Public links.
- Short public excerpts for orientation.

It excludes:

- Downloads.
- Member-only material.
- LIXI schemas.
- XML/JSON samples.
- CSV schema representations.
- Generated schema documentation.
- Archives.
- Authentication areas.
- BrokerEngine private material.
- Lender-private EGB/calculator material.

## Capture Output

Local untracked output:

- `/Users/shahroozsafanejad/Documents/New project 5/outputs/lixi-public-capture-2026-07-28/lixi-public-capture.md`
- `/Users/shahroozsafanejad/Documents/New project 5/outputs/lixi-public-capture-2026-07-28/lixi-public-capture.json`

Do not commit this output unless it is reviewed and intentionally approved as source-safe.

## Skill Location

Created and validated:

- `/Users/shahroozsafanejad/.codex/skills/brokerapp-lixi-standards-guard`

Files:

- `SKILL.md`: trigger rules and workflow.
- `references/lixi-public-standards-map.md`: public standards map and BrokerApp implications.
- `references/brokerapp-lixi-development-checklist.md`: source-safety and implementation checklist.
- `scripts/crawl_lixi_public.py`: source-safe public LIXI metadata crawler.
- `scripts/lixi_guard_check.py`: local source-safety and guardrail scanner.
- `agents/openai.yaml`: UI metadata.

Validation:

```bash
python3 /Users/shahroozsafanejad/.codex/skills/.system/skill-creator/scripts/quick_validate.py \
  /Users/shahroozsafanejad/.codex/skills/brokerapp-lixi-standards-guard
```

Result: valid.

## Recommended Use

Before LIXI-related BrokerApp changes:

```bash
python3 /Users/shahroozsafanejad/.codex/skills/brokerapp-lixi-standards-guard/scripts/lixi_guard_check.py \
  README.md \
  lixi-standards-overview.md \
  lixi-to-twenty-mapping.md \
  brokerapp-api-integration-spec.md
```

For public LIXI refreshes:

```bash
python3 /Users/shahroozsafanejad/.codex/skills/brokerapp-lixi-standards-guard/scripts/crawl_lixi_public.py \
  --out "/Users/shahroozsafanejad/Documents/New project 5/outputs/lixi-public-capture-$(date +%F)" \
  --max-pages 60
```

Review the output before relying on it. If command-line access is blocked, use browser/web inspection and document the block rather than bypassing controls.

Any future use of captured LIXI-oriented metadata in implementation must still follow licence boundaries, provider gating, lender or aggregator approval, borrower consent where applicable, and audit logging.
