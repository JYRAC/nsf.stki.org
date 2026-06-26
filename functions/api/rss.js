export async function onRequest(context) {
  const urls = {
    JYRAC: "https://note.com/jyrac_official/rss",
    NSF: "https://note.com/nsfprojct_2024/rss"
  };
  
  try {
    // タイムアウトや個別のエラーに備え、個別にfetch処理
    const fetchRss = async (url) => {
      try {
        const res = await fetch(url, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
        });
        return res.ok ? await res.text() : "";
      } catch (e) {
        console.error(`Fetch failed for ${url}:`, e);
        return ""; // 失敗しても空文字を返して全体のクラッシュを防ぐ
      }
    };

    const [xmlJyrac, xmlNsf] = await Promise.all([
      fetchRss(urls.JYRAC),
      fetchRss(urls.NSF)
    ]);

    return new Response(JSON.stringify({ jyrac: xmlJyrac, nsf: xmlNsf }), {
      headers: { 
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      },
    });
  } catch (error) {
    // 最悪の事態でもフロントを真っ白にさせないよう、空のデータを200で返す優しさ設計
    return new Response(JSON.stringify({ jyrac: "", nsf: "", error: error.message }), { 
      status: 200,
      headers: { "content-type": "application/json" }
    });
  }
}
