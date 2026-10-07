function ChatButton({ onClick, isOpen }) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close chat" : "Open chat"}
      className="
        fixed bottom-5 right-5 z-50
        flex h-14 w-14 items-center justify-center
        rounded-full
        bg-blue-600 text-white
        shadow-xl
        transition-all duration-300
        hover:scale-110
        hover:bg-blue-700
        active:scale-95
        focus:outline-none
        focus:ring-4
        focus:ring-blue-300
      "
    >
      <span
        className={`text-2xl transition-transform duration-300 ${
          isOpen ? "rotate-90" : ""
        }`}
      >
        {isOpen ? "×" : "💬"}
      </span>
    </button>
  );
}

export default ChatButton;