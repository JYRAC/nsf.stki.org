export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // URLが /functions/get-note だった場合、2つのNote RSSを合体させてJSONで返す
    if (url.pathname === "/functions/get-note") {
      const urls = {
        JYRAC: "https://note.com/jyrac_official/rss",
        NSF: "https://note.com/nsfprojct_2024/rss"
      };
      
      try {
        const [resJyrac, resNsf] = await Promise.all([
          fetch(urls.JYRAC),
          fetch(urls.NSF)
        ]);

        const xmlJyrac = resJyrac.ok ? await resJyrac.text() : "";
        const xmlNsf = resNsf.ok ? await resNsf.text() : "";

        return new Response(JSON.stringify({ jyrac: xmlJyrac, nsf: xmlNsf }), {
          headers: { 
            "content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*" 
          },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { 
          status: 500,
          headers: { "content-type": "application/json" }
        });
      }
    }

    // それ以外の通常のURL（/index.html や /fukushima.css など）は、そのまま通常のサイト画面を返す
    return env.ASSETS.fetch(request);
  },
};
