# Mayleki Asset Chunking Guidelines

- Vendor dependencies (`react`, `react-router-dom`) are grouped into core bundles.
- Heavy iconography (`react-icons`) and chart libraries are code-split dynamically.
- Critical Above-The-Fold CSS is prioritized during initial render.
