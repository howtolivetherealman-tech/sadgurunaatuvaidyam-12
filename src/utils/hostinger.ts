export interface HostingerManifestItem {
  id: 'zip' | 'index' | 'htaccess' | 'robots' | 'sitemap' | 'manifest' | 'guide';
  filename: string;
  titleTe: string;
  titleEn: string;
  descTe: string;
  descEn: string;
  mimeType: string;
  staticUrl?: string;
}

export const HOSTINGER_FILES_MANIFEST: HostingerManifestItem[] = [
  {
    id: 'zip',
    filename: 'hostinger-deploy.zip',
    titleTe: 'సంపూర్ణ Hostinger ZIP ప్యాకేజీ (All-in-One)',
    titleEn: 'Complete Hostinger ZIP Package (All-in-One)',
    descTe: 'index.html, .htaccess, robots.txt, sitemap.xml అన్నీ కలిపి ఒకే ZIP ఫైల్.',
    descEn: 'Single archive containing index.html, .htaccess, robots.txt, sitemap.xml & guide.',
    mimeType: 'application/zip',
    staticUrl: '/hostinger-deploy.zip',
  },
  {
    id: 'index',
    filename: 'index.html',
    titleTe: 'ప్రధాన వెబ్‌సైట్ ఫైల్ (index.html)',
    titleEn: 'Standalone Website File (index.html)',
    descTe: '24 సేవలు, యూట్యూబ్ వీడియోలు, యంత్రాలు & అడ్మిన్ పోర్టల్ ఉన్న ప్రధాన ఫైల్.',
    descEn: 'Complete standalone HTML file with all 24 services, videos, yantras & admin panel.',
    mimeType: 'text/html',
    staticUrl: '/index.html',
  },
  {
    id: 'htaccess',
    filename: '.htaccess',
    titleTe: 'Hostinger సర్వర్ కాన్ఫిగరేషన్ (.htaccess)',
    titleEn: 'Hostinger LiteSpeed/Apache Config (.htaccess)',
    descTe: 'HTTPS రీడైరెక్ట్, GZIP కంప్రెషన్, ఫాస్ట్ క్యాషింగ్ & SPA రౌటింగ్ కోసం.',
    descEn: 'Enables SSL redirect, UTF-8 Telugu encoding, GZIP compression & SPA fallback.',
    mimeType: 'text/plain',
  },
  {
    id: 'robots',
    filename: 'robots.txt',
    titleTe: 'గూగుల్ సెర్చ్ క్రాలర్ ఫైల్ (robots.txt)',
    titleEn: 'Search Engine Crawler Rules (robots.txt)',
    descTe: 'గూగుల్ మరియు బింగ్ సెర్చ్ ఇంజన్లలో వెబ్‌సైట్ త్వరగా కనిపించడానికి.',
    descEn: 'Allows Googlebot and Bingbot to index all pages and links to sitemap.xml.',
    mimeType: 'text/plain',
  },
  {
    id: 'sitemap',
    filename: 'sitemap.xml',
    titleTe: 'XML సైట్‌మ్యాప్ (sitemap.xml)',
    titleEn: 'SEO XML Sitemap (sitemap.xml)',
    descTe: 'తెలుగు & ఇంగ్లీష్ పేజీల SEO ర్యాంకింగ్ కోసం XML సైట్‌మ్యాప్.',
    descEn: 'Bilingual hreflang XML sitemap with all sections for Google Search Console.',
    mimeType: 'application/xml',
  },
  {
    id: 'manifest',
    filename: 'site.webmanifest',
    titleTe: 'వెబ్ యాప్ మానిఫెస్ట్ (site.webmanifest)',
    titleEn: 'Web App Manifest (site.webmanifest)',
    descTe: 'మొబైల్ హోమ్ స్క్రీన్ షార్ట్‌కట్ మరియు థీమ్ రంగుల కోసం.',
    descEn: 'PWA metadata for mobile home screen installation and theme colors.',
    mimeType: 'application/manifest+json',
  },
  {
    id: 'guide',
    filename: 'HOSTINGER_UPLOAD_GUIDE.txt',
    titleTe: 'అప్‌లోడ్ గైడ్ (తెలుగు & ఇంగ్లీష్)',
    titleEn: 'Step-by-Step Hostinger Upload Guide',
    descTe: 'Hostinger hPanel లో public_html కి ఫైల్స్ ఎలా అప్‌లోడ్ చేయాలో సులువైన సూచనలు.',
    descEn: 'Bilingual instructions for uploading to Hostinger hPanel public_html.',
    mimeType: 'text/plain',
  },
];

export function generateHostingerHtaccess(): string {
  return `# ==============================================================================
# Hostinger (LiteSpeed & Apache) Production Configuration
# Sadguru Natu Vaidyam - Srinivas Maharaj (Phone: 7093586539)
# Optimized for Single-Page Applications (SPA), Fast Caching & Security
# ==============================================================================

# 1. Force UTF-8 Encoding for Telugu & English Fonts
AddDefaultCharset UTF-8
DefaultLanguage te

# 2. Prevent Directory Browsing
Options -Indexes

# 3. Set Default Directory Index
DirectoryIndex index.html

# 4. Block Access to Hidden & Sensitive Files (.env, .git, etc.)
<FilesMatch "^\\.(?!htaccess$|well-known)">
  <IfModule mod_authz_core.c>
    Require all denied
  </IfModule>
  <IfModule !mod_authz_core.c>
    Order allow,deny
    Deny from all
  </IfModule>
</FilesMatch>

# Explicitly allow SEO & Manifest support files
<FilesMatch "^(robots\\.txt|sitemap\\.xml|site\\.webmanifest)$">
  <IfModule mod_authz_core.c>
    Require all granted
  </IfModule>
</FilesMatch>

# 5. HTTPS Redirection & SPA Routing (Hostinger LiteSpeed / Apache)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Automatically redirect HTTP to HTTPS on Hostinger
  RewriteCond %{HTTPS} off
  RewriteCond %{HTTP:X-Forwarded-Proto} !https
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Serve existing files or directories directly
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d [OR]
  RewriteCond %{REQUEST_FILENAME} -l
  RewriteRule ^ - [L]

  # Fallback all other routes to index.html for Single Page Routing
  RewriteRule . /index.html [L]
</IfModule>

# 6. Gzip & Deflate Compression (LiteSpeed / Apache)
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE application/manifest+json
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE image/svg+xml
  AddOutputFilterByType DEFLATE font/ttf
  AddOutputFilterByType DEFLATE font/otf
  AddOutputFilterByType DEFLATE font/woff
  AddOutputFilterByType DEFLATE font/woff2
</IfModule>

# 7. Browser Caching (LiteSpeed Cache / mod_expires)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"

  # HTML: Cache for 1 hour so new YouTube videos & ads reflect quickly
  ExpiresByType text/html "access plus 1 hour"

  # CSS & JavaScript: 1 year
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"

  # Media & Images: 1 year
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"

  # Web Fonts
  ExpiresByType font/ttf "access plus 1 year"
  ExpiresByType font/otf "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# 8. Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
`;
}

export function generateHostingerRobotsTxt(
  domainUrl: string = 'https://sadgurunatuvaidyam.com'
): string {
  const cleanDomain = domainUrl.replace(/\/+$/, '');
  return `User-agent: *
Allow: /

# Hostinger Crawlers & Verification
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# XML Sitemap
Sitemap: ${cleanDomain}/sitemap.xml
`;
}

export function generateHostingerSitemapXml(
  domainUrl: string = 'https://sadgurunatuvaidyam.com',
  lastmod: string = '2026-10-27'
): string {
  const cleanDomain = domainUrl.replace(/\/+$/, '');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${cleanDomain}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="te" href="${cleanDomain}/?lang=te" />
    <xhtml:link rel="alternate" hreflang="en" href="${cleanDomain}/?lang=en" />
  </url>
  <url>
    <loc>${cleanDomain}/#services</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${cleanDomain}/#videos</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${cleanDomain}/#yantras</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${cleanDomain}/#private-ads</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${cleanDomain}/#consultation</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;
}

export function generateHostingerWebManifest(): string {
  return JSON.stringify(
    {
      name: 'సద్గురు నాటు వైద్యం & తంత్ర కేంద్రం - శ్రీనివాస్ మహారాజ్',
      short_name: 'Sadguru Natu Vaidyam',
      description:
        'సద్గురు నాటు వైద్యం & తంత్ర కేంద్రం - శ్రీనివాస్ మహారాజ్. వశీకరణ, భార్యాభర్తల సమస్యలు, ఆర్థిక ఇబ్బందులు, మరుగు మందు, యంత్రాలు మరియు ప్రతి సమస్యకు శాశ్వత పరిష్కారం. Phone: 7093586539',
      start_url: '/',
      display: 'standalone',
      background_color: '#090503',
      theme_color: '#d97706',
      lang: 'te',
      orientation: 'portrait-primary',
    },
    null,
    2
  );
}

export function generateHostingerUploadGuide(): string {
  return `================================================================================
HOSTINGER UPLOAD & SETUP GUIDE (తెలుగు & ENGLISH)
Sadguru Natu Vaidyam & Tantra Centre (శ్రీనివాస్ మహారాజ్)
================================================================================

[TELUGU / తెలుగు వివరణ]
ఈ ఫోల్డర్‌లో Hostinger లో వెబ్‌సైట్ అప్‌లోడ్ చేయడానికి అవసరమైన అన్ని ఫైల్స్ ఉన్నాయి:
1. index.html   -> సంపూర్ణ వెబ్‌సైట్ (24 సేవలు, యూట్యూబ్ ఛానల్ లింక్, ప్రైవేట్ యాడ్స్, యంత్రాలు)
2. .htaccess    -> Hostinger LiteSpeed సర్వర్ కోసం HTTPS రీడైరెక్ట్, ఫాస్ట్ క్యాషింగ్ & రక్షణ ఫైల్
3. robots.txt   -> గూగుల్ సెర్చ్‌లో వెబ్‌సైట్ త్వరగా ర్యాంక్ అవ్వడానికి
4. sitemap.xml  -> వెబ్‌సైట్ పేజీలు & సెక్షన్ల లింకుల సైట్‌మ్యాప్

HOSTINGER లో అప్‌లోడ్ చేసే విధానం (5 సులువైన స్టెప్స్):
--------------------------------------------------------------------------------
స్టెప్ 1: మీ Hostinger ఖాతాలో లాగిన్ అవ్వండి: https://hpanel.hostinger.com
స్టెప్ 2: ఎడమ వైపు ఉన్న 'Websites' పై క్లిక్ చేసి, మీ డొమైన్ పక్కన ఉన్న 'Manage' బటన్ నొక్కండి.
స్టెప్ 3: 'File Manager' (ఫైల్ మేనేజర్) ఓపెన్ చేయండి.
స్టెప్ 4: అక్కడ 'public_html' అనే ఫోల్డర్ కనిపిస్తుంది. దానిపై డబుల్ క్లిక్ చేసి ఓపెన్ చేయండి.
         (గమనిక: ఒకవేళ అక్కడ పాత డెమో ఫైల్స్ ఉంటే వాటిని డిలీట్ చేయవచ్చు).
స్టెప్ 5: పైన ఉన్న 'Upload' బటన్ నొక్కి, ఈ 4 ఫైల్స్‌ను నేరుగా public_html లోకి అప్‌లోడ్ చేయండి:
         - index.html
         - .htaccess  (ఇది డాట్‌తో మొదలవుతుంది కాబట్టి hidden files లో కనిపించవచ్చు)
         - robots.txt
         - sitemap.xml

వెంటనే మీ వెబ్‌సైట్ Hostinger లో లైవ్ అవుతుంది! ఎటువంటి npm లేదా nodejs ఇన్‌స్టాలేషన్ అవసరం లేదు.
అడ్మిన్ పిన్: 1977

================================================================================
[ENGLISH INSTRUCTIONS]
Files provided for Hostinger:
1. index.html   -> 100% self-contained standalone website (all 24 services, video gallery, ads, yantras)
2. .htaccess    -> Production LiteSpeed/Apache config with SSL redirect, GZIP compression & SPA routing
3. robots.txt   -> Directs Google and Bing search crawlers
4. sitemap.xml  -> Search engine sitemap

HOW TO UPLOAD TO HOSTINGER HPANEL (5 Simple Steps):
--------------------------------------------------------------------------------
Step 1: Log in to your Hostinger hPanel dashboard (https://hpanel.hostinger.com)
Step 2: Go to 'Websites' and click 'Manage' next to your domain name.
Step 3: Click 'File Manager' under the Files section.
Step 4: Double-click and open the 'public_html' folder.
Step 5: Click the 'Upload' button (arrow icon at top right) and upload these files:
        - index.html
        - .htaccess
        - robots.txt
        - sitemap.xml

Your website is now 100% live with fast caching and SSL enabled!
Admin PIN: 1977
================================================================================
`;
}

export function getHostingerFileContentById(
  id: 'htaccess' | 'robots' | 'sitemap' | 'manifest' | 'guide'
): string {
  switch (id) {
    case 'htaccess':
      return generateHostingerHtaccess();
    case 'robots':
      return generateHostingerRobotsTxt();
    case 'sitemap':
      return generateHostingerSitemapXml();
    case 'manifest':
      return generateHostingerWebManifest();
    case 'guide':
      return generateHostingerUploadGuide();
  }
}
