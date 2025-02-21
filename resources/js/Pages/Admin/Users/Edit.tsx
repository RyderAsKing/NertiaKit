import { Head, router } from "@inertiajs/react";
import { User, Role } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { format } from "date-fns";
import { useState } from "react";
import { AlertCircle, KeyRound, Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

interface Props {
    user: User & { roles: Role[] };
}

export default function Edit({ user }: Props) {
    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        role: user.roles[0]?.name,
    });

    const [passwordData, setPasswordData] = useState({
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route("admin.users.update", user.id), data);
    };

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route("admin.users.password.update", user.id), passwordData);
    };

    const handleDelete = () => {
        router.delete(route("admin.users.destroy", user.id));
    };

    return (
        <>
            <Head title="Edit User" />

            <div className="grid gap-6 md:grid-cols-2">
                {/* User Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>User Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="name"
                                    className="text-sm font-medium"
                                >
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium"
                                >
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Role
                                </label>
                                <Select
                                    value={data.role}
                                    onValueChange={(value) =>
                                        setData({ ...data, role: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>
                                        <SelectItem value="user">
                                            User
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button type="submit" className="w-full">
                                    Update User
                                </Button>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="destructive"
                                            className="gap-2"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete Account
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                                This will permanently delete the
                                                user account and remove all
                                                associated data.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleDelete}
                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                            >
                                                Delete Account
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* User Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Account Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Password Change Section */}
                        <div>
                            <form
                                onSubmit={handlePasswordUpdate}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        New Password
                                    </label>
                                    <Input
                                        type="password"
                                        value={passwordData.password}
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Confirm Password
                                    </label>
                                    <Input
                                        type="password"
                                        value={
                                            passwordData.password_confirmation
                                        }
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                password_confirmation:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <Button type="submit" variant="outline">
                                    Update Password
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Information */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium mb-1">
                                Current Role
                            </h4>
                            <Badge
                                variant={
                                    user.roles[0]?.name === "admin"
                                        ? "default"
                                        : "secondary"
                                }
                            >
                                {user.roles[0]?.name}
                            </Badge>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium mb-1">
                                Email Verification
                            </h4>
                            {user.email_verified_at ? (
                                <Badge variant="default">Verified</Badge>
                            ) : (
                                <Badge variant="destructive">
                                    Not Verified
                                </Badge>
                            )}
                        </div>

                        <div>
                            <h4 className="text-sm font-medium mb-1">
                                Theme Preference
                            </h4>
                            <Badge variant="outline">
                                {user.theme || "System"}
                            </Badge>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium mb-1">
                                Created At
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                {user.created_at &&
                                    format(new Date(user.created_at), "PPpp")}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium mb-1">
                                Last Updated
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                {user.updated_at &&
                                    format(new Date(user.updated_at), "PPpp")}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Edit.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout
        header={[
            { name: "Users", link: route("admin.users.index") },
            { name: "Edit User" },
        ]}
    >
        {page}
    </AuthenticatedLayout>
);
