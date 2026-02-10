# LinkBio

LinkBio is a self-hosted "link in bio" page that loads your profile and links from a single config file. It is designed to be lightweight, fast, and easy to deploy on any static host.

## Features

- Single-page link hub for Instagram and other social profiles
- Config-driven content in `config.json`
- Static HTML, CSS, and JavaScript (no build step)
- Optional local click persistence via `localStorage`
- Works on any static hosting provider

## Project Structure

- `index.html` - Main page with baked meta tags
- `style.css` - All styling
- `script.js` - Rendering and config loading logic
- `config.json` - Your profile, links, and site metadata

## Quick Start

1. Edit `config.json` with your profile, social links, and cards.
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
- `links` - Your cards (title, description, url, icon, category, active)

## Open Graph and Social Previews

`index.html` contains baked Open Graph meta tags for social previews. If you change the values in `config.json`, update the tags in `index.html` to match:

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
