export const prerender = false;

export function GET() {
  return new Response(JSON.stringify({ healthy: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function HEAD() {
  return new Response(null, {
    status: 204,
  });
}
