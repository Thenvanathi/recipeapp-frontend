import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { searchRecipes } from '../api';

function RecipeList({ query, onRecipeSelect }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      setError(null);
      const data = await searchRecipes(query);
      setLoading(false);
      if (data) {
        setRecipes(data);
      } else {
        setError('Failed to fetch recipes.');
      }
    }

    fetchRecipes();
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onRecipeClick={onRecipeSelect}
        />
      ))}
    </div>
  );
}

export default RecipeList;
