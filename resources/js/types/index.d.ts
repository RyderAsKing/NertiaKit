export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    theme?: "light" | "dark";
    roles: {
        name: string;
    }[];
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    app: {
        name: string;
        tagline: string;
        logo: string;
    };
    flash: {
        success?: string;
        error?: string;
        warning?: string;
    };
};

export interface Role {
    id: number;
    name: string;
}
