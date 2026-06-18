export async function onRequest(context) {
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
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}