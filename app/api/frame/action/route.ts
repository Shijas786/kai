import { NextRequest, NextResponse } from 'next/server';
import { neynarHelpers } from '../../../../lib/neynar';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { trustedData, untrustedData } = body;
    
    if (!trustedData) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const { messageBytes } = trustedData;
    const buttonIndex = untrustedData?.buttonIndex || 1;
    const prompt = untrustedData?.inputText || '';

    let responseText = '';

    if (buttonIndex === 1) {
      // Generate Content
      responseText = `🎯 Content generated for: "${prompt}"\n\nVisit https://takara-content-evolution.vercel.app to see your evolved content!`;
    } else if (buttonIndex === 2) {
      // Schedule Post
      responseText = `📅 Post scheduled for: "${prompt}"\n\nCheck your scheduled posts at https://takara-content-evolution.vercel.app/scheduled`;
    }

    return NextResponse.json({
      frames: [{
        text: responseText
      }]
    });

  } catch (error) {
    console.error('Frame action error:', error);
    return NextResponse.json(
      { error: 'Failed to process frame action' },
      { status: 500 }
    );
  }
} 