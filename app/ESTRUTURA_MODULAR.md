# 📁 Estrutura Modular - Luis Eden Jardins App

## 🎯 Nova Organização em Módulos

```
app/src/
│
├── 📂 modules/                          # Módulos da aplicação
│   │
│   ├── 📂 auth/                         # Módulo de Autenticação
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   └── LoginForm.css
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── services/
│   │   │   └── authService.js
│   │   └── index.js
│   │
│   ├── 📂 dashboard/                   # Módulo Dashboard
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Dashboard.css
│   │   ├── components/
│   │   │   ├── KPICard.jsx
│   │   │   ├── KPICard.css
│   │   │   ├── BotanicPanel.jsx
│   │   │   └── BotanicPanel.css
│   │   ├── hooks/
│   │   │   └── useDashboard.js
│   │   ├── services/
│   │   │   └── dashboardService.js
│   │   └── index.js
│   │
│   ├── 📂 cashflow/                    # Módulo Fluxo de Caixa
│   │   ├── pages/
│   │   │   ├── CashFlow.jsx
│   │   │   └── CashFlow.css
│   │   ├── components/
│   │   │   ├── TransactionTable.jsx
│   │   │   ├── TransactionTable.css
│   │   │   ├── FilterBar.jsx
│   │   │   └── FilterBar.css
│   │   ├── hooks/
│   │   │   └── useCashFlow.js
│   │   ├── services/
│   │   │   └── cashflowService.js
│   │   └── index.js
│   │
│   ├── 📂 sales/                       # Módulo Vendas
│   │   ├── pages/
│   │   │   ├── Sales.jsx
│   │   │   └── Sales.css
│   │   ├── components/
│   │   │   ├── PlantRanking.jsx
│   │   │   ├── PlantRanking.css
│   │   │   ├── PDVCart.jsx
│   │   │   └── PDVCart.css
│   │   ├── hooks/
│   │   │   └── useSales.js
│   │   ├── services/
│   │   │   └── salesService.js
│   │   └── index.js
│   │
│   ├── 📂 catalog/                     # Módulo Catálogo
│   │   ├── pages/
│   │   │   ├── Catalog.jsx
│   │   │   └── Catalog.css
│   │   ├── components/
│   │   │   ├── PlantCard.jsx
│   │   │   ├── PlantCard.css
│   │   │   ├── PlantDetails.jsx
│   │   │   └── PlantDetails.css
│   │   ├── hooks/
│   │   │   └── useCatalog.js
│   │   ├── services/
│   │   │   └── catalogService.js
│   │   └── index.js
│   │
│   ├── 📂 budgets/                     # Módulo Orçamentos
│   │   ├── pages/
│   │   │   ├── LandscapingBudget.jsx
│   │   │   └── LandscapingBudget.css
│   │   ├── components/
│   │   │   ├── ProjectForm.jsx
│   │   │   ├── ProjectForm.css
│   │   │   ├── ProjectCard.jsx
│   │   │   └── ProjectCard.css
│   │   ├── hooks/
│   │   │   └── useBudgets.js
│   │   ├── services/
│   │   │   └── budgetsService.js
│   │   └── index.js
│   │
│   ├── 📂 maintenance/                 # Módulo Manutenção
│   │   ├── pages/
│   │   │   ├── MaintenanceSchedule.jsx
│   │   │   └── MaintenanceSchedule.css
│   │   ├── components/
│   │   │   ├── ContractList.jsx
│   │   │   ├── ContractList.css
│   │   │   ├── DailyChecklist.jsx
│   │   │   └── DailyChecklist.css
│   │   ├── hooks/
│   │   │   └── useMaintenance.js
│   │   ├── services/
│   │   │   └── maintenanceService.js
│   │   └── index.js
│   │
│   └── 📂 home/                        # Módulo Home (Página Inicial)
│       ├── pages/
│       │   ├── Home.jsx
│       │   └── Home.css
│       ├── components/
│       │   └── (componentes específicos)
│       └── index.js
│
├── 📂 shared/                           # Componentes Compartilhados
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Navigation.css
│   │   ├── Sidebar.jsx
│   │   ├── Sidebar.css
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useTheme.js
│   ├── services/
│   │   ├── api.js
│   │   └── storage.js
│   ├── utils/
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── constants.js
│   └── styles/
│       ├── variables.css
│       ├── globals.css
│       └── animations.css
│
├── 📂 context/                          # Context API
│   ├── AuthContext.jsx
│   ├── AppContext.jsx
│   └── ThemeContext.jsx
│
├── 📂 hooks/                            # Custom Hooks Globais
│   ├── useAuth.js
│   ├── useLocalStorage.js
│   └── useFetch.js
│
├── 📂 services/                         # Serviços Globais
│   ├── api.js
│   ├── auth.js
│   └── storage.js
│
├── 📂 utils/                            # Utilitários Globais
│   ├── formatters.js
│   ├── validators.js
│   ├── constants.js
│   └── helpers.js
│
├── 📂 styles/                           # Estilos Globais
│   ├── variables.css
│   ├── globals.css
│   ├── animations.css
│   └── responsive.css
│
├── App.jsx                              # Componente Principal
├── App.css
├── index.jsx                            # Entry Point
├── index.css
└── ProtectedRoute.jsx                   # Rota Protegida
```

---

## 🎯 Estrutura de Módulos

### Cada Módulo Contém:

```
module/
├── pages/                   # Páginas do módulo
│   ├── ModuleName.jsx
│   └── ModuleName.css
├── components/              # Componentes específicos
│   ├── Component1.jsx
│   ├── Component1.css
│   ├── Component2.jsx
│   └── Component2.css
├── hooks/                   # Custom hooks do módulo
│   └── useModuleName.js
├── services/                # Serviços/API do módulo
│   └── moduleService.js
└── index.js                 # Exportações do módulo
```

---

## 🔐 Módulo de Autenticação

### Fluxo de Login

```
Website
  ↓
Botão "Área do Cliente"
  ↓
App (Rota /login)
  ↓
Tela de Login
  ├─ Email/Usuário
  ├─ Senha
  └─ Botão Entrar
  ↓
Validação
  ├─ Sucesso → Dashboard
  └─ Erro → Mensagem de erro
```

### Componentes do Auth

- **Login.jsx** - Página de login
- **LoginForm.jsx** - Formulário de login
- **useAuth.js** - Hook de autenticação
- **authService.js** - Serviço de autenticação

---

## 📊 Módulos Disponíveis

### 1. Auth (Autenticação)
- Login
- Logout
- Recuperação de senha
- Registro

### 2. Dashboard
- KPIs
- Alertas
- Gráficos

### 3. CashFlow
- Transações
- Filtros
- Relatórios

### 4. Sales
- PDV
- Ranking
- Histórico

### 5. Catalog
- Plantas
- Margens
- Fornecedores

### 6. Budgets
- Orçamentos
- Projetos
- Viabilidade

### 7. Maintenance
- Contratos
- Checklist
- Agenda

### 8. Home
- Página inicial
- Informações

---

## 🔄 Fluxo de Navegação

```
Website (localhost:8000)
  ↓
Botão "Área do Cliente"
  ↓
App (localhost:3000)
  ↓
/login (Tela de Login)
  ↓
Autenticação
  ├─ Sucesso
  │   ↓
  │   /dashboard (Dashboard)
  │   ├─ /cashflow
  │   ├─ /sales
  │   ├─ /catalog
  │   ├─ /budgets
  │   └─ /maintenance
  │
  └─ Erro
      ↓
      Mensagem de erro
      ↓
      Voltar para login
```

---

## 🚀 Como Usar a Estrutura

### Criar um Novo Módulo

1. Criar pasta em `modules/novomodulo/`
2. Criar subpastas: `pages/`, `components/`, `hooks/`, `services/`
3. Criar `index.js` para exportações
4. Adicionar rota em `App.jsx`

### Exemplo: Novo Módulo

```javascript
// modules/novomodulo/index.js
export { default as NovoModuloPage } from './pages/NovoModulo'
export { useNovoModulo } from './hooks/useNovoModulo'
export { novoModuloService } from './services/novoModuloService'
```

---

## 📚 Benefícios da Estrutura Modular

✅ **Organização** - Cada módulo é independente  
✅ **Escalabilidade** - Fácil adicionar novos módulos  
✅ **Manutenção** - Código organizado e fácil de encontrar  
✅ **Reutilização** - Componentes compartilhados  
✅ **Performance** - Code splitting automático  
✅ **Testes** - Fácil testar módulos isolados  

---

## 🔐 Autenticação

### Dados de Teste

```
Email: admin@luiseden.com
Senha: 123456

Email: user@luiseden.com
Senha: 123456
```

### Funcionalidades

- ✅ Login com email/senha
- ✅ Persistência de sessão
- ✅ Logout
- ✅ Rotas protegidas
- ✅ Redirecionamento automático

---

## 📝 Próximos Passos

1. [ ] Implementar estrutura modular
2. [ ] Criar módulo de autenticação
3. [ ] Criar tela de login
4. [ ] Implementar rotas protegidas
5. [ ] Integrar website com app
6. [ ] Testar fluxo completo

---

**Versão:** 1.0.0  
**Data:** 2024  
**Status:** ✅ Planejado

Próximo passo: Implementar esta estrutura! 🚀
