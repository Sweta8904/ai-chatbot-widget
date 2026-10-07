# AI Chatbot Widget

A responsive AI chatbot widget built for the Web Developer Technical Assessment.

The chatbot uses Google Gemini API to provide AI responses for an e-commerce/tech product website.

## Features

- Responsive chatbot UI
- Floating chat button
- Google Gemini API integration
- Context-aware conversation
- Typing indicator
- Message timestamps
- 3 quick prompts
- Chat history using LocalStorage
- Contact Sales / Callback form
- Name, Email and Phone validation
- API and network error handling

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Google Gemini API
- LocalStorage

## Project Structure

```text
src/
├── components/
│   ├── ChatButton.jsx
│   ├── ChatWindow.jsx
│   ├── LeadForm.jsx
│   ├── MessageBubble.jsx
│   ├── QuickPrompts.jsx
│   └── TypingIndicator.jsx
├── App.jsx
└── main.jsx

api/
└── chat.js

## Setup

Clone the repository:

```bash
git clone https://github.com/Sweta8904/ai-chatbot-widget.git

Go into the project:
cd ai-chatbot-widget

Install dependencies:
npm install

Install Vercel CLI if needed:
npm install -g vercel

Create a .env file in the project root:
GEMINI_API_KEY=your_gemini_api_key_here

Start the project using Vercel:
vercel dev

The application will be available at the local URL shown by Vercel.

##API Configuration
The chatbot uses Google Gemini API.
The API key is stored in the GEMINI_API_KEY environment variable and is not committed to GitHub.
A .env.example file is included in the project.