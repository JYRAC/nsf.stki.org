export async function onRequest(context) {
  // 同じNoteのRSS（JYRACとNSF）
  const urls = {
    JYRAC: "https://note.com/jyrac_official/rss",
    NSF: "https://note.com/nsfprojct_2024/rss"
  };
  
  try {
    // サーバーサイドで安全に2つのRSSを取得（CORSを完全回避）
    const [resJyrac, resNsf] = await Promise.all([
      fetch(urls.JYRAC),
      fetch(urls.NSF)
    ]);

    const xmlJyrac = resJyrac.ok ? await resJyrac.text() : "";
    const xmlNsf = resNsf.ok ? await resNsf.text() : "";

    // 2つの生のXMLテキストをJSONにまとめてフロントへ返却
    return new Response(JSON.stringify({ jyrac: xmlJyrac, nsf: xmlNsf }), {
      headers: { 
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*" // 外部からの通信を許可
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
}
