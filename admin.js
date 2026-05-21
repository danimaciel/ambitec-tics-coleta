const supabaseUrl = "https://fsqezxuypmxibntyhmzj.supabase.co";
const supabasePublishableKey = "sb_publishable_xdiBWOLI-WYkafWnFzlFdA_RMOWNXix";
const client = supabase.createClient(supabaseUrl, supabasePublishableKey);

const elements = {
  loginPanel: document.querySelector("#loginPanel"),
  dashboardPanel: document.querySelector("#dashboardPanel"),
  loginEmail: document.querySelector("#loginEmail"),
  sendLogin: document.querySelector("#sendLogin"),
  loginStatus: document.querySelector("#loginStatus"),
  signOut: document.querySelector("#signOut"),
  refreshData: document.querySelector("#refreshData"),
  technologyFilter: document.querySelector("#technologyFilter"),
  evaluatorFilter: document.querySelector("#evaluatorFilter"),
  submissionsBody: document.querySelector("#submissionsBody"),
  submissionDetail: document.querySelector("#submissionDetail"),
  submissionTotal: document.querySelector("#submissionTotal"),
  technologyTotal: document.querySelector("#technologyTotal"),
  evaluatorTotal: document.querySelector("#evaluatorTotal"),
  dataStatus: document.querySelector("#dataStatus"),
};

let submissions = [];
const dimensions = ["Institucional", "Ambiental", "Econômica", "Social"];

function setStatus(element, type, message) {
  element.className = `submission-status ${type}`;
  element.textContent = message;
}

async function sendLogin() {
  const email = elements.loginEmail.value.trim();
  if (!email) {
    setStatus(elements.loginStatus, "error", "Informe um e-mail.");
    return;
  }
  const { error } = await client.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.href },
  });
  if (error) {
    setStatus(elements.loginStatus, "error", error.message);
    return;
  }
  setStatus(elements.loginStatus, "success", "Link enviado. Verifique seu e-mail.");
}

async function loadSession() {
  const { data } = await client.auth.getSession();
  if (data.session) {
    elements.loginPanel.classList.add("hidden");
    elements.dashboardPanel.classList.remove("hidden");
    await loadSubmissions();
  } else {
    elements.loginPanel.classList.remove("hidden");
    elements.dashboardPanel.classList.add("hidden");
  }
}

async function loadSubmissions() {
  elements.refreshData.disabled = true;
  elements.refreshData.textContent = "Atualizando...";
  const { data, error } = await client
    .from("ambitec_submissions")
    .select("id, created_at, technology, cycle, evaluator, unit, selected_dimension, selected_dimension_score, overall_tic_score, identification, respondent, payload")
    .order("created_at", { ascending: false })
    .limit(500);

  elements.refreshData.disabled = false;
  elements.refreshData.textContent = "Atualizar";

  if (error) {
    elements.dataStatus.textContent = error.message;
    return;
  }
  submissions = data || [];
  render();
}

function render() {
  const technologyTerm = elements.technologyFilter.value.trim().toLowerCase();
  const evaluatorTerm = elements.evaluatorFilter.value.trim().toLowerCase();
  const filtered = submissions.filter((item) => {
    const technology = String(item.technology || item.identification?.technologyFullName || "").toLowerCase();
    const evaluator = String(item.evaluator || item.respondent?.name || "").toLowerCase();
    return technology.includes(technologyTerm) && evaluator.includes(evaluatorTerm);
  });

  elements.submissionTotal.textContent = filtered.length;
  elements.technologyTotal.textContent = new Set(filtered.map((item) => item.technology || item.identification?.technologyFullName).filter(Boolean)).size;
  elements.evaluatorTotal.textContent = new Set(filtered.map((item) => item.evaluator || item.respondent?.name).filter(Boolean)).size;
  elements.dataStatus.textContent = `${filtered.length} registro(s) exibido(s).`;
  elements.submissionsBody.textContent = "";

  filtered.forEach((item) => {
    const scores = getDimensionScores(item);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${new Date(item.created_at).toLocaleString("pt-BR")}</td>
      <td>${escapeHtml(item.technology || item.identification?.technologyFullName || "-")}</td>
      <td>${escapeHtml(item.cycle || item.identification?.chronology || "-")}</td>
      <td>${escapeHtml(item.evaluator || item.respondent?.name || "-")}</td>
      <td>${formatNumber(scores["Institucional"])}</td>
      <td>${formatNumber(scores["Ambiental"])}</td>
      <td>${formatNumber(scores["Econômica"])}</td>
      <td>${formatNumber(scores["Social"])}</td>
      <td>${formatNumber(item.overall_tic_score)}</td>
    `;
    row.addEventListener("click", () => {
      elements.submissionDetail.textContent = buildSubmissionDetail(item, scores);
    });
    elements.submissionsBody.appendChild(row);
  });
}

function getDimensionScores(item) {
  const scores = {};
  dimensions.forEach((dimension) => {
    scores[dimension] = null;
  });

  const results = Array.isArray(item.payload?.results) ? item.payload.results : [];
  dimensions.forEach((dimension) => {
    const items = results.filter((criterion) => criterion.dimension === dimension);
    const weightSum = items.reduce((total, criterion) => total + Number(criterion.weight || 0), 0);
    if (items.length && Math.abs(weightSum) > 0.0001) {
      scores[dimension] = items.reduce((total, criterion) => {
        return total + Number(criterion.score || 0) * Number(criterion.weight || 0);
      }, 0) / weightSum;
    }
  });

  if (item.selected_dimension && scores[item.selected_dimension] === null) {
    scores[item.selected_dimension] = item.selected_dimension_score;
  }

  return scores;
}

function buildSubmissionDetail(item, scores) {
  const summary = {
    id: item.id,
    created_at: item.created_at,
    technology: item.technology || item.identification?.technologyFullName || null,
    cycle: item.cycle || item.identification?.chronology || null,
    evaluator: item.evaluator || item.respondent?.name || null,
    unit: item.unit || null,
    dimension_scores: scores,
    overall_tic_score: item.overall_tic_score,
  };
  return `${JSON.stringify(summary, null, 2)}\n\nPayload completo:\n${JSON.stringify(item.payload || item, null, 2)}`;
}

function formatNumber(value) {
  if (value === null || value === undefined || value === "") return "-";
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  return number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]);
}

elements.sendLogin.addEventListener("click", sendLogin);
elements.refreshData.addEventListener("click", loadSubmissions);
elements.signOut.addEventListener("click", async () => {
  await client.auth.signOut();
  window.location.reload();
});
elements.technologyFilter.addEventListener("input", render);
elements.evaluatorFilter.addEventListener("input", render);

loadSession();
