# Guia de Deploy - Luis Eden Paisagismo

## Deploy na Hostinger

### Opção 1: Upload via FTP (Recomendado para Site Estático)

1. **Conectar ao FTP da Hostinger**
   - Abra um cliente FTP (FileZilla, WinSCP, etc.)
   - Host: `ftp.seudominio.com.br`
   - Usuário: Seu usuário FTP
   - Senha: Sua senha FTP
   - Porta: 21

2. **Fazer Upload dos Arquivos**
   - Navegue até a pasta `public_html` no servidor
   - Faça upload de todos os arquivos da pasta `site/`:
     - `index.html`
     - `assets/` (pasta completa com css, js, images)
     - `.htaccess`

3. **Estrutura no Servidor**
   ```
   public_html/
   ├── index.html
   ├── .htaccess
   └── assets/
       ├── css/
       │   ├── style.css
       │   └── footer-new.css
       ├── js/
       │   └── main.js
       └── images/
           └── kealabs_logo_strategic_white.png
   ```

4. **Verificar Permissões**
   - Defina permissões 644 para arquivos
   - Defina permissões 755 para pastas

### Opção 2: Deploy via Git (Avançado)

1. **Criar Repositório Git**
   ```bash
   cd siteLuisEden/site
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Conectar ao Servidor via SSH**
   - Ative SSH na Hostinger
   - Clone o repositório no servidor

### Checklist de Deploy

- [ ] Todos os arquivos HTML, CSS, JS foram enviados
- [ ] Pasta `assets/` com todas as imagens foi enviada
- [ ] Arquivo `.htaccess` foi enviado
- [ ] Permissões de arquivo estão corretas (644)
- [ ] Permissões de pasta estão corretas (755)
- [ ] Domínio está apontando para `public_html`
- [ ] SSL/HTTPS está ativado
- [ ] Testar site em navegador

### Troubleshooting

**Erro 404 ao acessar páginas**
- Verifique se `.htaccess` está no diretório raiz
- Verifique se `mod_rewrite` está ativado no servidor

**Imagens não carregam**
- Verifique se a pasta `assets/images/` existe
- Verifique permissões da pasta (755)
- Verifique caminho relativo das imagens

**CSS/JS não carregam**
- Verifique se as pastas `assets/css/` e `assets/js/` existem
- Verifique permissões (644 para arquivos)
- Limpe cache do navegador (Ctrl+Shift+Del)

**Site lento**
- Ative compressão Gzip (já configurado em `.htaccess`)
- Ative cache do navegador (já configurado em `.htaccess`)
- Otimize imagens

### Contato Hostinger

- Painel: https://hpanel.hostinger.com
- Suporte: support@hostinger.com
- Chat ao vivo disponível 24/7

---

**Versão:** 1.0  
**Data:** 2025  
**Projeto:** Luis Eden Paisagismo
