async function sendMsg() {
  const input = document.getElementById("msg");
  const chat = document.getElementById("chat");
  const text = input.value.trim();
  if (!text) return;

  chat.innerHTML += `<div class="msg user">${text}</div>`;
  chat.scrollTop = chat.scrollHeight;
  input.value = "";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: text })  // must be { message: text }
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    chat.innerHTML += `<div class="msg bot">Error parsing response</div>`;
    return;
  }

  chat.innerHTML += `<div class="msg bot">${data.reply || "No reply"}</div>`;
  chat.scrollTop = chat.scrollHeight;
}
