# Continuous Deployment & Rollback Guide

- Auto-deploy triggers on every push to `main`.
- If smoke tests fail, Render / Vercel maintains previous zero-downtime container.
- Manual rollback available via Git commit revert or Dashboard instant restore.
