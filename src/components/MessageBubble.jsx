function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[80%] rounded-2xl px-4 py-3
          ${
            isUser
              ? "rounded-br-md bg-blue-600 text-white"
              : "rounded-bl-md bg-gray-100 text-gray-900"
          }
        `}
      >
        <p className="whitespace-pre-wrap break-words text-sm leading-6">
          {message.content}
        </p>

        <p
          className={`mt-1 text-xs ${
            isUser ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {message.time}
        </p>
      </div>
    </div>
  );
}

export default MessageBubble;