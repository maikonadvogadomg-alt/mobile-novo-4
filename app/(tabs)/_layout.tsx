import { BlurView } from "expo-blur";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { SymbolView } from "expo-symbols";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, View, useColorScheme } from "react-native";

import { useColors } from "@/hooks/useColors";

function NativeTabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: "folder", selected: "folder.fill" }} />
        <Label>Projetos</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="editor">
        <Icon sf={{ default: "chevron.left.forwardslash.chevron.right", selected: "chevron.left.forwardslash.chevron.right" }} />
        <Label>Editor</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="terminal">
        <Icon sf={{ default: "terminal", selected: "terminal.fill" }} />
        <Label>Terminal</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="ai">
        <Icon sf={{ default: "brain", selected: "brain.fill" }} />
        <Label>IA</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Icon sf={{ default: "gearshape", selected: "gearshape.fill" }} />
        <Label>Config</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function ClassicTabLayout() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: isIOS ? "transparent" : colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          height: isWeb ? 84 : 60,
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView
              intensity={100}
              tint={isDark ? "dark" : "dark"}
              style={StyleSheet.absoluteFill}
            />
          ) : isWeb ? (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.card }]} />
          ) : null,
        tabBarLabelStyle: { fontSize: 10, marginBottom: 2 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Projetos",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="folder" tintColor={color} size={22} />
            ) : (
              <Feather name="folder" size={20} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="editor"
        options={{
          title: "Editor",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="chevron.left.forwardslash.chevron.right" tintColor={color} size={22} />
            ) : (
              <Feather name="code" size={20} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="terminal"
        options={{
          title: "Terminal",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="terminal" tintColor={color} size={22} />
            ) : (
              <Feather name="terminal" size={20} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: "IA",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="brain" tintColor={color} size={22} />
            ) : (
              <Feather name="cpu" size={20} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Config",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="gearshape" tintColor={color} size={22} />
            ) : (
              <Feather name="settings" size={20} color={color} />
            ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  if (isLiquidGlassAvailable()) {
    return <NativeTabLayout />;
  }
  return <ClassicTabLayout />;
}
