import "./bootstrap";
import "../css/app.css";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./Components/theme-provider";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const initialTheme =
            props.initialPage.props.auth.user?.theme || "light";

        root.render(
            <ThemeProvider initialTheme={initialTheme}>
                <App {...props} />
            </ThemeProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
