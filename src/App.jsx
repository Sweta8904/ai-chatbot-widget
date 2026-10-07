import { useEffect, useState } from "react";

import ChatButton from "./components/ChatButton";
import ChatWindow from "./components/ChatWindow";

function App() {
  const STORAGE_KEY = "techstore-chat-history";

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! 👋 I'm your AI Shopping Assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  // Load chat history from LocalStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);

    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
      } catch (error) {
        console.error("Failed to load chat history:", error);
      }
    }

    setIsLoaded(true);
  }, []);

  // Save chat history to LocalStorage
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages, isLoaded]);

  // Send message to Gemini API
  const sendMessage = async (messageText = input) => {
    const trimmedInput = messageText.trim();

    if (!trimmedInput || isTyping) {
      return;
    }

    const normalizedInput = trimmedInput.toLowerCase();

    // Detect sales/callback requests
    const salesKeywords = [
      "contact sales",
      "contact the sales team",
      "sales team",
      "callback",
      "call me",
    ];

    const shouldShowLeadForm = salesKeywords.some((keyword) =>
      normalizedInput.includes(keyword)
    );

    if (shouldShowLeadForm) {
      setShowLeadForm(true);
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: trimmedInput,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      // Convert previous messages into Gemini format
      const history = updatedMessages
        .slice(0, -1)
        .filter(
          (message) =>
            message.role === "user" || message.role === "assistant"
        )
        .map((message) => ({
          role: message.role === "assistant" ? "model" : "user",
          parts: [
            {
              text: message.content,
            },
          ],
        }));

      const response = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: trimmedInput,
          history,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to get a response from the AI."
        );
      }

      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.response,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        aiMessage,
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      let errorMessage =
        "Sorry, something went wrong. Please try again.";

      if (error.message === "Failed to fetch") {
        errorMessage =
          "I can't connect to the AI service right now. Please check your internet connection and try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      const assistantErrorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: errorMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantErrorMessage,
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle quick prompt click
  const handlePromptClick = (prompt) => {
    sendMessage(prompt);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Demo page content */}
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            TechStore
          </h1>

          <p className="mt-3 text-gray-600">
            Your AI-powered shopping assistant
          </p>
        </div>
      </main>

      {/* Chat Window */}
      {isOpen && (
        <ChatWindow
          messages={messages}
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          onPromptClick={handlePromptClick}
          isTyping={isTyping}
          showLeadForm={showLeadForm}
        />
      )}

      {/* Floating Chat Button */}
      <ChatButton
        isOpen={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
      />
    </div>
  );
}

export default App;