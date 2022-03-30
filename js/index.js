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

  //Spell card components
  spellName(spells, spellCard);
  spellLevel(spells, spellCard);
  spellDescription(spells, spellCard);
  spellHigherLevel(spells, spellCard);
  spellHealLevel(spells, spellCard);
  spellRange(spells, spellCard);
  spellDuration(spells, spellCard);
  spellCastingTime(spells, spellCard);
  spellAttackType(spells, spellCard);
  spellDamageType(spells, spellCard);
  spellDamageAtSlotLevel(spells, spellCard);
  spellDcType(spells, spellCard);
  // spellDcSuccess(spells, spellCard);
  // spellDamageAtCharacterLevel(spells, spellCard);
  // //Creates card section for the spell's Damage Type:
  // const spellDamageType = document.createElement('dt');
  // spellDamageType.className = 'damage-type';
  // if (spells.damage) {
  //   spellDamageType.textContent = 'Damage Type:';
  //   const damageTypeDesc = document.createElement('dd');
  //   damageTypeDesc.textContent = spells.damage.damage_type.name;
  //   spellDamageType.appendChild(damageTypeDesc);
  // }

  // //Creates card section for the spell's At Slot Level:
  // const spellAtSlotLevel = document.createElement('dt');
  // spellAtSlotLevel.className = 'spell-at-slotLevel';
  // if (spells.damage) {
  //   spellAtSlotLevel.textContent = 'Spell Level:';
  //   const spellLevelList = document.createElement('ul');
  //   spellLevelList.className = 'level-list'
  //   Object.keys(spells.damage.damage_at_slot_level).forEach(level => {
  //     const spellLevelItem = document.createElement('li');
  //     spellLevelItem.className = 'spell-levelItem'
  //     spellLevelItem.textContent = `${level}: ${spells.damage.damage_at_slot_level[level]}`;
  //     spellLevelList.appendChild(spellLevelItem);
  //   });
  //   spellAtSlotLevel.appendChild(spellLevelList);
  // }


  // //Creates spacing between cards
  const cardBreak = document.createElement('br');

  //Appends card to display and card info to card
  // spellCard.append(delBtn, spellName, spellLevel, spellDescription, spellHigherLvlDesc, spellRange, spellDuration, spellCastingTime, spellAttackType, spellDamageType, spellAtSlotLevel, cardBreak);
  spellCard.append(delBtn, cardBreak)
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

//Level
function spellLevel(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-level';
  title.textContent = 'Level:';
  const description = document.createElement('dd');
  description.textContent = spells.level;
  title.appendChild(description);
  card.append(title);
}

//Description
function spellDescription(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-description';
  title.textContent = 'Description:';
  const description = document.createElement('dd');
  description.textContent = spells.desc;
  title.appendChild(description);
  card.append(title);
}

//Higher Level
function spellHigherLevel(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-highLvl';
  if (spells.higher_level.length !== 0) {
    title.textContent = 'Higher Level:';
    const description = document.createElement('dd');
    description.textContent = spells.higher_level;
    title.appendChild(description);
    card.append(title);
  }
}

//Heal at Slot Level
function spellHealLevel(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-at-slotLevel'
  if (spells.heal_at_slot_level) {
    title.textContent = 'Heal at Slot Level: ';
    const list = document.createElement('ul');
    list.className = 'level-list'
    Object.entries(spells.heal_at_slot_level).forEach(element => {
      const level = document.createElement('li');
      level.className = 'spell-levelItem'
      level.textContent = `Lvl ${element[0]}: ${element[1]}`;
      list.appendChild(level);
      title.appendChild(list);
    });
    card.append(title);
  }
}

//Range
function spellRange(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-range';
  title.textContent = 'Range:';
  const description = document.createElement('dd');
  description.textContent = spells.range;
  title.appendChild(description);
  card.append(title);
}

//Duration
function spellDuration(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-duration';
  title.textContent = 'Duration:';
  const description = document.createElement('dd');
  description.textContent = spells.duration;
  title.appendChild(description);
  card.append(title);
}

//Casting Time
function spellCastingTime(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-castingTime';
  title.textContent = 'Casting Time:';
  const description = document.createElement('dd');
  description.textContent = spells.casting_time;
  title.appendChild(description);
  card.append(title);
}

//Attack Type
function spellAttackType(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-attackType';
  if (spells.attack_type) {
    title.textContent = 'Attack Type:';
    const description = document.createElement('dd');
    description.textContent = spells.attack_type;
    title.appendChild(description);
    card.append(title);
  }
}

//Damage Type (name)
function spellDamageType(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-dmgType';
  if (spells.damage) {
    title.textContent = 'Damage Type:';
    const description = document.createElement('dd');
    description.textContent = spells.damage.damage_type.name;
    title.appendChild(description);
  }
  card.append(title);
}

//Damage at Slot Level
function spellDamageAtSlotLevel(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-at-slotLevel'
  if (spells.damage) {
    title.textContent = 'Damage at Slot Level: ';
    const list = document.createElement('ul');
    list.className = 'level-list'
    Object.keys(spells.damage.damage_at_slot_level).forEach(element => {
      const level = document.createElement('li');
      level.className = 'spell-levelItem'
      level.textContent = `${element}: ${spells.damage.damage_at_slot_level[element]}`;
      list.appendChild(level);
      title.appendChild(list);
    });
    card.append(title);
  }
}

//Damage at Character Level
// function spellDamageAtCharacterLevel(spells, card) {
//   const title = document.createElement('dt');
//   title.className = 'damage-at-charLevel'
//   // if (spells.damage) {
//     title.textContent = 'Damage at Character Level: ';
//     const list = document.createElement('ul');
//     list.className = 'level-list'
//     Object.keys(spells.damage.damage_at_character_level).forEach(element => {
//       const level = document.createElement('li');
//       level.className = 'spell-levelItem'
//       level.textContent = `${element}: ${spells.damage.damage_at_character_level[element]}`;
//       list.appendChild(level);
//       title.appendChild(list);
//     });
//     card.append(title);
//   // }
// }


//DC
function spellDc(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-dcType';
  if (spells.dc) {
    title.textContent = 'DC:';
    const description = document.createElement('dd');
    description.textContent = `Type: ${spells.dc.dc_type.name}`;
    const description2 = document.createElement('dd');
    description2.textContent = `Success: ${spells.dc.dc_success}`;
    const description3 = document.createElement('dd');
    description3.textContent = `Notes: ${spells.dc.desc}`;
    title.appendChild(description);
    title.appendChild(description2);
    title.appendChild(description3);
  }
  card.append(title);
}

//Area of Effect(type, size)