# Chat App Frontend

This is the frontend for a real-time chat application built using **React**, **TypeScript**, and **Ant Design**. It connects to the backend via REST APIs and WebSockets to provide a seamless chat experience.

## Features

- Interactive and responsive user interface with **Ant Design**
- Real-time messaging with **Socket.IO Client**
- Routing with **React Router DOM**
- API integration using **Axios**
- Modular and type-safe components with **TypeScript**

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.x or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/nihalshameem/chat-app-frontend.git
cd chat-app-frontend
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

Start the development server to run the app locally:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

### Build for Production

Build the app for production:

```bash
npm run build
```

The production-ready files will be located in the `build/` folder.

## Folder Structure

```plaintext
chat-app-frontend/
├── public/             # Static assets
├── src/                # Application source code
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── routes/         # Application routes
│   ├── services/       # API services (e.g., Axios calls)
│   ├── styles/         # Global and component-specific styles
│   ├── App.tsx         # Root component
│   └── index.tsx       # Application entry point
└── package.json        # Project metadata and scripts
```

## Technologies Used

- **React** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript development
- **Ant Design** - UI framework for consistent design
- **Socket.IO Client** - Real-time communication
- **Axios** - Promise-based HTTP client
- **Webpack** - Module bundler

## Scripts

- `npm start` - Start the development server
- `npm run build` - Build the app for production
- `npm test` - Run the test suite
- `npm run eject` - Eject the app configuration (use with caution)

## Environment Variables

To configure the frontend, create a `.env` file in the project root and add the following variables:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
```

Replace the URLs with the backend server's address.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue to suggest improvements or report bugs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to the open-source community for providing amazing tools and resources.
