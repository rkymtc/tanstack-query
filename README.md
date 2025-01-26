# Admin Panel Application

A modern, responsive admin panel built with React, TypeScript, and Material-UI. This application provides a comprehensive solution for managing users, viewing analytics, and handling administrative tasks with a clean and intuitive interface.

## Features

- 🔐 Secure authentication system
- 📱 Responsive design for all devices
- 📊 Dashboard with overview statistics
- 📋 Data Grid for managing users
- 🎨 Modern and clean UI with Material-UI
- 🌙 Navigation with sidebar and top bar

## Tech Stack

- React 18+
- TypeScript 5
- Material-UI (MUI) v5
- Vite
- React Router v6
- Context API for state management

## Prerequisites

- Node.js 16.0 or higher
- npm or yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/rkymtc/tanstack-query.git
cd admin-panel
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will start on http://localhost:3000

## Build for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

- `/src/components` - Reusable UI components
- `/src/context` - React Context providers
- `/src/pages` - Application pages/routes
- `/src/services` - API and service functions
- `/src/types` - TypeScript type definitions
- `/src/hooks` - Custom React hooks

## Features Overview

### Authentication
- Secure login system with JWT tokens
- Protected routes for authenticated users
- User session management with persistent login

### Navigation
- Responsive sidebar with collapsible menu
- Top navigation bar with quick actions
- User profile menu with account settings

### Data Management
- User data grid with CRUD operations
- Advanced data filtering and sorting capabilities
- Responsive tables optimized for all devices
- Bulk actions support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
