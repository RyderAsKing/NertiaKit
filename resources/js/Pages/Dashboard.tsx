import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Activity,
    CreditCard,
    DollarSign,
    Download,
    Users,
    CircleUserRound,
    Mail,
} from "lucide-react";
import { Button } from "@/Components/ui/button";

const stats = [
    {
        name: "Total Revenue",
        value: "$45,231.89",
        description: "+20.1% from last month",
        icon: DollarSign,
    },
    {
        name: "Subscriptions",
        value: "2,350",
        description: "+180.1% from last month",
        icon: Users,
    },
    {
        name: "Active Now",
        value: "573",
        description: "+201 since last hour",
        icon: Activity,
    },
];

function Dashboard({ auth }: PageProps) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex items-center justify-center ">
                <Card className="w-full">
                    <CardHeader className="text-center space-y-6 pb-8">
                        <div className="flex justify-center">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center ring-8 ring-primary/5">
                                <CircleUserRound className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-3xl font-bold">
                                Welcome back!
                            </CardTitle>
                            <CardDescription className="text-xl">
                                You are logged in as{" "}
                                <span className="font-semibold text-primary">
                                    {auth.user.name}
                                </span>
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center items-center gap-2 text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <span>{auth.user.email}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout header={[{ name: "Dashboard" }]}>
        {page}
    </AuthenticatedLayout>
);

export default Dashboard;
