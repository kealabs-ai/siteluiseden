# ANÁLISE: Campos Faltantes no Endpoint de Manutenção

## 📋 Campos do Modal "Agendar Manutenção"

| Campo | Tipo | Obrigatório | Status |
|-------|------|-------------|--------|
| Nome do Cliente/Residência | Text | ✅ Sim | ✅ Enviado como `titulo` |
| Valor do Serviço (R$) | Currency | ✅ Sim | ✅ Enviado como `valorCents` |
| Frequência | Select | ✅ Sim | ✅ Enviado como `frequencia` |
| Data Agendada | Date | ✅ Sim | ✅ Enviado como `dataAgendada` |
| Prioridade | Select | ✅ Sim | ✅ Enviado como `prioridade` |
| Equipe Responsável | Select | ✅ Sim | ✅ Enviado como `equipe` |
| Observações Técnicas | Textarea | ❌ Não | ✅ Enviado como `descricao` |
| Status | Select | ❌ Não | ✅ Enviado como `status` |

---

## 🔍 Análise Detalhada

### ✅ CAMPOS IMPLEMENTADOS CORRETAMENTE

1. **titulo** (Nome do Cliente/Residência)
   - Modal: `clientName`
   - Endpoint: `titulo`
   - Status: ✅ Correto

2. **valorCents** (Valor do Serviço)
   - Modal: `serviceValue` (convertido com `currencyTocents()`)
   - Endpoint: `valorCents`
   - Status: ✅ Correto

3. **frequencia** (Frequência)
   - Modal: `frequency` (weekly, biweekly, monthly, quarterly, custom)
   - Endpoint: `frequencia`
   - Status: ✅ Correto

4. **dataAgendada** (Data Agendada)
   - Modal: `scheduledDate` (convertido para ISO)
   - Endpoint: `dataAgendada`
   - Status: ✅ Correto

5. **prioridade** (Prioridade)
   - Modal: `priority` (low, normal, high)
   - Endpoint: `prioridade`
   - Status: ✅ Correto

6. **equipe** (Equipe Responsável)
   - Modal: `team`
   - Endpoint: `equipe`
   - Status: ✅ Correto

7. **descricao** (Observações Técnicas)
   - Modal: `observations`
   - Endpoint: `descricao`
   - Status: ✅ Correto

8. **status** (Status)
   - Modal: `status` (agendada, em_progresso, concluida)
   - Endpoint: `status`
   - Status: ✅ Correto

---

## ⚠️ CAMPOS POTENCIALMENTE FALTANTES

### 1. **clienteId** (ID do Cliente)
**Situação:** Não está sendo enviado
**Impacto:** Médio
**Recomendação:** Adicionar campo para vincular a manutenção a um cliente específico
**Implementação:**
```javascript
// No modal, ao selecionar um cliente:
const selectClient = (client) => {
  setFormData(prev => ({
    ...prev,
    clientName: client.nome || '',
    clienteId: client.id  // ← ADICIONAR ISTO
  }))
  setShowSuggestions(false)
}

// No submit:
await maintenanceApi.create({
  ...formData,
  clienteId: formData.clienteId  // ← ENVIAR ISTO
})
```

### 2. **endereco** (Endereço do Cliente)
**Situação:** Não está sendo enviado
**Impacto:** Baixo
**Recomendação:** Opcional, mas útil para referência
**Implementação:**
```javascript
// Ao selecionar cliente, também capturar endereço:
const selectClient = (client) => {
  setFormData(prev => ({
    ...prev,
    clientName: client.nome || '',
    clienteId: client.id,
    endereco: client.endereco || ''  // ← ADICIONAR ISTO
  }))
}
```

### 3. **telefone** (Telefone do Cliente)
**Situação:** Não está sendo enviado
**Impacto:** Baixo
**Recomendação:** Opcional, mas útil para contato
**Implementação:**
```javascript
// Ao selecionar cliente, também capturar telefone:
const selectClient = (client) => {
  setFormData(prev => ({
    ...prev,
    clientName: client.nome || '',
    clienteId: client.id,
    endereco: client.endereco || '',
    telefone: client.telefone || ''  // ← ADICIONAR ISTO
  }))
}
```

### 4. **data** (Data de Criação)
**Situação:** Não está sendo enviado
**Impacto:** Baixo
**Recomendação:** Geralmente preenchido automaticamente pelo backend
**Status:** ✅ Provavelmente OK (backend cria automaticamente)

### 5. **proximaManutencao** (Próxima Manutenção)
**Situação:** Não está sendo enviado
**Impacto:** Médio
**Recomendação:** Calcular automaticamente baseado na frequência
**Implementação:**
```javascript
// Função auxiliar para calcular próxima manutenção:
const calcularProximaManutencao = (dataAgendada, frequencia) => {
  const data = new Date(dataAgendada)
  switch(frequencia) {
    case 'weekly':
      data.setDate(data.getDate() + 7)
      break
    case 'biweekly':
      data.setDate(data.getDate() + 14)
      break
    case 'monthly':
      data.setMonth(data.getMonth() + 1)
      break
    case 'quarterly':
      data.setMonth(data.getMonth() + 3)
      break
    case 'custom':
      return null  // Avulsa, sem próxima
  }
  return data.toISOString()
}

// No submit:
await maintenanceApi.create({
  ...formData,
  proximaManutencao: calcularProximaManutencao(formData.scheduledDate, formData.frequency)
})
```

---

## 📊 RESUMO

| Campo | Enviado | Recomendação |
|-------|---------|--------------|
| titulo | ✅ | Manter |
| valorCents | ✅ | Manter |
| frequencia | ✅ | Manter |
| dataAgendada | ✅ | Manter |
| prioridade | ✅ | Manter |
| equipe | ✅ | Manter |
| descricao | ✅ | Manter |
| status | ✅ | Manter |
| **clienteId** | ❌ | **ADICIONAR** |
| **endereco** | ❌ | Adicionar (opcional) |
| **telefone** | ❌ | Adicionar (opcional) |
| **proximaManutencao** | ❌ | Adicionar (calculado) |

---

## 🎯 AÇÕES RECOMENDADAS

### Prioridade ALTA:
1. ✅ Adicionar `clienteId` ao envio do formulário
2. ✅ Adicionar `endereco` ao envio do formulário
3. ✅ Adicionar `telefone` ao envio do formulário

### Prioridade MÉDIA:
1. ✅ Implementar cálculo de `proximaManutencao`
2. ✅ Validar se o backend aceita estes campos

### Prioridade BAIXA:
1. ✅ Adicionar campos adicionais conforme necessário (notas internas, etc)

---

## 💡 PRÓXIMOS PASSOS

1. Verificar documentação da API para confirmar quais campos são aceitos
2. Implementar as mudanças recomendadas nos modais
3. Testar a integração com o backend
4. Atualizar a página de Manutenção para exibir os novos campos
