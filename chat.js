async function sendMsg() {
  const msg = document.getElementById("msg").value;
  const chat = document.getElementById("chat");

  chat.innerHTML += `<div class='user'>You: ${msg}</div>`;

  const res = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();
  chat.innerHTML += `<div class='bot'>Bot: ${data.reply}</div>`;
}
