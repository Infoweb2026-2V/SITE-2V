// ==========================================
// 🎨 /api/gcal/cores
// ==========================================
// Retorna as cores dos eventos do Google Calendar.
// Público (sem auth) — o frontend chama toda vez que abre o site.
//
// Fluxo:
//   1. Lê refresh_token do Firebase
//   2. Renova access_token (expira em 1h)
//   3. Lista eventos dos próximos 60 dias
//   4. Extrai { id: cor } e retorna pro frontend
// ==========================================
import { db } from "../_lib/firebase.js";
import { renovarAccessToken, listarEventos, corDoEvento } from "../_lib/gcal.js";

// ID do calendário da turma (aquele da agenda)
const CALENDAR_ID = "acb20a08d58749d48304dbda5c87bfb7f0671483ecc4ed942683ad5a1307e78d@group.calendar.google.com";

// Cache em memória (evita bater no Google a cada request)
// 5 minutos é suficiente — o Google Calendar não muda tanto assim
const CACHE_TTL = 5 * 60 * 1000;
let __cache = null;
let __cacheExpira = 0;

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") {
    return res.status(405).json({ erro: "Use GET" });
  }

  // 1. Verifica cache
  const agora = Date.now();
  if (__cache && __cacheExpira > agora) {
    res.setHeader("X-Cache", "HIT");
    return res.status(200).json({ sucesso: true, cores: __cache, cache: true });
  }

  try {
    // 2. Lê refresh_token do Firebase
    const snap = await db.ref("config/gcal/refresh_token").get();
    const refreshToken = snap.val();

    if (!refreshToken) {
      return res.status(200).json({
        sucesso: true,
        cores: {},
        motivo: "sem_oauth",
        mensagem: "Nenhum refresh_token salvo. Admin precisa autorizar via /api/gcal/auth",
      });
    }

    // 3. Renova access_token
    const { access_token } = await renovarAccessToken(refreshToken);

    // 4. Define janela: -7 dias até +60 dias
    const agoraISO = new Date().toISOString();
    const em60dias = new Date(agora + 60 * 24 * 60 * 60 * 1000).toISOString();
    const ha7dias = new Date(agora - 7 * 24 * 60 * 60 * 1000).toISOString();

    // 5. Lista eventos
    const eventos = await listarEventos(access_token, CALENDAR_ID, ha7dias, em60dias);

    // 6. Extrai as cores (só eventos que têm cor definida)
    const cores = {};
    eventos.forEach((ev) => {
      const cor = corDoEvento(ev);
      if (cor && ev.id) {
        cores[ev.id] = cor;
      }
    });

    // 7. Salva no cache
    __cache = cores;
    __cacheExpira = agora + CACHE_TTL;

    res.setHeader("X-Cache", "MISS");
    return res.status(200).json({
      sucesso: true,
      cores,
      total: Object.keys(cores).length,
      totalEventos: eventos.length,
      cache: false,
    });
  } catch (e) {
    console.error("[gcal/cores] erro:", e.message);
    // Não expõe erro interno pro cliente — retorna vazio (frontend usa fallback)
    return res.status(200).json({
      sucesso: false,
      cores: {},
      erro: "Erro ao buscar cores",
    });
  }
}