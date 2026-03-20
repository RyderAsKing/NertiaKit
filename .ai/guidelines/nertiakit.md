# NertiaKit Project Guidelines

NertiaKit is a Laravel + Inertia.js SaaS starter template with built-in authentication, RBAC, and modern UI components.

## Project Structure

### Route Organization
Routes are organized by access level:
- `routes/web.php` - Public routes
- `routes/user.php` - User-authenticated routes with `role:user` middleware
- `routes/admin.php` - Admin routes with `role:admin` middleware, using `admin.` prefix

Controllers follow the same structure: `app/Http/Controllers/{Admin,User,Auth}/`

### Shared Inertia Data
Common data is shared via `HandleInertiaRequests::share()`:
- `auth.user` - Current user with id, name, email, roles
- `app` - Application config (name, tagline, logo from config/app.php)
- `flash` - Session flash messages (success, error, warning)

Access in React components using `usePage<PageProps>().props`

### Type Definitions
- `resources/js/types/global.d.ts` - Global types and module augmentation
- `resources/js/types/index.d.ts` - User, PageProps, and shared data types

### Layouts
- `AuthenticatedLayout` - For logged-in users with sidebar, breadcrumbs, and user menu
- `GuestLayout` - For authentication pages with centered content

### Navigation
Navigation items support role-based visibility via `viewBy` property. Filter navigation by checking if user has required role.

## Conventions

### Role Management
- Uses Spatie Laravel Permission package
- Default roles: `admin`, `user`
- New users are assigned `user` role by default
- Check roles using `$user->hasRole('admin')` or in React via `auth.user.roles`

### Access Control
Always apply appropriate middleware to routes:
- `auth` - Requires authentication
- `role:admin` - Requires admin role
- `role:user` - Requires user role

## Real-Time Features

### Laravel Reverb
- Broadcasting is configured to use Laravel Reverb (WebSocket server)
- Frontend uses Laravel Echo with Pusher protocol
- Echo instance is globally available via `window.Echo`
- Broadcasting channels are defined in `routes/channels.php`

### Usage
```typescript
// Listen to events in React components
useEffect(() => {
    window.Echo.channel('channel-name')
        .listen('EventName', (e) => {
            console.log(e);
        });
    
    return () => {
        window.Echo.leaveChannel('channel-name');
    };
}, []);
```

Start Reverb server: `php artisan reverb:start`
