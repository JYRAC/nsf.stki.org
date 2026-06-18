export async function onRequest(context) {
  // あなたのNoteのRSS URLに変えてください
  const noteUrl = "https://note.com/jyrac_official/rss";
  
  try {
    const response = await fetch(noteUrl);
    const xmlText = await response.text();
    
    return new Response(xmlText, {
      headers: { 
        "content-type": "application/xml;charset=UTF-8",
        "Access-Control-Allow-Origin": "*" 
      },
    });
  } catch (error) {
    return new Response("Error fetching Note RSS", { status: 500 });
  }
}