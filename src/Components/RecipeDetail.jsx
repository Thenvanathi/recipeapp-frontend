import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecipeDetail({ recipe, onAddToMealPlan }) {
  const [selectedDay, setSelectedDay] = useState('');
  const navigate = useNavigate();

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (!recipe) {
    return <div className="text-center mt-10">Loading recipe details...</div>;
  }

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleAddToPlan = () => {
    if (selectedDay && recipe) {
      onAddToMealPlan(selectedDay, recipe);
      setSelectedDay('');
    }
  };

  // Extract ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "" && measure && measure.trim() !== "") {
      ingredients.push(`${measure} ${ingredient}`);
    } else if (ingredient && ingredient.trim() !== "") {
      ingredients.push(ingredient);
    }
  }

  return (
    <div className="min-h-screen bg-white px-6 py-8 flex flex-col items-center relative">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded shadow"
      >
        ← Back
      </button>

      {/* Recipe Name */}
      <h2 className="text-2xl font-bold text-center mb-4">{recipe.strMeal}</h2>

      {/* Recipe Image */}
      {recipe.strMealThumb && (
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="rounded-md shadow-md mb-6 w-full max-w-md"
        />
      )}

      {/* Ingredients */}
      <div className="w-full max-w-2xl">
        <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        {/* Instructions */}
        <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
        <p className="text-gray-700 whitespace-pre-line">{recipe.strInstructions}</p>

        {/* Meal Plan Selector */}
        <div className="mt-6">
          <label htmlFor="meal-plan-day" className="block text-gray-700 text-sm font-bold mb-2">
            Add to Meal Plan:
          </label>
          <select
            id="meal-plan-day"
            className="border rounded w-full py-2 px-3 text-gray-700 mb-2"
            value={selectedDay}
            onChange={handleDayChange}
          >
            <option value="">Select Day</option>
            {daysOfWeek.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <button
            onClick={handleAddToPlan}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={!selectedDay}
          >
            Add to Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
