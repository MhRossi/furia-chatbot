document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-btn');
    const chatBox = document.getElementById('chat-box');
    //quiz
    const chatArea = document.getElementById('chat-area');
    const quizArea = document.getElementById('quiz-area');
    const quizSidebarButton = document.getElementById('quiz-sidebar-button');
    const backToChatButton = document.getElementById('back-to-chat-button');

    // Mensagem inicial do bot
    addMessage("🖤 Olá! Sou o Chatbot da Pantera! Pergunte sobre o time de CS2 da FURIA ou apenas VAMO bater um papo!", 'bot-message');


    // Função para enviar mensagem
    function sendMessage() {
        const messageText = userInput.value.trim();

        if (messageText !== '') {
            // Adiciona a mensagem do usuário ao chat
            addMessage(messageText, 'user-message');

            
            userInput.value = '';

            
            userInput.disabled = true;
            sendButton.disabled = true;

            
            const typingIndicatorElement = addTypingIndicator();

            
            setTimeout(() => {
                
                chatBox.removeChild(typingIndicatorElement);

                const botResponse = generateBotResponse(messageText);
                addMessage(botResponse, 'bot-message');

                
                userInput.disabled = false;
                sendButton.disabled = false;
                userInput.focus(); 
            }, 1500);
        }
    }

    
    function addMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        // Permite quebras de linha
        messageElement.style.whiteSpace = 'pre-wrap';
        messageElement.textContent = text;
        chatBox.appendChild(messageElement);

        
        chatBox.scrollTop = chatBox.scrollHeight;
    }

     // Função para adicionar o indicador de digitação
    function addTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.classList.add('message', 'typing-indicator');
        
        typingElement.innerHTML = '<span></span><span></span><span></span>';
        chatBox.appendChild(typingElement);


        chatBox.scrollTop = chatBox.scrollHeight;

        return typingElement; 
    }



    // Função para gerar a respostas do bot
    function generateBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();

        // Respostas específicas  (CS2)
        if (lowerCaseMessage.includes('furia') || lowerCaseMessage.includes('pantera') || lowerCaseMessage.includes('cs') || lowerCaseMessage.includes('counter strike')) {
            return "VAMO! 🔥 A Pantera é sinônimo de Counter-Strike no Brasil! Nossas raízes estão no CS e buscamos sempre a Ousadia e Alegria no servidor. Em que posso te ajudar sobre a FURIA CS2?";
        }
        else if (lowerCaseMessage.includes('time') || lowerCaseMessage.includes('jogadores') || lowerCaseMessage.includes('escalação') || lowerCaseMessage.includes('roster') || lowerCaseMessage.includes('lineup')) {
            return `--- Escalação FURIA CS2 (2025) ---

🧑‍💻 Jogadores:
- Gabriel "FalleN" Toledo
- Kaike "KSCERATO" Cerato
- Yuri "yuurih" Santos
- Danil "molodoy" Golubenko
- Mareks "YEKINDAR" Gaļinskis

🎯 Comissão Técnica:
- Sidnei "sidde" Macedo (Coach)
- Juan "Hepa" Borges (Analista/Coach Assistente)

-------------------------------

VAMO! Essa é a força que entra no servidor!`;
        } else if (lowerCaseMessage.includes('ultimos resultados') || lowerCaseMessage.includes('ultimos jogos') || lowerCaseMessage.includes('resultados recentes')) {
            return `📅 Resultados Recentes da FURIA no PGL Bucharest 2025

09/04/2025 – FURIA 0 × 2 The MongolZ
08/04/2025 – FURIA 0 × 2 Virtus.pro
07/04/2025 – FURIA 1 × 2 Complexity
06/04/2025 – FURIA 2 × 0 Apogee

Infelizmente, a FURIA enfrentou uma sequência de três derrotas consecutivas após a vitória contra a Apogee. VAMO por cima na próxima!`;

        } else if (lowerCaseMessage.includes('ousadia e alegria')) {
            return "Ousadia e Aleggia no CS2 é a nossa marca! É ir pra cima, buscar jogadas inesperadas e se divertir no processo, sempre comFURIOSIDADE!";

        } else if (lowerCaseMessage.includes('vamo')) {
            return "VAMO! Esse grito incendeia o rush no CS2! Determinação e união em cada round!";

        } else if (lowerCaseMessage.includes('diadefuria') || lowerCaseMessage.includes('dia de furia')) {
            return "#DIADEFURIA no CS2 é quando a galera se reúne praPÚBLICA a Pantera no major! Sente a pressão!";

        } else if (lowerCaseMessage.includes('historia') || lowerCaseMessage.includes('fundação') || lowerCaseMessage.includes('começou')) {
            return "A FURIA nasceu em 2017 focada no CS. Conquistamos nosso espaço mostrando garra e Ousadia! VAMO construir o futuro do CS!";

        } else if (lowerCaseMessage.includes('quem é você') || lowerCaseMessage.includes('o que você faz') || lowerCaseMessage.includes('sua função')) {
            return "Eu sou o Chatbot da Pantera, focado em te trazer as informações mais relevantes sobre o nosso time de CS2. Pronto para o próximo round de perguntas? VAMO lá!";

        } else if (lowerCaseMessage.includes('obrigado') || lowerCaseMessage.includes('valeu') || lowerCaseMessage.includes('gracias')) {
            return "De nada! Tamo junto na torcida pelo nosso CS2! Se precisar de mais alguma info, é só mandar. VAMO!";
        }
        

        // --- RESPOSTAS PADRÃO ---
        const defaultResponses = [
            "Hmm, essa informação eu não tenho no meu radar sobre o CS2. PodePÚBLICA de outra forma?",
            "Interessante! Minha FURIOSIDADE está focada no CS2. Tem outra pergunta sobre o time?",
            "VAMO tentar de novo! Pergunte algo específico sobre a FURIA no Counter-Strike.",
        ];
        const randomIndex = Math.floor(Math.random() * defaultResponses.length);
        return defaultResponses[randomIndex];
        
    }

    //botão de enviar
    sendButton.addEventListener('click', sendMessage);

    //enviar mensagem com a tecla Enter
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

});