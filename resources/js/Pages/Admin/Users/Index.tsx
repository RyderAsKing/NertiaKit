import { Head, Link, router } from "@inertiajs/react";
import { User } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Badge } from "@/Components/ui/badge";
import {
    ChevronDown,
    ChevronUp,
    MoreHorizontal,
    Plus,
    Search,
} from "lucide-react";
import { useState, useCallback, useTransition } from "react";
import debounce from "lodash/debounce";
import { SimplePagination } from "@/Components/ui/pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        from: number;
        to: number;
        total: number;
    };
    filters: {
        search?: string;
        role?: string;
        sort?: string;
        direction?: "asc" | "desc";
    };
}

export default function Index({ users, filters }: Props) {
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState(filters.search);

    console.log(users);
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            startTransition(() => {
                router.get(
                    route("admin.users.index"),
                    { search: value, ...filters },
                    { preserveState: true }
                );
            });
        }, 300),
        []
    );

    const handleSort = (column: string) => {
        const direction =
            filters.sort === column && filters.direction === "asc"
                ? "desc"
                : "asc";

        router.get(
            route("admin.users.index"),
            { ...filters, sort: column, direction },
            { preserveState: true }
        );
    };

    const handleRoleFilter = (role: string) => {
        router.get(
            route("admin.users.index"),
            { ...filters, role },
            { preserveState: true }
        );
    };

    return (
        <>
            <Head title="Users" />

            <div>
                <div className="flex items-center justify-between mb-6">
                    <Button asChild>
                        <Link href={route("admin.users.create")}>
                            <Plus className="w-4 h-4 mr-2" />
                            New User
                        </Link>
                    </Button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search users..."
                            value={search}
                            className="pl-9"
                            onChange={(e) => {
                                setSearch(e.target.value);
                                debouncedSearch(e.target.value);
                            }}
                        />
                    </div>
                    <Select
                        value={filters.role ?? "all"}
                        onValueChange={handleRoleFilter}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="All roles" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All roles</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleSort("name")}
                                    >
                                        Name
                                        {filters.sort === "name" &&
                                            (filters.direction === "asc" ? (
                                                <ChevronUp className="ml-2 h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="ml-2 h-4 w-4" />
                                            ))}
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleSort("email")}
                                    >
                                        Email
                                        {filters.sort === "email" &&
                                            (filters.direction === "asc" ? (
                                                <ChevronUp className="ml-2 h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="ml-2 h-4 w-4" />
                                            ))}
                                    </Button>
                                </TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {user.roles.map((role) => (
                                            <Badge
                                                key={role.name}
                                                variant={
                                                    role.name === "admin"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {role.name}
                                            </Badge>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={route(
                                                            "admin.users.edit",
                                                            user.id
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                "Are you sure?"
                                                            )
                                                        ) {
                                                            router.delete(
                                                                route(
                                                                    "admin.users.destroy",
                                                                    user.id
                                                                )
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-4">
                    <SimplePagination
                        links={users.links}
                        from={users.from}
                        to={users.to}
                        total={users.total}
                    />
                </div>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout header={[{ name: "Users" }]}>
        {page}
    </AuthenticatedLayout>
);
