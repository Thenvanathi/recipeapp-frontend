import React, { useState, useEffect } from 'react';
import RecipeList from './Components/RecipeList';
import SearchBar from './Components/SearchBar';
import RecipeDetail from './Components/RecipeDetail';
import MealPlanner from './Components/MealPlanner';
import ShoppingList from './Components/ShoppingList';
import { Transition } from 'react-transition-group';

const LOCAL_STORAGE_KEY = 'mealPlan';

function App() {
  const [searchQuery, setSearchQuery] = useState('pasta');
  const [key, setKey] = useState(0);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [selectedRecipeDetails, setSelectedRecipeDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);
  const [mealPlan, setMealPlan] = useState(() => {
    const storedPlan = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedPlan
      ? JSON.parse(storedPlan)
      : {
          Monday: null,
          Tuesday: null,
          Wednesday: null,
          Thursday: null,
          Friday: null,
          Saturday: null,
          Sunday: null,
        };
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedRecipeId(null);
    setSelectedRecipeDetails(null);
    setKey((prevKey) => prevKey + 1);
  };

  const handleRecipeSelect = (id) => {
    setSelectedRecipeId(id);
  };

  const handleAddToMealPlan = (day, recipe) => {
    const updatedPlan = { ...mealPlan, [day]: recipe };
    setMealPlan(updatedPlan);
    setSelectedRecipeId(null);
    setSelectedRecipeDetails(null);
  };

  const handleRemoveFromMealPlan = (day) => {
    const updatedPlan = { ...mealPlan, [day]: null };
    setMealPlan(updatedPlan);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mealPlan));
  }, [mealPlan]);

  useEffect(() => {
    async function fetchRecipeDetails() {
      if (selectedRecipeId) {
        setLoadingDetails(true);
        setErrorDetails(null);
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedRecipeId}`
          );
          const data = await response.json();
          setSelectedRecipeDetails(data.meals ? data.meals[0] : null);
        } catch (error) {
          console.error('Error fetching recipe details:', error);
          setErrorDetails('Failed to fetch recipe details.');
        } finally {
          setLoadingDetails(false);
        }
      }
    }

    fetchRecipeDetails();
  }, [selectedRecipeId]);

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-100 min-h-screen py-10 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-5xl font-extrabold text-center text-orange-600 mb-3 drop-shadow-sm">
          🍽️ Recipe App
        </h1>
        <p className="text-center text-gray-600 text-lg mb-10">
          Discover, plan, and organize delicious meals.
        </p>

        <div className="bg-white shadow-lg rounded-xl p-6 mb-10">
          <SearchBar onSearch={handleSearch} />
        </div>

        {selectedRecipeDetails ? (
          <Transition in={!!selectedRecipeDetails} timeout={300} mountOnEnter unmountOnExit>
            {(state) => (
              <div
                className={`absolute top-0 left-0 w-full h-full bg-white/90 backdrop-blur-md z-10 transition-opacity duration-300 ease-in-out ${
                  state === 'entering' || state === 'entered'
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                }`}
              >
                {state !== 'exited' && selectedRecipeDetails && (
                  <RecipeDetail
                    recipe={selectedRecipeDetails}
                    onAddToMealPlan={handleAddToMealPlan}
                  />
                )}
                {state !== 'exited' && (
                  <button
                    onClick={() => setSelectedRecipeDetails(null)}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-200"
                  >
                    ❌ Close
                  </button>
                )}
              </div>
            )}
          </Transition>
        ) : (
          <RecipeList key={key} query={searchQuery} onRecipeSelect={handleRecipeSelect} />
        )}

        {loadingDetails && (
          <div className="text-center text-orange-500 font-semibold animate-pulse mt-6">
            Loading recipe details...
          </div>
        )}
        {errorDetails && (
          <div className="text-center text-red-600 font-medium mt-6">Error: {errorDetails}</div>
        )}

        <h2 className="text-3xl font-bold text-gray-800 mt-16 mb-6 border-b pb-2">
          🗓️ Weekly Meal Planner
        </h2>
        <MealPlanner mealPlan={mealPlan} onRemoveFromMealPlan={handleRemoveFromMealPlan} />

        <h2 className="text-3xl font-bold text-gray-800 mt-16 mb-6 border-b pb-2">
          🛒 Shopping List
        </h2>
        <ShoppingList mealPlan={mealPlan} />

        <footer className="text-center text-sm text-gray-500 mt-16 mb-4">
          Made with ❤️ by Thenvanathi · RecipeApp © 2025
        </footer>
      </div>
    </div>
  );
}

export default App;
