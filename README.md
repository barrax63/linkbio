# LinkBio

LinkBio is a self-hosted "link in bio" page that loads your profile and links from a single config file. It is designed to be lightweight, fast, and easy to deploy on any static host.

## Features

- Single-page link hub for Instagram and other social profiles
- Config-driven content in `config.json`
- Static HTML, CSS, and JavaScript (no build step)
- English and German link descriptions, picked from the visitor's browser language
- Works on any static hosting provider

## Project Structure

- `index.html` - Main page with baked meta tags
- `style.css` - All styling
- `script.js` - Rendering and config loading logic
- `config.json` - Your profile, links, and site metadata

## Quick Start

1. Rename `config.json.example` to `config.json` and edit with your profile, social links, and cards.
2. Open `index.html` through a local web server (recommended).
3. Deploy the folder to any static host.

### Local Preview

Any static server works. Examples:

- Python: `python -m http.server`
- Node: `npx serve`

Then open `http://localhost:8000` (or the port shown by your server).

## Configuration

All user-editable content is in `config.json`:

- `site.titleTemplate` - Title format (e.g., `{name} | LinkBio`)
- `site.description` - Meta description
- `site.ogTitle` - Open Graph title
- `site.ogDescription` - Open Graph description
- `site.footerHtml` - Footer HTML (use carefully)
- `profile` - Name, handle, bio, location, avatar URL
- `socials` - Icon links (platform + URL)
- `links` - Your cards (title, description, url, language, icon, category, active)

### Languages

The page shows English or German depending on the visitor's browser language (English if neither is preferred).

- `description` can be a plain string (shown to everyone) or one text per language:

  ```json
  "description": {
    "en": "Tutorials and vlogs every week",
    "de": "Jede Woche Tutorials und Vlogs"
  }
  ```

- `language` (optional) marks a page that only exists in one language (`"en"` or `"de"`). Visitors whose browser uses the other language see a "German only" / "Nur auf Englisch" note on the card. Leave it out for pages that are available in both.

## Open Graph and Social Previews

The page title, description, and Open Graph tags are set from `config.json` when the page loads. `index.html` also contains baked versions of these tags for social previews. If you want link previews to match your config, update the tags in `index.html` too:

- `<title>`
- `<meta name="description">`
- `<meta property="og:title">`
- `<meta property="og:description">`

Some social platforms do not execute JavaScript for previews, so these tags must exist at build/deploy time.

## Hosting

LinkBio is a static site. Upload all files to your host:

- `index.html`
- `style.css`
- `script.js`
- `config.json`

Make sure `config.json` is served with a JSON MIME type and is publicly accessible from the same origin as `index.html`.

## Notes

- The page uses `fetch('config.json')`, so opening `index.html` via `file://` may fail. Use a local server for preview.
- If you set `profile.avatar` to an invalid URL, the avatar will fall back to the initial.

## License

MIT license.
