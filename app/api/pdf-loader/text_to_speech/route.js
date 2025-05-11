import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import gTTS from 'gtts';

const access = promisify(fs.access);
const mkdir = promisify(fs.mkdir);

export async function POST(req) {
  try {
    const body = await req.json();
    const text = body.text;

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Save directly to /public/voice.mp3
    const audioDir = path.join(process.cwd(), 'public');
    const fileName = 'voice.mp3';
    const filePath = path.join(audioDir, fileName);
    const audioUrl = `/${fileName}`;

    // Ensure public folder exists
    try {
      await access(audioDir);
    } catch {
      await mkdir(audioDir, { recursive: true });
    }

    const gtts = new gTTS(text, 'en');
    await new Promise((resolve, reject) => {
      gtts.save(filePath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return NextResponse.json({ audioUrl });
  } catch (error) {
    console.error('TTS Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
