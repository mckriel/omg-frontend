import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const tabard_info_path = path.join(process.cwd(), 'public', 'guild-tabard', 'guild-tabard-info.json');
    
    if (!fs.existsSync(tabard_info_path)) {
      return NextResponse.json(
        { error: 'Guild tabard data not found' },
        { status: 404 }
      );
    }

    const tabard_data = JSON.parse(fs.readFileSync(tabard_info_path, 'utf8'));
    
    return NextResponse.json({
      success: true,
      data: tabard_data
    });
  } catch (error) {
    console.error('Error reading guild tabard data:', error);
    return NextResponse.json(
      { error: 'Failed to load guild tabard data' },
      { status: 500 }
    );
  }
}