# PLANO DO PROJETO: mobile (3)

> Gerado automaticamente pelo SK Code Editor em 23/04/2026, 11:44:30
> **40 arquivo(s)** | **~10.958 linhas de codigo**

---

## RESUMO EXECUTIVO

- **Tipo de aplicacao:** Aplicacao Web Frontend (React)
- **Frontend / Stack principal:** React, TypeScript
- **Versao:** 0.0.0

**Para rodar o projeto:**
```bash
npm install && npm run dev
```

---

## ESTRUTURA DE ARQUIVOS

```
mobile (3)/
├── .expo/
│   ├── types/
│   │   └── router.d.ts
│   ├── web/
│   │   └── cache/
│   │       └── production/
│   │           └── images/
│   │               └── favicon/
│   │                   └── favicon-a81a8b823918132ad1bb32b7ba8be194b0e081efa726735499c96199d2d6f630-contain-transparent/
│   │                       └── favicon-48.png
│   ├── devices.json
│   └── README.md
├── .replit-artifact/
│   └── artifact.toml
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── ai.tsx
│   │   ├── editor.tsx
│   │   ├── index.tsx
│   │   ├── settings.tsx
│   │   └── terminal.tsx
│   ├── _layout.tsx
│   └── +not-found.tsx
├── assets/
│   └── images/
│       └── icon.png
├── components/
│   ├── AIChat.tsx
│   ├── CodeEditor.tsx
│   ├── ErrorBoundary.tsx
│   ├── ErrorFallback.tsx
│   ├── FileSidebar.tsx
│   ├── FloatingAI.tsx
│   ├── KeyboardAwareScrollViewCompat.tsx
│   ├── LibrarySearch.tsx
│   ├── ProjectPlanModal.tsx
│   └── Terminal.tsx
├── constants/
│   └── colors.ts
├── context/
│   └── AppContext.tsx
├── hooks/
│   └── useColors.ts
├── scripts/
│   └── build.js
├── server/
│   ├── templates/
│   │   └── landing-page.html
│   └── serve.js
├── utils/
│   ├── projectPlan.ts
│   └── zipUtils.ts
├── .gitignore
├── app.json
├── babel.config.js
├── eas.json
├── expo-env.d.ts
├── metro.config.js
├── package.json
└── tsconfig.json
```

---

## STACK TECNOLOGICO DETECTADO

- **Frontend:** React, TypeScript
- **Todos os pacotes (49):** expo-document-picker, expo-file-system, expo-sharing, expo-speech, jszip, @babel/core, @expo-google-fonts/inter, @expo/cli, @expo/ngrok, @expo/vector-icons, @react-native-async-storage/async-storage, @stardazed/streams-text-encoding, @tanstack/react-query, @types/react, @types/react-dom, @ungap/structured-clone, @workspace/api-client-react, babel-plugin-react-compiler, expo, expo-blur, expo-constants, expo-font, expo-glass-effect, expo-haptics, expo-image, expo-image-picker, expo-linear-gradient, expo-linking, expo-location, expo-router, expo-splash-screen, expo-status-bar, expo-symbols, expo-system-ui, expo-web-browser, react, react-dom, react-native, react-native-gesture-handler, react-native-keyboard-controller, react-native-reanimated, react-native-safe-area-context, react-native-screens, react-native-svg, react-native-web, react-native-worklets, typescript, zod, zod-validation-error

---

## SCRIPTS DISPONIVEIS (package.json)

```bash
npm run dev           # EXPO_PACKAGER_PROXY_URL=https://$REPLIT_EXPO_DEV_DOMAIN EXPO_PUBLIC_DOMAIN=$REPLIT_DEV_DOMAIN EXPO_PUBLIC_REPL_ID=$REPL_ID REACT_NATIVE_PACKAGER_HOSTNAME=$REPLIT_DEV_DOMAIN pnpm exec expo start --localhost --port $PORT
npm run build         # node scripts/build.js
npm run serve         # node server/serve.js
npm run typecheck     # tsc -p tsconfig.json --noEmit
```

---

## VARIAVEIS DE AMBIENTE NECESSARIAS

Crie um arquivo `.env` na raiz com estas variaveis:

```env
BASE_PATH=seu_valor_aqui
REPLIT_INTERNAL_APP_DOMAIN=seu_valor_aqui
REPLIT_DEV_DOMAIN=seu_valor_aqui
EXPO_PUBLIC_DOMAIN=seu_valor_aqui
REPL_ID=seu_valor_aqui
EXPO_PUBLIC_REPL_ID=seu_valor_aqui
PORT=seu_valor_aqui
```

---

## ARQUIVOS PRINCIPAIS

- `app/(tabs)/index.tsx` — Arquivo principal

---

## GUIA COMPLETO — O QUE CADA PARTE DO PROJETO FAZ

> Esta secao explica, em linguagem simples, o que e para que serve cada pasta e cada arquivo.

### 📁 Raiz do Projeto (pasta principal)
> Arquivos de configuracao e pontos de entrada ficam aqui.

**`.gitignore`** _(42 linhas)_
Lista de arquivos/pastas que o Git deve IGNORAR (nao versionar). Ex: node_modules, .env

**`app.json`** _(53 linhas)_
Arquivo de dados ou configuracao no formato JSON (chave: valor).

**`babel.config.js`** _(7 linhas)_
Arquivo de CONSTANTES/CONFIGURACAO — valores fixos usados em varios lugares do projeto.

**`eas.json`** _(32 linhas)_
Arquivo de dados ou configuracao no formato JSON (chave: valor).

**`expo-env.d.ts`** _(3 linhas)_
Arquivo TypeScript/JavaScript — logica, funcoes ou modulo do projeto.

**`metro.config.js`** _(4 linhas)_
Arquivo de CONSTANTES/CONFIGURACAO — valores fixos usados em varios lugares do projeto.

**`package.json`** _(66 linhas)_
Registro de dependencias e scripts do projeto. Aqui ficam os comandos (npm run dev, npm start) e os pacotes instalados.

**`tsconfig.json`** _(24 linhas)_
Configuracao do TypeScript. Diz para o computador como interpretar o codigo .ts e .tsx.

---

### 📁 `.expo/`
> Pasta '.expo' — agrupamento de arquivos relacionados.

**`README.md`** _(14 linhas)_
Documentacao principal do projeto. Explica o que o projeto faz e como rodar.

**`devices.json`** _(4 linhas)_
Arquivo de dados ou configuracao no formato JSON (chave: valor).

---

### 📁 `.replit-artifact/`
> Pasta '.replit-artifact' — agrupamento de arquivos relacionados.

**`artifact.toml`** _(28 linhas)_
Arquivo TOML — parte do projeto.

---

### 📁 `app/`
> Pasta 'app' — agrupamento de arquivos relacionados.

**`+not-found.tsx`** _(46 linhas)_
Componente React — parte visual reutilizavel da interface do usuario.

**`_layout.tsx`** _(68 linhas)_
Componente de LAYOUT — define a estrutura visual da pagina (cabecalho, sidebar, rodape). Envolve outros componentes.

---

### 📁 `components/`
> Pecas visuais reutilizaveis da interface (botoes, cards, formularios...).

**`AIChat.tsx`** _(391 linhas)_
Componente de CHAT/MENSAGENS — interface de conversa em tempo real.

**`CodeEditor.tsx`** _(337 linhas)_
Componente EDITOR — area de edicao de texto, codigo ou conteudo rico.

**`ErrorBoundary.tsx`** _(55 linhas)_
Componente de ERRO — exibido quando algo da errado, com mensagem explicativa.

**`ErrorFallback.tsx`** _(279 linhas)_
Componente de ERRO — exibido quando algo da errado, com mensagem explicativa.

**`FileSidebar.tsx`** _(295 linhas)_
Componente de BARRA LATERAL — menu ou painel que aparece na lateral da tela.

**`FloatingAI.tsx`** _(831 linhas)_
Componente React — parte visual reutilizavel da interface do usuario.

**`KeyboardAwareScrollViewCompat.tsx`** _(30 linhas)_
Componente de PAGINA/TELA — representa uma tela completa navegavel no app.

**`LibrarySearch.tsx`** _(327 linhas)_
Componente de BUSCA — campo e logica para filtrar/encontrar conteudo.

**`ProjectPlanModal.tsx`** _(369 linhas)_
Componente MODAL — janela/popup que aparece sobre a tela pedindo uma acao ou mostrando uma informacao importante.

**`Terminal.tsx`** _(721 linhas)_
Componente React — parte visual reutilizavel da interface do usuario.

---

### 📁 `constants/`
> Pasta 'constants' — agrupamento de arquivos relacionados.

**`colors.ts`** _(98 linhas)_
Arquivo TypeScript/JavaScript — logica, funcoes ou modulo do projeto.

---

### 📁 `context/`
> Gerenciamento de estado global — dados compartilhados entre telas.

**`AppContext.tsx`** _(706 linhas)_
CONTEXT do React — mecanismo para compartilhar dados entre componentes sem passar por props.

---

### 📁 `hooks/`
> Hooks React customizados — logica reutilizavel de estado e efeitos.

**`useColors.ts`** _(25 linhas)_
HOOK React personalizado para gerenciar estado/comportamento de 'colors'.

---

### 📁 `scripts/`
> Pasta 'scripts' — agrupamento de arquivos relacionados.

**`build.js`** _(574 linhas)_
Arquivo TypeScript/JavaScript — logica, funcoes ou modulo do projeto.

---

### 📁 `server/`
> Pasta 'server' — agrupamento de arquivos relacionados.

**`serve.js`** _(136 linhas)_
Arquivo TypeScript/JavaScript — logica, funcoes ou modulo do projeto.

---

### 📁 `utils/`
> Funcoes auxiliares reutilizaveis em varios lugares do projeto.

**`projectPlan.ts`** _(208 linhas)_
Arquivo TypeScript/JavaScript — logica, funcoes ou modulo do projeto.

**`zipUtils.ts`** _(166 linhas)_
Funcoes UTILITARIAS — ferramentas reutilizaveis de uso geral no projeto.

---

### 📁 `.expo/types/`
> Definicoes de tipos TypeScript — contratos de dados.

**`router.d.ts`** _(15 linhas)_
Arquivo de ROTAS — define as URLs/enderecos respondidos pelo servidor.

---

### 📁 `app/(tabs)/`
> Pasta '(tabs)' — agrupamento de arquivos relacionados.

**`_layout.tsx`** _(143 linhas)_
Componente de LAYOUT — define a estrutura visual da pagina (cabecalho, sidebar, rodape). Envolve outros componentes.

**`ai.tsx`** _(48 linhas)_
Componente React — parte visual reutilizavel da interface do usuario.

**`editor.tsx`** _(417 linhas)_
Componente EDITOR — area de edicao de texto, codigo ou conteudo rico.

**`index.tsx`** _(743 linhas)_
Ponto de entrada do React — monta o componente App na pagina HTML.

**`settings.tsx`** _(993 linhas)_
Componente de CONFIGURACOES — tela onde o usuario ajusta preferencias do app.

**`terminal.tsx`** _(52 linhas)_
Componente React — parte visual reutilizavel da interface do usuario.

---

### 📁 `assets/images/`
> Pasta 'images' — agrupamento de arquivos relacionados.

**`icon.png`** _(2137 linhas)_
Arquivo de imagem.

---

### 📁 `server/templates/`
> Pasta 'templates' — agrupamento de arquivos relacionados.

**`landing-page.html`** _(461 linhas)_
Arquivo HTML — parte do projeto.

---

### 📁 `.expo/web/cache/production/images/favicon/favicon-a81a8b823918132ad1bb32b7ba8be194b0e081efa726735499c96199d2d6f630-contain-transparent/`
> Pasta 'favicon-a81a8b823918132ad1bb32b7ba8be194b0e081efa726735499c96199d2d6f630-contain-transparent' — agrupamento de arquivos relacionados.

**`favicon-48.png`** _(10 linhas)_
Arquivo de imagem.

---

## CONTEXTO PARA IA (copie e cole para continuar o projeto)

> Use este bloco para explicar o projeto para qualquer IA ou desenvolvedor:

```
Projeto: mobile (3)
Tipo: Aplicacao Web Frontend (React)
Stack: React, TypeScript
Arquivos: 40 | Linhas: ~10.958
Variaveis de ambiente necessarias: BASE_PATH, REPLIT_INTERNAL_APP_DOMAIN, REPLIT_DEV_DOMAIN, EXPO_PUBLIC_DOMAIN, REPL_ID, EXPO_PUBLIC_REPL_ID, PORT

Estrutura principal:
  .expo/README.md
  .expo/devices.json
  .expo/types/router.d.ts
  .expo/web/cache/production/images/favicon/favicon-a81a8b823918132ad1bb32b7ba8be194b0e081efa726735499c96199d2d6f630-contain-transparent/favicon-48.png
  .gitignore
  .replit-artifact/artifact.toml
  app.json
  app/(tabs)/_layout.tsx
  app/(tabs)/ai.tsx
  app/(tabs)/editor.tsx
  app/(tabs)/index.tsx
  app/(tabs)/settings.tsx
  app/(tabs)/terminal.tsx
  app/+not-found.tsx
  app/_layout.tsx
  assets/images/icon.png
  babel.config.js
  components/AIChat.tsx
  components/CodeEditor.tsx
  components/ErrorBoundary.tsx
  components/ErrorFallback.tsx
  components/FileSidebar.tsx
  components/FloatingAI.tsx
  components/KeyboardAwareScrollViewCompat.tsx
  components/LibrarySearch.tsx
  components/ProjectPlanModal.tsx
  components/Terminal.tsx
  constants/colors.ts
  context/AppContext.tsx
  eas.json
  expo-env.d.ts
  hooks/useColors.ts
  metro.config.js
  package.json
  scripts/build.js
  server/serve.js
  server/templates/landing-page.html
  tsconfig.json
  utils/projectPlan.ts
  utils/zipUtils.ts
```

---

*Plano gerado pelo SK Code Editor — 23/04/2026, 11:44:30*