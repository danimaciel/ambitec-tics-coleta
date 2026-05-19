# Plano operacional para informatizacao do Ambitec-TICs

## Decisao de produto

Adotar o caminho B: criar um sistema web oficial para novas avaliacoes, mantendo importacao e exportacao em Excel como mecanismo de compatibilidade, transicao e auditoria.

A planilha deixa de ser o lugar principal onde a avaliacao vive. Ela passa a ser um formato de entrada, saida e validacao. O sistema passa a guardar metodo, respostas, justificativas, evidencias, versoes e resultados.

## Objetivo do MVP

Implantar uma primeira versao funcional capaz de:

- cadastrar uma tecnologia avaliada;
- selecionar a versao do metodo Ambitec-TICs;
- preencher uma avaliacao por formulario web;
- reproduzir os calculos da planilha original;
- registrar avaliadores, datas, justificativas e evidencias;
- exportar a avaliacao para Excel em formato compativel com a estrutura atual;
- importar uma planilha preenchida para formar historico e validar resultados;
- gerar um relatorio simples da avaliacao.

## Principio central

Separar quatro coisas que hoje estao misturadas na planilha:

1. Metodo: dimensoes, aspectos, criterios, componentes, pesos, escalas e regras.
2. Avaliacao: respostas, justificativas, evidencias, avaliadores e datas.
3. Calculo: formulas que transformam respostas em coeficientes e indices.
4. Apresentacao: tela web, Excel exportado, relatorio e dashboard.

Essa separacao e o que torna a solucao sustentavel para manutencao, atualizacao e evolucao.

## Escopo recomendado da primeira entrega

Comecar com a dimensao "Desenvolvimento Institucional", usando a avaliacao GeoInfo como caso de teste.

Motivos:

- ha uma planilha real preenchida;
- ha formulas, pesos, validacoes e justificativas suficientes para testar o modelo;
- o resultado final conhecido permite validar o motor de calculo;
- o escopo e pequeno o bastante para uma primeira entrega segura.

Resultado esperado de referencia:

- indice final da avaliacao GeoInfo na planilha analisada: 3,64;
- pesos dos criterios somando 1;
- coeficientes aceitos: -3, -1, 0, 1, 3;
- escalas de ocorrencia: Pontual = 1, Local = 2, Entorno = 5;
- opcao "nao se aplica" registrada explicitamente.

## Arquitetura minima

### Frontend web

Interface para especialistas, avaliadores e gestores.

Funcoes principais:

- login;
- lista de avaliacoes;
- criacao de nova avaliacao;
- formulario por dimensao, aspecto e criterio;
- preenchimento de coeficientes;
- campo de justificativa por componente ou criterio;
- anexos/evidencias;
- revisao dos calculos;
- exportacao para Excel;
- visualizacao de relatorio.

### API

Camada de regras de negocio.

Funcoes principais:

- controlar permissoes;
- salvar avaliacoes;
- acionar motor de calculo;
- validar pesos, escalas e campos obrigatorios;
- controlar versoes do metodo;
- gerar exportacoes;
- registrar trilha de auditoria.

### Motor Ambitec

Modulo responsavel por calcular os resultados.

Requisitos:

- ser testavel isoladamente;
- reproduzir fielmente a planilha;
- ter testes comparando resultados do sistema com planilhas reais;
- aceitar configuracoes de metodo por versao;
- nao depender da interface web.

### Banco de dados

Guardar o que hoje se perde ou fica disperso em arquivos.

Entidades principais:

- usuario;
- unidade;
- tecnologia;
- avaliacao;
- versao do metodo;
- dimensao;
- aspecto;
- criterio;
- componente;
- escala;
- peso;
- resposta;
- justificativa;
- evidencia/anexo;
- resultado calculado;
- evento de auditoria.

### Importador e exportador Excel

Ponte com o modelo atual.

Importador:

- le planilhas antigas;
- extrai respostas, pesos, justificativas e resultados;
- registra inconsistencias;
- permite revisao antes de salvar no banco.

Exportador:

- gera uma planilha semelhante ao modelo original;
- preserva formulas ou apresenta valores calculados;
- inclui metadados da avaliacao;
- permite auditoria externa e circulacao institucional.

## Modelo de dados inicial

### Tecnologia

Campos sugeridos:

- id;
- nome;
- descricao;
- unidade responsavel;
- responsavel tecnico;
- ano/ciclo de avaliacao;
- status.

### Avaliacao

Campos sugeridos:

- id;
- tecnologia_id;
- metodo_versao_id;
- titulo;
- ano;
- tipo: ex post, ex ante, revisao;
- status: rascunho, em revisao, aprovada, arquivada;
- criado_por;
- criado_em;
- atualizado_em;
- aprovado_por;
- aprovado_em.

### MetodoVersao

Campos sugeridos:

- id;
- nome;
- versao;
- data_inicio;
- data_fim;
- status: rascunho, ativo, obsoleto;
- observacoes.

### Criterio

Campos sugeridos:

- id;
- metodo_versao_id;
- dimensao;
- aspecto;
- nome;
- ordem;
- peso_criterio;
- escala_maxima;
- ativo.

### Componente

Campos sugeridos:

- id;
- criterio_id;
- nome;
- ordem;
- peso_componente;
- permite_nao_se_aplica;
- ativo.

### Resposta

Campos sugeridos:

- id;
- avaliacao_id;
- componente_id;
- escala: pontual, local, entorno;
- coeficiente: -3, -1, 0, 1, 3;
- nao_se_aplica;
- justificativa;
- respondido_por;
- respondido_em.

### Resultado

Campos sugeridos:

- id;
- avaliacao_id;
- nivel: componente, criterio, aspecto, dimensao, geral;
- referencia_id;
- valor;
- calculado_em;
- metodo_versao_id.

## Regra de calculo inicial

Para cada criterio:

```text
coeficiente_componente =
  soma(coeficiente_por_escala * fator_escala * peso_componente)
```

Depois:

```text
coeficiente_criterio =
  soma(coeficientes_dos_componentes)
```

Indice da dimensao:

```text
indice =
  soma(peso_criterio * coeficiente_criterio)
```

Validador obrigatorio:

```text
soma_dos_pesos_dos_componentes_por_criterio = 1
soma_dos_pesos_dos_criterios_da_dimensao = 1
```

## Fluxo operacional recomendado

1. Administrador cadastra ou ativa uma versao do metodo.
2. Gestor cria uma avaliacao para uma tecnologia.
3. Avaliadores preenchem criterios, componentes, coeficientes, escalas e justificativas.
4. Sistema valida pesos, campos obrigatorios e inconsistencias.
5. Sistema calcula resultados automaticamente.
6. Revisor analisa justificativas, evidencias e resultados.
7. Avaliacao e aprovada e congelada.
8. Sistema gera relatorio e Excel exportado.
9. Dados ficam disponiveis para consulta historica e comparacoes.

## Backlog por fases

### Fase 0: preparacao

- Escolher uma planilha piloto.
- Confirmar regras de calculo com especialistas Ambitec.
- Mapear campos obrigatorios e opcionais.
- Definir usuarios-piloto.
- Definir onde o sistema sera hospedado.

Entregavel:

- especificacao validada do MVP.

### Fase 1: prototipo funcional

- Criar cadastro de tecnologia.
- Criar cadastro de avaliacao.
- Modelar uma versao do metodo para Desenvolvimento Institucional.
- Criar formulario web para os criterios da planilha GeoInfo.
- Implementar motor de calculo.
- Validar resultado contra o Excel.

Entregavel:

- sistema preenchendo e calculando uma avaliacao real.

### Fase 2: compatibilidade Excel

- Importar a planilha GeoInfo.
- Identificar respostas, pesos, justificativas e resultados.
- Exportar uma avaliacao do sistema para Excel.
- Comparar resultados sistema x Excel.

Entregavel:

- ida e volta basica entre Excel e sistema.

### Fase 3: governanca e auditoria

- Criar trilha de alteracoes.
- Adicionar status de avaliacao.
- Bloquear edicao apos aprovacao.
- Registrar versao do metodo usada em cada avaliacao.
- Criar perfis: administrador, avaliador, revisor, leitor.

Entregavel:

- avaliacao rastreavel e institucionalmente confiavel.

### Fase 4: relatorio e consulta

- Gerar relatorio simples por avaliacao.
- Criar painel com indicadores principais.
- Permitir busca por tecnologia, ano, unidade, metodo e status.
- Exportar dados consolidados.

Entregavel:

- base historica consultavel.

### Fase 5: ampliacao

- Adicionar outras dimensoes Ambitec-TICs.
- Suportar novas versoes do metodo.
- Criar comparacoes entre anos e tecnologias.
- Avaliar integracoes com sistemas corporativos.

Entregavel:

- produto institucional, nao apenas prototipo.

## Stack tecnica sugerida

Opcao conservadora:

- Frontend: React ou Vue.
- Backend: Python/FastAPI ou Java/Spring Boot.
- Banco: PostgreSQL.
- Autenticacao: integrada ao mecanismo institucional, se disponivel.
- Exportacao/importacao Excel: biblioteca backend dedicada.
- Hospedagem: ambiente institucional ou nuvem homologada.

Minha preferencia para MVP:

- FastAPI;
- PostgreSQL;
- React;
- motor de calculo em Python;
- testes automatizados com planilhas reais.

Motivo: Python facilita leitura de Excel, testes numericos e evolucao rapida do motor de calculo.

## Riscos e mitigacoes

### Risco: sistema ficar dificil de manter

Mitigacao:

- metodo configuravel;
- regras de calculo isoladas;
- testes automatizados;
- documentacao curta e viva;
- evitar customizacao excessiva na primeira versao.

### Risco: rejeicao por quem usa Excel

Mitigacao:

- manter exportacao Excel;
- permitir importacao de planilhas antigas;
- usar linguagem visual parecida com o metodo atual;
- fazer piloto com poucos avaliadores.

### Risco: divergencia entre sistema e planilha

Mitigacao:

- criar testes de equivalencia;
- usar planilhas reais como massa de validacao;
- registrar versao do metodo e formulas usadas;
- revisar resultados com especialistas.

### Risco: metodo mudar com frequencia

Mitigacao:

- versionar metodo;
- congelar avaliacoes aprovadas;
- permitir nova versao sem alterar avaliacoes antigas;
- criar tela administrativa para pesos, componentes e textos.

## Primeiras decisoes a tomar

1. O piloto sera apenas Desenvolvimento Institucional ou todas as dimensoes do Ambitec-TICs?
2. Quem sao os perfis minimos de usuario?
3. A avaliacao precisa de fluxo formal de aprovacao no MVP?
4. O sistema deve operar inicialmente na infraestrutura da Embrapa ou pode ser prototipado fora?
5. Exportar Excel deve reproduzir visualmente a planilha original ou apenas gerar uma planilha equivalente e legivel?
6. O metodo deve ser editavel pela interface ja no MVP ou pode comecar configurado por arquivo tecnico?

## Recomendacao de decisao para o MVP

- Piloto: Desenvolvimento Institucional.
- Perfis: administrador, avaliador, revisor.
- Aprovacao: simples, com status e bloqueio apos aprovacao.
- Metodo: configurado por arquivo tecnico na primeira versao, editavel por interface na segunda.
- Excel: exportacao equivalente e legivel; reproducao visual perfeita fica para depois.
- Infraestrutura: comecar em ambiente de homologacao simples, mas ja com banco real e backups.

## Marco de sucesso do piloto

O piloto pode ser considerado bem-sucedido quando:

- uma avaliacao real for preenchida no sistema;
- o sistema calcular o mesmo resultado da planilha de referencia;
- a avaliacao puder ser exportada para Excel;
- a avaliacao ficar registrada com usuario, data, justificativas e versao do metodo;
- pelo menos um especialista Ambitec validar que o fluxo respeita a logica metodologica.

