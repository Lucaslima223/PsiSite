# Site — Psicóloga

Projeto em React + Vite, pronto para deploy na Vercel.

## Rodar localmente

```bash
npm install
npm run dev
```

## Antes de publicar

Edite `src/App.jsx`:
1. `WHATSAPP_NUMBER` — número real no formato `55DDDNÚMERO` (ex: `5511987654321`)
2. `NOME` e `CRP` — dados reais da profissional
3. Troque os componentes `<ImagePlaceholder />` por fotos reais (`<img src="..." />`)
4. Endereço, e-mail e Instagram no rodapé

## Deploy na Vercel

**Opção 1 — via GitHub (recomendado)**
1. Suba esta pasta para um repositório no GitHub
2. Na Vercel, clique em "Add New… → Project" e importe o repositório
3. A Vercel detecta automaticamente o framework "Vite" — não precisa mudar nada
4. Clique em "Deploy"

**Opção 2 — via CLI**
```bash
npm install -g vercel
vercel
```
Siga as instruções no terminal (aceite as configurações padrão detectadas para Vite).
