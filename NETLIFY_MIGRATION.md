# Flexera Documentation - Netlify Migration

This repository has been converted from a PHP-based site to a static HTML/JavaScript site suitable for deployment on Netlify.

## Changes Made

### 1. File Structure Changes
- **Moved** `index.html` → `eol/index.html` (End-of-Life content)
- **Created** new `index.html` from `index.php`
- **Created** language-specific HTML files:
  - `index_jp.html` (Japanese)
  - `index_de.html` (German)
  - `index_es.html` (Spanish)
  - `index_fr.html` (French)
- **Created** `404/index.html` from `404/index.php`

### 2. PHP to JavaScript Conversion
The PHP `include()` functionality has been replaced with client-side JavaScript loaders that dispatch events when content is loaded:

- **Main loader**: `/js/includes-loader.js` - Loads English content
- **Language loaders**: 
  - `/js/includes-loader-jp.js` - Loads Japanese-specific includes
  - `/js/includes-loader-de.js` - Loads German-specific includes
  - `/js/includes-loader-es.js` - Loads Spanish-specific includes
  - `/js/includes-loader-fr.js` - Loads French-specific includes

These loaders dynamically fetch and insert HTML fragments from the `00_include/` directory, then dispatch an `includesLoaded` event to signal completion.

### 3. Local JavaScript Modifications
To ensure documentation links use relative paths instead of absolute URLs:

- **Downloaded** `docs-flexera.js` from `https://resources.flexera.com/web/includes/docs-flexera.js`
- **Modified** click handler to work with relative paths (changed link length check from `>= 6` to `>= 1`)
- **Implemented** event-based initialization that waits for includes to load before building product/version pickers
- **Updated** link behavior: HTML pages open in same tab (`_self`), PDFs/ZIPs open in new tab (`_blank`)
- **Hosted locally** at `/js/docs-flexera.js` instead of loading from external CDN

**Important**: All HTML index files now load scripts in this order:
1. jQuery (from external CDN)
2. Language-specific includes-loader
3. Local docs-flexera.js

This order ensures the `includesLoaded` event listener is properly registered before the event is dispatched.

### 3. Netlify Configuration
Created `netlify.toml` with:
- **Redirects**: All `.php` files redirect to their `.html` equivalents
- **Security headers**: CSP, HSTS, X-Content-Type-Options, etc.
- **Cache control**: Optimized caching for static assets
- **404 handling**: Custom 404 page

### 4. Header Conversion
PHP headers have been converted to:
- Meta tags in HTML for CSP and other policies
- Netlify headers configuration in `netlify.toml`

## How It Works

1. **Page Load**: User visits `index.html` or any language variant
2. **Includes Loader Starts**: The appropriate includes-loader script begins fetching HTML fragments
3. **Content Fetching**: Script fetches HTML fragments from `00_include/` in parallel
4. **DOM Insertion**: Content is inserted into the `#includes-container` element
5. **Event Dispatch**: Loader dispatches `includesLoaded` event
6. **Picker Initialization**: `docs-flexera.js` receives event and builds product/version pickers from loaded content
7. **Click Handlers**: Event handlers are attached to documentation links
8. **UI Ready**: User can now select products/versions and click documentation links

## Deployment to Netlify

### Quick Deploy
1. Connect your repository to Netlify
2. Set build settings:
   - **Build command**: (leave empty)
   - **Publish directory**: `.` (root)
3. Deploy!

### Manual Deploy
```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Deploy from the project directory
netlify deploy --prod
```

## Testing Locally

You can test the site locally using any static server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000

# Using PHP (for compatibility)
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Important Notes

1. **Include Files**: The HTML fragments in `00_include/` are loaded via fetch(), so they must be accessible via HTTP
2. **CORS**: Not an issue since all files are served from the same origin
3. **JavaScript Required**: The site now requires JavaScript to load documentation content
4. **Caching**: The `netlify.toml` sets appropriate cache headers for performance
5. **Event-Driven Loading**: The product/version pickers depend on the `includesLoaded` event - script load order matters
6. **Local Development**: Must use a local web server (not file:// protocol) for includes to load properly
7. **Link Behavior**: HTML documentation opens in same tab, PDF/ZIP files open in new tab

## Removed Files

The following PHP files have been deleted as they are no longer needed:

- `index.php`, `index2.php`
- `index_jp.php`, `index_de.php`, `index_es.php`, `index_fr.php`
- `404/index.php`
- `ror.xml`

## Maintenance

To update documentation content:

1. Edit HTML files in `00_include/` directory
2. Add new include files to the appropriate loader in `/js/`
3. Commit and push changes
4. Netlify will auto-deploy (if configured)

## Browser Compatibility

The JavaScript loaders use:

- `fetch()` API - Supported in all modern browsers
- Arrow functions - ES6 feature
- Template literals - ES6 feature
- CustomEvent - For event-driven initialization

Minimum browser requirements:

- Chrome 42+
- Firefox 39+
- Safari 10+
- Edge 14+

## Questions?

For issues or questions about this migration, contact the technical communications team.
