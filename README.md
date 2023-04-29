# Restaurant Dashboard App

A restaurant dashboard app that allows users to search for restaurants and view their locations on a map. Users can bookmark and remove maps, and the bookmarked maps will be saved on the same device using cookies.

## Features

- Login page
- Restaurant search bar with autocomplete
- A map that shows a list of locations where the restaurant is present
- A bookmark and remove button for each map
- Maps that are removed will be deleted from the browser's cookies

## Technologies Used

- React
- TypeScript
- Airtable (for storing restaurant information)
- CSS (for styling)

## Getting Started

To run the app on your local machine, follow these steps:

1.Clone the repository from GitHub.

```bash
git clone https://github.com/bhagatpratik07/restaurant-dashboard.git
```

2.Install the dependencies using npm or yarn.

```
npm install
```

or

```
yarn install
```

Rename the .env.example file to .env and add your Airtable API key.

```makefile
VITE_AIRTABLE_KEY = YOUR_API_KEY
```

Start the development server.

```
npm run dev
```

Open the app in your browser at http://localhost:5173.
