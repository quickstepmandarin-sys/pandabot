async function sendMsg() {
  const input = document.getElementById("msg");
  const chat = document.getElementById("chat");
  const text = input.value.trim();
  if (!text) return;

  chat.innerHTML += `<div class="msg user">${text}</div>`;
  chat.scrollTop = chat.scrollHeight;
  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    // Show raw text returned from server
    const raw = await res.text();
    chat.innerHTML += `<div class="msg bot">RAW: ${raw}</div>`;
    chat.scrollTop = chat.scrollHeight;

  } catch (err) {
    chat.innerHTML += `<div class="msg bot">FETCH ERROR: ${err}</div>`;
    chat.scrollTop = chat.scrollHeight;
  }
}
