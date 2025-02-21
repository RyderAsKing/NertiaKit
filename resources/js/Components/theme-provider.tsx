"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type Theme = "dark" | "light";

type ThemeProviderProps = {
    children: React.ReactNode;
    initialTheme?: Theme;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
    undefined
);

export function ThemeProvider({
    children,
    initialTheme = "light",
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(initialTheme);

    const updateTheme = async (newTheme: Theme) => {
        setTheme(newTheme);
        try {
            await axios.patch(route("theme.update"), { theme: newTheme });
        } catch (error) {
            console.error("Failed to update theme:", error);
        }
    };

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
    }, [theme]);

    return (
        <ThemeProviderContext.Provider value={{ theme, setTheme: updateTheme }}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};
