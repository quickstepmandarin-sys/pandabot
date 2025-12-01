export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { message } = await request.json();
    const apiKey = env.DEEPSEEK_API_KEY;

    if (!message) {
      return new Response(JSON.stringify({ reply: "No message received" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // Call DeepSeek
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

    // Parse DeepSeek response safely
    let data;
    try {
      data = await res.json();
    } catch (e) {
      const text = await res.text();
      return new Response(JSON.stringify({
        reply: "Error parsing DeepSeek response",
        raw: text,
        status: res.status
      }), { headers: { "Content-Type": "application/json" } });
    }

    const reply = data?.choices?.[0]?.message?.content ?? "No reply from DeepSeek";
    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ reply: "Server error", error: String(err) }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
