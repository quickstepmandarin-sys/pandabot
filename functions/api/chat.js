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

    // DeepSeek request
    const payload = {
      model: "deepseek-chat",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
      max_tokens: 500
    };

    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    // Return the first message choice
    const reply = data?.choices?.[0]?.message?.content ??
                  data?.message ??
                  "No reply from DeepSeek";

    return new Response(JSON.stringify({ reply, debug: data }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ reply: "Server error", error: String(err) }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
