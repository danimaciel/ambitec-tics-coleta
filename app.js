const scales = [
  { key: "pontual", label: "Pontual", factor: 1 },
  { key: "local", label: "Local", factor: 2 },
  { key: "entorno", label: "Entorno", factor: 5 },
];

const coefficientOptions = ["", "-3", "-1", "0", "1", "3"];

const criteria = [
  {
    id: "relacoes-equipe",
    aspect: "Capacidade Relacional",
    name: "Relações de equipe / rede de pesquisa",
    weight: 0.1,
    components: [
      ["diversidade-especialidades", "Diversidade de especialidades", 0.1],
      ["interdisciplinaridade", "Interdisciplinaridade (co-autorias)", 0.2],
      ["know-how", "Know-how (referencial conceitual / metodológico)", 0.1],
      ["grupos-pesquisa", "Grupos de estudo / pesquisa formalizados", 0.2],
      ["eventos-formais", "Eventos técnico-científicos formais realizados", 0.2],
      ["adocao-metodologica", "Adoção / apropriação metodológica por membros da rede", 0.2],
    ],
  },
  {
    id: "relacoes-interlocutores",
    aspect: "Capacidade Relacional",
    name: "Relações com interlocutores",
    weight: 0.1,
    components: [
      ["diversidade-interlocutores", "Diversidade de interlocutores", 0.1],
      ["interatividade", "Interatividade entre interlocutores", 0.2],
      ["know-who", "Know-who (referencial operacional)", 0.1],
      ["fontes-recursos", "Fontes de recursos / contratação institucional", 0.2],
      ["redes-comunitarias", "Redes de interações comunitárias", 0.2],
      ["insercao-mercado", "Inserção no mercado", 0.2],
    ],
  },
  {
    id: "instalacoes",
    aspect: "Capacidade Científica-Tecnológica",
    name: "Instalações (métodos e meios)",
    weight: 0.1,
    components: [
      ["infra-institucional", "Infraestrutura institucional", 0.2],
      ["infra-operacional", "Infraestrutura operacional", 0.2],
      ["instrumental-operacional", "Instrumental operacional", 0.2],
      ["instrumental-bibliografico", "Instrumental bibliográfico", 0.2],
      ["informatizacao", "Informatização / automação / tecnologia da informação", 0.1],
      ["compartilhamento", "Compartilhamento da infraestrutura", 0.1],
    ],
  },
  {
    id: "recursos-projeto",
    aspect: "Capacidade Científica-Tecnológica",
    name: "Recursos do projeto",
    weight: 0.1,
    components: [
      ["ampliacao-area", "Infraestrutura (ampliação da área física)", 0.2],
      ["informatizacao-recursos", "Instrumental operacional", 0.2],
      ["aquisicao-bibliografica", "Instrumental bibliográfico", 0.2],
      ["consultores-bolsistas", "Consultores, bolsistas e visitantes", 0.2],
      ["diarias-estadas", "Diárias, traslados e estadas", 0.2],
    ],
  },
  {
    id: "equipe-rede",
    aspect: "Capacidade Organizacional",
    name: "Equipe / Rede de pesquisa",
    weight: 0.1,
    components: [
      ["cursos-internos", "Cursos e treinamentos", 0.2],
      ["experimentos", "Experimentos, avaliações, expedições e ensaios", 0.2],
      ["bancos-dados", "Bancos de dados e plataformas de informação", 0.2],
      ["participacao-eventos", "Participação em eventos técnico-científicos", 0.2],
      ["organizacao-eventos", "Organização de eventos técnico-científicos", 0.1],
      ["sistemas-gestao", "Sistemas de gestão e qualidade", 0.1],
    ],
  },
  {
    id: "transferencia-extensao",
    aspect: "Capacidade Organizacional",
    name: "Transferência / extensão",
    weight: 0.1,
    components: [
      ["treinamentos-publico", "Cursos e treinamentos para público externo", 0.2],
      ["participantes", "Número de participantes", 0.2],
      ["unidades-demonstrativas", "Unidades demonstrativas", 0.2],
      ["midia", "Exposições na mídia / divulgação", 0.2],
      ["projetos-extensao", "Projetos de extensão / desenvolvimento local", 0.1],
      ["disciplinas", "Disciplinas em cursos", 0.1],
    ],
  },
  {
    id: "produtos-pd",
    aspect: "Produtos de Pesquisa e Desenvolvimento",
    name: "Produtos de P&D",
    weight: 0.2,
    components: [
      ["congressos", "Apresentações em congressos", 0.2],
      ["artigos", "Artigos indexados", 0.2],
      ["impacto-wos", "Índice de impacto total", 0.2],
      ["teses", "Teses, dissertações e TCCs", 0.2],
      ["livros-midias", "Livros, capítulos, boletins, guias, websites e mapas", 0.2],
    ],
  },
  {
    id: "produtos-tecnologicos",
    aspect: "Produtos de Pesquisa e Desenvolvimento",
    name: "Produtos tecnológicos",
    weight: 0.2,
    components: [
      ["patentes", "Patentes / registros", 0.2],
      ["variedades", "Variedades / linhagens", 0.2],
      ["praticas", "Novas práticas metodológicas", 0.2],
      ["produtos", "Produtos tecnológicos", 0.2],
      ["marcos", "Marcos regulatórios", 0.2],
    ],
  },
].map((criterion) => ({
  ...criterion,
  components: criterion.components.map(([id, name, weight]) => ({ id, name, weight })),
}));

const sampleResponses = {
  "diversidade-especialidades": { local: 1 },
  "interdisciplinaridade": { local: 3 },
  "know-how": { local: 3 },
  "grupos-pesquisa": { local: 0 },
  "eventos-formais": { local: 0 },
  "adocao-metodologica": { entorno: 3 },
  "diversidade-interlocutores": { entorno: 3 },
  interatividade: { entorno: 3 },
  "know-who": { entorno: 3 },
  "fontes-recursos": { entorno: -3 },
  "redes-comunitarias": { entorno: 3 },
  "insercao-mercado": { entorno: 1 },
  "infra-institucional": { entorno: 3 },
  "infra-operacional": { local: 3 },
  "instrumental-operacional": { local: 3 },
  "instrumental-bibliografico": { entorno: 0 },
  informatizacao: { entorno: 3 },
  compartilhamento: { entorno: 3 },
  "ampliacao-area": { entorno: 3 },
  "informatizacao-recursos": { entorno: 3 },
  "aquisicao-bibliografica": { entorno: 0 },
  "consultores-bolsistas": { entorno: 0 },
  "diarias-estadas": { entorno: 0 },
  "cursos-internos": { entorno: -1 },
  experimentos: { entorno: 0 },
  "bancos-dados": { entorno: 3 },
  "participacao-eventos": { entorno: 1 },
  "organizacao-eventos": { entorno: 0 },
  "sistemas-gestao": { entorno: 0 },
  "treinamentos-publico": { entorno: 1 },
  participantes: { entorno: 1 },
  "unidades-demonstrativas": { entorno: 0 },
  midia: { entorno: 1 },
  "projetos-extensao": { entorno: 0 },
  disciplinas: { entorno: 0 },
  congressos: { na: true },
  artigos: { na: true },
  "impacto-wos": { na: true },
  teses: { na: true },
  "livros-midias": { na: true },
  patentes: { entorno: 0 },
  variedades: { entorno: 0 },
  praticas: { entorno: 1 },
  produtos: { entorno: 0 },
  marcos: { entorno: 1 },
};

const stateKey = "ambitec-tics-piloto-v1";
const elements = {
  container: document.querySelector("#criteriaContainer"),
  template: document.querySelector("#criterionTemplate"),
  dimensionScore: document.querySelector("#dimensionScore"),
  answeredCount: document.querySelector("#answeredCount"),
  weightStatus: document.querySelector("#weightStatus"),
  validationList: document.querySelector("#validationList"),
  technologyName: document.querySelector("#technologyName"),
  cycleYear: document.querySelector("#cycleYear"),
  evaluatorName: document.querySelector("#evaluatorName"),
  unitName: document.querySelector("#unitName"),
};

function formatNumber(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function buildSelect(componentId, scaleKey) {
  const select = document.createElement("select");
  select.dataset.component = componentId;
  select.dataset.scale = scaleKey;
  coefficientOptions.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value === "" ? "-" : value;
    select.appendChild(option);
  });
  return select;
}

function buildInterface() {
  elements.container.textContent = "";
  criteria.forEach((criterion, index) => {
    const node = elements.template.content.cloneNode(true);
    const card = node.querySelector(".criterion-card");
    const header = node.querySelector(".criterion-header");
    const small = node.querySelector("small");
    const title = node.querySelector("strong");
    const result = node.querySelector(".criterion-result");
    const body = node.querySelector(".criterion-body");
    const tbody = node.querySelector("tbody");
    const weightInput = node.querySelector(".criterion-weight");
    const aspectInput = node.querySelector(".criterion-aspect");

    card.dataset.criterion = criterion.id;
    if (index === 0) card.classList.add("open");
    small.textContent = criterion.aspect;
    title.textContent = criterion.name;
    result.dataset.result = criterion.id;
    weightInput.value = criterion.weight;
    weightInput.dataset.criterionWeight = criterion.id;
    aspectInput.value = criterion.aspect;

    header.addEventListener("click", () => card.classList.toggle("open"));
    weightInput.addEventListener("input", update);

    criterion.components.forEach((component) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><div class="component-name">${component.name}</div></td>
        <td><input type="number" min="0" max="1" step="0.1" value="${component.weight}" data-component-weight="${component.id}"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="na-cell"><input type="checkbox" data-na="${component.id}"></td>
        <td><textarea data-justification="${component.id}" placeholder="Evidência ou observação"></textarea></td>
      `;
      scales.forEach((scale, scaleIndex) => {
        row.children[scaleIndex + 2].appendChild(buildSelect(component.id, scale.key));
      });
      tbody.appendChild(row);
    });

    body.addEventListener("input", update);
    body.addEventListener("change", update);
    elements.container.appendChild(node);
  });
}

function getMeta() {
  return {
    technology: elements.technologyName.value.trim(),
    cycle: elements.cycleYear.value,
    evaluator: elements.evaluatorName.value.trim(),
    unit: elements.unitName.value.trim(),
    dimension: "Desenvolvimento Institucional",
    methodVersion: "piloto-github-pages-v1",
    savedAt: new Date().toISOString(),
  };
}

function getResponses() {
  return criteria.map((criterion) => {
    const criterionWeight = Number(document.querySelector(`[data-criterion-weight="${criterion.id}"]`).value || 0);
    return {
      ...criterion,
      weight: criterionWeight,
      components: criterion.components.map((component) => {
        const componentWeight = Number(document.querySelector(`[data-component-weight="${component.id}"]`).value || 0);
        const na = document.querySelector(`[data-na="${component.id}"]`).checked;
        const justification = document.querySelector(`[data-justification="${component.id}"]`).value.trim();
        const values = {};
        scales.forEach((scale) => {
          const value = document.querySelector(`[data-component="${component.id}"][data-scale="${scale.key}"]`).value;
          values[scale.key] = value === "" ? null : Number(value);
        });
        return { ...component, weight: componentWeight, na, justification, values };
      }),
    };
  });
}

function calculateComponent(component) {
  if (component.na) return 0;
  return scales.reduce((total, scale) => {
    const value = component.values[scale.key];
    return total + (value === null ? 0 : value * scale.factor * component.weight);
  }, 0);
}

function calculateCriterion(criterion) {
  return criterion.components.reduce((total, component) => total + calculateComponent(component), 0);
}

function buildEvaluation() {
  const responseCriteria = getResponses();
  const results = responseCriteria.map((criterion) => {
    const score = calculateCriterion(criterion);
    return { id: criterion.id, name: criterion.name, aspect: criterion.aspect, weight: criterion.weight, score };
  });
  const dimensionScore = results.reduce((total, criterion) => total + criterion.score * criterion.weight, 0);
  return {
    meta: getMeta(),
    criteria: responseCriteria,
    results,
    dimensionScore,
  };
}

function validate(evaluation) {
  const messages = [];
  const criterionWeightSum = evaluation.criteria.reduce((total, criterion) => total + criterion.weight, 0);
  if (Math.abs(criterionWeightSum - 1) > 0.001) {
    messages.push({ type: "bad", text: `Pesos dos critérios somam ${formatNumber(criterionWeightSum)}.` });
  }

  evaluation.criteria.forEach((criterion) => {
    const componentWeightSum = criterion.components.reduce((total, component) => total + component.weight, 0);
    if (Math.abs(componentWeightSum - 1) > 0.001) {
      messages.push({ type: "bad", text: `${criterion.name}: pesos somam ${formatNumber(componentWeightSum)}.` });
    }
  });

  if (!evaluation.meta.technology) {
    messages.push({ type: "warn", text: "Tecnologia sem nome." });
  }

  const answered = countAnswered(evaluation);
  if (answered === 0) {
    messages.push({ type: "warn", text: "Nenhum componente respondido." });
  }

  if (messages.length === 0) {
    messages.push({ type: "ok", text: "Estrutura consistente para coleta piloto." });
  }

  return messages;
}

function countAnswered(evaluation) {
  return evaluation.criteria.reduce((total, criterion) => {
    return total + criterion.components.filter((component) => {
      const hasValue = Object.values(component.values).some((value) => value !== null);
      return hasValue || component.na || component.justification;
    }).length;
  }, 0);
}

function update() {
  const evaluation = buildEvaluation();
  evaluation.results.forEach((criterion) => {
    document.querySelector(`[data-result="${criterion.id}"]`).textContent = formatNumber(criterion.score);
  });
  elements.dimensionScore.textContent = formatNumber(evaluation.dimensionScore);
  elements.answeredCount.textContent = countAnswered(evaluation);

  const messages = validate(evaluation);
  elements.weightStatus.textContent = messages.some((message) => message.type === "bad") ? "Rever" : "OK";
  elements.validationList.textContent = "";
  messages.forEach((message) => {
    const item = document.createElement("li");
    item.className = message.type;
    item.textContent = message.text;
    elements.validationList.appendChild(item);
  });

  return evaluation;
}

function saveDraft() {
  localStorage.setItem(stateKey, JSON.stringify(update()));
}

function restoreDraft() {
  const saved = localStorage.getItem(stateKey);
  if (!saved) return;
  applyEvaluation(JSON.parse(saved));
}

function applyEvaluation(evaluation) {
  elements.technologyName.value = evaluation.meta?.technology || "";
  elements.cycleYear.value = evaluation.meta?.cycle || "";
  elements.evaluatorName.value = evaluation.meta?.evaluator || "";
  elements.unitName.value = evaluation.meta?.unit || "";

  evaluation.criteria?.forEach((criterion) => {
    const criterionWeight = document.querySelector(`[data-criterion-weight="${criterion.id}"]`);
    if (criterionWeight) criterionWeight.value = criterion.weight;
    criterion.components.forEach((component) => {
      const componentWeight = document.querySelector(`[data-component-weight="${component.id}"]`);
      const na = document.querySelector(`[data-na="${component.id}"]`);
      const justification = document.querySelector(`[data-justification="${component.id}"]`);
      if (componentWeight) componentWeight.value = component.weight;
      if (na) na.checked = Boolean(component.na);
      if (justification) justification.value = component.justification || "";
      scales.forEach((scale) => {
        const select = document.querySelector(`[data-component="${component.id}"][data-scale="${scale.key}"]`);
        const value = component.values?.[scale.key];
        if (select) select.value = value === null || value === undefined ? "" : String(value);
      });
    });
  });
  update();
}

function loadSample() {
  const evaluation = buildEvaluation();
  evaluation.meta.technology = "GeoInfo";
  evaluation.meta.cycle = "2021";
  evaluation.criteria.forEach((criterion) => {
    criterion.components.forEach((component) => {
      const sample = sampleResponses[component.id];
      component.na = Boolean(sample?.na);
      component.justification = sample?.na ? "Não se aplica ao caso avaliado." : "";
      scales.forEach((scale) => {
        component.values[scale.key] = sample?.[scale.key] ?? null;
      });
    });
  });
  applyEvaluation(evaluation);
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function exportJson() {
  const evaluation = update();
  download(`ambitec-${evaluation.meta.technology || "avaliacao"}.json`, JSON.stringify(evaluation, null, 2), "application/json");
}

function exportCsv() {
  const evaluation = update();
  const rows = [
    ["tecnologia", "ciclo", "dimensao", "aspecto", "criterio", "componente", "peso_criterio", "peso_componente", "pontual", "local", "entorno", "nao_se_aplica", "justificativa"],
  ];
  evaluation.criteria.forEach((criterion) => {
    criterion.components.forEach((component) => {
      rows.push([
        evaluation.meta.technology,
        evaluation.meta.cycle,
        evaluation.meta.dimension,
        criterion.aspect,
        criterion.name,
        component.name,
        criterion.weight,
        component.weight,
        component.values.pontual ?? "",
        component.values.local ?? "",
        component.values.entorno ?? "",
        component.na ? "sim" : "nao",
        component.justification,
      ]);
    });
  });
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  download(`ambitec-${evaluation.meta.technology || "avaliacao"}.csv`, csv, "text/csv;charset=utf-8");
}

document.querySelector("#saveDraft").addEventListener("click", saveDraft);
document.querySelector("#loadSample").addEventListener("click", loadSample);
document.querySelector("#exportJson").addEventListener("click", exportJson);
document.querySelector("#exportCsv").addEventListener("click", exportCsv);
document.querySelector("#printReport").addEventListener("click", () => window.print());
document.querySelector("#clearDraft").addEventListener("click", () => {
  localStorage.removeItem(stateKey);
  window.location.reload();
});
[elements.technologyName, elements.cycleYear, elements.evaluatorName, elements.unitName].forEach((input) => {
  input.addEventListener("input", update);
});

buildInterface();
restoreDraft();
update();
