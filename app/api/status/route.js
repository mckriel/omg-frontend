import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/status`, {
      cache: 'no-store' // Disable caching for dynamic data
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Error fetching status:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch status',
        message: error.message 
      },
      { status: 500 }
    );
  }
} 