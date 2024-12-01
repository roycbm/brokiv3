window.addEventListener('load', () => {
    // Ocultar el widget de Tidio (si está presente)
    const tidioChat = document.getElementById('tidio-chat');
    if (tidioChat) tidioChat.style.display = 'none';

    // Acceder a la API de Tidio para enviar y recibir mensajes
    window.TidioChatApi = window.TidioChatApi || {};

    // Asegurarse de que la API de Tidio está cargada correctamente
    if (window.TidioChatApi) {
        console.log('Tidio API cargada correctamente.');
    } else {
        console.error('Error: La API de Tidio no se ha cargado correctamente.');
    }

    // Manejo del formulario de correo
    const emailForm = document.getElementById('email-form');
    const userEmail = document.getElementById('user-email');
    const startChatButton = document.getElementById('start-chat');

    startChatButton.addEventListener('click', () => {
        const email = userEmail.value;

        if (email && validateEmail(email)) {
            // Esconde el formulario de correo y muestra el chat
            emailForm.style.display = 'none';
            document.getElementById('chat-window').style.display = 'block';

            // Configura el correo electrónico en la API de Tidio
            window.TidioChatApi.setVisitorData({
                email: email
            });

            // Envía un mensaje de bienvenida
            window.TidioChatApi.sendMessage('Hola, ¿en qué puedo ayudarte hoy?');
        } else {
            alert('Por favor, ingresa un correo electrónico válido.');
        }
    });

    // Función para validar el formato del correo electrónico
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

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

            // Enviar un mensaje de espera mientras Tidio responde
            const waitingMessage = document.createElement('div');
            waitingMessage.classList.add('chat-message');
            waitingMessage.textContent = 'Esperando respuesta...';
            chatWindow.appendChild(waitingMessage);
            chatWindow.scrollTop = chatWindow.scrollHeight;
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
