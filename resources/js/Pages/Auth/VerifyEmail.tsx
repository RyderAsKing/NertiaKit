import { Button } from "@/Components/ui/button";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { toast } from "sonner";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("verification.send"), {
            onSuccess: () => {
                toast.success("Verification link sent!");
            },
        });
    };

    return (
        <GuestLayout
            title="Verify Email"
            description="Please verify your email address to continue"
        >
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        Resend Verification Email
                    </Button>

                    <Button variant="outline" className="w-full" asChild>
                        <Link href={route("logout")} method="post">
                            Log Out
                        </Link>
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
