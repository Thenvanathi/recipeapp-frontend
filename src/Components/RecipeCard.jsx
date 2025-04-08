import React from 'react';

function RecipeCard({ recipe, onRecipeClick }) {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
      onClick={() => onRecipeClick(recipe.idMeal)}
    >
      <div className="flex justify-center items-center bg-gray-100 p-4">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="rounded-lg w-40 h-40 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-orange-600 mb-1 text-center">{recipe.strMeal}</h3>
        {recipe.strInstructions && (
          <p className="text-gray-600 text-sm text-center line-clamp-2">
            {recipe.strInstructions}
          </p>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
