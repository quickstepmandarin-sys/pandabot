export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { message } = await request.json();

    const apiKey = env.DEEPSEEK_API_KEY;

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    // 🟡 DEBUG MODE: RETURN EVERYTHING DeepSeek returns
    return new Response(JSON.stringify({ debug: data }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
