import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json();
    
    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbynN0f9uWaYa9rcFStdMBhMnf1TY6hAUS_qsVB7FDbjCUtZp9keDKaCO4_DdqXCRg7l5A/exec';

    // Server-to-server fetch avoids CORS issues with Google Apps Script
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain', // Google Apps Script handles text/plain without CORS preflight issues
      },
      body: JSON.stringify(data)
    });

    const resultText = await response.text();
    return NextResponse.json({ success: true, message: 'Webhook triggered', googleResponse: resultText });
    
  } catch (error) {
    console.error('Webhook proxy error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process webhook' }, { status: 500 });
  }
}
