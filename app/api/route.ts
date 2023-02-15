// add api code here

import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json(
    { message: 'Hello World' },
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );
}
