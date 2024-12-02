let responses = [];

// Configurações do Chatbot
const API_KEY = 'AIzaSyCi-wO4LVDcl7oYydhKkfa6qKvg1lK0d5w';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

// Carregar o arquivo responses.json
async function loadResponses() {
  try {
    const response = await $.getJSON("./responses.json");
    if (Array.isArray(response)) {
      responses = response;
    } else {
      console.error("O arquivo responses.json não contém um array válido.");
      $('#chat-log').append('<div><strong>Erro:</strong> O arquivo de respostas não está formatado corretamente.</div>');
    }
  } catch (error) {
    console.error("Erro ao carregar o arquivo responses.json:", error);
    $('#chat-log').append('<div><strong>Erro:</strong> Não foi possível carregar as respostas do chatbot.</div>');
  }
}

// Função para buscar a resposta do chatbot com base em palavras-chave
async function getChatbotResponse(message) {
  const lowerMessage = message.toLowerCase();

  // Procurar se alguma palavra-chave está contida na mensagem
  for (let item of responses) {
    if (Array.isArray(item.keywords)) {
      for (let keyword of item.keywords) {
        if (lowerMessage.includes(keyword)) {
          return item.response;
        }
      }
    } else {
      console.warn("A chave 'keywords' não é um array no item: ", item);
    }
  }

  // Se não encontrar palavras-chave, usar o modelo de classificação de texto
  return await classifyTextWithModel(message);
}

// Função para usar o modelo de classificação de texto (Transformers.js ou TensorFlow.js)
async function classifyTextWithModel(message) {
  try {
    const model = await transformers.loadModel('facebook/bart-large-mnli');
    const candidateLabels = ["serviço", "consultoria", "coaching", "inovação", "PNL"];
    const result = await model(message, candidateLabels);

    // Obter a categoria mais provável
    const predictedLabel = result.labels[0];

    // Responder com base na categoria prevista
    switch (predictedLabel) {
      case "serviço":
        return "Oferecemos consultoria especializada em TI, desenvolvimento de software personalizado e treinamentos técnicos.";
      case "consultoria":
        return "A consultoria é um dos nossos maiores focos, ajudamos empresas com soluções personalizadas.";
      case "coaching":
        return "Na InNovaIdeia, acreditamos no desenvolvimento humano e na inovação através de Coaching com PNL.";
      case "PNL":
        return "PNL é uma ferramenta poderosa para o desenvolvimento pessoal e profissional, e utilizamos esse recurso em nossos programas.";
      default:
        return await getGeminiResponse(message);
    }
  } catch (error) {
    console.error("Erro ao classificar texto com modelo:", error);
    return "Desculpe, ocorreu um erro ao processar sua mensagem.";
  }
}

// Função para obter resposta da API do Gemini IA
async function getGeminiResponse(message) {
  try {
    $('#chat-log').append('<div><strong>Chatbot:</strong> Pensando...</div>');

    // Simulação de chamada à API do Gemini IA
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
      const aiResponse = data.candidates[0].content.parts[0].text;
      return aiResponse;
    } else {
      return 'Desculpe, não consegui gerar uma resposta.';
    }
  } catch (error) {
    console.error("Erro ao obter resposta da API do Gemini IA:", error);
    return "Desculpe, ocorreu um erro ao processar sua mensagem.";
  } finally {
    // Remover a mensagem "Pensando..."
    $('#chat-log').children().last().remove();
  }
}

// Função para enviar a mensagem
async function sendMessage() {
  const userMessage = $('#user-input').val();
  $('#user-input').focus();
  if (userMessage.trim() !== '') {
    $('#chat-log').append('<div><strong>Você:</strong> ' + userMessage + '</div>');
    $('#user-input').val('');

    // Simulação de resposta do chatbot
    setTimeout(async () => {
      const response = await getChatbotResponse(userMessage);  // Espera pela resposta
      $('#chat-log').append('<div><strong>Chatbot:</strong> ' + response + '</div>');
      $('#chat-log').scrollTop($('#chat-log')[0].scrollHeight); // Rolagem automática
    }, 500);
  }
}

$(document).ready(async function() {
  await loadResponses();

  // Enviar mensagem ao clicar no botão
  $('#send-btn').click(sendMessage);

  // Enviar mensagem ao pressionar "Enter"
  $('#user-input').keypress(function(event) {
    if (event.which === 13) { // Código para Enter
      sendMessage();
      event.preventDefault(); // Evita quebra de linha no campo de entrada
    }
  });
});