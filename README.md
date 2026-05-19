# Ambitec-TICs Coleta Piloto

Protótipo estático para coleta piloto do Ambitec-TICs, com dimensões institucional, ambiental, econômica e social.

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
- Coleta respostas por dimensão, critério e componente.
- Valida soma dos fatores de ponderação `k`.
- Usa coeficientes de alteração `-3`, `-1`, `0`, `1` e `3` nas escalas Pontual, Local e Entorno.
- Calcula o índice da dimensão selecionada.
- Calcula índice geral TIC para as dimensões ambiental, econômica e social.
- Salva rascunho no navegador.
- Envia dados para Google Sheets via Google Apps Script, quando uma URL de destino é configurada.
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

## Envio para Google Sheets

1. Crie uma planilha no Google Sheets.
2. Acesse `Extensões > Apps Script`.
3. Cole o conteúdo de `google-apps-script.gs`.
4. Publique como `Implantar > Nova implantação > App da Web`.
5. Em acesso, escolha quem poderá enviar dados.
6. Copie a URL do Web App.
7. Cole essa URL no campo `Destino de dados` do formulário.
