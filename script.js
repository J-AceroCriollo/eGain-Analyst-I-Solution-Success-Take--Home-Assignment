document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    
    let chatState = 'initial';
    let trackingNumber = '';

    // Function to display a message in the chat window
    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    // Initial message from the chatbot
    addMessage('bot', "Hello, how can I assist you today?");

    // Attach the event listener to handle user input and trigger the conversation
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && userInput.value.trim() !== '') {
            const userMessage = userInput.value.trim();
            addMessage('user', userMessage);
            userInput.value = '';
            processUserMessage(userMessage);
        }
    });
    
    // the core function that keeps the conversation iterating
    function processUserMessage(message) {
        const lowerCaseMessage = message.toLowerCase();
        // checks intitial state for lost package keywords or tracking number
        if (chatState === 'initial') {
            if (lowerCaseMessage.includes("lost package") ||
            lowerCaseMessage.includes("not delivered") ||
            lowerCaseMessage.includes("not arrived") ||
            lowerCaseMessage.includes("lost my package")) 
            {
                addMessage('bot', "I'm sorry to hear that. I'd be glad to assist you. Please provide your tracking number.");
               // transitions to next conversation state
                chatState = 'waiting_for_tracking_number';
            } 
                //allows users to skip directly to tracking with a 10 digit number
            else if ( message.length > 9 && message.length < 11 && !isNaN(message)) {
                processTrackingNumber(message);
            } 
            // prompt user for valid input
            else {
                addMessage('bot', "Sorry I don't understand. I can help with lost packages. Can you tell me what the problem is or provide a 10 digit tracking number?");
            }
        } 
        // checks if the input is a valid tracking number in the correct 10 digit format
        else if (chatState === 'waiting_for_tracking_number') {
            if ( message.length > 9 && message.length < 11 && !isNaN(message)) {
                processTrackingNumber(message);
            } 
        // prompt user for valid 10 digit input
            else {
                addMessage('bot', "That doesn't look like a valid tracking number. Please try again with the 10 digit tracking number provided with your order.");
            }
        } 
        // checks if the user found the package after verifying delivery status
        else if (chatState === 'check_location') {
            // checks for a positive response, then restarts with new inquiry
            if (lowerCaseMessage.includes('yes i found it') || lowerCaseMessage.includes('found it') || lowerCaseMessage.includes('package has been found') || lowerCaseMessage.includes("yes")) {
                addMessage('bot', "I'm glad you found it! Thank you for allowing us to assist you, have a great day!");
                askForNewInquiry();
            } 
            // checks for a negative response and initiates investigation process, then restarts with new inquiry
            else if (lowerCaseMessage.includes('no') || lowerCaseMessage.includes('not found') || lowerCaseMessage.includes('still missing') || lowerCaseMessage.includes("did not find it") || lowerCaseMessage.includes('not delivered')) {
                addMessage('bot', "Thank you for confirming. I've started the investigation process. You will receive an update in 3-5 business days.");
                addMessage('bot', "Your case number is A-1234567.");
                askForNewInquiry();
            } 
            // prompt user for valid input
            else {
                addMessage('bot', "I'm sorry, I didn't understand. Please respond with 'yes' or 'no'.");
            }
        } 
        // allows user to continue a new request from the same conversation.
        else if (chatState === 'ask_for_new_inquiry') {
            if (lowerCaseMessage.includes('yes')) {
                addMessage('bot', "Okay, how can I help you? Please describe the issue or provide a tracking number.");
                // resets chatState to allow new inquiry 
                chatState = 'initial';
            } 
            else if (lowerCaseMessage.includes('no')) {
                addMessage('bot', "Thank you for using our service and allowing us to assist you. Have a great day!");
                // chat bot remains idle until user initiates a new conversation
            } 
            // prompt user for valid input
            else {
                addMessage('bot', "I'm sorry, I didn't understand. Please respond with 'yes' or 'no'.");
            }
        }
    }

    // processes tracking number and simulates database lookup
    function processTrackingNumber(number) {
        trackingNumber = number;
        addMessage('bot', `Thank you. I'm checking the status for tracking number: ${trackingNumber}.`);
        chatState = 'checking_status';
        // Demo simulation: tracking numbers starting with "2025" are marked as delivered
        const isDelivered = number.startsWith('2025');
        // provides delivery confirmation and prompts user to verify package location 
        if (isDelivered) {
            addMessage('bot', "Our system shows that your package was delivered today. Have you checked common areas like the front door, mailroom, or with reception? Let us know if the package is found.");
            chatState = 'check_location';
        } 
        // package still in transit, resets conversation
        else {
            addMessage('bot', "Your package is still 'in transit' and should be delivered within the next 3 days.");
            askForNewInquiry();
        }
    }

    // Function to ask the user if they want to start a new inquiry
    function askForNewInquiry() {
        addMessage('bot', "Would you like to start a new inquiry?");
        chatState = 'ask_for_new_inquiry';
    }


});