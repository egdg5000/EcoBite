require('dotenv').config(); // Zorg dat je dit hebt als eerste regel

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getAISuggestions(ingredients, allergies = []) {
  const ingredientNames = ingredients.map(i => i.name ?? i).join(', ');

  const allergyText = allergies.length > 0
    ? ` Vermijd ingrediënten die de volgende allergieën bevatten: ${allergies.join(', ')}.`
    : '';

  const prompt = `
Ik heb de volgende ingrediënten in huis: ${ingredientNames}.
Bedenk een recept met maximaal 2 extra ingrediënten.
${allergyText}
Geef: 
1. Naam van het gerecht 
2. Korte omschrijving 
3. Wat ik nog moet toevoegen.
`;

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return response.data.choices[0].message.content;
}

module.exports = {
  getAISuggestions,
};
