// add api code here

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response
    .status(200)
    .json({ sessions: `http://${request.headers.host}/api/sessions` });
}
