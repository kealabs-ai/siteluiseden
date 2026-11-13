# 📖 Manual do Sistema - Luis Eden Paisagismo

## Versão 1.0.0

---

## 📋 Índice

1. [Introdução](#introdução)
2. [Requisitos do Sistema](#requisitos-do-sistema)
3. [Instalação e Configuração](#instalação-e-configuração)
4. [Módulos Principais](#módulos-principais)
5. [Guia de Uso](#guia-de-uso)
6. [Troubleshooting](#troubleshooting)
7. [Suporte](#suporte)

---

## Introdução

O Sistema de Gestão Luis Eden é uma plataforma completa para gerenciar operações de paisagismo e floricultura, incluindo:

- **Dashboard** - Visão geral de vendas e operações
- **Catálogo** - Gerenciamento de plantas e flores
- **Vendas** - Registro e acompanhamento de vendas
- **Orçamentos** - Criação e gestão de orçamentos
- **Manutenção** - Agendamento de serviços de manutenção
- **Fluxo de Caixa** - Controle financeiro
- **Fornecedores** - Gestão de fornecedores
- **Clientes** - Cadastro de clientes
- **Usuários** - Gerenciamento de usuários do sistema

---

## Requisitos do Sistema

### Hardware Mínimo
- Processador: Intel Core i3 ou equivalente
- RAM: 4GB
- Espaço em disco: 500MB
- Conexão com internet

### Software Necessário
- Node.js 16.x ou superior
- npm 8.x ou superior
- Navegador moderno (Chrome, Firefox, Safari, Edge)

---

## Instalação e Configuração

### 1. Clonar o Repositório
```bash
git clone <repository-url>
cd siteLuisEden
```

### 2. Instalar Dependências
```bash
cd app
npm install
```

### 3. Configurar Variáveis de Ambiente
Criar arquivo `.env` na pasta `app`:
```
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Luis Eden
```

### 4. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### 5. Build para Produção
```bash
npm run build
```

---

## Módulos Principais

### 🏠 Dashboard
**Localização:** Menu principal → Dashboard

Exibe:
- Resumo de vendas do mês
- Gráficos de desempenho
- Alertas de manutenção pendente
- Últimas transações

**Ações disponíveis:**
- Visualizar relatórios
- Acessar módulos principais

---

### 🌿 Catálogo
**Localização:** Menu principal → Catálogo

Gerencia o inventário de plantas e flores.

**Funcionalidades:**
- Adicionar nova planta
- Editar informações
- Visualizar detalhes
- Deletar plantas
- Filtrar por categoria

**Campos principais:**
- Nome da planta
- Descrição
- Preço
- Quantidade em estoque
- Categoria

---

### 💰 Vendas
**Localização:** Menu principal → Vendas

Registro de todas as transações de venda.

**Funcionalidades:**
- Nova venda rápida (PDV)
- Visualizar histórico
- Editar venda
- Gerar recibos
- Filtrar por período

**Atalho rápido:** Botão "Nova Venda" na topbar

---

### 📊 Orçamentos
**Localização:** Menu principal → Orçamentos

Criação e gestão de orçamentos para projetos.

**Funcionalidades:**
- Criar novo orçamento
- Adicionar itens
- Calcular total automaticamente
- Exportar em PDF
- Enviar para cliente

**Construtor de Orçamento:**
- Selecionar plantas do catálogo
- Definir quantidades
- Aplicar descontos
- Visualizar total

---

### 🔧 Manutenção
**Localização:** Menu principal → Manutenção

Agendamento e acompanhamento de serviços.

**Funcionalidades:**
- Agendar manutenção
- Visualizar calendário
- Editar agendamentos
- Marcar como concluído
- Kanban de tarefas

---

### 💳 Fluxo de Caixa
**Localização:** Menu principal → Fluxo de Caixa

Controle financeiro completo.

**Funcionalidades:**
- Lançar receitas
- Lançar despesas
- Visualizar saldo
- Gerar relatórios
- Exportar dados

**Atalho rápido:** Botão "Lançamento" na topbar

---

### 🏢 Fornecedores
**Localização:** Menu principal → Fornecedores

Gestão de fornecedores e cotações.

**Funcionalidades:**
- Cadastrar fornecedor
- Importar cotações
- Editar informações
- Visualizar histórico
- Gerar relatórios

---

### 👥 Clientes
**Localização:** Menu principal → Clientes

Cadastro e gestão de clientes.

**Funcionalidades:**
- Adicionar novo cliente
- Editar informações
- Visualizar histórico de compras
- Gerar relatórios
- Exportar lista

---

### 👤 Usuários
**Localização:** Menu principal → Usuários

Gerenciamento de usuários do sistema.

**Funcionalidades:**
- Criar novo usuário
- Editar permissões
- Ativar/desativar usuário
- Resetar senha
- Visualizar logs de acesso

---

## Guia de Uso

### Login
1. Acesse a página de login
2. Digite seu email e senha
3. Clique em "Entrar"
4. Você será redirecionado ao dashboard

### Criar Nova Venda
1. Clique no botão "Nova Venda" na topbar
2. Selecione os produtos
3. Defina as quantidades
4. Escolha a forma de pagamento
5. Clique em "Confirmar"

### Criar Orçamento
1. Acesse Orçamentos
2. Clique em "Novo Orçamento"
3. Selecione o cliente
4. Use o construtor para adicionar itens
5. Revise o total
6. Clique em "Salvar"

### Agendar Manutenção
1. Acesse Manutenção
2. Clique em "Agendar"
3. Selecione a data e hora
4. Defina o tipo de serviço
5. Adicione observações
6. Clique em "Confirmar"

### Importar Dados
1. Acesse o módulo desejado
2. Clique em "Importar"
3. Selecione o arquivo Excel
4. Revise os dados
5. Clique em "Confirmar"

---

## Troubleshooting

### Problema: Página em branco ao abrir
**Solução:**
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Recarregue a página (F5)
- Tente em outro navegador

### Problema: Erro ao fazer login
**Solução:**
- Verifique suas credenciais
- Certifique-se de que o servidor está rodando
- Verifique a conexão com internet

### Problema: Dados não salvam
**Solução:**
- Verifique a conexão com internet
- Tente novamente
- Contate o suporte se o problema persistir

### Problema: Importação de arquivo falha
**Solução:**
- Verifique o formato do arquivo (deve ser .xlsx)
- Certifique-se de que as colunas estão corretas
- Tente com um arquivo menor primeiro

### Problema: Aplicativo lento
**Solução:**
- Feche abas desnecessárias
- Limpe o cache
- Reinicie o navegador
- Verifique sua conexão com internet

---

## Suporte

### Contato
- **Email:** suporte@luiseden.com
- **Telefone:** (XX) XXXX-XXXX
- **WhatsApp:** (XX) XXXXX-XXXX

### Horário de Atendimento
- Segunda a Sexta: 09:00 - 18:00
- Sábado: 09:00 - 13:00

### Documentação Online
Visite: https://docs.luiseden.com

### Reportar Bug
Envie um email para suporte@luiseden.com com:
- Descrição do problema
- Passos para reproduzir
- Screenshots (se aplicável)
- Versão do navegador

---

**Última atualização:** Janeiro 2024
**Versão do Manual:** 1.0.0
