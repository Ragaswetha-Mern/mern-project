# MovieBot Assistant

A modern, responsive movie search app built with React, Tailwind CSS, and the OMDB API. Features a chat-style interface, favorites management, and Netflix/Prime-inspired UI.

## Features

- Search movies and series using OMDB API
- Chat window with bot assistant and modern UI
- Add/remove favorites, view favorites on a separate page
- Responsive design with Tailwind CSS
- Movie details with rich metadata and favorite icon
- Pagination for large result sets

## Tech Stack & Component Overview

- **React**: Main UI framework for building components and managing state.
- **Tailwind CSS**: Utility-first CSS for responsive and modern design.
- **React Router**: Handles navigation between Home, Favorites, and Details pages.
- **OMDB API**: Fetches movie and series data.
- **LocalStorage**: Persists favorites across sessions.

### Component Explanations

- **App.jsx**: Main app logic, routing, chat window, global state, and API integration.
- **MovieList/**: Displays a grid of movies using props; uses Tailwind for layout.
- **MovieCard/**: Individual movie card, favorite icon logic, click to details; uses React state and props.
- **MovieDetails/**: Shows detailed info, favorite button, styled with Tailwind; receives props from App.
- **Favorites/**: Carousel and column layouts for favorites, navigation to details; uses React Router and local state.
- **Pagination/**: Handles page navigation, uses props for current/total pages.
- **services/omdbApi.js**: API service for OMDB search and details fetch.

## How to Run & Initialize

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Ragaswetha-Mern/mern-project.git
   cd mern-project/Task-Movie-Searching
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   ```
4. **Open your browser:**
   Go to `http://localhost:5173` (or the port shown in your terminal).

## Project Structure

```
TASK-MOVIE-SEARCHING/
├── src/
│   ├── components/
│   │   ├── MovieList/
│   │   ├── MovieCard/
│   │   ├── MovieDetails/
│   │   ├── Favorites/
│   │   └── Pagination/
│   ├── services/
│   │   └── omdbApi.js
│   ├── App.jsx
│   └── index.js
├── public/
├── package.json
└── README.md
```

## Customization

- Change the OMDB API key in `src/services/omdbApi.js` if needed.
- Update UI styles in Tailwind config or component files.

## License

MIT
