// functions/api/chat.js
export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.text();

  // 优先读取网页设置里传过来的 Key
  let apiKey = request.headers.get('Authorization')?.replace('Bearer ', '');
  
  // 如果网页里没填 Key，就使用 Cloudflare 环境变量里的（备用）
  if (!apiKey || apiKey === 'proxy') {
    apiKey = env.DEEPSEEK_API_KEY;
  }

  const resp = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
    },
    body,
  });

  return new Response(resp.body, {
    status: resp.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
