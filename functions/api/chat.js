export async function onRequestPost(context) {
  const { request, env } = context;
  const bodyText = await request.text();
  let body = JSON.parse(bodyText);
  
  // 强制开启流式传输，实现打字机效果
  body.stream = true;

  const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '') || env.DEEPSEEK_API_KEY;

  const resp = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
    },
    body: JSON.stringify(body),
  });

  return new Response(resp.body, {
    status: resp.status,
    headers: { 
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    },
  });
}
