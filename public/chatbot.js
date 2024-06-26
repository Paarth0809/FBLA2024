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
            setTimeout(typing, 25); // Slowtype, 25 is the amount of milliseconds of delay
        } else {
            messageElement.innerHTML += '<br>';
            chatBox.scrollTop = chatBox.scrollHeight; // Ensure it scrolls to the bottom when typing is done
        }
    }
    typing();
}

function myFunction() { //Toggles the chatbot button
    var x = document.getElementById("chat-container");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

async function askGpt(question) {
    try {
        
        const response = await fetch('/api/ask', { 
            method: 'POST', //Method of sending data to server for processing
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question }) //Converts question into JSON string so that the server can parse the quesipon
        });
        const data = await response.json(); //await function waits for a response from the server
        const gptResponse = data.choices[0].message.content.trim(); //Trim's white space
        printSlow(gptResponse, 'bot-message'); //Prints message slowly and scrolls, runs the printslow function 
    } catch (error) {
        printSlow('Sorry, an error occurred. Please try again later.', 'bot-message'); //If any errors occurs it prints error message
        console.error(error);
    }
}

function startChatbot() {
    printSlow('Hello, I am FuturaBot!', 'bot-message'); //Starts the chatbot with a message

    sendBtn.addEventListener('click', () => { // If user clicks send button it will send the message
        sendMessage();
    });

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') { //If user clicks enter message will sent
            sendMessage();
        }
    });

    function sendMessage() { // This function is dedicated to printing the user's message into the chatbox
        const question = userInput.value.trim(); //Trims user question of whitespaces
        if (question) {
            printSlow(question, 'user-message'); //Prints user message slowly
            userInput.value = ''; 
            askGpt(question); 
        }
    }
}

startChatbot(); // Starts chatbot