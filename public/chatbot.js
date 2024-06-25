const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function createMessageElement(text, className) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.innerHTML = text;
    return messageElement;
}

function printSlow(text, className) {
    let i = 0;
    const messageElement = createMessageElement('', className);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Ensure it scrolls to the bottom when a new message is added

    function typing() {
        if (i < text.length) {
            messageElement.innerHTML += text.charAt(i);
            i++;
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom as each character is typed
            setTimeout(typing, 25);
        } else {
            messageElement.innerHTML += '<br>';
            chatBox.scrollTop = chatBox.scrollHeight; // Ensure it scrolls to the bottom when typing is done
        }
    }
    typing();
}



async function askGpt(question) {
    try {
        
        const response = await fetch('/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        });
        const data = await response.json();
        const gptResponse = data.choices[0].message.content.trim();
        printSlow(gptResponse, 'bot-message');
    } catch (error) {
        printSlow('Sorry, an error occurred. Please try again later.', 'bot-message');
        console.error(error);
    }
}

function startChatbot() {
    printSlow('Hello, I am FuturaBot!', 'bot-message');

    sendBtn.addEventListener('click', () => {
        sendMessage();
    });

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const question = userInput.value.trim();
        if (question.toLowerCase() === 'exit') {
            return;
        }
        if (question) {
            printSlow(question, 'user-message');
            userInput.value = '';
            askGpt(question);
        }
    }
}

startChatbot();


function myFunction() {
    var x = document.getElementById("chat-container");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}