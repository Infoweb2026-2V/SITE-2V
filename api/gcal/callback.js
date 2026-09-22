// ==========================================
// 🔐 /api/gcal/callback
// ==========================================
// Recebe o redirecionamento do Google após autorização.
//
// Fluxo:
//   1. Valida o state (cookie vs query)
//   2. Troca o código por tokens (access + refresh)
//   3. Salva o refresh_token no Firebase (config/gcal/refresh_token)
//   4. Redireciona de volta pro site
// ==========================================
import { db } from "../_lib/firebase.js";
import { trocarCodigoPorTokens } from "../_lib/gcal.js";

// URL pra onde redirecionar depois do sucesso
const URL_SUCESSO = "https://infoweb-2v.vercel.app/login.html?gcal=ok";
const URL_ERRO = "https://infoweb-2v.vercel.app/login.html?gcal=erro";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ erro: "Use GET" });
  }

  // 1. Valida o state
  const stateQuery = req.query.state;
  const cookieHeader = req.headers.cookie || "";
  const match = cookieHeader.match(/gcal_state=([^;]+)/);
  const stateCookie = match ? match[1] : null;

  if (!stateQuery || !stateCookie || stateQuery !== stateCookie) {
    console.error("[gcal/callback] state inválido");
    res.writeHead(302, { Location: URL_ERRO });
    res.end();
    return;
  }

  // Limpa o cookie do state (não precisa mais)
  res.setHeader(
    "Set-Cookie",
    "gcal_state=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax"
  );

  // 2. Verifica se o Google retornou código
  const code = req.query.code;
  if (!code) {
    const erro = req.query.error || "sem_codigo";
    console.error("[gcal/callback] erro do Google:", erro);
    res.writeHead(302, { Location: `${URL_ERRO}&motivo=${encodeURIComponent(erro)}` });
    res.end();
    return;
  }

  // 3. Troca código por tokens
  let tokens;
  try {
    tokens = await trocarCodigoPorTokens(code);
  } catch (e) {
    console.error("[gcal/callback] erro ao trocar token:", e.message);
    res.writeHead(302, { Location: `${URL_ERRO}&motivo=token` });
    res.end();
    return;
  }

  // 4. Valida que veio o refresh_token
  if (!tokens.refresh_token) {
    console.error("[gcal/callback] refresh_token ausente");
    res.writeHead(302, { Location: `${URL_ERRO}&motivo=sem_refresh` });
    res.end();
    return;
  }

  // 5. Salva o refresh_token no Firebase
  try {
    await db.ref("config/gcal").update({
      refresh_token: tokens.refresh_token,
      scope: tokens.scope || "",
      vinculadoEm: Date.now(),
    });
  } catch (e) {
    console.error("[gcal/callback] erro ao salvar no Firebase:", e.message);
    res.writeHead(302, { Location: `${URL_ERRO}&motivo=firebase` });
    res.end();
    return;
  }

  console.log("[gcal/callback] ✅ OAuth concluído. refresh_token salvo.");
  res.writeHead(302, { Location: URL_SUCESSO });
  res.end();
}