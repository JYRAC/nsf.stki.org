// src/lib/directus.ts
// Directus REST API (nsf_news コレクション) からお知らせ・活動報告を取得する。

const DIRECTUS_URL = import.meta.env.DIRECTUS_URL ?? "https://directus.jyrac.stki.org";
const COLLECTION = "nsf_news";

export type NewsArticle = {
  id: string | number;
  date_created: string;
  date_updated: string | null;
  published_at: string | null;
  title: string;
  category: "news" | "activity" | "event" | "press" | "recruit";
  badge_text?: string | null;
  is_urgent?: boolean | null;
  link?: string | null;
  content?: string | null;
  status: "draft" | "published" | "archived";
};

type DirectusListResponse = {
  data: NewsArticle[];
};

type DirectusItemResponse = {
  data: NewsArticle;
};

export type NewsListQuery = {
  limit?: number;
  sort?: string;
};

/**
 * お知らせ一覧を取得する。
 * Directusが落ちている場合やタイムアウト時は、サイトを落とさず空配列を返す。
 */
export const getNewsList = async (
  query: NewsListQuery = {}
): Promise<{ contents: NewsArticle[] }> => {
  try {
    const params = new URLSearchParams();
    params.set("filter[status][_eq]", "published");
    params.set("sort", query.sort ?? "-published_at");
    if (query.limit) params.set("limit", String(query.limit));

    // Directusがハングした時にサイトが止まらないよう3秒でタイムアウト設定
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${DIRECTUS_URL}/items/${COLLECTION}?${params.toString()}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error(`Directus getNewsList failed with status: ${res.status}`);
      return { contents: [] };
    }

    const json = (await res.json()) as DirectusListResponse;
    return { contents: json.data ?? [] };
  } catch (error) {
    console.error("Directus getNewsList error (fallbacking to empty list):", error);
    // エラーが起きても例外を投げずに空配列を返す
    return { contents: [] };
  }
};

/**
 * 記事詳細を取得する(news/[id].astro で使用)。
 * Directusが落ちている場合や存在しない場合は null を返す。
 */
export const getNewsDetail = async (id: string | number): Promise<NewsArticle | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${DIRECTUS_URL}/items/${COLLECTION}/${id}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error(`Directus getNewsDetail failed with status: ${res.status}`);
      return null;
    }

    const json = (await res.json()) as DirectusItemResponse;
    return json.data ?? null;
  } catch (error) {
    console.error("Directus getNewsDetail error:", error);
    return null;
  }
};
