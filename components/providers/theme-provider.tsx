"use client";

import { ThemeProvider as NextThemesThemeProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesThemeProvider>) {
  return (
    <NextThemesThemeProvider {...props}>{children}</NextThemesThemeProvider>
  );
}
