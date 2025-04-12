import React from "react";

export default function TestGemini() {
  const callGemini = async () => {
    const prompt = document.getElementById("prompt").value;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDj3KIH3Bktp8QKQkpJPY2pLe7wJSuet7s`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const data = await response.json();
    document.getElementById("output").textContent =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(data);
  };

  return (
    <div className="p-12 font-mono">
      <h1 className="text-3xl mb-4">Gemini API Test Page</h1>
      <textarea
        id="prompt"
        placeholder="Ask something..."
        rows="5"
        className="w-full border p-2 mb-4"
      />
      <button
        onClick={callGemini}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
      <pre
        id="output"
        className="mt-4 whitespace-pre-wrap bg-gray-100 p-4"
      ></pre>
    </div>
  );
}
