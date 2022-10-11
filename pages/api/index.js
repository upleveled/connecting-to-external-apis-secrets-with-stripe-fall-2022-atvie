// add api code here

export default async function handler(request, response) {
  response
    .status(200)
    .json({ sessions: `http://${request.headers.host}/api/sessions` });
}
