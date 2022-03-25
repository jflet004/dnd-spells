const spellForm = document.querySelector('#search-spell');

document.addEventListener('DOMContentLoaded', () => {

});


function createSpellCard(spells) {
  const spellDisplay = document.querySelector('#spell-card-display');
  const spellCard = document.createElement('dl');
  spellCard.className = 'spell-card';

  const spellName = document.createElement('dt');
  const spellLevel = document.createElement('dt');
  const spellDescription = document.createElement('dt');
  const spellHigherLevel = document.createElement('dt');
  const spellRange = document.createElement('dt');
  const spellComponents = document.createElement('dt');
  const spellRitual = document.createElement('dt');
  const spellDuration = document.createElement('dt');
  const spellConcentration = document.createElement('dt');
  const spellCastingTime = document.createElement('dt');
  const spellAttackType = document.createElement('dt');
  const spellDamageType = document.createElement('dt');
  const spellDmgAtSlotLvl = document.createElement('dt');

  
}