const scales = [
  { key: "pontual", label: "Pontual", factor: 1 },
  { key: "local", label: "Local", factor: 2 },
  { key: "entorno", label: "Entorno", factor: 5 },
];

const coefficientOptions = ["", "-3", "-1", "0", "1", "3"];

const dimensions = ["Institucional", "Ambiental", "Econômica", "Social"];

const institutionalCriteria = [
  {
    dimension: "Institucional",
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
    sample: {
      "diversidade-especialidades": { local: 1 },
      interdisciplinaridade: { local: 3 },
      "know-how": { local: 3 },
      "grupos-pesquisa": { local: 0 },
      "eventos-formais": { local: 0 },
      "adocao-metodologica": { entorno: 3 },
    },
  },
  {
    dimension: "Institucional",
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
    sample: {
      "diversidade-interlocutores": { entorno: 3 },
      interatividade: { entorno: 3 },
      "know-who": { entorno: 3 },
      "fontes-recursos": { entorno: -3 },
      "redes-comunitarias": { entorno: 3 },
      "insercao-mercado": { entorno: 1 },
    },
  },
  {
    dimension: "Institucional",
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
    sample: {
      "infra-institucional": { entorno: 3 },
      "infra-operacional": { local: 3 },
      "instrumental-operacional": { local: 3 },
      "instrumental-bibliografico": { entorno: 0 },
      informatizacao: { entorno: 3 },
      compartilhamento: { entorno: 3 },
    },
  },
  {
    dimension: "Institucional",
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
    sample: {
      "ampliacao-area": { entorno: 3 },
      "informatizacao-recursos": { entorno: 3 },
      "aquisicao-bibliografica": { entorno: 0 },
      "consultores-bolsistas": { entorno: 0 },
      "diarias-estadas": { entorno: 0 },
    },
  },
  {
    dimension: "Institucional",
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
    sample: {
      "cursos-internos": { entorno: -1 },
      experimentos: { entorno: 0 },
      "bancos-dados": { entorno: 3 },
      "participacao-eventos": { entorno: 1 },
      "organizacao-eventos": { entorno: 0 },
      "sistemas-gestao": { entorno: 0 },
    },
  },
  {
    dimension: "Institucional",
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
    sample: {
      "treinamentos-publico": { entorno: 1 },
      participantes: { entorno: 1 },
      "unidades-demonstrativas": { entorno: 0 },
      midia: { entorno: 1 },
      "projetos-extensao": { entorno: 0 },
      disciplinas: { entorno: 0 },
    },
  },
  {
    dimension: "Institucional",
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
    sample: {
      congressos: { na: true },
      artigos: { na: true },
      "impacto-wos": { na: true },
      teses: { na: true },
      "livros-midias": { na: true },
    },
  },
  {
    dimension: "Institucional",
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
    sample: {
      patentes: { entorno: 0 },
      variedades: { entorno: 0 },
      praticas: { entorno: 1 },
      produtos: { entorno: 0 },
      marcos: { entorno: 1 },
    },
  },
];

const ticCriteria = [
  {
    dimension: "Ambiental",
    id: "praticas-politicas-sustentabilidade",
    name: "Práticas e políticas de base para sustentabilidade",
    weight: 0.084,
    components: [
      ["emissoes-atmosfericas", "Prevenção / mitigação de emissões atmosféricas", 0.15],
      ["recursos-hidricos", "Conservação de recursos hídricos", 0.15],
      ["solo", "Conservação da capacidade produtiva do solo", 0.15],
      ["ordenamento-solo", "Ordenamento do uso e ocupação do solo", 0.15],
      ["habitats", "Conservação dos habitats naturais", 0.15],
      ["biodiversidade", "Conservação de recursos genéticos / biodiversidade", 0.15],
      ["energias-alternativas", "Promoção de energias alternativas e autonomia", 0.1],
    ],
    sample: {
      "emissoes-atmosfericas": { entorno: 3 },
      "recursos-hidricos": { entorno: 3 },
      solo: { pontual: 0 },
      "ordenamento-solo": { entorno: 3 },
      habitats: { entorno: 3 },
      biodiversidade: { entorno: 3 },
      "energias-alternativas": { pontual: 0 },
    },
  },
  {
    dimension: "Ambiental",
    id: "ods",
    name: "Alinhamento aos Objetivos do Desenvolvimento Sustentável",
    weight: 0.084,
    components: [
      ["pobreza", "Redução da pobreza (1)", 0.2],
      ["fome", "Redução da fome (2)", 0.2],
      ["saude", "Promoção da saúde e bem-estar (3)", 0.15],
      ["desigualdades", "Redução de desigualdades (10)", 0.15],
      ["responsabilidade-social", "Responsabilidade social institucional (16)", 0.15],
      ["parcerias-ods", "Parcerias institucionais para promoção dos ODS (17)", 0.15],
    ],
    sample: {
      pobreza: { entorno: 3 },
      fome: { entorno: 3 },
      saude: { entorno: 3 },
      desigualdades: { entorno: 3 },
      "responsabilidade-social": { entorno: 3 },
      "parcerias-ods": { entorno: 3 },
    },
  },
  {
    dimension: "Ambiental",
    id: "dependencia-materiais",
    name: "Dependência de materiais, energia e infraestrutura",
    weight: 0.082,
    components: [
      ["combustiveis-fosseis", "Consumo de combustíveis fósseis", -0.1],
      ["biocombustiveis", "Consumo de biocombustíveis", -0.05],
      ["energia-eletrica", "Consumo de energia elétrica", -0.15],
      ["agua", "Consumo de água", -0.15],
      ["fertilizantes", "Consumo de fertilizantes", -0.15],
      ["pesticidas", "Consumo de pesticidas", -0.25],
      ["equipamentos-logistica", "Dependência de equipamentos e logística", -0.15],
    ],
    sample: {
      "combustiveis-fosseis": { entorno: -3 },
      biocombustiveis: { entorno: -3 },
      "energia-eletrica": { entorno: -3 },
      agua: { entorno: -3 },
      fertilizantes: { entorno: -3 },
      pesticidas: { entorno: -3 },
      "equipamentos-logistica": { entorno: -3 },
    },
  },
  {
    dimension: "Ambiental",
    id: "contaminantes-residuos",
    name: "Geração / emissão de contaminantes / resíduos",
    weight: 0.082,
    components: [
      ["efluentes-gasosos", "Efluentes gasosos", -0.3],
      ["efluentes-liquidos", "Efluentes líquidos", -0.4],
      ["efluentes-solidos", "Efluentes sólidos", -0.3],
    ],
    sample: {
      "efluentes-gasosos": { entorno: -3 },
      "efluentes-liquidos": { entorno: -3 },
      "efluentes-solidos": { entorno: -3 },
    },
  },
  {
    dimension: "Econômica",
    id: "produtividade-rentabilidade",
    name: "Produtividade / Rentabilidade",
    weight: 0.084,
    components: [
      ["rentabilidade-trabalho", "Produtividade / Rentabilidade do trabalho", 0.3],
      ["rentabilidade-infra", "Produtividade / Rentabilidade da infraestrutura e equipamentos", 0.2],
      ["rentabilidade-terra", "Produtividade / Rentabilidade da terra", 0.25],
      ["valorizacao-patrimonial", "Valorização patrimonial", 0.25],
    ],
    sample: {
      "rentabilidade-trabalho": { entorno: 3 },
      "rentabilidade-infra": { entorno: 3 },
      "rentabilidade-terra": { entorno: 3 },
      "valorizacao-patrimonial": { entorno: 3 },
    },
  },
  {
    dimension: "Econômica",
    id: "eficiencia-aquisicao",
    name: "Eficiência na aquisição de dados / informações",
    weight: 0.084,
    components: [
      ["tempo-aquisicao", "Redução do tempo de aquisição / obtenção", 0.2],
      ["economia-acesso", "Economia no acesso e obtenção", 0.2],
      ["usabilidade", "Usabilidade do sistema / software / técnica", 0.2],
      ["complementaridade", "Complementaridade com sistemas preexistentes", 0.2],
      ["compatibilidade", "Compatibilidade com sistemas preexistentes", 0.2],
    ],
    sample: {
      "tempo-aquisicao": { entorno: 3 },
      "economia-acesso": { entorno: 3 },
      usabilidade: { entorno: 3 },
      complementaridade: { entorno: 3 },
      compatibilidade: { entorno: 3 },
    },
  },
  {
    dimension: "Econômica",
    id: "acesso-recursos-financeiros",
    name: "Acesso a recursos financeiros",
    weight: 0.084,
    components: [
      ["credito", "Acesso a crédito / empréstimos", 0.2],
      ["fomento", "Acesso a fomento / não reembolsáveis", 0.2],
      ["bolsas", "Acesso a bolsas de estudo", 0.2],
      ["investimentos", "Acesso a investimentos / recursos privados", 0.2],
      ["vendas", "Vendas / comercialização", 0.2],
    ],
    sample: {
      credito: { entorno: 3 },
      fomento: { entorno: 3 },
      bolsas: { entorno: 3 },
      investimentos: { entorno: 3 },
      vendas: { entorno: 3 },
    },
  },
  {
    dimension: "Social",
    id: "respeito-consumidor",
    name: "Respeito ao consumidor / usuário da tecnologia",
    weight: 0.084,
    components: [
      ["saude-animal", "Bem estar e saúde animal", 0.2],
      ["qualidade-produtos", "Qualidade dos produtos / serviços / processos", 0.2],
      ["capital-social", "Capital social", 0.2],
      ["generos", "Oportunidade e igualdade de gêneros", 0.2],
      ["seguranca-alimentar", "Segurança alimentar", 0.2],
    ],
    sample: {
      "saude-animal": { entorno: 3 },
      "qualidade-produtos": { entorno: 3 },
      "capital-social": { entorno: 3 },
      generos: { entorno: 3 },
      "seguranca-alimentar": { entorno: 3 },
    },
  },
  {
    dimension: "Social",
    id: "capacitacao",
    name: "Capacitação e qualificação",
    weight: 0.082,
    components: [
      ["curta-duracao", "Local de curta duração", 0.15],
      ["especializacao", "Especialização", 0.2],
      ["educacao-formal", "Educação formal", 0.2],
      ["basico", "Básico", 0.1],
      ["tecnico", "Técnico", 0.15],
      ["superior", "Superior", 0.2],
    ],
    sample: {
      "curta-duracao": { entorno: 3 },
      especializacao: { entorno: 3 },
      "educacao-formal": { entorno: 3 },
      basico: { entorno: 3 },
      tecnico: { entorno: 3 },
      superior: { entorno: 3 },
    },
  },
  {
    dimension: "Social",
    id: "trabalho-emprego",
    name: "Oferta e qualidade do trabalho / emprego",
    weight: 0.082,
    components: [
      ["temporario", "Temporário", 0.05],
      ["permanente", "Permanente", 0.15],
      ["parcerias-familia", "Parcerias / participação familiar", 0.15],
      ["registro-formal", "Registro formal", 0.25],
      ["auxilio-alimentacao", "Auxílio alimentação", 0.2],
      ["auxilio-moradia", "Auxílio moradia / transporte", 0.2],
    ],
    sample: {
      temporario: { entorno: 3 },
      permanente: { entorno: 3 },
      "parcerias-familia": { entorno: 3 },
      "registro-formal": { entorno: 3 },
      "auxilio-alimentacao": { entorno: 3 },
      "auxilio-moradia": { entorno: 3 },
    },
  },
  {
    dimension: "Social",
    id: "qualidade-informacao",
    name: "Qualidade do recurso 'informação'",
    weight: 0.084,
    components: [
      ["precisao", "Precisão / nível de detalhe da informação", 0.2],
      ["backup", "Back-up / segurança", 0.1],
      ["rastreabilidade", "Rastreabilidade", 0.1],
      ["credibilidade", "Credibilidade", 0.2],
      ["atualidade", "Atualidade da informação", 0.2],
      ["spin-off", "Desdobramentos para novos produtos / tecnologias", 0.2],
    ],
    sample: {
      precisao: { entorno: 3 },
      backup: { entorno: 3 },
      rastreabilidade: { entorno: 3 },
      credibilidade: { entorno: 3 },
      atualidade: { entorno: 3 },
      "spin-off": { entorno: 3 },
    },
  },
  {
    dimension: "Social",
    id: "politicas-publicas",
    name: "Efetividade / aplicabilidade para programas, ações ou políticas públicas",
    weight: 0.084,
    components: [
      ["subsidio-papp", "Subsídio à geração de PAPP", 0.25],
      ["execucao-papp", "Auxílio na execução de PAPP", 0.25],
      ["ampliacao-papp", "Ampliação de PAPP", 0.25],
      ["aperfeicoamento-papp", "Aperfeiçoamento de PAPP", 0.25],
    ],
    sample: {
      "subsidio-papp": { entorno: 3 },
      "execucao-papp": { entorno: 3 },
      "ampliacao-papp": { entorno: 3 },
      "aperfeicoamento-papp": { entorno: 3 },
    },
  },
];

const allCriteria = [...institutionalCriteria, ...ticCriteria].map((criterion) => ({
  ...criterion,
  aspect: criterion.aspect || criterion.dimension,
  componentTarget: criterion.components.reduce((total, component) => total + component[2], 0),
  components: criterion.components.map(([id, name, weight]) => ({ id, name, weight })),
}));

const stateKey = "ambitec-tics-piloto-v2";
let currentDimension = "Institucional";

const elements = {
  container: document.querySelector("#criteriaContainer"),
  template: document.querySelector("#criterionTemplate"),
  dimensionTabs: document.querySelector("#dimensionTabs"),
  dimensionTitle: document.querySelector("#dimensionTitle"),
  dimensionScore: document.querySelector("#dimensionScore"),
  overallScore: document.querySelector("#overallScore"),
  scoreLabel: document.querySelector("#scoreLabel"),
  criteriaCount: document.querySelector("#criteriaCount"),
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

function selectedCriteria() {
  return allCriteria.filter((criterion) => criterion.dimension === currentDimension);
}

function buildTabs() {
  elements.dimensionTabs.textContent = "";
  dimensions.forEach((dimension) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = dimension;
    button.className = dimension === currentDimension ? "active" : "";
    button.addEventListener("click", () => {
      currentDimension = dimension;
      buildInterface();
      const saved = readStoredEvaluation();
      if (saved.criteria) {
        applyEvaluation(saved);
      } else {
        update();
      }
    });
    elements.dimensionTabs.appendChild(button);
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
  buildTabs();
  elements.dimensionTitle.textContent = currentDimension === "Institucional" ? "Desenvolvimento Institucional" : `Dimensão ${currentDimension}`;
  elements.container.textContent = "";
  selectedCriteria().forEach((criterion, index) => {
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
        <td><input type="number" min="-1" max="1" step="0.01" value="${component.weight}" data-component-weight="${component.id}"></td>
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
    selectedDimension: currentDimension,
    methodVersion: "piloto-github-pages-v2",
    savedAt: new Date().toISOString(),
  };
}

function getResponsesFor(criteria) {
  return criteria.map((criterion) => {
    const criterionWeight = Number(document.querySelector(`[data-criterion-weight="${criterion.id}"]`)?.value ?? criterion.weight);
    return {
      ...criterion,
      weight: criterionWeight,
      components: criterion.components.map((component) => {
        const componentWeight = Number(document.querySelector(`[data-component-weight="${component.id}"]`)?.value ?? component.weight);
        const na = Boolean(document.querySelector(`[data-na="${component.id}"]`)?.checked);
        const justification = document.querySelector(`[data-justification="${component.id}"]`)?.value.trim() || "";
        const values = {};
        scales.forEach((scale) => {
          const value = document.querySelector(`[data-component="${component.id}"][data-scale="${scale.key}"]`)?.value ?? "";
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

function dimensionScore(results, dimension) {
  const items = results.filter((criterion) => criterion.dimension === dimension);
  const weightSum = items.reduce((total, criterion) => total + criterion.weight, 0);
  if (!items.length || Math.abs(weightSum) < 0.0001) return 0;
  return items.reduce((total, criterion) => total + criterion.score * criterion.weight, 0) / weightSum;
}

function overallTicScore(results) {
  return results
    .filter((criterion) => criterion.dimension !== "Institucional")
    .reduce((total, criterion) => total + criterion.score * criterion.weight, 0);
}

function buildEvaluation() {
  const visibleResponses = getResponsesFor(selectedCriteria());
  const stored = readStoredEvaluation();
  const merged = allCriteria.map((criterion) => {
    const visible = visibleResponses.find((item) => item.id === criterion.id);
    const saved = stored.criteria?.find((item) => item.id === criterion.id);
    return visible || saved || {
      ...criterion,
      components: criterion.components.map((component) => ({
        ...component,
        na: false,
        justification: "",
        values: { pontual: null, local: null, entorno: null },
      })),
    };
  });
  const results = merged.map((criterion) => ({
    id: criterion.id,
    name: criterion.name,
    aspect: criterion.aspect,
    dimension: criterion.dimension,
    weight: criterion.weight,
    score: calculateCriterion(criterion),
  }));
  return {
    meta: getMeta(),
    criteria: merged,
    results,
    selectedDimensionScore: dimensionScore(results, currentDimension),
    overallTicScore: overallTicScore(results),
  };
}

function readStoredEvaluation() {
  try {
    return JSON.parse(localStorage.getItem(stateKey) || "{}");
  } catch {
    return {};
  }
}

function expectedComponentTarget(criterion) {
  return criterion.componentTarget < 0 ? -1 : 1;
}

function validate(evaluation) {
  const messages = [];
  const ticWeightSum = evaluation.criteria
    .filter((criterion) => criterion.dimension !== "Institucional")
    .reduce((total, criterion) => total + criterion.weight, 0);
  if (Math.abs(ticWeightSum - 1) > 0.001) {
    messages.push({ type: "bad", text: `Pesos gerais TIC somam ${formatNumber(ticWeightSum)}.` });
  }

  selectedCriteria().forEach((criterion) => {
    const current = evaluation.criteria.find((item) => item.id === criterion.id);
    const componentWeightSum = current.components.reduce((total, component) => total + component.weight, 0);
    const target = expectedComponentTarget(criterion);
    if (Math.abs(componentWeightSum - target) > 0.001) {
      messages.push({ type: "bad", text: `${criterion.name}: pesos dos componentes somam ${formatNumber(componentWeightSum)}.` });
    }
  });

  if (!evaluation.meta.technology) {
    messages.push({ type: "warn", text: "Tecnologia sem nome." });
  }

  const answered = countAnswered(evaluation, currentDimension);
  if (answered === 0) {
    messages.push({ type: "warn", text: "Nenhum componente respondido nesta dimensão." });
  }

  if (messages.length === 0) {
    messages.push({ type: "ok", text: "Estrutura consistente para coleta piloto." });
  }
  return messages;
}

function countAnswered(evaluation, dimension = null) {
  return evaluation.criteria
    .filter((criterion) => !dimension || criterion.dimension === dimension)
    .reduce((total, criterion) => {
      return total + criterion.components.filter((component) => {
        const hasValue = Object.values(component.values).some((value) => value !== null);
        return hasValue || component.na || component.justification;
      }).length;
    }, 0);
}

function update() {
  const evaluation = buildEvaluation();
  evaluation.results
    .filter((criterion) => criterion.dimension === currentDimension)
    .forEach((criterion) => {
      const result = document.querySelector(`[data-result="${criterion.id}"]`);
      if (result) result.textContent = formatNumber(criterion.score);
    });
  elements.criteriaCount.textContent = selectedCriteria().length;
  elements.dimensionScore.textContent = formatNumber(evaluation.selectedDimensionScore);
  elements.overallScore.textContent = formatNumber(evaluation.overallTicScore);
  elements.answeredCount.textContent = countAnswered(evaluation, currentDimension);
  elements.scoreLabel.textContent = currentDimension === "Institucional" ? "Índice institucional" : `Índice ${currentDimension.toLowerCase()}`;

  const messages = validate(evaluation);
  elements.weightStatus.textContent = messages.some((message) => message.type === "bad") ? "Rever" : "OK";
  elements.validationList.textContent = "";
  messages.forEach((message) => {
    const item = document.createElement("li");
    item.className = message.type;
    item.textContent = message.text;
    elements.validationList.appendChild(item);
  });
  localStorage.setItem(stateKey, JSON.stringify(evaluation));
  return evaluation;
}

function saveDraft() {
  localStorage.setItem(stateKey, JSON.stringify(update()));
}

function restoreDraft() {
  const saved = readStoredEvaluation();
  if (!saved.criteria) return;
  currentDimension = saved.meta?.selectedDimension || currentDimension;
  buildInterface();
  applyEvaluation(saved);
}

function applyEvaluation(evaluation) {
  elements.technologyName.value = evaluation.meta?.technology || "";
  elements.cycleYear.value = evaluation.meta?.cycle || "";
  elements.evaluatorName.value = evaluation.meta?.evaluator || "";
  elements.unitName.value = evaluation.meta?.unit || "";

  selectedCriteria().forEach((criterion) => {
    const saved = evaluation.criteria?.find((item) => item.id === criterion.id);
    if (!saved) return;
    const criterionWeight = document.querySelector(`[data-criterion-weight="${criterion.id}"]`);
    if (criterionWeight) criterionWeight.value = saved.weight;
    saved.components.forEach((component) => {
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
  const evaluation = {
    meta: { ...getMeta(), technology: "GeoInfo", cycle: "2021" },
    criteria: allCriteria.map((criterion) => ({
      ...criterion,
      components: criterion.components.map((component) => {
        const sample = criterion.sample?.[component.id] || {};
        const values = {};
        scales.forEach((scale) => {
          values[scale.key] = sample[scale.key] ?? null;
        });
        return {
          ...component,
          na: Boolean(sample.na),
          justification: sample.na ? "Não se aplica ao caso avaliado." : "",
          values,
        };
      }),
    })),
  };
  localStorage.setItem(stateKey, JSON.stringify(evaluation));
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
        criterion.dimension,
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
