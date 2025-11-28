export async function onRequestPost(context) {
  const { message } = await context.request.json();

  const apiKey = context.env.DEEPSEEK_KEY;

  const response = await fetch("https://api.deepseek.com/chat/completions", {
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

  const data = await response.json();

  return Response.json({
    reply: data.choices[0].message.content
  });
}
