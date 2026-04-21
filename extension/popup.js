document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('send-btn');
  const userInput = document.getElementById('user-input');
  const messagesArea = document.getElementById('messages');

  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage('user', text);
    userInput.value = '';

    const loadingMsg = appendMessage('ai', 'Analisando orientações...');
    
    // Usando 127.0.0.1 para evitar problemas de DNS local
    fetch('http://127.0.0.1:3000/chat', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: text })
    })
    .then(res => {
      if (!res.ok) throw new Error(`Erro no servidor: ${res.status}`);
      return res.json();
    })
    .then(data => {
      loadingMsg.remove();
      if (data.answer) {
        appendMessage('ai', data.answer);
      } else {
        appendMessage('ai', 'O servidor não retornou uma resposta válida.');
      }
    })
    .catch(err => {
      loadingMsg.remove();
      console.error('Erro na extensão:', err);
      appendMessage('ai', '❌ Erro de conexão: Verifique se o servidor está rodando (node server.js) ou se há bloqueio de firewall.');
    });
  }

  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    
    if (sender === 'ai' && window.marked) {
      msgDiv.innerHTML = marked.parse(text);
    } else {
      msgDiv.textContent = text;
    }

    messagesArea.appendChild(msgDiv);
    messagesArea.scrollTop = messagesArea.scrollHeight;
    return msgDiv;
  }
});
