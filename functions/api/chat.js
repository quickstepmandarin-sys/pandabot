export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.text();

    return new Response(JSON.stringify({
      receivedBody: body,
      apiKeyExists: Boolean(env.DEEPSEEK_API_KEY)
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
