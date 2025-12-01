export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { message } = await request.json();

    const apiKey = env.DEEPSEEK_API_KEY;

    const res = await fetch("https://api.deepseek.com/chat/completions", {
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

    const data = await res.json();

    const reply =
      data?.choices?.[0]?.message?.content ??
      "Error: No response from DeepSeek.";

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ reply: "Function crashed." }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
