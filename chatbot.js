
let responses = [];

// Configurações do Chatbot
const API_KEY = 'AIzaSyCi-wO4LVDcl7oYydhKkfa6qKvg1lK0d5w';

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

// Função para enviar a mensagem
async function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  if (userInput.trim() === '') return;

  // Adicionar mensagem do usuário ao chat
  const userMessageElement = document.createElement('div');
  userMessageElement.className = 'user-message';
  userMessageElement.innerText = userInput;
  document.getElementById('chat-log').appendChild(userMessageElement);

  // Limpar campo de entrada
  document.getElementById('user-input').value = '';

  // Exibir mensagem de "Pensando..."
  const thinkingMessageElement = document.createElement('div');
  thinkingMessageElement.className = 'bot-message';
  thinkingMessageElement.innerText = 'Pensando...';
  document.getElementById('chat-log').appendChild(thinkingMessageElement);

  // Rolar para o final do chat
  document.getElementById('chat-log').scrollTop = document.getElementById('chat-log').scrollHeight;

  // Obter resposta da API Gemini
  const botResponse = await getGeminiResponse(userInput);

  // Remover mensagem de "Pensando..."
  document.getElementById('chat-log').removeChild(thinkingMessageElement);

  // Adicionar resposta do chatbot ao chat
  const botMessageElement = document.createElement('div');
  botMessageElement.className = 'bot-message';
  botMessageElement.innerText = botResponse;
  document.getElementById('chat-log').appendChild(botMessageElement);

  // Rolar para o final do chat
  document.getElementById('chat-log').scrollTop = document.getElementById('chat-log').scrollHeight;
}

// Função para obter resposta da API Gemini
async function getGeminiResponse(message) {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: message }]
        }]
      })
    });

    const data = await response.json();

    // Verifica se há candidatos na resposta
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return 'Desculpe, não consegui gerar uma resposta.';
    }
  } catch (error) {
    console.error("Erro ao obter resposta da API Gemini:", error);
    return "Desculpe, ocorreu um erro ao processar sua mensagem.";
  }
}

// Configurar eventos para enviar mensagens
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') sendMessage();
});

// Função para alternar a exibição do chatbot
document.getElementById('toggle-chat-btn').addEventListener('click', () => {
  $('#chatModal').modal('show');
});

// Função para fechar o modal do chatbot
document.getElementById('chatModal').addEventListener('hidden.bs.modal', () => {
  document.getElementById('chat-log').innerHTML = '';
});