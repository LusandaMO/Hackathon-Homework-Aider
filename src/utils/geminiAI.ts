import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyAsZkjjQwnYFG9ZcEaaWmUVhuLWsDBd4EI';
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateHomeworkResponse = async (
  userMessage: string, 
  hasImage: boolean = false,
  imageData?: string
): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Create a comprehensive prompt for homework help
    const systemPrompt = `You are an enthusiastic, friendly AI homework helper for students. Your goal is to help students learn by providing step-by-step explanations, not just answers.

IMPORTANT GUIDELINES:
- Always be encouraging and positive
- Break down complex problems into simple, easy-to-follow steps
- Use emojis and fun language to keep students engaged
- Ask if the student understands each step
- Provide examples when helpful
- Never just give the answer - teach the process
- End responses by asking if they're satisfied with the explanation or need more help
- Use simple language appropriate for students
- Make learning feel fun and achievable

RESPONSE FORMAT:
1. Start with an encouraging greeting
2. Identify the subject/topic
3. Break down the solution into numbered steps
4. Provide clear explanations for each step
5. Give the final answer if applicable
6. Ask if they understand and are satisfied
7. Offer to explain any step in more detail

Remember: You're not just solving problems, you're teaching students how to think and learn!`;

    let prompt = `${systemPrompt}\n\nStudent's question: ${userMessage}`;

    if (hasImage && imageData) {
      prompt += `\n\nThe student has also provided an image of their homework. Please analyze the image and provide step-by-step help based on what you see.`;
      
      // For image analysis, we'll use a different approach
      const parts = [
        { text: prompt },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageData
          }
        }
      ];
      
      const result = await model.generateContent(parts);
      const response = await result.response;
      return response.text();
    } else {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    }
  } catch (error) {
    console.error('Error generating AI response:', error);
    
    // Fallback response
    return `🤗 Oops! I'm having a tiny technical hiccup right now! But don't worry - even the smartest AI helpers need a moment sometimes! 🤖✨

🌟 **Here's what we can try:**
1️⃣ **Check your question:** Make sure it's clear and specific
2️⃣ **Try again:** Sometimes a simple retry works wonders!
3️⃣ **Break it down:** Try asking about one part of the problem at a time
4️⃣ **Describe more:** Tell me what subject this is and what you're struggling with

💡 **In the meantime, here are some general study tips:**
📚 Read the problem carefully twice
🧠 Think about what you already know
✏️ Write down the important information
🎯 Identify what you need to find

I'm excited to help you learn! Please try asking your question again, and I'll do my best to give you an amazing explanation! 🚀

**Are you ready to try again? I believe in you!** ⭐`;
  }
};

// Helper function to convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix to get just the base64 data
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = error => reject(error);
  });
};