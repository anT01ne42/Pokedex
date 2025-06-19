
# Pokedex

A modern Angular-based Pokedex application that allows users to browse, search, and filter Pokémon using data from the [PokéAPI](https://pokeapi.co/).

## Overview

This Pokedex application provides an interactive interface to explore the world of Pokémon. Users can browse through a list of Pokémon, filter them by type, search by name, and view detailed information about each Pokémon.

## Features

- **Pokémon List**: Browse through a comprehensive list of Pokémon
- **Type Filtering**: Filter Pokémon by their elemental types (Fire, Water, Grass, etc.)
- **Search Functionality**: Search Pokémon by name
- **Sorting Options**: Sort Pokémon by ID or name (ascending/descending)
- **Detailed View**: View detailed information about each Pokémon

## Technologies Used

- **Angular 20**: Frontend framework
- **RxJS**: Reactive programming library for handling asynchronous operations
- **Angular Router**: For navigation between views
- **Angular Forms**: For handling user input and filtering
- **PokéAPI**: External API for Pokémon data

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/pokedex.git]
   cd pokedex
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:4200/`

## Usage

### Home Page

The home page displays a list of Pokémon with various filtering options:

- **Filter by Type**: Select a Pokémon type from the radio buttons to filter the list
- **Sort Options**: Choose to sort by ID, name (ascending), or name (descending)
- **Search**: Enter a name in the search box to find specific Pokémon

### Pokémon Details

TODO : Click on any Pokémon in the list to view its detailed information, including:
- Name
- Types
- Stats
- Abilities
- Images

## Project Structure

```
pokedex/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── pokemon-list/       # List of all Pokémon
│   │   │   └── pokemon-detail/     # Detailed view of a Pokémon
│   │   ├── types/                  # TypeScript interfaces
│   │   ├── utils/                  # Utility functions
│   │   ├── pokemon-services.ts     # Services for API calls
│   │   └── app.routes.ts           # Application routes
│   ├── index.html                  # Main HTML file
│   └── main.ts                     # Entry point
└── package.json                    # Dependencies and scripts
```

## API Integration

This application uses the [PokéAPI](https://pokeapi.co/) to fetch Pokémon data. The following endpoints are used:

- `https://pokeapi.co/api/v2/pokemon?limit=50` - Get a list of Pokémon
- `https://pokeapi.co/api/v2/pokemon/{name}` - Get details of a specific Pokémon
- `https://pokeapi.co/api/v2/type/` - Get all Pokémon types

## Development

### Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code Scaffolding

Run `ng generate component component-name` to generate a new component.

### Building for Production

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
