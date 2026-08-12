# AGENTS.md

## Project purpose

This repository is the personal GitHub Pages site for JinZhe Li / Golden Philosophy.
It presents public projects, research interests, and current research work at
<https://lijinzh.github.io/>.

## Repository structure

- `index.html`: page content, metadata, navigation, and project links.
- `styles.css`: responsive layout and the 8-bit neon / pixel visual system.
- `script.js`: navigation, project filtering, and small interface behaviors.
- `assets/`: local artwork, favicon, and project screenshots.
- `tests/site.test.mjs`: dependency-free structural and local-asset checks.
- `.github/workflows/ci.yml`: GitHub Actions site checks.
- `.nojekyll`: keeps GitHub Pages on the static-file publishing path.

## Working rules

- Keep the site dependency-free unless a new dependency is clearly justified.
- Preserve the current visual direction: dark neon research-lab sections combined
  with warm paper-colored project and research sections.
- Prefer sharp pixel borders, crisp artwork, cyan/pink/lime accents, and readable
  Chinese copy. Avoid generic corporate cards or unrelated stock photography.
- Use real project information and working public links. Do not invent metrics,
  affiliations, research results, or project status.
- Keep local assets inside `assets/`; do not hotlink project images.
- Optimize large images before committing when practical, while preserving enough
  detail for desktop displays.
- Do not add API keys, access tokens, `.env` files, private URLs, personal data, or
  other secrets. This is a public repository.
- Do not modify the source repositories for the projects shown on this page as part
  of a homepage-only change.
- Preserve unrelated working-tree changes and avoid destructive Git operations.

## Content and accessibility

- Simplified Chinese is the primary language; concise English labels may be used as
  part of the visual identity.
- Every meaningful image must have useful alternative text.
- Interactive controls must remain keyboard accessible and show a clear focus state.
- External links opened in a new tab must include `rel="noreferrer"`.
- Respect `prefers-reduced-motion` and do not hide essential content behind animation.
- Keep the footer attribution: `Made by Golden Philosophy`.

## Responsive requirements

- Treat desktop and a `390 × 844` mobile viewport as required validation targets.
- The page must not introduce horizontal scrolling at either target.
- Check image cropping, large Chinese headings, project filters, mobile navigation,
  and footer readability after visual changes.

## Verification

Before committing a change, run:

```powershell
npm test
git diff --check
```

For rendered UI changes, also preview the page in a browser and verify:

1. The page title and main content load correctly.
2. Local images load with non-zero natural dimensions.
3. Browser console contains no relevant errors or warnings.
4. At least one affected interaction works, such as project filtering or mobile navigation.
5. Desktop and `390 × 844` mobile layouts have no overflow, clipping, or broken assets.

## Publishing

- The production branch is `main`.
- GitHub Pages publishes from the repository root.
- Do not force-push.
- After pushing, confirm both the `Site checks` and `pages build and deployment`
  workflows succeed.
- Verify the live page with a cache-busting query parameter before claiming the
  deployment is complete.
- Confirm local `HEAD`, `origin/main`, and the live site all correspond to the new change.

