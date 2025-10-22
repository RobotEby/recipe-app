# Recipe App

A modern recipe app developed in React, allowing you to explore, search, favorite, and track the progress of food and drink recipes.

## 🚀 Overview

This project is a complete recipe app that uses the latest React features, including Hooks and Context API. With a mobile-optimized interface, users can:

- Browse food and drink recipes
- Search recipes by ingredients, name, or first letter
- Bookmark favorite recipes
- Track preparation progress
- Share recipes

## 🛠 Skills Developed

- State management with Context API
- Development with React Hooks (useState, useContext, useEffect)
- Creation of custom Hooks
- Integration with external APIs
- **Automated testing with Vitest + React Testing Library**
- Responsive design with Tailwind CSS

## 📋 Features

### 🎯 Main Screens

- **Login**: Authentication with email and password validation
- **Main Recipes**: List of recipes with filters by category
- **Recipe Details**: Complete information with ingredients, instructions, and video
- **Recipe in Progress**: Step-by-step preparation guide
- **Explore**: Discover new recipes by ingredients or place of origin
- **Profile**: Management of recipes made and favorites
- **Favorite Recipes**: List of recipes favorited by the user
- **Recipes Made**: History of completed recipes

## 🔧 Technologies Used

- React 18
- TypeScript
- Vite
- React Router DOM
- Context API
- React Query (@tanstack/react-query)
- Tailwind CSS
- Shadcn/ui
- **Vitest + React Testing Library**
- LocalStorage for data persistence

## 🌐 APIs Used

### TheMealDB API
Open database with recipes and ingredients from around the world.  
[Documentation](https://www.themealdb.com/api.php)

### The CockTailDB API
Similar to TheMealDB, but focused on drinks and cocktails.  
[Documentation](https://www.thecocktaildb.com/api.php)

## 🗂 Project Structure

```
src/
├── components/     # Reusable components
│   ├── ui/        # Shadcn/ui components
│   ├── Header.tsx
│   ├── BottomNav.tsx
│   └── RecipeCard.tsx
├── pages/         # Application screens
│   ├── Login.tsx
│   ├── Foods.tsx
│   ├── Drinks.tsx
│   ├── RecipeDetails.tsx
│   ├── Explore.tsx
│   ├── Profile.tsx
│   └── Favorites.tsx
├── contexts/      # Contexts for state management
│   ├── AuthContext.tsx
│   └── FavoritesContext.tsx
├── hooks/         # Custom hooks
├── services/      # API integrations
│   └── api.ts
├── tests/         # Automated tests
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   └── services/
└── lib/           # Utilities
```

## 🚀 How to Run

1. **Clone the repository**
   ```bash
   git clone <https://github.com/RobotEby/recipe-app.git>
   cd recipes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the project**
   ```bash
   npm run dev
   ```

4. **Run the tests**
   ```bash
   npm test
   ```

5. **Run the tests in watch mode**
   ```bash
   npm run test:watch
   ```

## 📱 Application Routes

- `/` - Login screen
- `/food` - Food recipes
- `/drinks` - Drink recipes
- `/food/:id` - Food recipe details
- `/drinks/:id` - Drink recipe details
- `/explore` - Explore screen
- `/profile` - User profile
- `/favorite-recipes` - Favorite recipes

## 🧪 Tests

The project uses **Vitest** and **React Testing Library** for automated testing. It includes:

### Component Tests
- ✅ **RecipeCard**: Rendering, favorites, and interactions
- ✅ **Header**: Navigation and search
- ✅ **BottomNav**: Navigation between pages

### Context Tests
- ✅ **AuthContext**: Login, logout, persistence in localStorage
- ✅ **FavoritesContext**: Add, remove, and check favorites

### Page Tests
- ✅ **Login**: Form validation and authentication
- ✅ **Foods/Drinks**: Listing and filters (can be expanded)

### API Tests
- ✅ **TheMealDB**: Search by category, ID, and name
- ✅ **TheCocktailDB**: Drink search
- ✅ **Error handling**: Empty responses

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with UI interface
npm run test:ui

# Test coverage
npm run test:coverage
```

## 🎨 Design System

The project uses a customized design system based on:
- Tailwind CSS for styling
- Shadcn/ui for base components
- Semantic tokens for colors and spacing
- Custom gradients and shadows
- Smooth transitions and animations

## 📦 Advanced Features

- **Smart Search**: Filter by ingredient, name, or first letter
- **Favorites**: Local storage of favorite recipes
- **Progress**: Save recipe progress
- **Sharing**: Copy recipe links
- **Recommendations**: Cross-recommendation system (food→drinks)

## 🤝 Development

This project was developed following modern front-end development practices, focusing on:

- Componentization and reuse
- Efficient state management
- Responsive user experience
- **Automated test coverage**
- Clean and maintainable code
- Accessibility

---

## 📋 Available Scripts

```json
{
  “dev”: “vite”,
  “build”: “tsc && vite build”,
  “preview”: “vite preview”,
  “test”: “vitest run”,
  “test:watch”: “vitest”,
  “test:ui”: “vitest --ui”,
  “test:coverage”: “vitest --coverage”
}
```

---

**Note**: This is a demo project developed to showcase skills in React and development. 
