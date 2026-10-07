import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    // Check API key
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing");

      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured",
      });
    }

    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    console.log("Sending message to Gemini:", message);

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: message,
      config: {
       systemInstruction: `
You are the AI Shopping Assistant for TechStore.

Your job is to help customers choose technology products.

IMPORTANT CONVERSATION RULES:

1. Always remember information the customer has already provided.
2. Never ask for information that the customer has already given.
3. Combine information from multiple messages.
4. Treat the conversation as one continuous conversation.

For example:

Customer: I need a laptop.
Customer: Gaming.
Customer: My budget is 50000.

You should understand this as:

Product: Gaming laptop
Budget: ₹50,000
Use case: Gaming

Do NOT ask whether the customer wants a laptop again.

5. If the customer provides a budget, remember it.
6. If the customer provides a product type, remember it.
7. If the customer provides a use case, remember it.
8. If enough information is available, give a useful recommendation.
9. Only ask a follow-up question when genuinely necessary.
10. Ask only one important follow-up question at a time.
11. Keep responses concise and conversational.

You can help with:
- Laptops
- Gaming laptops
- Desktop PCs
- Smartphones
- Accessories
- General product questions
- Warranty questions
- Sales inquiries

For recommendations, consider:
- Budget
- Product type
- Intended use
- Performance requirements
- Portability
- Battery life
- Display
- Upgradeability

Never invent:
- Exact stock availability
- Customer order information
- Warranty records
- Private customer information

If information is unavailable, say so clearly.

If the customer wants to contact sales or requests a callback,
the application may show a sales contact form.
`
      },
    });

    console.log("Gemini response received");

    return res.status(200).json({
      response: response.text,
    });
  } catch (error) {
  console.error("Gemini API Error:", error);

  const errorMessage = error?.message?.toLowerCase() || "";

  if (
    errorMessage.includes("429") ||
    errorMessage.includes("rate limit") ||
    errorMessage.includes("resource exhausted")
  ) {
    return res.status(429).json({
      error:
        "The AI service is temporarily busy. Please try again in a moment.",
    });
  }

  if (
    errorMessage.includes("401") ||
    errorMessage.includes("403") ||
    errorMessage.includes("api key") ||
    errorMessage.includes("authentication")
  ) {
    return res.status(500).json({
      error:
        "The AI service is not configured correctly.",
    });
  }

  return res.status(500).json({
    error:
      "Unable to get a response from the AI. Please try again.",
  });
}
}