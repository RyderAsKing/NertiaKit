import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <>
            <Head title="Profile" />
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                    <UpdatePasswordForm />
                </div>
                <DeleteUserForm />
            </div>
        </>
    );
}

Edit.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout header={[{ name: "Profile" }]}>
        {page}
    </AuthenticatedLayout>
);

export default Edit;
