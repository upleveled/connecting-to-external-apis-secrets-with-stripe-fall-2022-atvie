// add api code here

export async function GET() {
  return new Response(JSON.stringify({ message: 'Hello World' }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}
