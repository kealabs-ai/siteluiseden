# siteluiseden
estrutura do site de paisagismo luis eden

# Luis Eden Paisagismo - Site e App

Estrutura completa de site e aplicativo mobile para Luis Eden Paisagismo.

## 📁 Estrutura do Projeto

```
siteLuisEden/
├── site/                    # Site estático (HTML/CSS/JS)
│   ├── index.html          # Página principal
│   └── assets/
│       ├── css/
│       │   └── style.css   # Estilos completos
│       └── js/
│           └── main.js     # Interatividade
│
└── app/                     # App React (Mobile-first)
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.jsx
    │   ├── index.css
    │   ├── components/
    │   │   ├── Navigation.jsx
    │   │   └── Navigation.css
    │   └── pages/
    │       ├── Home.jsx & Home.css
    │       ├── Services.jsx & Services.css
    │       ├── Gallery.jsx & Gallery.css
    │       └── Contact.jsx & Contact.css
    └── package.json
```

## 🚀 Como Executar

### Site (HTML/CSS/JS)

**Opção 1: Abrir direto no navegador**
```bash
# Navegue até a pasta site e clique duas vezes em index.html
```

**Opção 2: Usar servidor local (Python)**
```bash
cd site
python -m http.server 8000
# Acesse: http://localhost:8000
```

**Opção 3: Usar Live Server (VS Code)**
- Instale a extensão "Live Server"
- Clique com botão direito em `index.html`
- Selecione "Open with Live Server"

### App (React)

**Instalação e execução:**
```bash
cd app
npm install
npm start
```

O app abrirá em `http://localhost:3000`

## 🎨 Identidade Visual

**Paleta de Cores:**
- Verde Primário: #2d5016
- Verde Claro: #4a7c2c
- Amarelo Dourado: #d4af37
- Amarelo Claro: #f4e4c1
- Branco: #ffffff
- Cinza: #f5f5f5

**Tipografia:**
- Títulos: Playfair Display (serif)
- Corpo: Inter (sans-serif)

## 📱 Responsividade

Ambos os projetos são totalmente responsivos:
- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)

## 🌿 Menus Implementados

- ✅ Sobre a Empresa
- ✅ Serviços de Paisagismo
- ✅ Floricultura
- ✅ Projetos Executados
- ✅ Contato

## ✨ Recursos

**Site:**
- Hero section com animações
- Galeria de projetos com filtros
- Depoimentos de clientes
- Formulário de contato
- Botão WhatsApp flutuante
- Navbar responsiva com hamburger menu

**App:**
- Navegação mobile-first
- Páginas otimizadas para mobile
- Formulário de contato interativo
- Galeria com filtros
- Design moderno e elegante

## 📞 Contato

Para dúvidas ou sugestões sobre o projeto, entre em contato com a Luis Eden Paisagismo.
