// functions/api/chat.js
export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.text();

  const resp = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + env.DEEPSEEK_API_KEY,
    },
    body,
  });

  return new Response(resp.body, {
    status: resp.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
