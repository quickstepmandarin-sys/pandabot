export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "No message received" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const apiKey = env.DEEPSEEK_API_KEY;

    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: message }]
      })
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      // return raw text if JSON parsing fails
      const text = await res.text();
      return new Response(JSON.stringify({
        error: "DeepSeek response is not valid JSON",
        raw: text,
        status: res.status
      }), { headers: { "Content-Type": "application/json" }});
    }

    return new Response(JSON.stringify({ debug: data }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
