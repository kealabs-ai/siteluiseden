# 🔗 Guia de Integração - Frontend + Backend Fiscal

## 📋 Visão Geral

Este guia descreve como o frontend React se integra com o backend Python (svc-fiscal) para gerenciar Notas Fiscais Eletrônicas.

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                  Frontend React                          │
│  (app/src/modules/fiscal/)                              │
│  ├─ Fiscal.jsx (Página principal)                       │
│  ├─ CreateNFeModal.jsx (Criar NF-e)                     │
│  ├─ ViewNFeModal.jsx (Visualizar)                       │
│  ├─ SignNFeModal.jsx (Assinar)                          │
│  ├─ AuthorizeNFeModal.jsx (Autorizar)                   │
│  ├─ CancelNFeModal.jsx (Cancelar)                       │
│  └─ fiscalApi.js (Serviço de API)                       │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/REST
                     │ JWT Auth
                     │ JSON
┌────────────────────▼────────────────────────────────────┐
│                  Backend FastAPI                         │
│  (svc-fiscal/)                                          │
│  ├─ main.py (Endpoints)                                 │
│  ├─ models.py (Modelos)                                 │
│  ├─ nfe_generator.py (Gerador XML)                      │
│  ├─ xml_signer.py (Assinador)                           │
│  └─ sefaz_client.py (Cliente SOAP)                      │
└────────────────────┬────────────────────────────────────┘
                     │ SOAP + mTLS
                     │ Certificado Digital
┌────────────────────▼────────────────────────────────────┐
│              SEFAZ-MG (Homologação)                      │
│  https://hnfe.fazenda.mg.gov.br/nfe2/services/          │
└─────────────────────────────────────────────────────────┘
```

## 🔌 Endpoints Utilizados

### Configuração Fiscal

#### POST `/v1/eden/fiscal/configuracao`
**Frontend:**
```javascript
await fiscalApi.createConfig({
  empresaId: 'empresa-001',
  cnpj: '12.345.678/0001-90',
  razaoSocial: 'Luis Eden Paisagismo LTDA',
  nomeFantasia: 'Luis Eden',
  inscricaoEstadual: '123.456.789.012',
  certificadoPath: '/etc/ssl/certs/empresa.pfx',
  certificadoSenha: 'senha'
})
```

**Backend:**
```python
@app.post("/v1/eden/fiscal/configuracao")
def criar_configuracao(body: ConfiguracaoFiscalIn, ...):
    # Salvar configuração no BD
    # Validar certificado
    # Retornar ID da configuração
```

### Notas Fiscais

#### POST `/v1/eden/fiscal/nfe`
**Frontend:**
```javascript
await fiscalApi.createNFe({
  clienteId: 'cliente-001',
  dataEmissao: '2024-01-20T10:30:00',
  itens: [
    {
      produtoId: 'produto-001',
      descricao: 'Serviço de Paisagismo',
      quantidade: 1,
      valorUnitarioCents: 500000,
      ncm: '92110000',
      cfop: '5102'
    }
  ]
})
```

**Backend:**
```python
@app.post("/v1/eden/fiscal/nfe")
def criar_nfe(body: NotaFiscalIn, ...):
    # Criar NF-e em rascunho
    # Salvar itens
    # Retornar ID da NF-e
```

#### GET `/v1/eden/fiscal/nfe`
**Frontend:**
```javascript
const { data } = await fiscalApi.listNFe()
// Retorna lista de todas as NF-e
```

#### GET `/v1/eden/fiscal/nfe/{nfe_id}`
**Frontend:**
```javascript
const { data } = await fiscalApi.getNFe(nfeId)
// Retorna detalhes completos da NF-e
```

### Assinatura e Autorização

#### POST `/v1/eden/fiscal/nfe/assinar`
**Frontend:**
```javascript
await fiscalApi.signNFe(nfeId)
// Assina XML com certificado
// Muda status para 'assinada'
```

**Backend:**
```python
@app.post("/v1/eden/fiscal/nfe/assinar")
def assinar_nfe(body: AutorizacaoNFeIn, ...):
    # Gerar XML NF-e
    # Assinar com certificado
    # Salvar XML assinado
    # Retornar sucesso
```

#### POST `/v1/eden/fiscal/nfe/autorizar`
**Frontend:**
```javascript
const response = await fiscalApi.authorizeNFe(nfeId)
// Envia para SEFAZ
// Retorna número de recibo
```

**Backend:**
```python
@app.post("/v1/eden/fiscal/nfe/autorizar")
def autorizar_nfe(body: AutorizacaoNFeIn, ...):
    # Verificar status SEFAZ
    # Enviar XML para autorização
    # Obter número de recibo
    # Muda status para 'pendente_protocolo'
    # Retornar recibo
```

### Consultas

#### POST `/v1/eden/fiscal/nfe/consulta-protocolo`
**Frontend:**
```javascript
const response = await fiscalApi.consultaProtocolo(chaveNfe)
// Consulta protocolo de autorização
// Atualiza status da NF-e
```

**Backend:**
```python
@app.post("/v1/eden/fiscal/nfe/consulta-protocolo")
def consultar_protocolo(body: ConsultaProtocoloIn, ...):
    # Consultar SEFAZ
    # Atualizar status (autorizada/rejeitada)
    # Salvar protocolo
    # Retornar resultado
```

#### GET `/v1/eden/fiscal/status-sefaz`
**Frontend:**
```javascript
const response = await fiscalApi.statusSefaz()
// Verifica se SEFAZ está online
// Atualiza indicador de status
```

### Cancelamento

#### POST `/v1/eden/fiscal/nfe/cancelar`
**Frontend:**
```javascript
await fiscalApi.cancelNFe(nfeId, justificativa)
// Envia cancelamento para SEFAZ
// Muda status para 'cancelada'
```

**Backend:**
```python
@app.post("/v1/eden/fiscal/nfe/cancelar")
def cancelar_nfe(body: CancelamentoNFeIn, ...):
    # Gerar XML de evento de cancelamento
    # Assinar evento
    # Enviar para SEFAZ
    # Muda status para 'cancelada'
    # Retornar sucesso
```

## 🔄 Fluxo de Dados

### 1. Criar NF-e

```
Frontend (CreateNFeModal)
    ↓
Valida dados
    ↓
Envia POST /v1/eden/fiscal/nfe
    ↓
Backend (main.py)
    ↓
Cria registro em BD
    ↓
Retorna ID da NF-e
    ↓
Frontend
    ↓
Atualiza lista
    ↓
Mostra sucesso
```

### 2. Assinar NF-e

```
Frontend (SignNFeModal)
    ↓
Envia POST /v1/eden/fiscal/nfe/assinar
    ↓
Backend (main.py)
    ↓
Busca NF-e no BD
    ↓
Gera XML (nfe_generator.py)
    ↓
Assina XML (xml_signer.py)
    ↓
Salva XML assinado
    ↓
Muda status para 'assinada'
    ↓
Retorna sucesso
    ↓
Frontend
    ↓
Atualiza lista
    ↓
Mostra sucesso
```

### 3. Autorizar NF-e

```
Frontend (AuthorizeNFeModal)
    ↓
Envia POST /v1/eden/fiscal/nfe/autorizar
    ↓
Backend (main.py)
    ↓
Verifica status SEFAZ (sefaz_client.py)
    ↓
Envia XML para SEFAZ (SOAP)
    ↓
Recebe número de recibo
    ↓
Salva recibo no BD
    ↓
Muda status para 'pendente_protocolo'
    ↓
Retorna recibo
    ↓
Frontend
    ↓
Mostra recibo
    ↓
Inicia polling de protocolo
```

### 4. Consultar Protocolo

```
Frontend (Fiscal.jsx - polling)
    ↓
Envia POST /v1/eden/fiscal/nfe/consulta-protocolo
    ↓
Backend (main.py)
    ↓
Consulta SEFAZ (sefaz_client.py)
    ↓
Recebe status (autorizada/rejeitada)
    ↓
Atualiza BD
    ↓
Retorna status
    ↓
Frontend
    ↓
Atualiza lista
    ↓
Se autorizada: mostra protocolo
    ↓
Se rejeitada: mostra motivo
```

## 🔐 Autenticação

### JWT Token

Todos os endpoints requerem autenticação JWT:

```javascript
// Frontend
const token = localStorage.getItem('accessToken')
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}

// Backend
@app.post("/v1/eden/fiscal/nfe")
def criar_nfe(..., payload=Depends(verify_token)):
    empresa_id = payload['sub']  # ID do usuário
    # Usar empresa_id para isolamento de dados
```

## 📊 Estrutura de Dados

### NF-e (Frontend)

```javascript
{
  id: 'uuid',
  chaveNfe: '35240101234567000123550010000000011234567890',
  numero: 1,
  serie: 1,
  clienteId: 'cliente-001',
  dataEmissao: '2024-01-20T10:30:00',
  valorTotalCents: 500000,
  status: 'autorizada',
  protocolo: '135240101234567',
  dataAutorizacao: '2024-01-20T10:35:00',
  motivoRejeicao: null,
  itens: [
    {
      id: 'uuid',
      produtoId: 'produto-001',
      descricao: 'Serviço de Paisagismo',
      quantidade: 1,
      valorUnitarioCents: 500000,
      valorTotalCents: 500000,
      ncm: '92110000',
      cfop: '5102'
    }
  ],
  createdAt: '2024-01-20T10:30:00',
  updatedAt: '2024-01-20T10:35:00'
}
```

## 🧪 Testes de Integração

### 1. Teste de Criação

```javascript
// Frontend
const nfe = await fiscalApi.createNFe({
  clienteId: 'cliente-teste',
  dataEmissao: new Date().toISOString(),
  itens: [{
    produtoId: 'produto-teste',
    descricao: 'Teste',
    quantidade: 1,
    valorUnitarioCents: 10000,
    ncm: '92110000',
    cfop: '5102'
  }]
})

// Verificar
console.log(nfe.id) // Deve ter ID
console.log(nfe.status) // Deve ser 'rascunho'
```

### 2. Teste de Assinatura

```javascript
// Frontend
const signed = await fiscalApi.signNFe(nfe.id)

// Verificar
const updated = await fiscalApi.getNFe(nfe.id)
console.log(updated.status) // Deve ser 'assinada'
```

### 3. Teste de Autorização

```javascript
// Frontend
const auth = await fiscalApi.authorizeNFe(nfe.id)

// Verificar
console.log(auth.numeroRecibo) // Deve ter recibo
const updated = await fiscalApi.getNFe(nfe.id)
console.log(updated.status) // Deve ser 'pendente_protocolo'
```

## 🐛 Troubleshooting

### Erro: "Token inválido"
- Verificar se token está no localStorage
- Verificar se token não expirou
- Fazer login novamente

### Erro: "Certificado não encontrado"
- Verificar caminho do certificado no backend
- Verificar permissões de arquivo
- Verificar formato do certificado

### Erro: "SEFAZ Offline"
- SEFAZ-MG pode estar em manutenção
- Verificar status em https://hnfe.fazenda.mg.gov.br/
- Tentar novamente em alguns minutos

### Erro: "Falha na validação do schema XML"
- Verificar dados da NF-e
- Verificar campos obrigatórios
- Consultar especificação técnica

## 📝 Notas Importantes

1. **Ambiente de Homologação**
   - Não tem validade jurídica
   - Usado apenas para testes
   - Dados não são registrados na SEFAZ

2. **Certificado Digital**
   - Deve estar armazenado em local seguro
   - Senha não deve ser exposta
   - Deve ser renovado antes de expirar

3. **Polling de Protocolo**
   - Aguardar 5-10 segundos entre tentativas
   - Máximo de 10 tentativas recomendado
   - Implementar backoff exponencial

4. **Tratamento de Erros**
   - Sempre mostrar mensagem amigável ao usuário
   - Logar erros completos no console
   - Implementar retry automático quando apropriado

## 🔗 Referências

- [Documentação Backend](../../../svc-fiscal/README.md)
- [Documentação Frontend](./README.md)
- [Portal NF-e](https://www.nfe.fazenda.gov.br/)
- [SEFAZ-MG](https://hnfe.fazenda.mg.gov.br/)

---

**Guia de Integração - Versão 1.0.0**
**Data: 20 de Janeiro de 2024**
