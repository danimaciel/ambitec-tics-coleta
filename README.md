# Ambitec-TICs Coleta Piloto

Protótipo estático para coleta da dimensão Desenvolvimento Institucional do Ambitec-TICs.

## Como abrir localmente

Abra `index.html` no navegador.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie estes arquivos para a raiz do repositório:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
3. No GitHub, acesse `Settings > Pages`.
4. Em `Build and deployment`, selecione `Deploy from a branch`.
5. Escolha a branch `main` e a pasta `/root`.
6. Salve e aguarde a URL pública do GitHub Pages.

## O que esta versão faz

- Coleta metadados da avaliação.
- Coleta respostas por critério e componente.
- Valida soma dos pesos.
- Calcula o índice da dimensão.
- Salva rascunho no navegador.
- Exporta JSON e CSV.
- Gera uma visualização de relatório para impressão.

## Limite importante

GitHub Pages é hospedagem estática. Ele não grava dados em um banco sozinho.

Para uso institucional, o próximo passo é acoplar uma camada de persistência:

- Supabase;
- Firebase;
- API própria;
- GitHub Issues/Pull Requests como armazenamento provisório;
- Google Sheets como base temporária.

Para piloto com especialistas, a exportação JSON/CSV já é suficiente para testar método, telas, cálculo e fluxo.
