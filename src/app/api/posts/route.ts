import { NextResponse } from 'next/server';

export const GET = async () =>
  NextResponse.json({
    message: 'GET method',
  });
