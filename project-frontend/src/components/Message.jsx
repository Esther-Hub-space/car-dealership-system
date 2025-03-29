import React, { useState, useRef, useEffect } from 'react';
import '../css/message.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Message = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const chatBodyRef = useRef(null);

    const botResponses = {
        "hello": "Hi there! How can I assist you with cars today?",
        "how are you": "I'm just a bot, but I'm here to help! What do you need?",
        "buy car": "You can browse our latest car listings on our homepage. What type of car are you looking for?",
        "contact": "You can contact us via email at support@hotwheelshq.com or call us at (123) 456-7890.",
        "price": "Prices vary depending on the car model. Do you have a specific car in mind?",
        "financing options": "Yes! We offer financing plans. Would you like more details on loan terms and interest rates?",
        "availability": "Car availability changes frequently. Which model are you interested in?",
        "test drive": "You can schedule a test drive by visiting our dealership or booking online.",
        "used cars": "Yes, we have a selection of certified pre-owned cars available. What are you looking for?",
        "warranty": "Most of our cars come with a warranty. I can provide details based on the car you're interested in.",
        "trade-in": "We accept trade-ins! Would you like an estimate for your current vehicle?",
        "insurance": "We can guide you on car insurance options. Do you need coverage recommendations?",
        "features": "Different cars have various features. Which model are you curious about?",
        "best car": "The best car depends on your needs! Are you looking for fuel efficiency, luxury, or off-road capability?",
        "electric cars": "We have a range of electric vehicles (EVs). Would you like to know more about them?",
        "compare cars": "I can help you compare cars. Which models are you considering?",
        "service": "We offer maintenance and repair services. Do you need an appointment?",
        "mileage": "Mileage varies by model. Would you like details on fuel efficiency?"
    };

    const getBotResponse = (input) => {
        const lowerInput = input.toLowerCase();
        return botResponses[lowerInput] || "I'm not sure how to respond to that. Try asking about cars, pricing, or availability!";
    };

    const sendMessage = () => {
        if (!inputValue.trim()) return; // Ignore empty messages

        const userMessage = { text: inputValue, sender: 'user' };
        const botMessage = { text: getBotResponse(inputValue), sender: 'bot' };

        setMessages(prevMessages => [...prevMessages, userMessage, botMessage]);
        setInputValue('');
    };

    useEffect(() => {
        // Auto-scroll to bottom when messages change
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="chat-header">Chat with Us</div>
            <div className="chat-body" ref={chatBodyRef}>
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    placeholder="Type a message..."
                    autoComplete="off"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
        </div>
    );
};

export default Message;
