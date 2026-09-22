# 🎬 Movie Discovery App

A responsive movie discovery web application that allows users to browse popular movies, search for movies, view movie details, and save movies to a personal wishlist.

## 🚀 Features

* Browse popular movies
* Search movies by title
* View movie details
* Movie ratings and release years
* Movie posters and descriptions
* Add/remove movies from wishlist
* Wishlist persistence using browser localStorage
* Load more movies using pagination
* Loading states
* Error handling and retry functionality
* Empty states for searches and wishlist
* Responsive design for desktop and mobile
* Backend abstraction layer for the external movie API

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* Axios
* CORS
* dotenv

### External API

* TMDB API

## 📁 Project Structure

```text
movie-discovery-app/
│
├── backend/
│   ├── controllers/
│   │   └── movieController.js
│   │
│   ├── routes/
│   │   └── movieRoutes.js
│   │
│   ├── services/
│   │   └── tmdbService.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MovieCard.jsx
│   │   │   ├── MovieGrid.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── SearchBar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── MovieDetails.jsx
│   │   │   └── Wishlist.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🏗️ Architecture

The application follows a simple client-server architecture:

```text
React Frontend
      ↓
Axios API Requests
      ↓
Node.js + Express Backend
      ↓
Movie Controller
      ↓
TMDB Service Layer
      ↓
TMDB API
```

The frontend does not directly communicate with the external movie API. The Node.js backend acts as an abstraction layer between the frontend and TMDB.

This keeps API credentials on the server side and provides a single place for API handling and error management.

## 🔌 Backend API Endpoints

### Get Popular Movies

```text
GET /api/movies/popular
```

Optional query parameter:

```text
?page=1
```

### Search Movies

```text
GET /api/movies/search?query=avatar
```

Optional query parameter:

```text
&page=1
```

### Get Movie Details

```text
GET /api/movies/:id
```

Example:

```text
GET /api/movies/969681
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd movie-discovery-app
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create:

```text
backend/.env
```

Add:

```env
TMDB_ACCESS_TOKEN=your_tmdb_access_token
PORT=5000
```

Do not commit the `.env` file to GitHub.

### 4. Start the backend

```bash
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Start the frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## 💾 Wishlist Persistence

The wishlist is currently stored using browser `localStorage`.

This allows the wishlist to remain available after refreshing the page without requiring a database.

The implementation can later be extended to use a backend database and user authentication.

## 🧠 Technical Decisions

### React + Vite

Vite provides a lightweight and fast development environment for the React frontend.

### Express Backend

Express was used to create a simple REST API and separate frontend concerns from external API communication.

### Service Layer

TMDB API requests are isolated inside `tmdbService.js`. This makes the external API integration easier to maintain or replace.

### Local Storage

localStorage was selected for wishlist persistence because authentication and user accounts were outside the initial scope of the assignment.

### Pagination

The application supports loading additional movie pages instead of loading a large number of movies at once.

### Error Handling

The application provides user-friendly error states and retry actions when requests fail.

## ⚠️ Handling Unavailable APIs

The application includes frontend loading and error states for slow or unavailable requests.

Older/stale requests are prevented from replacing newer request results by tracking active request IDs.

The UI also provides retry functionality when an API request fails.

## 🔐 Security

The TMDB access token is stored in the backend `.env` file.

The token is not included in frontend source code.

The `.env` file is excluded using `.gitignore`.

## 🤖 AI-Assisted Development

AI tools were used during development for:

* Generating and refining React components
* Debugging JavaScript and JSX errors
* Improving API integration
* Structuring frontend and backend files
* Improving error handling
* Generating documentation
* Reviewing implementation approaches

All generated code was reviewed, tested, and adapted during development.

## 🔮 Future Improvements

* User authentication
* Cloud-based wishlist persistence
* MongoDB integration
* Advanced genre and rating filters
* Sorting options
* Infinite scrolling
* Movie trailers
* Similar movie recommendations
* Better caching
* API request cancellation
* Production deployment
* Automated testing

## 📌 Assumptions

* Users can use the application without creating an account.
* Wishlist data is specific to the browser/device because localStorage is used.
* TMDB provides the movie metadata and images.
* Internet connectivity is required for movie discovery and search.

## ⚠️ Limitations

* Wishlist is not synchronized across devices.
* The application currently does not have authentication.
* Movie availability depends on the external TMDB API.
* Some movie information may be incomplete depending on the API response.

## 🎥 Demo

Loom Demo:

```text
https://www.loom.com/share/b08e6e8a6f6944a985052a55264d9ff5
```



## 🙏 Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

Movie metadata and images are provided by TMDB.
