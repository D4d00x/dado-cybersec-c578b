import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const RSS_FEEDS = [
  {
    url: 'https://www.cert.se/feed.rss',
    source: 'CERT-SE',
    category: 'Varning',
    language: 'sv',
  },
  {
    url: 'https://feeds.feedburner.com/TheHackersNews',
    source: 'The Hacker News',
    category: 'Hotbild',
    language: 'en',
  },
  {
    url: 'https://www.bleepingcomputer.com/feed/',
    source: 'BleepingComputer',
    category: 'Hotbild',
    language: 'en',
  },
];

// Keywords that indicate relevance to Swedish audience / cybersecurity
const BOOST_KEYWORDS = [
  'sweden', 'sverige', 'swedish', 'nordisk', 'nordic', 'eu ', 'europa',
  'nis2', 'gdpr', 'ransomware', 'vulnerability', 'sårbarhet', 'breach',
  'intrång', 'attack', 'phishing', 'malware', 'zero-day', 'exploit',
  'critical', 'kritisk', 'cert-se', 'msb',
];

function parseDate(dateStr) {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date() : d;
}

function extractTextFromXml(xml, tag) {
  const regex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>|<${tag}[^>]*>([^<]*)</${tag}>`, 'gi');
  const matches = [];
  let match;
  while ((match = regex.exec(xml)) !== null) {
    matches.push((match[1] || match[2] || '').trim());
  }
  return matches;
}

function stripHtml(str) {
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function truncate(str, maxLength) {
  const clean = stripHtml(str).replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) return clean;
  return clean.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

function categorize(title, description, source) {
  const text = `${title} ${description}`.toLowerCase();
  if (source === 'CERT-SE') return 'Varning';
  if (/nis2|gdpr|regulat|directive|lag |regel|compliance|policy/.test(text)) return 'Regelverk';
  if (/tip|guide|how to|protect|skydda|förebygg|säkra|bästa praxis|best pract/.test(text)) return 'Praktiska tips';
  if (/ransomware|malware|attack|breach|intrång|phish|exploit|vulnerab|sårbar|zero.day|threat|hot/.test(text)) return 'Hotbild';
  return 'Nyheter';
}

async function fetchFeed(feed) {
  try {
    const response = await fetch(feed.url, {
      headers: { 'User-Agent': 'DadoCybersec-NewsBot/1.0' },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const xml = await response.text();

    // Split into items
    const items = xml.split(/<item[\s>]/i).slice(1);

    return items.slice(0, 10).map((item) => {
      const titles = extractTextFromXml(`<item>${item}`, 'title');
      const descriptions = extractTextFromXml(`<item>${item}`, 'description');
      const links = extractTextFromXml(`<item>${item}`, 'link');
      const pubDates = extractTextFromXml(`<item>${item}`, 'pubDate');

      const title = titles[0] || 'Utan titel';
      const description = descriptions[0] || '';
      const link = links[0] || '';
      const pubDate = pubDates[0] || '';

      return {
        title: stripHtml(title),
        excerpt: truncate(description, 200),
        link,
        date: parseDate(pubDate).toISOString().split('T')[0],
        source: feed.source,
        category: categorize(title, description, feed.source),
        language: feed.language,
      };
    });
  } catch (err) {
    console.error(`Failed to fetch ${feed.source}: ${err.message}`);
    return [];
  }
}

function scoreArticle(article) {
  let score = 0;
  const text = `${article.title} ${article.excerpt}`.toLowerCase();

  // Boost Swedish content
  if (article.language === 'sv') score += 5;

  // Boost keyword matches
  for (const kw of BOOST_KEYWORDS) {
    if (text.includes(kw)) score += 2;
  }

  // Boost recent articles
  const daysOld = (Date.now() - new Date(article.date).getTime()) / (1000 * 60 * 60 * 24);
  if (daysOld < 1) score += 3;
  else if (daysOld < 3) score += 2;
  else if (daysOld < 7) score += 1;

  return score;
}

async function main() {
  console.log('Fetching cybersecurity news...');

  const results = await Promise.all(RSS_FEEDS.map(fetchFeed));
  const allArticles = results.flat();

  console.log(`Fetched ${allArticles.length} articles total`);

  // Score and sort
  const scored = allArticles
    .map((a) => ({ ...a, score: scoreArticle(a) }))
    .sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date));

  // Pick top 6 with category diversity
  const selected = [];
  const usedCategories = new Set();

  for (const article of scored) {
    if (selected.length >= 6) break;

    // Prefer category diversity for first 3
    if (selected.length < 3 && usedCategories.has(article.category)) continue;

    selected.push({
      title: article.title,
      excerpt: article.excerpt,
      date: article.date,
      category: article.category,
      source: article.source,
      link: article.link,
    });
    usedCategories.add(article.category);
  }

  // If we don't have enough due to diversity filter, fill up
  if (selected.length < 6) {
    for (const article of scored) {
      if (selected.length >= 6) break;
      if (selected.some((s) => s.title === article.title)) continue;
      selected.push({
        title: article.title,
        excerpt: article.excerpt,
        date: article.date,
        category: article.category,
        source: article.source,
        link: article.link,
      });
    }
  }

  const output = {
    lastUpdated: new Date().toISOString(),
    articles: selected,
  };

  const outputPath = resolve(__dirname, '..', 'public', 'news.json');
  writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`Wrote ${selected.length} articles to ${outputPath}`);
  console.log('Articles:');
  selected.forEach((a, i) => console.log(`  ${i + 1}. [${a.category}] ${a.title}`));
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
