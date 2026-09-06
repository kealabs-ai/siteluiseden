# 🚀 Guia de Inicialização com Vite - Luis Eden Jardins

## ✅ Configuração Completa para Vite

O projeto foi configurado para usar **Vite** como build tool. Aqui estão as instruções para iniciar.

---

## 📋 Arquivos Configurados

- ✅ `vite.config.js` - Configuração do Vite
- ✅ `index.html` - HTML raiz (na pasta app/)
- ✅ `package.json` - Scripts e dependências atualizados
- ✅ `src/index.jsx` - Entry point atualizado
- ✅ `.env` - Variáveis de ambiente
- ✅ `.gitignore` - Arquivos ignorados

---

## 🚀 Como Iniciar

### Passo 1: Instalar Dependências

```bash
cd app
npm install
```

Isso instalará:
- React 18.2.0
- React DOM 18.2.0
- React Router DOM 6.8.0
- Axios 1.3.0
- Vite 4.3.0
- @vitejs/plugin-react 4.0.0

### Passo 2: Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

O app abrirá automaticamente em `http://localhost:3000`

### Passo 3: Fazer Login

Use os dados de teste:
```
Email: admin@luiseden.com
Senha: 123456
```

### Passo 4: Explorar os Módulos

Após fazer login, você terá acesso a todos os 7 módulos:
- 📊 Dashboard
- 💰 Fluxo de Caixa
- 🛍️ Vendas & Ranking
- 🌿 Catálogo de Plantas
- 📐 Orçamentos
- 📅 Manutenção

---

## 📦 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento com hot reload.

### Build para Produção
```bash
npm run build
```
Cria uma build otimizada em `dist/`.

### Preview da Build
```bash
npm run preview
```
Visualiza a build de produção localmente.

---

## 🌐 Executar Website + App

### Terminal 1 - Website
```bash
cd website
python -m http.server 8000
```
Acesse: `http://localhost:8000`

### Terminal 2 - App (Vite)
```bash
cd app
npm install
npm run dev
```
Acesse: `http://localhost:3000`

---

## 📁 Estrutura do Projeto

```
app/
├── index.html              # HTML raiz (Vite)
├── vite.config.js          # Configuração Vite
├── package.json            # Dependências e scripts
├── .env                    # Variáveis de ambiente
├── .gitignore              # Arquivos ignorados
│
├── src/
│   ├── index.jsx           # Entry point
│   ├── index.css           # Estilos globais
│   ├── App.jsx             # Componente principal
│   ├── App.css             # Estilos do App
│   │
│   ├── modules/            # Módulos da aplicação
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── cashflow/
│   │   ├── sales/
│   │   ├── catalog/
│   │   ├── budgets/
│   │   └── maintenance/
│   │
│   ├── components/         # Componentes compartilhados
│   │   └── Navigation.jsx
│   │
│   └── pages/              # Páginas
│       └── Home.jsx
│
└── dist/                   # Build de produção (gerado)
```

---

## 🔧 Configuração do Vite

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
})
```

**Configurações:**
- `port: 3000` - Porta do servidor
- `open: true` - Abre automaticamente no navegador
- `host: true` - Acessível de outros hosts
- `outDir: 'dist'` - Pasta de saída do build
- `minify: 'terser'` - Minificação com Terser

---

## 🌍 Variáveis de Ambiente

### .env
```
VITE_APP_NAME=Luis Eden Jardins
VITE_APP_VERSION=1.0.0
VITE_API_URL=http://localhost:3001
```

**Acessar no código:**
```javascript
console.log(import.meta.env.VITE_APP_NAME)
console.log(import.meta.env.VITE_API_URL)
```

---

## 🔐 Dados de Teste

### Login
```
Email: admin@luiseden.com
Senha: 123456

Email: user@luiseden.com
Senha: 123456
```

---

## 🎯 Rotas Disponíveis

| Rota | Módulo | Status |
|------|--------|--------|
| `/` | Home | Pública |
| `/login` | Auth | Pública |
| `/dashboard` | Dashboard | Protegida |
| `/cash-flow` | CashFlow | Protegida |
| `/sales` | Sales | Protegida |
| `/catalog` | Catalog | Protegida |
| `/landscaping-budget` | Budgets | Protegida |
| `/maintenance-schedule` | Maintenance | Protegida |

---

## 🔄 Hot Module Replacement (HMR)

Vite oferece HMR automático. Quando você salva um arquivo:
- ✅ Componentes são atualizados instantaneamente
- ✅ Estado é preservado
- ✅ Sem necessidade de recarregar a página

---

## 📊 Performance

Vite oferece:
- ⚡ Inicialização rápida (< 1s)
- ⚡ Hot reload instantâneo
- ⚡ Build otimizado
- ⚡ Code splitting automático

---

## 🐛 Troubleshooting

### Porta 3000 em uso?
```bash
npm run dev -- --port 3001
```

### Limpar cache e reinstalar
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Erro de módulo?
```bash
npm install
npm run dev
```

---

## 📚 Documentação

- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [React Router Docs](https://reactrouter.com/)

---

## ✅ Checklist de Inicialização

- [ ] Instalar Node.js 16+
- [ ] Clonar/baixar o projeto
- [ ] Navegar para pasta `app`
- [ ] Executar `npm install`
- [ ] Executar `npm run dev`
- [ ] Acessar `http://localhost:3000`
- [ ] Fazer login com dados de teste
- [ ] Explorar os módulos

---

## 🎉 Pronto!

Seu app está configurado e pronto para usar com Vite!

```bash
cd app
npm install
npm run dev
```

Aproveite! 🌿

---

**Versão:** 1.0.0  
**Build Tool:** Vite 4.3.0  
**Framework:** React 18.2.0  
**Status:** ✅ Pronto para Usar
