# eGain-Analyst-I-Solution-Success-Take--Home-Assignment
Chat Bot: Scenario 1
Uses only HTML, CSS, and JavaScript

Prerequisites
    Any modern web browser
    No server or dependencies needed

Installation
    
    1. Download or clone all project files
    
    2. Ensure all three files are in the same directory
        - 'index.html'
        - 'style.css'
        - 'script.js'
    
    3. Open 'index.html' on your browser
    
    4. The chatbot will automatically greet you and be ready to use

Usage
    The chatbot can recognize several ways to begin:
    
    Option 1: Describe the issue
    User:
    - "my package is lost"
    - "package not delivered"
    - "package has not arrived"
    
    Option 2: Provide a tracking number
    User:
    2025123456(10 digit number starting with '2025' will prompt delivered conversation path)
    1234567890(any 10 digit number will prompt still in transit convesration path)

Example Conversation flow

    Bot: Hello, how can I assist you today?
    You: My package is lost
    Bot: I'm sorry to hear that. I'd be glad to assist you. Please provide your tracking number.
    You: 2025123456
    Bot: Thank you. I'm checking the status for tracking number: 2025123456.
    Bot: Our system shows that your package was delivered today. Have you checked common areas like the front door, mailroom, or with reception?
    You: No
    Bot: Thank you for confirming. I've started the investigation process. You will receive an update in 3-5 business days.
    Bot: Your case number is A-1234567.
    Bot: Would you like to start a new inquiry?

Test Cases
Case 1: Delivered Package
- Input tracking number starting with "2025"
- Bot should indicate delivery and ask about location

Case 2: In-Transit Package
- Input any other 10-digit number
- Bot should indicate in-transit status

Case 3: Direct Tracking Number Entry
- Enter 10-digit number as first message
- Should skip issue description step

Case 4: Invalid Input
- Try letters, special characters, or wrong length
- Bot should provide helpful error message

Case 5: Multiple Inquiries
- Complete one inquiry and answer "yes" to new inquiry
- Should reset conversation flow

Technical Implementation

State Machine with 5 conversation states
    
    States:
    - 'initial'
    - 'waiting_for_tracking_number'
    - 'checking_status'
    - 'check_location'
    - 'ask_for_new_inquiry'

Key Functions:

    - addMessage(sender, text) - displays messages in chat interface
    - processUserMessage(message) - core conversation logic and state management
    - processTrackingNumber(number) - simulates database lookup
    - askForNewInquiry() - enables conversation continuity

Input validation: 

    - Tracking Number must be exactly 10 digits
    - keyword matching for natural language understanding
    - fallback response for unrecognized input

Design Decisions

Why JavaScript?
- easy to understand and evaluate
- demonstrates core Javascript profieciency

State Machine Decision
- clear separation of conversation paths and stages
- easy to debug and extend conversation paths

Keyword Matching
- sufficient for strucutred conversations
- easy to customize for specific use cases
- predictable results


Limitations
- does not simulate a real database
- verification is simple
- key-word based