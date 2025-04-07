# Nertiakit - Laravel Inertia.js SaaS Starter Kit

![Nertiakit Banner](https://raw.githubusercontent.com/RyderAsKing/NertiaKit/master/public/assets/nertiakit_full.png)

A minimalistic Laravel + Inertia.js starter kit designed to accelerate the development of SaaS applications, admin dashboards, and multi-role web apps. Built with authentication, role-based access control (RBAC), modern UI components, and TypeScript support.

## Features

-   Authentication with Laravel Breeze
-   Role-Based Access Control using Spatie Permissions
-   Inertia.js + React for seamless SPA experience
-   ShadCN UI Components with modern styling
-   Tailwind CSS for responsive design
-   Toast notifications for user feedback
-   Pre-configured layouts and dashboards

## Documentation

### Shared Data with Inertia.js

Common data is automatically shared between backend and frontend using Inertia's middleware:

```php
// App/Http/Middleware/HandleInertiaRequests.php
public function share(Request $request): array
{
    return [
        'auth' => [
            'user' => $request->user() ? [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'roles' => $request->user()->roles->pluck('name'),
            ] : null,
        ],
        'app' => [
            'name' => config('app.name'),
            'tagline' => config('app.tagline'),
            'logo' => config('app.logo'),
        ],
        'flash' => [
            'success' => fn () => $request->session()->get('success'),
            'error' => fn () => $request->session()->get('error'),
            'warning' => fn () => $request->session()->get('warning'),
        ],
    ];
}
```

#### Accessing Shared Data in React

Access shared data in any component using the `usePage` hook:

```typescript
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function MyComponent() {
    const { auth, app, flash } = usePage<PageProps>().props;

    return (
        <div>
            <h1>{app.name}</h1>
            {auth.user && <p>Welcome, {auth.user.name}</p>}
            {flash.success && <div className="alert">{flash.success}</div>}
        </div>
    );
}
```

### Type Definitions

Type definitions are organized in two key files:

```typescript
// resources/js/types/global.d.ts
declare global {
    var route: typeof ziggyRoute;
    interface Window {
        axios: AxiosInstance;
    }
}

declare module "@inertiajs/core" {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}

// resources/js/types/index.d.ts
export interface User {
    id: number;
    name: string;
    email: string;
    roles: { name: string }[];
}

export type PageProps<T = {}> = T & {
    auth: { user: User };
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
```

### Role-Based Access Control

Role management is handled using Spatie's Laravel Permission package:

```php
// database/seeders/RoleSeeder.php
public function run(): void
{
    Role::create(['name' => 'admin']);
    Role::create(['name' => 'user']);
}

// app/Http/Controllers/Auth/RegisteredUserController.php
public function store(Request $request): RedirectResponse
{
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    $user->assignRole('user');
    // ...
}
```

### Layouts

Nertiakit provides two layouts for different authentication states:

#### Authenticated Layout

Used for logged-in users, providing:

-   Navigation sidebar
-   Breadcrumb navigation
-   User profile dropdown
-   Role-based content

```typescript
interface Props {
    header: { name: string; link?: string }[];
    children: React.ReactNode;
}

MyPage.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout
        header={[
            { name: "Users", link: route("admin.users.index") },
            { name: "Edit User" },
        ]}
    >
        {page}
    </AuthenticatedLayout>
);
```

#### Guest Layout

Used for authentication pages with:

-   Centered content
-   Page titles
-   Minimal interface

```typescript
interface Props {
    title: string;
    children: React.ReactNode;
}

export default function Login() {
    return (
        <GuestLayout title="Sign in to your account">
            <LoginForm />
        </GuestLayout>
    );
}
```

### Navigation System

The navigation system implements role-based access control:

```typescript
const navigation = [
    {
        title: "Dashboard",
        url: route("dashboard"),
        icon: LayoutDashboard,
        isActive: route().current("dashboard"),
    },
    {
        title: "Users",
        url: route("admin.users.index"),
        icon: Users,
        isActive: route().current("admin.users.*"),
        viewBy: "admin",
    },
];

const filteredNavigation = navigation.filter(
    (item) =>
        !item.viewBy ||
        auth.user.roles.some((role) => role.name === item.viewBy)
);
```

The sidebar consists of:

1. App Sidebar - Main container with branding
2. Main Navigation - Menu items and nested navigation
3. User Navigation - Profile, theme, and logout controls

### Route & Controller Organization

Routes are organized by access level:

```php
// routes/web.php - Public routes
Route::get('/', function () { ... });

// routes/user.php - User routes
Route::middleware(['auth', 'role:user'])->group(function () {
    Route::get('/user/profile', function () { ... });
});

// routes/admin.php - Admin routes
Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::resource('users', UserController::class);
    });
```

Controllers follow a similar structure:

```
app/Http/Controllers/
├── Admin/                 # Admin controllers
├── User/                 # User controllers
└── Auth/                # Auth controllers
```

## Getting Started

### Option 1: Use as a Template

1. Click "Use this template" on GitHub
2. Create your new repository
3. Clone your repository:

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

### Option 2: Fork and Customize

1. Fork the repository
2. Clone your fork:

```bash
git clone https://github.com/your-username/nertiakit.git
cd nertiakit
```

### Development

After cloning either way:

```bash
# Install PHP dependencies
composer install

# Install and build frontend
npm install
npm run dev

# Configure your environment
cp .env.example .env
php artisan key:generate

# Run migrations and seed the database
php artisan migrate --seed
```

The default admin credentials are:

-   Email: admin@example.com
-   Password: password

Start building your application by:

1. Modifying routes in `routes/` directory
2. Adding controllers in `app/Http/Controllers/`
3. Creating React components in `resources/js/Components/`
4. Adding new pages in `resources/js/Pages/`
