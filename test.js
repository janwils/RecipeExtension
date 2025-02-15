// Import recipeExtractor function
import { recipeExtractor } from "./RecipeExtractor.js"

// Print the chatgpt response
console.log(await recipeExtractor("https://www.recipetineats.com/pesto-pasta/"))