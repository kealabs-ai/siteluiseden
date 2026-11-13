# 🆘 Central de Ajuda - Luis Eden Paisagismo

## Visão Geral

A Central de Ajuda é um recurso integrado no sistema que fornece suporte rápido e informações sobre como usar a plataforma. Está acessível através do ícone de interrogação (?) na topbar.

## 📍 Como Acessar

### Desktop
1. Clique no ícone **?** (interrogação) na topbar, lado direito
2. A Central de Ajuda abrirá em um modal

### Mobile
1. Clique no ícone **?** (interrogação) na topbar
2. A Central de Ajuda abrirá em tela cheia

### Atalho de Teclado
- **Ctrl + ?** - Abre a Central de Ajuda (em desenvolvimento)

## 📑 Abas Disponíveis

### 1️⃣ Início Rápido
Informações essenciais para começar a usar o sistema.

**Conteúdo:**
- Primeiros passos
- Atalhos de teclado
- Dicas úteis

**Ideal para:** Novos usuários

### 2️⃣ Módulos
Descrição detalhada de cada módulo do sistema.

**Módulos inclusos:**
- Dashboard
- Catálogo
- Vendas
- Orçamentos
- Manutenção
- Fluxo de Caixa
- Fornecedores
- Clientes
- Usuários

**Ideal para:** Entender funcionalidades específicas

### 3️⃣ FAQ
Perguntas frequentes com respostas rápidas.

**Perguntas cobertas:**
- Como criar uma nova venda?
- Como importar dados do Excel?
- Como resetar minha senha?
- Como exportar um orçamento em PDF?
- O aplicativo está lento, o que fazer?

**Ideal para:** Resolver dúvidas comuns

### 4️⃣ Suporte
Informações de contato e recursos adicionais.

**Conteúdo:**
- Dados de contato
- Horário de atendimento
- Links para documentação
- Como reportar bugs

**Ideal para:** Obter ajuda profissional

## 🎯 Funcionalidades

### Navegação por Abas
- Clique em qualquer aba para alternar entre seções
- Cada aba mantém seu conteúdo independente
- Indicador visual mostra a aba ativa

### Detalhes Expansíveis (FAQ)
- Clique em qualquer pergunta para expandir a resposta
- Clique novamente para recolher
- Múltiplas perguntas podem estar abertas simultaneamente

### Design Responsivo
- Funciona perfeitamente em desktop, tablet e mobile
- Scroll automático para conteúdo longo
- Botões otimizados para toque

### Ícones Visuais
- Cada seção possui ícones FontAwesome
- Facilita identificação rápida de conteúdo
- Melhora a experiência visual

## 💡 Dicas de Uso

### Para Novos Usuários
1. Comece pela aba "Início Rápido"
2. Explore a aba "Módulos" para entender cada funcionalidade
3. Consulte o FAQ para dúvidas comuns

### Para Usuários Experientes
1. Use a aba "FAQ" para resolver problemas rápidos
2. Acesse "Suporte" para contato profissional
3. Consulte a documentação online para tópicos avançados

### Para Administradores
1. Revise a aba "Módulos" para gerenciar permissões
2. Use "Suporte" para reportar bugs
3. Consulte o manual completo para configurações

## 🔧 Integração Técnica

### Componente
- **Arquivo:** `app/src/components/HelpModal.jsx`
- **Tipo:** Componente React funcional
- **Props:**
  - `isOpen` (boolean) - Controla visibilidade
  - `onClose` (function) - Callback para fechar

### Uso no AppNavigation
```jsx
import { HelpModal } from './HelpModal'

// No componente
const [isHelpOpen, setIsHelpOpen] = useState(false)

// Botão
<button onClick={() => setIsHelpOpen(true)}>
  <i className="fa-solid fa-circle-question"></i>
</button>

// Modal
<HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
```

### Estilos
- Utiliza Tailwind CSS
- Paleta de cores do sistema (eden-primary, eden-light)
- Responsivo com breakpoints
- Animações suaves

## 📱 Responsividade

### Desktop (1024px+)
- Modal centralizado
- Largura máxima de 2xl
- Botão de ajuda visível na topbar

### Tablet (768px - 1023px)
- Modal adaptado
- Botão de ajuda visível
- Scroll otimizado

### Mobile (< 768px)
- Modal em tela cheia
- Botão de ajuda compacto
- Toque otimizado

## 🎨 Customização

### Adicionar Nova Aba
1. Adicione um novo estado em `activeTab`
2. Crie um novo botão de aba
3. Adicione conteúdo na seção de conteúdo

### Modificar Cores
- Altere as classes Tailwind
- Use `eden-primary` e `eden-light` para consistência
- Teste em diferentes temas

### Adicionar Ícones
- Use FontAwesome (já integrado)
- Classe: `fa-solid fa-[nome-do-icone]`
- Exemplo: `fa-circle-question`

## 📚 Recursos Relacionados

- [Manual do Sistema](../MANUAL.md)
- [Changelog](../CHANGELOG.md)
- [Informações de Versão](../VERSION_INFO.md)
- [Documentação Online](https://docs.luiseden.com)

## 🐛 Reportar Problemas

Se encontrar algum problema com a Central de Ajuda:

1. Descreva o problema
2. Inclua screenshots
3. Mencione seu navegador e versão
4. Envie para: suporte@luiseden.com

## 📞 Suporte

**Email:** suporte@luiseden.com
**Telefone:** (XX) XXXX-XXXX
**WhatsApp:** (XX) XXXXX-XXXX

**Horário:** Seg-Sex 09:00-18:00 | Sab 09:00-13:00

---

**Última atualização:** 15 de Janeiro de 2024
**Versão:** 1.0.0
