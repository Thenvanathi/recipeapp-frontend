import React from 'react';

function ShoppingList({ mealPlan }) {
  const ingredientQuantities = new Map();

  for (const day in mealPlan) {
    const recipe = mealPlan[day];
    if (recipe) {
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== '') {
          const trimmedIngredient = ingredient.trim().toLowerCase();
          const trimmedMeasure = measure ? measure.trim().toLowerCase() : '';
          const item = `${trimmedMeasure} ${trimmedIngredient}`.trim();

          // Avoid duplication — just store one line per unique ingredient
          if (!ingredientQuantities.has(trimmedIngredient)) {
            ingredientQuantities.set(trimmedIngredient, item);
          }
        }
      }
    }
  }

  const combinedIngredients = Array.from(ingredientQuantities.values()).sort();

  return (
    <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-green-600 mb-4">🛒 Shopping List</h2>

      {combinedIngredients.length > 0 ? (
        <ul className="space-y-2">
          {combinedIngredients.map((ingredient, index) => (
            <li
              key={index}
              className="bg-green-100 px-4 py-2 rounded text-gray-800 shadow-sm hover:bg-green-200 transition"
            >
              {ingredient}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No ingredients to list. Add recipes to your meal plan to generate a shopping list.</p>
      )}
    </div>
  );
}

export default ShoppingList;
