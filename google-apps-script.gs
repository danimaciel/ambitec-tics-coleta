function doPost(e) {
  const payload = JSON.parse(e.postData.contents);
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const submittedAt = new Date();

  const submissions = getOrCreateSheet_(spreadsheet, "Submissions", [
    "submitted_at",
    "technology",
    "cycle",
    "evaluator",
    "unit",
    "selected_dimension",
    "selected_dimension_score",
    "overall_tic_score",
    "payload_json"
  ]);

  submissions.appendRow([
    submittedAt,
    payload.meta && payload.meta.technology,
    payload.meta && payload.meta.cycle,
    payload.meta && payload.meta.evaluator,
    payload.meta && payload.meta.unit,
    payload.meta && payload.meta.selectedDimension,
    payload.selectedDimensionScore,
    payload.overallTicScore,
    JSON.stringify(payload)
  ]);

  const responses = getOrCreateSheet_(spreadsheet, "Responses", [
    "submitted_at",
    "technology",
    "cycle",
    "dimension",
    "criterion",
    "component",
    "criterion_weight",
    "component_weight_k",
    "pontual",
    "local",
    "entorno",
    "nao_se_aplica",
    "justificativa"
  ]);

  (payload.criteria || []).forEach(function(criterion) {
    (criterion.components || []).forEach(function(component) {
      responses.appendRow([
        submittedAt,
        payload.meta && payload.meta.technology,
        payload.meta && payload.meta.cycle,
        criterion.dimension,
        criterion.name,
        component.name,
        criterion.weight,
        component.weight,
        component.values && component.values.pontual,
        component.values && component.values.local,
        component.values && component.values.entorno,
        component.na ? "sim" : "nao",
        component.justification
      ]);
    });
  });

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_(spreadsheet, name, header) {
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(header);
  }
  return sheet;
}
