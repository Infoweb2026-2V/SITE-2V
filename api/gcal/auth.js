// ==========================================
// 🔐 /api/gcal/auth
// ==========================================
// Inicia o fluxo OAuth: redireciona o admin pro Google.
//
// Uso: VOCÊ (admin) acessa esse endpoint UMA VEZ:
//   https://infoweb-2v.vercel.app/api/gcal/auth?secret=SEU_SECRET
//
// Depois de autorizar, o Google redireciona pro /api/gcal/callback
// ==========================================
import { gerarState, montarUrlAutorizacao } from "../_lib/gcal.js";

export default async function handler(req, res) {
  // CORS
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") {
    return res.status(405).json({ erro: "Use GET" });
  }

  // 🔒 Proteção por secret
  const SECRET = process.env.GCAL_AUTH_SECRET;
  if (!SECRET) {
    console.error("[gcal/auth] GCAL_AUTH_SECRET não configurado");
    return res.status(500).json({ erro: "Configuração ausente" });
  }
  if (req.query.secret !== SECRET) {
    return res.status(401).json({ erro: "Não autorizado" });
  }

  try {
    // 1. Gera um state aleatório (anti-CSRF)
    const state = gerarState();

    // 2. Guarda o state num cookie HttpOnly (valida depois no callback)
    //    Expira em 10 minutos
    res.setHeader(
      "Set-Cookie",
      `gcal_state=${state}; Path=/; Max-Age=600; HttpOnly; Secure; SameSite=Lax`
    );

    // 3. Monta a URL de autorização
    const url = montarUrlAutorizacao(state);

    // 4. Redireciona pro Google
    res.writeHead(302, { Location: url });
    res.end();
  } catch (e) {
    console.error("[gcal/auth] erro:", e.message);
    return res.status(500).json({
      sucesso: false,
      erro: "Erro ao iniciar OAuth: " + e.message,
    });
  }
}