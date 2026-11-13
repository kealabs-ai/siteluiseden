# 📋 Módulo Fiscal - Frontend React

## 📁 Estrutura de Arquivos

```
app/src/modules/fiscal/
├── pages/
│   ├── Fiscal.jsx          # Página principal
│   └── Fiscal.css          # Estilos
├── components/
│   ├── CreateNFeModal.jsx      # Modal criar NF-e
│   ├── ViewNFeModal.jsx        # Modal visualizar NF-e
│   ├── SignNFeModal.jsx        # Modal assinar NF-e
│   ├── AuthorizeNFeModal.jsx   # Modal autorizar NF-e
│   ├── CancelNFeModal.jsx      # Modal cancelar NF-e
│   ├── ConfigFiscalModal.jsx   # Modal configuração fiscal
│   └── DeleteNFeModal.jsx      # Modal deletar NF-e
└── services/
    └── fiscalApi.js        # Serviço de API
```

## 🎯 Funcionalidades

### Página Principal (Fiscal.jsx)

- **Dashboard com KPIs**
  - Total de NF-e
  - Rascunhos
  - Autorizadas
  - Rejeitadas
  - Canceladas
  - Valor total

- **Status SEFAZ**
  - Verificação automática a cada minuto
  - Indicador visual (online/offline)
  - Botão para atualizar status

- **Tabela de NF-e**
  - Filtro por status
  - Busca por chave, número ou cliente
  - Ações contextuais por status
  - Paginação (estrutura pronta)

### Modais

#### CreateNFeModal
- Criar nova NF-e
- Adicionar múltiplos itens
- Cálculo automático de totais
- Validação de dados

#### ViewNFeModal
- Visualizar detalhes completos
- Mostrar chave de acesso
- Mostrar protocolo de autorização
- Mostrar motivo de rejeição
- Listar itens com valores

#### SignNFeModal
- Assinar NF-e com certificado
- Confirmação antes de assinar
- Feedback de sucesso/erro

#### AuthorizeNFeModal
- Enviar para autorização SEFAZ
- Mostrar número de recibo
- Informações sobre próximos passos

#### CancelNFeModal
- Cancelar NF-e autorizada
- Campo obrigatório de justificativa
- Confirmação de ação

#### ConfigFiscalModal
- Configurar dados da empresa
- Caminho do certificado
- Senha do certificado

#### DeleteNFeModal
- Deletar NF-e em rascunho
- Confirmação de ação

## 🔌 Integração com API

### Endpoints Utilizados

```javascript
// Configuração
POST   /v1/eden/fiscal/configuracao
GET    /v1/eden/fiscal/configuracao/{empresa_id}

// NF-e
POST   /v1/eden/fiscal/nfe
GET    /v1/eden/fiscal/nfe/{nfe_id}
GET    /v1/eden/fiscal/nfe

// Operações
POST   /v1/eden/fiscal/nfe/assinar
POST   /v1/eden/fiscal/nfe/autorizar
POST   /v1/eden/fiscal/nfe/consulta-protocolo
POST   /v1/eden/fiscal/nfe/cancelar

// Status
GET    /v1/eden/fiscal/status-sefaz
```

### Serviço de API (fiscalApi.js)

```javascript
fiscalApi.createConfig(data)        // Criar configuração
fiscalApi.getConfig(empresaId)      // Obter configuração
fiscalApi.createNFe(data)           // Criar NF-e
fiscalApi.getNFe(nfeId)             // Obter NF-e
fiscalApi.listNFe()                 // Listar NF-e
fiscalApi.signNFe(nfeId)            // Assinar NF-e
fiscalApi.authorizeNFe(nfeId)       // Autorizar NF-e
fiscalApi.consultaProtocolo(chave)  // Consultar protocolo
fiscalApi.statusSefaz()             // Status SEFAZ
fiscalApi.cancelNFe(nfeId, motivo)  // Cancelar NF-e
```

## 🎨 Design e UX

### Cores e Status

| Status | Cor | Significado |
|--------|-----|-------------|
| Rascunho | Cinza | Não processada |
| Assinada | Azul | Assinada, pronta para envio |
| Pendente Protocolo | Amarelo | Aguardando resposta SEFAZ |
| Autorizada | Verde | Autorizada com sucesso |
| Rejeitada | Vermelho | Rejeitada pela SEFAZ |
| Cancelada | Vermelho Escuro | Cancelada |

### Ícones Utilizados

- `fa-file-invoice` - Gestão Fiscal
- `fa-plus` - Criar nova NF-e
- `fa-eye` - Visualizar
- `fa-pen-fancy` - Assinar
- `fa-paper-plane` - Autorizar
- `fa-ban` - Cancelar
- `fa-trash` - Deletar
- `fa-check` - Sucesso
- `fa-spinner` - Carregando

## 📱 Responsividade

- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)

## 🔄 Fluxo de Trabalho

```
1. Criar NF-e (rascunho)
   ↓
2. Visualizar detalhes
   ↓
3. Assinar com certificado
   ↓
4. Autorizar na SEFAZ
   ↓
5. Aguardar protocolo
   ↓
6. NF-e autorizada
   ↓
7. Opção: Cancelar se necessário
```

## 🚀 Como Usar

### Criar Nova NF-e

1. Clique em "Nova NF-e"
2. Preencha dados do cliente
3. Adicione itens (descrição, quantidade, valor)
4. Clique em "Criar NF-e"

### Autorizar NF-e

1. Selecione NF-e em rascunho
2. Clique em "Assinar"
3. Clique em "Autorizar"
4. Aguarde protocolo

### Cancelar NF-e

1. Selecione NF-e autorizada
2. Clique em "Cancelar"
3. Informe justificativa
4. Confirme cancelamento

## 🔐 Segurança

- ✅ Autenticação JWT obrigatória
- ✅ Validação de entrada
- ✅ Proteção contra CSRF
- ✅ Dados sensíveis não expostos
- ✅ Confirmação para ações críticas

## 📊 Estados e Transições

```
RASCUNHO
  ├─ Assinar → ASSINADA
  └─ Deletar → (removido)

ASSINADA
  ├─ Autorizar → PENDENTE_PROTOCOLO
  └─ Deletar → (removido)

PENDENTE_PROTOCOLO
  └─ Consultar → AUTORIZADA ou REJEITADA

AUTORIZADA
  ├─ Cancelar → CANCELADA
  └─ Consultar → (atualizar status)

REJEITADA
  └─ (sem ações)

CANCELADA
  └─ (sem ações)
```

## 🧪 Testes

### Testes Manuais

1. **Criar NF-e**
   - Validar campos obrigatórios
   - Validar cálculo de totais
   - Validar adição/remoção de itens

2. **Assinar NF-e**
   - Verificar confirmação
   - Verificar feedback de sucesso

3. **Autorizar NF-e**
   - Verificar envio para SEFAZ
   - Verificar recebimento de recibo

4. **Cancelar NF-e**
   - Validar justificativa obrigatória
   - Verificar confirmação

## 🐛 Troubleshooting

### Erro: "Erro ao carregar NF-e"
- Verificar conexão com API
- Verificar token JWT
- Verificar logs do backend

### Erro: "SEFAZ Offline"
- SEFAZ-MG pode estar em manutenção
- Verificar status em https://hnfe.fazenda.mg.gov.br/
- Tentar novamente em alguns minutos

### Erro: "Certificado não encontrado"
- Verificar caminho do certificado
- Verificar permissões de arquivo
- Verificar formato do certificado

## 📝 Notas

- Ambiente de homologação não tem validade jurídica
- Certificado de teste disponível gratuitamente
- Polling de protocolo recomendado a cada 5-10 segundos
- Máximo de 120 itens por NF-e (recomendado)

## 🔗 Referências

- [Portal NF-e](https://www.nfe.fazenda.gov.br/)
- [SEFAZ-MG](https://hnfe.fazenda.mg.gov.br/)
- [Especificação Técnica](https://www1.receita.fazenda.gov.br/manuais/)

## 📞 Suporte

Para dúvidas ou problemas, consulte:
1. Documentação do backend (svc-fiscal)
2. TROUBLESHOOTING.md do backend
3. Logs da aplicação
4. Suporte SEFAZ-MG
