document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('send-btn');
  const userInput = document.getElementById('user-input');
  const messagesArea = document.getElementById('messages');

  // Ajuste automático da altura do textarea
  userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = (userInput.scrollHeight) + 'px';
  });

  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage('user', text);
    userInput.value = '';
    userInput.style.height = 'auto';

    const loadingId = 'loading-' + Date.now();
    appendLoading(loadingId);
    
    fetch('http://127.0.0.1:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: text })
    })
    .then(res => {
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      removeLoading(loadingId);
      appendMessage('ai', data.answer);
    })
    .catch(err => {
      removeLoading(loadingId);
      appendMessage('ai', '❌ **Erro de conexão**: Verifique se o servidor `node server.js` está rodando.');
      console.error(err);
    });
  }

  function appendMessage(sender, text) {
    const group = document.createElement('div');
    group.className = `message-group ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = sender === 'ai' ? 'GO' : 'EU';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    
    if (sender === 'ai' && typeof marked !== 'undefined') {
      bubble.innerHTML = marked.parse(text);
    } else {
      bubble.textContent = text;
    }

    group.appendChild(avatar);
    group.appendChild(bubble);
    messagesArea.appendChild(group);
    
    // Scroll suave para o fim
    messagesArea.parentElement.scrollTop = messagesArea.parentElement.scrollHeight;
  }

  function appendLoading(id) {
    const loader = document.createElement('div');
    loader.id = id;
    loader.className = 'message-group ai loading';
    loader.innerHTML = `
      <div class="avatar">GO</div>
      <div class="message-bubble">
        <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesArea.appendChild(loader);
    messagesArea.parentElement.scrollTop = messagesArea.parentElement.scrollHeight;
  }

  function removeLoading(id) {
    const loader = document.getElementById(id);
    if (loader) loader.remove();
  }
});
