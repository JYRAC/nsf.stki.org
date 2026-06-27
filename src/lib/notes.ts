// src/lib/notes.ts
// Note(note.com)のRSSを取得・パースする処理。
// ページのフロントマターから分離し、SSR時にリクエストのたびに呼び出される。

export interface NoteArticle {
  title: string;
  link: string;
  imgUrl: string;
  date: string;
  dateObj: Date;
  creator: string;
  labelColor: string;
}

interface NoteSource {
  url: string;
  creator: string;
  labelColor: string;
}

const NOTE_SOURCES: NoteSource[] = [
  {
    url: "https://note.com/jyrac_official/rss",
    creator: "JYRAC",
    labelColor: "bg-purple-600 text-white",
  },
  {
    url: "https://note.com/nsfprojct_2024/rss",
    creator: "NSF",
    labelColor: "bg-blue-600 text-white",
  },
];

const FALLBACK_ARTICLES: NoteArticle[] = [
  {
    title: "JYRAC (日本若者防災復興協会) 公式Note",
    link: "https://note.com/jyrac_official",
    imgUrl: "/新logo.jpg",
    date: "最新の活動",
    dateObj: new Date(0),
    creator: "JYRAC",
    labelColor: "bg-purple-600 text-white",
  },
  {
    title: "NSFプロジェクト 公式Note",
    link: "https://note.com/nsfprojct_2024",
    imgUrl: "/新logo.jpg",
    date: "最新の活動",
    dateObj: new Date(0),
    creator: "NSF",
    labelColor: "bg-blue-600 text-white",
  },
];

const DEFAULT_THUMBNAIL = "/新logo.jpg";
const FETCH_TIMEOUT_MS = 4000;

function formatDate(pubDate: string | null): { date: string; dateObj: Date } {
  const dateObj = pubDate ? new Date(pubDate) : new Date();
  if (Number.isNaN(dateObj.getTime())) {
    return { date: "最新記事", dateObj: new Date() };
  }
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  return { date: `${y}.${m}.${d}`, dateObj };
}

function extractTag(item: string, tag: string): string | null {
  const cdata = item.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`));
  if (cdata) return cdata[1].trim();
  const plain = item.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return plain ? plain[1].trim() : null;
}

function extractThumbnail(item: string): string {
  const mediaSelfClosing = item.match(/<media:thumbnail[^>]*url="([^"]+)"[^>]*\/?>/);
  if (mediaSelfClosing) return mediaSelfClosing[1];

  const mediaWithBody = item.match(/<media:thumbnail[^>]*>([\s\S]*?)<\/media:thumbnail>/);
  if (mediaWithBody && !mediaWithBody[1].includes("<")) return mediaWithBody[1].trim();

  const imgTag = item.match(/<img[^>]+src="([^">]+)"/);
  if (imgTag) return imgTag[1];

  return DEFAULT_THUMBNAIL;
}

/** RSS(XML)文字列をNoteArticleの配列に変換する。 */
function parseRss(xml: string | null, source: NoteSource): NoteArticle[] {
  if (!xml) return [];

  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

  return items.map((item) => {
    const title = extractTag(item, "title") ?? "無題の記事";
    const link = extractTag(item, "link") ?? "#";
    const { date, dateObj } = formatDate(extractTag(item, "pubDate"));

    return {
      title,
      link,
      imgUrl: extractThumbnail(item),
      date,
      dateObj,
      creator: source.creator,
      labelColor: source.labelColor,
    };
  });
}

async function fetchRss(source: NoteSource): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(source.url, { signal: controller.signal });
    return res.ok ? await res.text() : null;
  } catch {
    // タイムアウト・ネットワークエラー時はnullを返し、呼び出し側でフォールバックする
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * JYRAC・NSFのNote記事を取得し、日付降順で最新N件を返す。
 * 取得に失敗した場合はフォールバック記事を返す（サイトが空にならないようにする）。
 */
export async function getLatestNoteArticles(limit = 3): Promise<NoteArticle[]> {
  const results = await Promise.all(NOTE_SOURCES.map(fetchRss));

  const articles = results
    .flatMap((xml, i) => parseRss(xml, NOTE_SOURCES[i]))
    .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());

  return articles.length > 0 ? articles.slice(0, limit) : FALLBACK_ARTICLES;
}
