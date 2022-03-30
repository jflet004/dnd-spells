const spellForm = document.querySelector('#search-spell');
const inputBox = document.querySelector('#search-box');

document.addEventListener('DOMContentLoaded', () => {
  spellForm.addEventListener('submit', handleSubmit)
  inputBox.addEventListener('keydown', handleKeyDown)
});
function handleKeyDown(e) {
  const errorMsg = document.querySelector('#error-space');
  if (e.code === 'Space') {
    errorMsg.style.display = 'block';
    setTimeout(() => errorMsg.style.display = 'none', 5000);
  }
}
function handleSubmit(e) {
  e.preventDefault();
  const spellNameInput = e.target[0].value;
  fetch(`https://www.dnd5eapi.co/api/spells/${spellNameInput}`)
    .then(response => response.json())
    .then(spellData => createSpellCard(spellData))
    .catch(() => missingSpell())
  spellForm.reset();
}

function missingSpell() {
  const noSpell = document.querySelector('#error-spell');
  noSpell.style.display = 'block';
  setTimeout(() => noSpell.style.display = 'none', 3000);
}
function createSpellCard(spells) {
  //Grabs and creates area where spell cards will be displayed
  const spellDisplay = document.querySelector('#spell-card-display');
  const spellCard = document.createElement('div');
  spellCard.className = 'spell-card';

  //Creates button to remove spell card
  const delBtn = document.createElement('button');
  delBtn.className = 'xBtn';
  delBtn.textContent = 'x';
  delBtn.addEventListener('click', () => spellCard.remove());


  spellName(spells, spellCard);
  spellLevel(spells, spellCard);



  //Creates card section for spell Description:
  const spellDescription = document.createElement('dt');
  spellDescription.className = 'spell-desc';
  spellDescription.textContent = 'Description:';
  const spellDescriptionDef = document.createElement('dd');
  spellDescriptionDef.textContent = spells.desc;
  spellDescription.appendChild(spellDescriptionDef);

  //Creates card section for description of Higher Level: of spell:
  const spellHigherLvlDesc = document.createElement('dt');
  spellHigherLvlDesc.className = 'spell-highLvl';
  if (spells.higher_level.length !== 0) {
    spellHigherLvlDesc.textContent = 'At Higher Level:';
    const higherLvlDef = document.createElement('dd');
    higherLvlDef.textContent = spells.higher_level;
    spellHigherLvlDesc.appendChild(higherLvlDef);
  }

  //Creates card section for Range: of spell
  const spellRange = document.createElement('dt');
  spellRange.className = 'spell-range';
  spellRange.textContent = 'Range:';
  const spellRangeDesc = document.createElement('dd');
  spellRangeDesc.textContent = spells.range;
  spellRange.appendChild(spellRangeDesc);

  //Creates card section for Duration: of spell:
  const spellDuration = document.createElement('dt');
  spellDuration.className = 'duration';
  spellDuration.textContent = 'Duration:';
  const durationDesc = document.createElement('dd');
  durationDesc.textContent = spells.duration;
  spellDuration.appendChild(durationDesc);

  //Creates card section for the spell's Casting Time:
  const spellCastingTime = document.createElement('dt');
  spellCastingTime.className = 'casting';
  spellCastingTime.textContent = 'Casting Time:';
  const castingTimeDesc = document.createElement('dd');
  castingTimeDesc.textContent = spells.casting_time;
  spellCastingTime.appendChild(castingTimeDesc);

  //Creates card section for the spell's Attack Type:
  const spellAttackType = document.createElement('dt');
  spellAttackType.className = 'attack-type';
  if (spells.attack_type) {
    spellAttackType.textContent = 'Attack Type:';
    const attackTypeDesc = document.createElement('dd');
    attackTypeDesc.textContent = spells.attack_type;
    spellAttackType.appendChild(attackTypeDesc);
  }

  //Creates card section for the spell's Damage Type:
  const spellDamageType = document.createElement('dt');
  spellDamageType.className = 'damage-type';
  if (spells.damage) {
    spellDamageType.textContent = 'Damage Type:';
    const damageTypeDesc = document.createElement('dd');
    damageTypeDesc.textContent = spells.damage.damage_type.name;
    spellDamageType.appendChild(damageTypeDesc);
  }

  //Creates card section for the spell's At Slot Level:
  const spellAtSlotLevel = document.createElement('dt');
  spellAtSlotLevel.className = 'spell-at-slotLevel';
  if (spells.damage) {
    spellAtSlotLevel.textContent = 'Spell Level:';
    const spellLevelList = document.createElement('ul');
    spellLevelList.className = 'level-list'
    Object.keys(spells.damage.damage_at_slot_level).forEach(level => {
      const spellLevelItem = document.createElement('li');
      spellLevelItem.className = 'spell-levelItem'
      spellLevelItem.textContent = `${level}: ${spells.damage.damage_at_slot_level[level]}`;
      spellLevelList.appendChild(spellLevelItem);
    });
    spellAtSlotLevel.appendChild(spellLevelList);
  }


  //Creates spacing between cards
  const cardBreak = document.createElement('br');

  //Appends card to display and card info to card
  // spellCard.append(delBtn, spellName, spellLevel, spellDescription, spellHigherLvlDesc, spellRange, spellDuration, spellCastingTime, spellAttackType, spellDamageType, spellAtSlotLevel, cardBreak);
  spellDisplay.appendChild(spellCard);

}


//Name
function spellName(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-name';
  title.textContent = 'Spell:';
  const description = document.createElement('dd');
  description.textContent = spells.name;
  title.appendChild(description);
  card.append(title);
}



//Higher Level
//Heal at Slot Level
//Range
//Components
//Material
//Duration
//Casting Time
//Attack Type
//Damage Type (name)
//Damage at Slot Level
//Damage at Character Level
//DC Type(name)
//DC Success
//DC desc


