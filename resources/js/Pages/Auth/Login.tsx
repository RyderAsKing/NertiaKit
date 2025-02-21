import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Checkbox } from "@/Components/ui/checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { toast } from "sonner";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm<{
        email: string;
        password: string;
        remember: boolean;
    }>({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onSuccess: () => {
                toast.success("Welcome back!");
            },
            onError: () => {
                toast.error("Invalid credentials");
                reset("password");
            },
        });
    };

    return (
        <GuestLayout
            title="Welcome back"
            description="Enter your credentials to access your account"
        >
            <Head title="Log in" />
            {status && (
                <div className="text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>
                    <Input
                        id="password"
                        type="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                        className={errors.password ? "border-destructive" : ""}
                    />
                    {errors.password && (
                        <p className="text-sm text-destructive">
                            {errors.password}
                        </p>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="remember"
                        checked={data.remember}
                        onCheckedChange={(checked) =>
                            setData("remember", !!checked)
                        }
                    />
                    <Label
                        htmlFor="remember"
                        className="text-sm text-muted-foreground"
                    >
                        Remember me
                    </Label>
                </div>

                <Button type="submit" className="w-full" disabled={processing}>
                    Sign in
                </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                    href={route("register")}
                    className="font-medium underline underline-offset-4 hover:text-primary"
                >
                    Sign up
                </Link>
            </div>
        </GuestLayout>
    );
}
