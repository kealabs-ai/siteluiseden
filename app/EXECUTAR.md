# Luis Eden Paisagismo - App React

## 🚀 Como Executar o App

### Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

Se não tiver instalado, baixe em: https://nodejs.org/

### Verificar Instalação

Abra o terminal/prompt de comando e execute:

```bash
node --version
npm --version
```

Você deve ver as versões instaladas.

---

## 📦 Instalação e Execução

### 1. Abrir Terminal na Pasta do App

```bash
cd siteLuisEden/app
```

### 2. Instalar Dependências

```bash
npm install
```

Isso vai baixar e instalar todas as dependências do projeto (React, React Router, Axios, etc.)

### 3. Iniciar o App em Modo Desenvolvimento

```bash
npm start
```

O app abrirá automaticamente em `http://localhost:3000`

---

## 📝 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o app em modo desenvolvimento |
| `npm build` | Cria versão otimizada para produção |
| `npm test` | Executa testes |
| `npm eject` | Expõe configurações (não recomendado) |

---

## 🔧 Estrutura do Projeto

```
app/
├── public/
│   └── index.html          # HTML principal
├── src/
│   ├── components/
│   │   ├── Navigation.jsx  # Componente de navegação
│   │   └── Navigation.css
│   ├── pages/
│   │   ├── Home.jsx        # Página inicial
│   │   ├── Services.jsx    # Página de serviços
│   │   ├── Gallery.jsx     # Galeria de projetos
│   │   ├── Contact.jsx     # Página de contato
│   │   └── *.css           # Estilos das páginas
│   ├── App.jsx             # Componente principal
│   ├── App.css
│   ├── index.jsx           # Ponto de entrada
│   └── index.css
├── package.json            # Dependências do projeto
└── README.md
```

---

## 🌐 Acessar o App

Após executar `npm start`, o app estará disponível em:

**http://localhost:3000**

---

## 🛠️ Troubleshooting

### Erro: "npm: command not found"
- Node.js não está instalado
- Solução: Instale Node.js em https://nodejs.org/

### Erro: "Port 3000 already in use"
- Outra aplicação está usando a porta 3000
- Solução: Feche a outra aplicação ou use outra porta:
  ```bash
  PORT=3001 npm start
  ```

### Erro: "Module not found"
- Dependências não foram instaladas
- Solução: Execute `npm install` novamente

### App não atualiza após mudanças
- Limpe o cache do navegador (Ctrl+Shift+Del)
- Reinicie o servidor (Ctrl+C e `npm start` novamente)

---

## 📱 Recursos do App

- ✅ Navegação mobile-first
- ✅ Páginas otimizadas para mobile
- ✅ Formulário de contato interativo
- ✅ Galeria com filtros
- ✅ Design moderno e elegante
- ✅ Integração com API (axios)

---

## 🚀 Deploy do App

Para fazer deploy do app em produção:

```bash
npm run build
```

Isso criará uma pasta `build/` com os arquivos otimizados prontos para produção.

Você pode fazer upload dessa pasta para:
- Vercel
- Netlify
- Heroku
- Hostinger
- Qualquer servidor Node.js

---

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- Documentação React: https://react.dev
- Documentação npm: https://docs.npmjs.com
- Stack Overflow: https://stackoverflow.com

---

**Versão:** 1.0  
**Projeto:** Luis Eden Paisagismo  
**Data:** 2025
