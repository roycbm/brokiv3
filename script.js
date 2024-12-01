// Asegúrate de que el script de Tidio esté cargado correctamente
window.addEventListener('load', () => {
    // Ocultar el widget de Tidio (si está presente)
    const tidioChat = document.getElementById('tidio-chat');
    if (tidioChat) tidioChat.style.display = 'none';

    // Acceder a la API de Tidio para enviar y recibir mensajes
    window.TidioChatApi = window.TidioChatApi || {};

    // Función para mostrar los mensajes en la ventana del chat
    window.TidioChatApi.onMessage = function (data) {
        const chatWindow = document.getElementById('chat-window');
        const message = document.createElement('div');
        message.classList.add('chat-message');
        message.textContent = data.text; // El texto del mensaje de Tidio
        chatWindow.appendChild(message);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Desplazar hacia abajo
    };

    // Función para manejar el envío de mensajes del usuario
    const sendButton = document.getElementById('send-button');
    const textInput = document.getElementById('text-input');
    
    sendButton.addEventListener('click', () => {
        const userMessage = textInput.value;
        if (userMessage.trim()) {
            // Muestra el mensaje en el área del chat
            const chatWindow = document.getElementById('chat-window');
            const message = document.createElement('div');
            message.classList.add('chat-message');
            message.textContent = userMessage;
            chatWindow.appendChild(message);

            // Desplazar hacia abajo
            chatWindow.scrollTop = chatWindow.scrollHeight;

            // Limpiar el campo de texto
            textInput.value = '';

            // Enviar el mensaje a Tidio
            window.TidioChatApi.sendMessage(userMessage);
        }
    });

    // Función para manejar la entrada por voz (si se desea agregar funcionalidad)
    const voiceButton = document.getElementById('voice-button');
    voiceButton.addEventListener('click', () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'es-ES'; // Configurar idioma español

        recognition.start();

        recognition.onresult = function(event) {
            const spokenText = event.results[0][0].transcript;
            textInput.value = spokenText;
        };

        recognition.onerror = function(event) {
            console.log('Error en el reconocimiento de voz:', event.error);
        };
    });
});
