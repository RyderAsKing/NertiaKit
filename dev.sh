#!/bin/bash

# Cleanup function to stop all processes
cleanup() {
    echo ""
    echo "Stopping all services..."
    
    if [ ! -z "$NPM_PID" ]; then
        kill $NPM_PID 2>/dev/null
        echo "Stopped npm run dev (PID: $NPM_PID)"
    fi
    
    if [ ! -z "$SERVE_PID" ]; then
        kill $SERVE_PID 2>/dev/null
        echo "Stopped php artisan serve (PID: $SERVE_PID)"
    fi
    
    if [ ! -z "$QUEUE_PID" ]; then
        kill $QUEUE_PID 2>/dev/null
        echo "Stopped php artisan queue:work (PID: $QUEUE_PID)"
    fi
    
    if [ ! -z "$REVERB_PID" ]; then
        kill $REVERB_PID 2>/dev/null
        echo "Stopped php artisan reverb:start (PID: $REVERB_PID)"
    fi
    
    if [ ! -z "$SCHEDULE_PID" ]; then
        kill $SCHEDULE_PID 2>/dev/null
        echo "Stopped php artisan schedule:work (PID: $SCHEDULE_PID)"
    fi
    
    echo "All services stopped."
    exit 0
}

# Trap Ctrl+C and call cleanup
trap cleanup SIGINT SIGTERM

# Start development servers in background
echo "Starting development servers..."
echo ""

# Run npm dev
npm run dev &
NPM_PID=$!
echo "✓ npm run dev started (PID: $NPM_PID)"

# Run Laravel development server
php artisan serve &
SERVE_PID=$!
echo "✓ php artisan serve started (PID: $SERVE_PID)"

# Run Laravel queue worker
php artisan queue:work &
QUEUE_PID=$!
echo "✓ php artisan queue:work started (PID: $QUEUE_PID)"

# Run Laravel Reverb server
php artisan reverb:start &
REVERB_PID=$!
echo "✓ php artisan reverb:start started (PID: $REVERB_PID)"

# Run Laravel scheduler
php artisan schedule:work &
SCHEDULE_PID=$!
echo "✓ php artisan schedule:work started (PID: $SCHEDULE_PID)"

echo ""
echo "All services started! Press Ctrl+C to stop all processes."
echo ""
echo "Process IDs:"
echo "  npm run dev: $NPM_PID"
echo "  php artisan serve: $SERVE_PID"
echo "  php artisan queue:work: $QUEUE_PID"
echo "  php artisan reverb:start: $REVERB_PID"
echo "  php artisan schedule:work: $SCHEDULE_PID"
echo ""

# Wait for all background processes
wait
