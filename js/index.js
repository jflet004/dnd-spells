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
    .catch(error => console.log(error))

  spellForm.reset();
}

function createSpellCard(spells) {
  const spellDisplay = document.querySelector('#spell-card-display');
  const spellCard = document.createElement('div');
  spellCard.className = 'spell-card';

  const delBtn = document.createElement('button');
  delBtn.className = 'xBtn';
  delBtn.textContent = 'x';

  delBtn.addEventListener('click', () => spellCard.remove());

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
  if (spells.level === 0) {
    spellLevelDef.textContent = 'Cantrip';
    spellLevel.appendChild(spellLevelDef);
  } else {
    spellLevelDef.textContent = spells.level;
    spellLevel.appendChild(spellLevelDef);
  }

  const spellDescription = document.createElement('dt');
  spellDescription.className = 'spell-desc';
  spellDescription.textContent = 'Description:';
  const spellDescriptionDef = document.createElement('dd');
  spellDescriptionDef.textContent = spells.desc;
  spellDescription.appendChild(spellDescriptionDef);

  const spellHigherLvlDesc = document.createElement('dt');
  spellHigherLvlDesc.className = 'spell-highLvl';
  if (spells.higher_level.length !== 0) {
    spellHigherLvlDesc.textContent = 'At Higher Level:';
    const higherLvlDef = document.createElement('dd');
    higherLvlDef.textContent = spells.higher_level;
    spellHigherLvlDesc.appendChild(higherLvlDef);
  } else {
    spellHigherLvlDesc.remove();
  }

  const spellRange = document.createElement('dt');
  spellRange.className = 'spell-range';
  spellRange.textContent = 'Range:';
  const spellRangeDesc = document.createElement('dd');
  spellRangeDesc.textContent = spells.range;
  spellRange.appendChild(spellRangeDesc);

  const spellRitual = document.createElement('dt');
  spellRitual.className = 'ritual';
  spellRitual.textContent = 'Ritual:';
  const ritualDesc = document.createElement('dd');
  ritualDesc.textContent = spells.ritual;
  spellRitual.appendChild(ritualDesc);

  const spellDuration = document.createElement('dt');
  spellDuration.className = 'duration';
  spellDuration.textContent = 'Duration:';
  const durationDesc = document.createElement('dd');
  durationDesc.textContent = spells.duration;
  spellDuration.appendChild(durationDesc);

  const spellConcentration = document.createElement('dt');
  spellConcentration.className = 'concentration';
  spellConcentration.textContent = 'Concentration:';
  const concentrationDesc = document.createElement('dd');
  concentrationDesc.textContent = spells.concentration;
  spellConcentration.appendChild(concentrationDesc);

  const spellCastingTime = document.createElement('dt');
  spellCastingTime.className = 'casting';
  spellCastingTime.textContent = 'Casting Time:';
  const castingTimeDesc = document.createElement('dd');
  castingTimeDesc.textContent = spells.casting_time;
  spellCastingTime.appendChild(castingTimeDesc);

  const spellAttackType = document.createElement('dt');
  spellAttackType.className = 'attack-type';
  if (spells.attack_type) {
    spellAttackType.textContent = 'Attack Type:';
    const attackTypeDesc = document.createElement('dd');
    attackTypeDesc.textContent = spells.attack_type;
    spellAttackType.appendChild(attackTypeDesc);
  } else {
    spellAttackType.remove();
  }

  const spellDamageType = document.createElement('dt');
  spellDamageType.className = 'damage-type';
  if (spells.damage) {
    spellDamageType.textContent = 'Damage Type:';
    const damageTypeDesc = document.createElement('dd');
    damageTypeDesc.textContent = spells.damage.damage_type.name;
    spellDamageType.appendChild(damageTypeDesc);
  } else {
    spellDamageType.remove();
  }

  const cardBreak = document.createElement('br');

  spellDisplay.appendChild(spellCard);
  spellCard.append(delBtn, spellName, spellLevel, spellDescription, spellHigherLvlDesc, spellRange, spellRitual, spellDuration, spellConcentration, spellCastingTime, spellAttackType, spellDamageType, cardBreak);

}