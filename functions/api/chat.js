// functions/api/chat.js - 非流式（稳定版）
export async function onRequestPost(context) {
  const { request, env } = context;
  const bodyText = await request.text();
  let body = JSON.parse(bodyText);
  
  // 强制关闭流式，一次性接收响应
  body.stream = false;

  const resp = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (request.headers.get('Authorization')?.replace('Bearer ', '') || env.DEEPSEEK_API_KEY),
    },
    body: JSON.stringify(body),
  });

  return new Response(resp.body, {
    status: resp.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
