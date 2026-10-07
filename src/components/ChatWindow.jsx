import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import QuickPrompts from "./QuickPrompts";
import LeadForm from "./LeadForm";

function ChatWindow({
  messages,
  input,
  setInput,
  onSend,
  onPromptClick,
  isTyping,
  showLeadForm,
}) {
  return (
    <div
      className="
      chat-window-animation
  fixed z-40
  bottom-20 left-2 right-2
  flex h-[calc(100vh-6rem)]
  max-h-[700px]
  flex-col
  overflow-hidden
  rounded-2xl
  border border-gray-200
  bg-white
  shadow-2xl

  sm:left-auto
  sm:right-5
  sm:bottom-24
  sm:h-[600px]
  sm:w-[calc(100%-2.5rem)]
  sm:max-w-[400px]
"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-600 px-4 py-4 text-white">
        <div>
          <h2 className="font-semibold">
            AI Shopping Assistant
          </h2>

          <p className="text-xs text-blue-100">
            Online • Ready to help
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
          🤖
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-white p-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}

        {isTyping && <TypingIndicator />}
        {showLeadForm && <LeadForm />}
      </div>

      {/* Quick prompts */}
      <QuickPrompts onPromptClick={onPromptClick} />

      {/* Input */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSend();
        }}
        className="border-t bg-white p-3"
      >
        <div className="flex items-center gap-2">
          <input
  type="text"
  value={input}
  onChange={(event) => setInput(event.target.value)}
  placeholder="Ask me anything..."
  aria-label="Chat message"
  autoComplete="off"
  className="
    min-w-0 flex-1
    rounded-xl
    border border-gray-200
    px-3 py-3
    text-sm
    outline-none
    transition
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-100
  "
/>

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
            className="
              rounded-xl
              bg-blue-600
              px-4 py-3
              text-white
              transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            ➤
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatWindow;