import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { toast } from "sonner";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("password.confirm"), {
            onSuccess: () => {
                reset("password");
                toast.success("Password confirmed");
            },
        });
    };

    return (
        <GuestLayout
            title="Secure Area"
            description="Please confirm your password before continuing"
        >
            <Head title="Confirm Password" />

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className={errors.password ? "border-destructive" : ""}
                    />
                    {errors.password && (
                        <p className="text-sm text-destructive">
                            {errors.password}
                        </p>
                    )}
                </div>

                <Button type="submit" className="w-full" disabled={processing}>
                    Confirm Password
                </Button>
            </form>
        </GuestLayout>
    );
}
