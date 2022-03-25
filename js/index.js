const spellForm = document.querySelector('#search-spell');

document.addEventListener('DOMContentLoaded', () => {
  spellForm.addEventListener('submit', handleSubmit)
});

function handleSubmit(e) {
  e.preventDefault();
  const spellNameInput = e.target[0].value;
  fetch(`https://www.dnd5eapi.co/api/spells/${spellNameInput}`)
  .then(response => response.json())
  .then(spellData => createSpellCard(spellData))
  .catch(error => alert(error))
}

function createSpellCard(spells) {
  const spellDisplay = document.querySelector('#spell-card-display');
  const spellCard = document.createElement('dl');
  spellCard.className = 'spell-card';
  
  const spellName = document.createElement('dt');
  spellName.className = 'spell-name';
  spellName.textContent = 'Name';
  const spellNameDef = document.createElement('dd');
  spellNameDef.textContent = spells.name;
  spellName.appendChild(spellNameDef);
  
  
  spellDisplay.append(spellName);
  
}