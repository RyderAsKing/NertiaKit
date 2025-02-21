import { PropsWithChildren } from "react";

interface GuestProps extends PropsWithChildren {
    title: string;
    description: string;
}

export default function Guest({ children, title, description }: GuestProps) {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <h1 className="text-2xl font-bold">{title}</h1>
                            <p className="text-balance text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1526925539332-aa3b66e35444?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                />
            </div>
        </div>
    );
}
