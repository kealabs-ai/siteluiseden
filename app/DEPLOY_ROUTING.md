# Instruções de Deploy - Luis Eden App

## Problema Resolvido: Erro 404 no /login

O erro 404 ao acessar `/login` online ocorria porque o servidor não estava configurado para redirecionar todas as rotas para `index.html` (necessário para Single Page Applications com React Router).

## Soluções Implementadas

### 1. Correções no Código

#### Navigation.jsx
- ✅ Importado `Link` do React Router
- ✅ Substituído `<a href="/login">` por `<Link to="/login">`
- ✅ Removido `target="_blank"` e `rel="noopener noreferrer"`
- ✅ Botão "Área do Cliente" agora usa React Router

#### Home.jsx
- ✅ Importado `Link` do React Router
- ✅ Adicionado botão "Área do Cliente" no hero
- ✅ Botão usa `<Link to="/login">` em vez de `<a href>`

### 2. Configurações de Deploy

Foram criados 3 arquivos de configuração para diferentes plataformas:

#### Para Netlify
**Arquivo:** `public/_redirects`
```
/* /index.html 200
```
- Redireciona todas as rotas para index.html
- Permite que React Router gerencie o roteamento

#### Para Vercel
**Arquivo:** `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
- Reescreve todas as rotas para index.html
- Mantém a URL original no navegador

#### Para Apache
**Arquivo:** `public/.htaccess`
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
- Redireciona todas as rotas para index.html
- Funciona em servidores Apache com mod_rewrite

## Como Fazer Deploy

### Netlify
1. Conecte seu repositório GitHub
2. Configure o build command: `npm run build`
3. Configure o publish directory: `dist`
4. O arquivo `_redirects` será automaticamente detectado

### Vercel
1. Importe o projeto do GitHub
2. Configure o build command: `npm run build`
3. Configure o output directory: `dist`
4. O arquivo `vercel.json` será automaticamente detectado

### Apache (Servidor Compartilhado)
1. Faça upload dos arquivos de `dist/` para o servidor
2. Certifique-se de que `mod_rewrite` está ativado
3. O arquivo `.htaccess` deve estar na raiz do projeto

### Servidor Node.js (Express)
Se estiver usando um servidor Node.js customizado:

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));

// Redirecionar todas as rotas para index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

## Testando Localmente

### Desenvolvimento
```bash
npm run dev
```
- Acesse `http://localhost:5173`
- Clique em "Área do Cliente" ou acesse `http://localhost:5173/login`

### Produção (Preview)
```bash
npm run build
npm run preview
```
- Acesse `http://localhost:4173`
- Teste a navegação para `/login`

## Rotas Disponíveis

- `/` - Página inicial (Home)
- `/login` - Página de login
- `/dashboard` - Dashboard (protegido)
- `/cash-flow` - Fluxo de caixa (protegido)
- `/sales` - Vendas (protegido)
- `/catalog` - Catálogo (protegido)
- `/landscaping-budget` - Orçamento de paisagismo (protegido)
- `/maintenance-schedule` - Agendamento de manutenção (protegido)

## Segurança

✅ Todas as vulnerabilidades foram corrigidas:
- React Router: 7.18.3 (corrige CVE-2025-68470)
- Vite: 8.2.2 (corrige GHSA-67mh-4wv8-2f99)
- 0 vulnerabilidades encontradas

## Próximos Passos

1. Escolha a plataforma de deploy (Netlify, Vercel, Apache, etc.)
2. Configure o build e deploy conforme as instruções acima
3. Teste a navegação para `/login` após o deploy
4. Verifique se o botão "Área do Cliente" funciona corretamente

## Suporte

Se o erro 404 persistir após o deploy:
1. Verifique se o arquivo de configuração correto foi enviado
2. Limpe o cache do navegador (Ctrl+Shift+Delete)
3. Verifique os logs do servidor para erros
4. Certifique-se de que o build foi feito com `npm run build`
