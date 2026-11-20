<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

<img src="https://skillicons.dev/icons?i=ts,react,html,nodejs&theme=dark" alt="Tech stack"/>

</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1rd8horhhKa21avBpeM8YZnvsNm7BfejU

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Serving the production release

The distributed website is in `site/`. It contains the HTML entry point, the bundled JavaScript and CSS, and four Rajdhani font weights. Run `sha256sum -c production.sha256` from the repository root to check every published file. Preview this release with `python3 -m http.server 8000 --bind 127.0.0.1 --directory site`.

The React/TypeScript project at the repository root is the development source. Its HTML currently loads Tailwind and fonts from external providers. The deployed release bundles its CSS and fonts locally. The exact lockfile and packaging step for that release have not been recovered. Use the verified release directory when restoring production. External credentials should never be embedded in frontend JavaScript.

## Licensing

Licensing scope and preserved third-party permissions are documented in [LICENSING.md](LICENSING.md). The [0xfunboy Non-Commercial License](LICENSE.md) covers eligible original material only.
