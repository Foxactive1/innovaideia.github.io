let responses = [];

// Carrega o arquivo JSON com as respostas do chatbot
async function loadResponses() {
  try {
    const response = await fetch("./responses.json");
    if (!response.ok) {
      throw new Error("Erro ao carregar o JSON");
    }
    responses = await response.json();
  } catch (error) {
    handleError(error);
  }
}

// Exibe mensagens no chat
function displayMessage(type, message) {
  const chatLog = document.getElementById("chat-log");
  const messageElement = document.createElement("div");
  const icon = getMessageIcon(type);
  messageElement.innerHTML = `${icon} <strong>${type}:</strong> ${message}`;
  chatLog.appendChild(messageElement);
  smoothScroll(chatLog);
}

// Retorna o ícone correspondente ao tipo da mensagem
function getMessageIcon(type) {
  switch (type) {
    case "Você": return "👤";
    case "Chatbot": return "🤖";
    default: return "⚠️";
  }
}

// Função para rolagem suave no chat
function smoothScroll(element) {
  element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
}

// Função para obter a resposta do chatbot
function getChatbotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  for (let item of responses) {
    for (let keyword of item.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return item.response;
      }
    }
  }

  return 'Desculpe, não entendi. Poderia reformular sua pergunta?';
}

// Envia a mensagem do usuário e responde
async function sendMessage() {
  const userInput = document.getElementById("user-input");
  const userMessage = userInput.value.trim();

  if (userMessage) {
    displayMessage("Você", userMessage);
    userInput.value = '';  // Limpa o campo de entrada

    // Espera meio segundo para responder
    setTimeout(() => {
      const response = getChatbotResponse(userMessage);
      displayMessage("Chatbot", response);
    }, 500);
  }
}

// Função para exibir o erro
function handleError(error) {
  const chatLog = document.getElementById("chat-log");
  displayMessage("Erro", "Não foi possível carregar as respostas do chatbot.");
}

// Inicializa o chatbot
document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const toggleChatButton = document.getElementById("toggle-chat-btn");

  // Carrega as respostas assim que a página carrega
  loadResponses();

  // Configura o botão de envio
  sendButton.addEventListener("click", sendMessage);

  // Configura envio ao pressionar Enter
  userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      sendMessage();
      event.preventDefault();
    }
  });

  // Configura o botão para exibir/ocultar o chat
  toggleChatButton.addEventListener("click", () => {
    const chatbox = document.getElementById("chatbox");
    chatbox.style.display = chatbox.style.display === "none" ? "block" : "none";

    if (chatbox.style.display === "block") {
      const chatLog = document.getElementById("chat-log");
      if (chatLog.children.length === 0) {
        displayMessage("Chatbot", "Olá! Como posso ajudá-lo hoje?");
      }
      userInput.focus();
    }
  });
});