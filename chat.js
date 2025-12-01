async function sendMsg() {
  const input = document.getElementById("msg");
  const chat = document.getElementById("chat");
  const text = input.value.trim();

  if (!text) return;

  // show user message
  chat.innerHTML += `<div class="msg user">${text}</div>`;
  chat.scrollTop = chat.scrollHeight;

  input.value = "";

  // call backend API
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: text })
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    chat.innerHTML += `<div class="msg bot">Error parsing response.</div>`;
    return;
  }

  // show bot reply
  chat.innerHTML += `<div class="msg bot">${data.reply}</div>`;
  chat.scrollTop = chat.scrollHeight;
}
