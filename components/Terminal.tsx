import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";
import type { TerminalLine } from "@/context/AppContext";

const TAB_BAR_HEIGHT = Platform.OS === "web" ? 84 : 60;

const BUILT_IN_COMMANDS: Record<string, (args: string[]) => string> = {
  ajuda: () =>
    `Comandos disponíveis:
  ajuda / help    — Esta ajuda
  limpar / clear  — Limpar terminal
  ls              — Listar arquivos do projeto
  cat [arquivo]   — Exibir conteúdo de arquivo
  echo [msg]      — Imprimir mensagem
  pwd             — Diretório atual
  data / date     — Data e hora atual
  node -e [js]    — Executar JavaScript
  python -c [py]  — Executar Python (simulado)
  npm install     — Instalar pacote npm
  npm run [script]— Executar script npm
  pip install     — Instalar pacote Python
  git [cmd]       — Simular comando git`,
  help: () =>
    `Comandos disponíveis:
  ajuda / help    — Esta ajuda
  limpar / clear  — Limpar terminal
  ls              — Listar arquivos do projeto
  cat [arquivo]   — Exibir conteúdo de arquivo
  echo [msg]      — Imprimir mensagem
  pwd             — Diretório atual
  data / date     — Data e hora atual
  node -e [js]    — Executar JavaScript
  python -c [py]  — Executar Python (simulado)
  npm install     — Instalar pacote npm
  npm run [script]— Executar script npm
  pip install     — Instalar pacote Python
  git [cmd]       — Simular comando git`,
  pwd: () => "/workspace/projeto",
  data: () => new Date().toLocaleString("pt-BR"),
  date: () => new Date().toLocaleString("pt-BR"),
  echo: (args) => args.join(" "),
  whoami: () => "devmobile",
  uname: () => "Linux DevMobile 5.15 Android",
  env: () => "NODE_ENV=desenvolvimento\nHOME=/workspace\nUSER=devmobile",
  versao: () => "DevMobile Terminal v2.1 — SDK Expo 54",
  version: () => "DevMobile Terminal v2.1 — SDK Expo 54",
};

const QUICK_CMDS = [
  { label: "npm install", cmd: "npm install" },
  { label: "npm run dev", cmd: "npm run dev" },
  { label: "npm run build", cmd: "npm run build" },
  { label: "npm init", cmd: "npm init -y" },
  { label: "git status", cmd: "git status" },
  { label: "git add .", cmd: "git add ." },
  { label: "git commit", cmd: "git commit -m " },
  { label: "git log", cmd: "git log" },
  { label: "ls", cmd: "ls" },
  { label: "ajuda", cmd: "ajuda" },
  { label: "limpar", cmd: "limpar" },
  { label: "node -e", cmd: "node -e " },
  { label: "python -c", cmd: "python -c " },
  { label: "pip install", cmd: "pip install " },
];

export default function Terminal() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const {
    terminalSessions,
    activeTerminal,
    addTerminalLine,
    clearTerminal,
    addTerminalSession,
    setActiveTerminal,
    removeTerminalSession,
    activeProject,
  } = useApp();

  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showQuick, setShowQuick] = useState(false);
  const listRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  const activeSession = terminalSessions.find((s) => s.id === activeTerminal);

  const bottomPad = insets.bottom + TAB_BAR_HEIGHT;

  useEffect(() => {
    if (terminalSessions.length === 0) {
      const s = addTerminalSession("Terminal 1");
      addTerminalLine(s.id, {
        type: "info",
        content: `╔══════════════════════════════════╗
║   DevMobile Terminal  v2.1       ║
║   ${new Date().toLocaleString("pt-BR")}   ║
╚══════════════════════════════════╝

⚠ Atenção: Este é um terminal simulado.
  Comandos como npm, git e python são
  executados em modo de simulação offline.
  Para execução real, gere o APK via EAS Build.

Projeto ativo: ${activeProject?.name || "(nenhum)"}
Digite 'ajuda' para ver os comandos disponíveis.
`,
      });
    }
  }, []);

  const scrollToEnd = useCallback(() => {
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 80);
  }, []);

  const simulateInstall = useCallback(
    (sessionId: string, pkg: string, tool: "npm" | "pip") => {
      const steps =
        tool === "npm"
          ? [
              { delay: 300, type: "info" as const, msg: `📦 Resolvendo dependências...` },
              { delay: 900, type: "info" as const, msg: `⬇  Baixando ${pkg}@latest...` },
              { delay: 1600, type: "info" as const, msg: `🔗 Vinculando módulos...` },
              { delay: 2400, type: "output" as const, msg: `\nadicionado 1 pacote em 2,4 seg\n\n+ ${pkg}\n✅ Instalação concluída com sucesso` },
            ]
          : [
              { delay: 300, type: "info" as const, msg: `📦 Coletando ${pkg}...` },
              { delay: 1000, type: "info" as const, msg: `⬇  Baixando ${pkg}...` },
              { delay: 1800, type: "info" as const, msg: `⚙  Instalando...` },
              { delay: 2500, type: "output" as const, msg: `\nInstalação bem-sucedida: ${pkg}\n✅ Concluído` },
            ];

      steps.forEach(({ delay, type, msg }) => {
        setTimeout(() => {
          addTerminalLine(sessionId, { type, content: msg });
          scrollToEnd();
        }, delay);
      });
    },
    [addTerminalLine, scrollToEnd]
  );

  const runCommand = useCallback(
    async (cmd: string) => {
      if (!activeSession) return;
      const trimmed = cmd.trim();
      if (!trimmed) return;

      addTerminalLine(activeSession.id, { type: "input", content: `$ ${trimmed}` });
      setCommandHistory((prev) => [trimmed, ...prev.slice(0, 99)]);
      setHistoryIndex(-1);
      scrollToEnd();

      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      const parts = trimmed.split(/\s+/);
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);

      // limpar / clear
      if (command === "limpar" || command === "clear") {
        clearTerminal(activeSession.id);
        return;
      }

      // ls
      if (command === "ls") {
        if (!activeProject || activeProject.files.length === 0) {
          addTerminalLine(activeSession.id, { type: "output", content: "(nenhum arquivo no projeto ativo)" });
        } else {
          const listing = activeProject.files
            .map((f) => `  ${f.name.padEnd(30)} ${(f.content.length / 1024).toFixed(1)} KB`)
            .join("\n");
          addTerminalLine(activeSession.id, { type: "output", content: `total ${activeProject.files.length}\n${listing}` });
        }
        return;
      }

      // cat
      if (command === "cat" && args[0]) {
        const file = activeProject?.files.find(
          (f) => f.name === args[0] || f.name === args.join(" ")
        );
        if (file) {
          addTerminalLine(activeSession.id, {
            type: "output",
            content: `=== ${file.name} (${file.language}) ===\n${file.content}`,
          });
        } else {
          addTerminalLine(activeSession.id, {
            type: "error",
            content: `cat: ${args[0]}: Arquivo não encontrado`,
          });
        }
        return;
      }

      // node -e
      if (command === "node" && args[0] === "-e") {
        const code = args.slice(1).join(" ");
        if (!code) {
          addTerminalLine(activeSession.id, { type: "error", content: "Uso: node -e <código JavaScript>" });
          return;
        }
        try {
          const logs: string[] = [];
          const fakeConsole = {
            log: (...a: unknown[]) => logs.push(a.map(String).join(" ")),
            error: (...a: unknown[]) => logs.push("ERRO: " + a.map(String).join(" ")),
            warn: (...a: unknown[]) => logs.push("AVISO: " + a.map(String).join(" ")),
          };
          const fn = new Function("console", "require", code);
          const fakeRequire = (mod: string) => {
            throw new Error(`require('${mod}') não disponível no simulador. Use npm install no projeto real.`);
          };
          const result = fn(fakeConsole, fakeRequire);
          const out = [...logs, result !== undefined ? `=> ${JSON.stringify(result)}` : ""].filter(Boolean).join("\n");
          addTerminalLine(activeSession.id, { type: "output", content: out || "(sem saída)" });
        } catch (e: unknown) {
          addTerminalLine(activeSession.id, {
            type: "error",
            content: `Erro: ${e instanceof Error ? e.message : String(e)}`,
          });
        }
        return;
      }

      // node (sem -e)
      if (command === "node" && !args[0]) {
        addTerminalLine(activeSession.id, {
          type: "info",
          content: "Node.js v20.0.0 (simulado)\nUse: node -e <código>\nExemplo: node -e \"console.log('Olá!')\"",
        });
        return;
      }

      // git
      if (command === "git") {
        const subcmd = args[0] || "";
        const responses: Record<string, string> = {
          status: `No branch main\nSeu branch está atualizado com 'origin/main'.\n\nNada para fazer commit, árvore de trabalho limpa`,
          log: `commit abc1234def5678 (HEAD -> main, origin/main)\nAutor: Dev <dev@devmobile.app>\nData:   ${new Date().toDateString()}\n\n    Commit inicial\n\ncommit 9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0\nAutor: Dev <dev@devmobile.app>\nData:   ${new Date(Date.now() - 86400000).toDateString()}\n\n    Configuração inicial`,
          branch: "* main\n  desenvolver\n  feature/nova-funcionalidade",
          init: "Repositório Git vazio iniciado em /workspace/projeto/.git/",
          add: `Adicionado ao stage: ${args.slice(1).join(" ") || "."}`,
          commit: `[main ${Math.random().toString(36).substr(2, 7)}] ${args.slice(2).join(" ") || "Atualização"}\n 1 arquivo alterado`,
          push: "Enumerando objetos: feito.\nContando objetos: feito.\nCompressão delta: feito.\nPara origin/main: ✅ Concluído.",
          pull: `De origin/main\n * branch main -> FETCH_HEAD\nJá está atualizado.`,
          clone: `Clonando em '${args[1]?.split("/").pop()?.replace(".git", "") || "repo"}'...\nRecebendo objetos: 100% ✅ Concluído.`,
          diff: `diff --git a/index.js b/index.js\n--- a/index.js\n+++ b/index.js\n@@ -1 +1 @@\n(sem alterações)`,
          stash: "Diretório de trabalho salvo: WIP no branch main",
          fetch: "De origin\n * branch main -> FETCH_HEAD\n✅ Fetch concluído",
          merge: `Atualizando abc1234..def5678\nFast-forward\n✅ Merge concluído`,
          checkout: `Alternado para o branch '${args[1] || "main"}'`,
          remote: `origin  https://github.com/usuario/repo.git (fetch)\norigin  https://github.com/usuario/repo.git (push)`,
        };
        const output = responses[subcmd] || `git: '${subcmd}' não é um comando git conhecido\nTente: status, add, commit, push, pull, log, branch, clone, init, diff`;
        addTerminalLine(activeSession.id, { type: "output", content: output });
        return;
      }

      // npm
      if (command === "npm") {
        const subcmd = args[0];
        if (subcmd === "install" || subcmd === "i") {
          const pkg = args[1] || "dependências";
          addTerminalLine(activeSession.id, { type: "info", content: `\n> npm install ${pkg}\n` });
          simulateInstall(activeSession.id, pkg, "npm");
          return;
        }
        if (subcmd === "uninstall" || subcmd === "remove" || subcmd === "rm") {
          const pkg = args[1] || "pacote";
          addTerminalLine(activeSession.id, { type: "output", content: `removido 1 pacote\n- ${pkg}\n✅ Desinstalação concluída` });
          return;
        }
        if (subcmd === "run") {
          const script = args[1];
          if (!script) {
            addTerminalLine(activeSession.id, { type: "error", content: "npm run: especifique um script (ex: npm run dev)" });
            return;
          }
          addTerminalLine(activeSession.id, { type: "info", content: `\n> ${script}\n` });
          const scriptMessages: Record<string, string[]> = {
            dev: [
              "🚀 Iniciando servidor de desenvolvimento...",
              "⚡ Vite/Next iniciando na porta 3000...",
              "✅ Servidor pronto em http://localhost:3000",
            ],
            build: [
              "🏗  Compilando projeto...",
              "📦 Empacotando módulos...",
              "✅ Build concluído em /dist — 1.2 MB",
            ],
            start: [
              "🚀 Iniciando servidor...",
              "✅ Servidor rodando na porta 3000",
            ],
            test: [
              "🧪 Executando testes...",
              "PASS src/index.test.js",
              "✅ 3 testes passaram, 0 falhas",
            ],
          };
          const msgs = scriptMessages[script] || [`✅ Script '${script}' executado com código 0`];
          msgs.forEach((msg, i) => {
            setTimeout(() => {
              addTerminalLine(activeSession.id!, { type: i === msgs.length - 1 ? "output" : "info", content: msg });
              scrollToEnd();
            }, (i + 1) * 600);
          });
          return;
        }
        if (subcmd === "list" || subcmd === "ls") {
          addTerminalLine(activeSession.id, { type: "output", content: "projeto@1.0.0 /workspace/projeto\n└── (sem dependências instaladas)" });
          return;
        }
        if (subcmd === "init") {
          addTerminalLine(activeSession.id, { type: "output", content: "Escrito em /workspace/projeto/package.json\n✅ npm init concluído" });
          return;
        }
        if (subcmd === "update") {
          const pkg = args[1] || "todos os pacotes";
          addTerminalLine(activeSession.id, { type: "info", content: `Atualizando ${pkg}...` });
          setTimeout(() => {
            addTerminalLine(activeSession.id!, { type: "output", content: `✅ ${pkg} atualizado com sucesso` });
            scrollToEnd();
          }, 1200);
          return;
        }
        addTerminalLine(activeSession.id, { type: "output", content: `npm ${subcmd}: executado` });
        return;
      }

      // pip
      if (command === "pip" || command === "pip3") {
        const subcmd = args[0];
        if (subcmd === "install") {
          const pkg = args.slice(1).join(" ") || "pacote";
          addTerminalLine(activeSession.id, { type: "info", content: `\n> pip install ${pkg}\n` });
          simulateInstall(activeSession.id, pkg, "pip");
          return;
        }
        if (subcmd === "list") {
          addTerminalLine(activeSession.id, {
            type: "output",
            content: "Pacote        Versão\n------------- ------\npip           23.3.1\nsetuptools    68.0.0\nwheel         0.41.0",
          });
          return;
        }
        if (subcmd === "freeze") {
          addTerminalLine(activeSession.id, { type: "output", content: "pip==23.3.1\nsetuptools==68.0.0" });
          return;
        }
        if (subcmd === "uninstall") {
          const pkg = args[1] || "pacote";
          addTerminalLine(activeSession.id, { type: "output", content: `✅ ${pkg} desinstalado com sucesso` });
          return;
        }
        addTerminalLine(activeSession.id, { type: "output", content: `pip ${subcmd}: executado` });
        return;
      }

      // python / python3
      if (command === "python" || command === "python3") {
        if (args[0] === "-c") {
          const code = args.slice(1).join(" ");
          if (!code) {
            addTerminalLine(activeSession.id, { type: "error", content: "Uso: python -c <código>\nExemplo: python -c \"print('Olá Mundo')\"" });
            return;
          }
          const printMatch = code.match(/print\s*\(\s*['"](.*?)['"]\s*\)/);
          if (printMatch) {
            addTerminalLine(activeSession.id, { type: "output", content: printMatch[1] });
            return;
          }
          const calcMatch = code.match(/print\s*\((.+)\)/);
          if (calcMatch) {
            try {
              const result = Function('"use strict"; return (' + calcMatch[1] + ')')();
              addTerminalLine(activeSession.id, { type: "output", content: String(result) });
            } catch {
              addTerminalLine(activeSession.id, { type: "info", content: `(Python simulado)\n>> ${code}` });
            }
            return;
          }
          addTerminalLine(activeSession.id, { type: "info", content: `(Python simulado)\n>> ${code}` });
          return;
        }
        addTerminalLine(activeSession.id, {
          type: "output",
          content: "Python 3.11.0 (simulado — DevMobile)\nDigite: python -c <código>",
        });
        return;
      }

      // builtins
      const builtin = BUILT_IN_COMMANDS[command];
      if (builtin) {
        addTerminalLine(activeSession.id, { type: "output", content: builtin(args) });
        return;
      }

      // comando desconhecido
      addTerminalLine(activeSession.id, {
        type: "error",
        content: `bash: ${command}: comando não encontrado\nDica: digite 'ajuda' para ver os comandos disponíveis`,
      });
    },
    [activeSession, activeProject, addTerminalLine, clearTerminal, simulateInstall, scrollToEnd]
  );

  const handleSubmit = () => {
    if (input.trim()) {
      runCommand(input);
      setInput("");
    }
  };

  const handleHistoryUp = () => {
    const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
    setHistoryIndex(newIndex);
    if (commandHistory[newIndex]) setInput(commandHistory[newIndex]);
  };

  const handleHistoryDown = () => {
    const newIndex = Math.max(historyIndex - 1, -1);
    setHistoryIndex(newIndex);
    setInput(newIndex === -1 ? "" : commandHistory[newIndex]);
  };

  const renderLine = ({ item }: { item: TerminalLine }) => {
    const color =
      item.type === "input"
        ? colors.primary
        : item.type === "error"
          ? colors.destructive
          : item.type === "info"
            ? colors.info
            : colors.foreground;
    return (
      <Text
        style={[
          styles.line,
          {
            color,
            fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
            fontSize: 13,
            backgroundColor: item.type === "error" ? colors.destructive + "18" : undefined,
            borderLeftWidth: item.type === "input" ? 2 : 0,
            borderLeftColor: colors.primary,
            paddingLeft: item.type === "input" ? 6 : 2,
          },
        ]}
        selectable
      >
        {item.content}
      </Text>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.terminalBg }]}>
      {/* Session Tabs */}
      <View style={[styles.tabBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", gap: 4, paddingHorizontal: 4 }}>
            {terminalSessions.map((s) => (
              <TouchableOpacity
                key={s.id}
                onPress={() => setActiveTerminal(s.id)}
                style={[
                  styles.tab,
                  {
                    backgroundColor: s.id === activeTerminal ? colors.secondary : "transparent",
                    borderColor: s.id === activeTerminal ? colors.primary : colors.border,
                  },
                ]}
              >
                <Feather
                  name="terminal"
                  size={11}
                  color={s.id === activeTerminal ? colors.primary : colors.mutedForeground}
                />
                <Text
                  style={[
                    styles.tabText,
                    { color: s.id === activeTerminal ? colors.primary : colors.mutedForeground },
                  ]}
                >
                  {s.name}
                </Text>
                {terminalSessions.length > 1 && (
                  <TouchableOpacity
                    onPress={() => removeTerminalSession(s.id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Feather name="x" size={10} color={colors.mutedForeground} />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            const s = addTerminalSession(`Terminal ${terminalSessions.length + 1}`);
            addTerminalLine(s.id, {
              type: "info",
              content: `DevMobile Terminal — ${new Date().toLocaleString("pt-BR")}\nDigite 'ajuda' para os comandos.\n`,
            });
          }}
          style={styles.addTab}
        >
          <Feather name="plus" size={16} color={colors.mutedForeground} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => activeSession && clearTerminal(activeSession.id)}
          style={styles.addTab}
        >
          <Feather name="trash-2" size={14} color={colors.mutedForeground} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={scrollToEnd}
          style={styles.addTab}
        >
          <Feather name="chevrons-down" size={14} color={colors.mutedForeground} />
        </TouchableOpacity>
      </View>

      {/* Saída */}
      <FlatList
        ref={listRef}
        data={activeSession?.history ?? []}
        keyExtractor={(item) => item.id}
        renderItem={renderLine}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
        onContentSizeChange={scrollToEnd}
        onLayout={scrollToEnd}
        ListEmptyComponent={
          <Text style={[styles.line, { color: colors.mutedForeground, fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace" }]}>
            Terminal vazio. Execute um comando abaixo.{"\n"}Digite 'ajuda' para ver os comandos disponíveis.
          </Text>
        }
      />

      {/* Comandos rápidos */}
      {showQuick && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[styles.quickBar, { backgroundColor: colors.card, borderColor: colors.border }]}
          contentContainerStyle={{ paddingHorizontal: 8, gap: 6, alignItems: "center" }}
        >
          {QUICK_CMDS.map(({ label, cmd }) => (
            <TouchableOpacity
              key={cmd}
              onPress={() => {
                setInput(cmd);
                setShowQuick(false);
                inputRef.current?.focus();
              }}
              style={[styles.quickBtn, { backgroundColor: colors.secondary, borderColor: colors.border }]}
            >
              <Text style={[styles.quickText, { color: colors.foreground, fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace" }]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Campo de entrada fixo */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? bottomPad + 10 : 0}
      >
        <View
          style={[
            styles.inputRow,
            {
              backgroundColor: colors.card,
              borderTopColor: colors.border,
              paddingBottom: Math.max(insets.bottom, 8),
            },
          ]}
        >
          {/* ⚡ Comandos rápidos */}
          <TouchableOpacity
            onPress={() => setShowQuick((v) => !v)}
            style={[styles.histBtn, { backgroundColor: showQuick ? colors.primary + "33" : colors.secondary }]}
          >
            <Feather name="zap" size={13} color={showQuick ? colors.primary : colors.mutedForeground} />
          </TouchableOpacity>

          {/* ↑ Histórico anterior */}
          <TouchableOpacity onPress={handleHistoryUp} style={[styles.histBtn, { backgroundColor: colors.secondary }]}>
            <Feather name="chevron-up" size={14} color={colors.mutedForeground} />
          </TouchableOpacity>

          {/* Prompt $ */}
          <Text style={[styles.prompt, { color: colors.primary, fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace" }]}>$</Text>

          {/* Campo de texto */}
          <TextInput
            ref={inputRef}
            style={[
              styles.input,
              {
                color: colors.foreground,
                fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
                fontSize: 13,
              },
            ]}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSubmit}
            returnKeyType="send"
            autoCorrect={false}
            autoCapitalize="none"
            spellCheck={false}
            placeholder="Digite um comando..."
            placeholderTextColor={colors.mutedForeground}
          />

          {/* ↓ Histórico próximo */}
          <TouchableOpacity onPress={handleHistoryDown} style={[styles.histBtn, { backgroundColor: colors.secondary }]}>
            <Feather name="chevron-down" size={14} color={colors.mutedForeground} />
          </TouchableOpacity>

          {/* Executar ↵ */}
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.sendBtn, { backgroundColor: input.trim() ? colors.primary : colors.secondary }]}
          >
            <Feather name="corner-down-left" size={16} color={input.trim() ? colors.primaryForeground : colors.mutedForeground} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 4,
    minHeight: 36,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  tabText: { fontSize: 11, fontWeight: "500" },
  addTab: { paddingHorizontal: 10, paddingVertical: 4 },
  line: { lineHeight: 20, paddingHorizontal: 2, marginBottom: 2 },
  quickBar: {
    maxHeight: 40,
    borderTopWidth: 1,
    paddingVertical: 4,
  },
  quickBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    borderWidth: 1,
  },
  quickText: { fontSize: 11 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    gap: 6,
  },
  prompt: { fontSize: 15, fontWeight: "bold" },
  input: { flex: 1, height: 36 },
  histBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
