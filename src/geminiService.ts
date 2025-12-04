// geminiService.ts

interface GeminiResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Calls the Gemini API to generate a personalized response based on selected values
 * @param selectedValues - Array of 3 values chosen by the user
 * @returns Promise with the AI-generated response
 */
export async function getGeminiResponse(selectedValues: string[]): Promise<GeminiResponse> {
  // Replace with your actual Gemini API key
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
  try {
    // Construct the prompt based on selected values
    const prompt = `You are a thoughtful expert on Hindu religious identity. A user has chosen these values that resonate with their understanding of faith: ${selectedValues.join(', ')}.

Based on these values, provide a concise response that in a maximum 3 sentences response:
1. Explains how these values' role and significance in Hindu belief or practice
2. Encourages the user to continue exploring their spiritual path


Focus more on the first point. Keep the tone warm, inclusive, and affirming. The response should feel personal and insightful, not generic.`;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract the generated text from the response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      throw new Error('No text generated from API');
    }

    return {
      success: true,
      message: generatedText
    };

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    return {
      success: false,
      message: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

// test
// (async () => {
//   console.log('\n🔵 STARTING INTEGRATION TEST...');

//   // 1. Define the input
//   const inputs = ['Family', 'God'];
//   console.log(`📤 Sending prompt with values: [${inputs.join(', ')}]`);

//   // 2. Call your function
//   const start = Date.now();
//   const result = await getGeminiResponse(inputs);
//   const time = ((Date.now() - start) / 1000).toFixed(2);

//   // 3. Log the result
//   console.log('-----------------------------------');
//   if (result.success) {
//     console.log(`✅ SUCCESS in ${time}s`);
//     console.log(`📝 Generated Response:\n`);
//     console.log(result.message);
//   } else {
//     console.log(`❌ FAILED in ${time}s`);
//     console.log(`Error: ${result.error}`);
//   }
//   console.log('-----------------------------------');
// })();