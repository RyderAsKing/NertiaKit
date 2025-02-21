import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

export default function Register() {
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    }>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData("password", e.target.value);
        if (e.target.value && !showConfirmPassword) {
            setShowConfirmPassword(true);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onSuccess: () => {
                toast.success("Registration successful!");
            },
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout
            title="Create an account"
            description="Enter your details to create your account"
        >
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        autoComplete="name"
                        className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                        <p className="text-sm text-destructive">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        autoComplete="username"
                        className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={handlePasswordChange}
                        autoComplete="new-password"
                        className={errors.password ? "border-destructive" : ""}
                    />
                    {errors.password && (
                        <p className="text-sm text-destructive">
                            {errors.password}
                        </p>
                    )}
                </div>

                <AnimatePresence>
                    {showConfirmPassword && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-2 overflow-hidden"
                        >
                            <Label htmlFor="password_confirmation">
                                Confirm Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                autoComplete="new-password"
                                className={
                                    errors.password_confirmation
                                        ? "border-destructive"
                                        : ""
                                }
                            />
                            {errors.password_confirmation && (
                                <p className="text-sm text-destructive">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <Button type="submit" className="w-full" disabled={processing}>
                    Register
                </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href={route("login")}
                    className="font-medium underline underline-offset-4 hover:text-primary"
                >
                    Sign in
                </Link>
            </div>
        </GuestLayout>
    );
}
