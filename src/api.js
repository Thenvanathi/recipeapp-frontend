// Use your own backend as a proxy
const API_BASE_URL = 'https://recipeapp-backend-9kd6.onrender.com';

export async function searchRecipes(query) {
  try {
    const response = await fetch(`${API_BASE_URL}/search?query=${query}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return null;
  }
}
