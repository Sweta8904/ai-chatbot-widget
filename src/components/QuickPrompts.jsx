const prompts = [
  "Recommend a Laptop under ₹50,000",
  "How do I check warranty status?",
  "Connect with Sales Team",
];

function QuickPrompts({ onPromptClick }) {
  return (
    <div className="border-t bg-white px-3 py-3">
      
      <p className="mb-2 text-xs font-medium text-gray-500">
        Quick actions
      </p>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onPromptClick(prompt)}
            className="
              shrink-0 rounded-full
              border border-gray-200
              bg-gray-50 px-3 py-2
              text-xs text-gray-700
              transition
              hover:border-blue-300
              hover:bg-blue-50
              hover:text-blue-700
            "
          >
            {prompt}
          </button>
        ))}
      </div>

    </div>
  );
}

export default QuickPrompts;