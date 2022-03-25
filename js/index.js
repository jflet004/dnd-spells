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
  spellName.textContent = 'Spell:';
  const spellNameDef = document.createElement('dd');
  spellNameDef.textContent = spells.name;
  spellName.appendChild(spellNameDef);
  
  const spellLevel = document.createElement('dt');
  spellLevel.className = 'spell-lvl';
  spellLevel.textContent = 'Level:';
  const spellLevelDef = document.createElement('dd');
  spellLevelDef.textContent = spells.level;
  spellLevel.appendChild(spellLevelDef);
  
  const spellDescription = document.createElement('dt');
  spellDescription.className = 'spell-desc';
  spellDescription.textContent = 'Description:';
  const spellDescriptionDef = document.createElement('dd');
  spellDescriptionDef.textContent = spells.desc;
  spellDescription.appendChild(spellDescriptionDef);
  
  const spellHigherLvlDesc = document.createElement('dt');
  spellHigherLvlDesc.className = 'spell-highLvl';
  spellHigherLvlDesc.textContent = 'At Higher Level:';
  const higherLvlDef = document.createElement('dd');
  higherLvlDef.textContent = spells.higher_level;
  spellHigherLvlDesc.appendChild(higherLvlDef);
  
  const spellRange = document.createElement('dt');
  spellRange.className = 'spell-range';
  spellRange.textContent = 'Range:';
  const spellRangeDesc = document.createElement('dd');
  spellRangeDesc.textContent = spells.range;
  spellRange.appendChild(spellRangeDesc);
  
  
  
  
  spellDisplay.append(spellName, spellLevel, spellDescription, spellHigherLvlDesc, spellRange);
  
}