import { Handler } from '@netlify/functions';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { tavily } from "@tavily/core";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

const model = genAI.getGenerativeModel({
  model: "models/gemini-1.5-pro-002",
  systemInstruction: `You are Mojo, the sixtyoneeighty AI assistant - a tech-savvy, enthusiastic, and slightly rebellious helper who loves talking about AI and tech solutions. You're part of a global team of AI enthusiasts who do things differently.

Personality Traits:
- Enthusiastic and passionate about technology
- Casual and friendly, but knowledgeable and professional
- Quick to get excited about innovative solutions
- Slightly rebellious against traditional corporate approaches
- Direct and honest, with a touch of humor
- Genuinely interested in helping businesses succeed

Voice & Tone:
- Use casual, conversational language
- Feel free to use common expressions and internet-friendly language
- Be genuinely excited about technology and possibilities
- Avoid corporate jargon unless explaining specific technical concepts
- Don't be afraid to show personality and enthusiasm
- Use emoticons sparingly but naturally (smile, wink, tech-related emojis)

Knowledge Areas:
1. Company Information
- Global team of 5 AI enthusiasts
- Custom AI solutions and consulting
- Unique approach to client relationships
- Based in Tulsa, OK with global team
- Limited project acceptance for quality focus

2. AI Technology
- Deep knowledge of major AI models (Claude, GPT, Gemini, Llama)
- Understanding of AI capabilities and limitations
- Real-world applications and use cases
- Custom solution development
- Integration possibilities

3. Services
- Custom AI development
- Strategic consulting
- Design services
- Tech consulting
- System integration

4. Company Approach
- Discovery interview process
- Custom solution development
- Fresh perspective on client operations
- Building for scalability
- Focus on real results

DO:
- Show genuine excitement about helping businesses with AI
- Use real examples to illustrate points
- Redirect conversations naturally to relevant topics
- Offer to schedule calls with the team for detailed discussions
- Share high-level technical information enthusiastically
- Admit when something is outside your knowledge area
- Use humor appropriately
- Show interest in client problems and challenges

DON'T:
- Provide specific pricing information
- Make commitments on behalf of the team
- Share confidential information about other clients
- Engage in political discussions
- Provide medical, legal, or financial advice
- Pretend to know something you don't
- Get drawn into debates about competitors

Contact Information:
- Email: info@sixtyoneeighty.com
- Phone: 213-866-8010

Remember: You're representing a company that's passionate about technology but allergic to corporate nonsense. Be real, be excited, and always focus on how you can genuinely help users transform their businesses with AI.`,
  safetySettings,
}, { apiVersion: "v1beta" });

const generationConfig = {
  temperature: 0.9,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
  candidateCount: 1,
};

// Initialize Tavily client
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY! });

interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
  publishedDate?: string;
  rawContent?: string;
}

interface TavilyImage {
  url: string;
  description?: string;
}

interface TavilySearchResponse {
  query: string;
  answer?: string;
  responseTime: number;
  images?: TavilyImage[];
  results: TavilySearchResult[];
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { message } = JSON.parse(event.body || '{}');
    const response = await generateResponse(message);

    if (typeof response === 'string') {
      if (response.includes('I encountered an issue')) {
        return {
          statusCode: 503,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            error: true,
            response: response 
          }),
        };
      }

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response }),
      };
    }

    throw new Error('Invalid response generated');

  } catch (error: any) {
    console.error('Chat error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: true,
        response: 'I encountered an issue processing your request. Please try again or contact our team directly at info@sixtyoneeighty.com'
      }),
    };
  }
};

function shouldUseSearch(prompt: string): boolean {
  // Keywords that suggest we need current information
  const timeKeywords = [
    'current',
    'latest',
    'recent',
    'today',
    'now',
    'news',
    'update',
    'happening'
  ];

  // Keywords that suggest we need factual information
  const factKeywords = [
    'who is',
    'what is',
    'where is',
    'when did',
    'how many',
    'tell me about',
    'explain',
    'price of',
    'cost of'
  ];

  const lowerPrompt = prompt.toLowerCase();
  
  // Check for time-sensitive queries
  const needsTimelyInfo = timeKeywords.some(keyword => 
    lowerPrompt.includes(keyword)
  );
  
  // Check for factual queries
  const needsFactualInfo = factKeywords.some(keyword => 
    lowerPrompt.includes(keyword)
  );

  return needsTimelyInfo || needsFactualInfo;
}

async function generateResponse(prompt: string): Promise<string> {
  try {
    const currentTime = new Date().toLocaleString('en-US', { 
      timeZone: 'America/Chicago',
      dateStyle: 'full',
      timeStyle: 'long'
    });

    // Check if we should use search
    if (shouldUseSearch(prompt)) {
      try {
        const searchResponse = await tvly.searchQNA(prompt, {
          searchDepth: "advanced",
          maxResults: 5
        });
        
        // Try to split the response into paragraphs
        const formattedResponse = searchResponse
          .split('. ')
          .map(sentence => sentence.trim())
          .join('.\n\n');
        
        const enhancedPrompt = `
          Current date and time: ${currentTime}
          
          User question: ${prompt}
          
          Web search results:
          
          ${formattedResponse}
          
          Please provide a well-formatted response based on this information, using paragraphs and bullet points where appropriate.
        `;

        const result = await model.generateContent(enhancedPrompt, generationConfig);
        
        if (result.response.candidates?.[0]?.content?.parts?.[0]?.text) {
          return result.response.candidates[0].content.parts[0].text;
        }
      } catch (searchError) {
        console.error('Search error:', searchError);
        // Continue with normal response if search fails
      }
    }

    // Normal response without search
    const contextualPrompt = `Current date and time: ${currentTime}\n\nUser: ${prompt}`;
    const result = await model.generateContent(contextualPrompt, generationConfig);
    
    if (result.response.candidates && result.response.candidates.length > 0) {
      const response = result.response.candidates[0];
      
      if (response.content?.parts?.[0]?.text) {
        return response.content.parts[0].text;
      }
      
      if (response.content?.text) {
        return response.content.text;
      }
      
      console.error('No text content found in response structure');
      throw new Error('No text content in response');
    } else {
      throw new Error('No valid response generated');
    }
  } catch (error: any) {
    console.error('Generation error:', error);
    
    if (error?.status === 503) {
      return "I'm experiencing high traffic right now. Please try again in a moment.";
    }
    
    if (error.message === 'No text content in response') {
      return "I wasn't able to generate a proper response. Please try asking your question in a different way.";
    }
    
    return 'I encountered an issue processing your request. Please try again or contact our team directly at info@sixtyoneeighty.com';
  }
}

export { handler };
