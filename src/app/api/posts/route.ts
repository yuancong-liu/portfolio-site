import { NextResponse } from 'next/server';

import { storage } from '~/config/firebase';

export const GET = async () => {
  NextResponse.json({
    message: 'GET method',
  });
};
