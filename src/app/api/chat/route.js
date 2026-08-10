import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { companyInfo } from '../../../data/company-info';

// Use the API key provided in the environment variables
const apiKey = process.env.GEMINI_API_KEY;
let genAI = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

export async function POST(req) {
  try {
    if (!genAI) {
      return NextResponse.json(
        { reply: 'Please ask the admin to configure the GEMINI_API_KEY in the environment variables.' },
        { status: 500 }
      );
    }

    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: 'Message is required.' }, { status: 400 });
    }

    // Fetch up-to-date products
    const { fetchProducts } = await import('../../../data/products');
    const products = await fetchProducts();
    const productInfo = products.map(p => `- ${p.name}: ₦${p.price.toLocaleString()}`).join('\n');

    // Initialize the model
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.6-flash',
      systemInstruction: companyInfo + `\n\nCURRENT PRICING CATALOG (Always up-to-date):\n${productInfo}`,
    });

    // Generate content
    const result = await model.generateContent(message);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { reply: 'Sorry, I encountered an error while processing your request.' },
      { status: 500 }
    );
  }
}
