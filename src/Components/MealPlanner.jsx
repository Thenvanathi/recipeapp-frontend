import React from 'react';

function MealPlanner({ mealPlan, onRemoveFromMealPlan }) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">Your Weekly Meal Plan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {daysOfWeek.map(day => (
          <div key={day} className="bg-white rounded-lg shadow-lg p-4 relative group transition hover:shadow-2xl">
            <h3 className="text-lg font-semibold text-center mb-2 text-gray-700">{day}</h3>
            
            {mealPlan[day] ? (
              <>
                <img
                  src={mealPlan[day].strMealThumb}
                  alt={mealPlan[day].strMeal}
                  className="w-full h-28 object-cover rounded-md mb-2"
                />
                <h4 className="text-sm text-center font-medium text-gray-800">{mealPlan[day].strMeal}</h4>

                <button
                  onClick={() => onRemoveFromMealPlan(day)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-700 p-1"
                  aria-label={`Remove ${mealPlan[day]?.strMeal} from ${day}`}
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 
                      1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 
                      1.414L10 11.414l-4.293 4.293a1 1 0 
                      01-1.414-1.414L8.586 10 4.293 5.707a1 
                      1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <p className="text-gray-500 text-sm text-center mt-6">No recipe added</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealPlanner;
