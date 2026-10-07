function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-500">
            AI is typing
          </span>

          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500"></span>
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:150ms]"></span>
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:300ms]"></span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;