export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // Step 1: Verify JSON body
    let bodyText = await request.text();

    return new Response(JSON.stringify({
      step: "received_raw_body",
      bodyText: bodyText,
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
