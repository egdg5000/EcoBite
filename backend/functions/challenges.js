const CHALLENGES = [
  "Eet een volledige maaltijd zonder vlees of vis.",
  "Gebruik een product dat bijna over datum is (Max. 7 dagen nog houdbaar)",
  "Plan een gerecht met minimaal twee producten uit je digitale koelkast.",
  "Gooi deze week geen enkel product weg.",
  "Scan een nieuw product en voeg het toe aan je koelkast.",
  "Maak één keer een recept met alle producten uit je voorraadkast.",
  "Genereer suggesties met behulp van AI aan de hand van de resultaten.",
  "Voeg 5 producten toe aan de digitale koelkast."
];

function getRandomChallenges(count) {
  const shuffled = [...CHALLENGES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

module.exports = { getRandomChallenges };
