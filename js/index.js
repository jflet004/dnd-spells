const spellForm = document.querySelector('#search-spell');

document.addEventListener('DOMContentLoaded', () => {
  spellForm.addEventListener('submit', handleSubmit)
});

function handleSubmit(e) {
  e.preventDefault();

  fetch('https://www.dnd5eapi.co/api/spells')
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
  spellName.textContent = spells.name;
  
  const spellLevel = document.createElement('dt');
  spellName.className = 'spell-name';
  spellName.textContent = spells.name;
  const spellDescription = document.createElement('dt');
  spellDescription.className = 'spell-description';
  spellDescription.textContent = spells.desc;
  const spellHigherLevel = document.createElement('dt');
  spellName.className = 'spell-name';
  spellName.textContent = spells.name;
  const spellRange = document.createElement('dt');
  spellName.className = 'spell-name';
  spellName.textContent = spells.name;
  const spellComponents = document.createElement('dt');
  spellName.className = 'spell-name';
  spellName.textContent = spells.name;
  const spellRitual = document.createElement('dt');
  spellName.className = 'spell-name';
  spellName.textContent = spells.name;
  const spellDuration = document.createElement('dt');
  spellName.className = 'spell-name';
  spellName.textContent = spells.name;
  const spellConcentration = document.createElement('dt');
  spellName.className = 'spell-name';
  spellName.textContent = spells.name;
  const spellCastingTime = document.createElement('dt');
  spellName.className = 'spell-name';
  spellName.textContent = spells.name;
  const spellAttackType = document.createElement('dt');
  spellName.className = 'spell-name';
  spellName.textContent = spells.name;
  const spellDamageType = document.createElement('dt');
  spellName.className = 'spell-name';
  spellName.textContent = spells.name;
  const spellDmgAtSlotLvl = document.createElement('dt');
  spellName.className = 'spell-name';
  spellName.textContent = spells.name;

  
}