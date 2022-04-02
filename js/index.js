const form = document.querySelector('#search-spell');
const input = document.querySelector('#search-box');

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', handleSubmit);
  input.addEventListener('keydown', handleKeyDown);
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
  const spellNameInput = e.target[0].value.trim();
  fetch(`https://www.dnd5eapi.co/api/spells/${spellNameInput}`)
    .then(response => response.json())
    .then(spellData => renderSpellCard(spellData))
    .catch(error => {
      console.log(error);
      noSpellErrorMsg();
    });
  form.reset();
}

function noSpellErrorMsg() {
  const noSpell = document.querySelector('#error-spell');
  noSpell.style.display = 'block';
  setTimeout(() => noSpell.style.display = 'none', 3000);
}

//Content to render spell cards to the screen
function renderSpellCard(spells) {
  const cardDisplay = document.querySelector('#spell-card-display');

  const card = document.createElement('div');
  card.className = 'spell-card';

  const btnX = document.createElement('button');
  btnX.className = 'xBtn';
  btnX.textContent = 'x';
  btnX.addEventListener('click', () => card.remove());
  card.appendChild(btnX);

  //Spell card sections
  const keys = Object.keys(spells);
  const dmg = 'damage';

  if (keys.includes(dmg)) {
    spellName(spells, card);
    spellLevel(spells, card);
    spellSchool(spells, card)
    spellDescription(spells, card);
    spellHigherLevel(spells, card);
    spellRange(spells, card);
    spellDuration(spells, card);
    spellCastingTime(spells, card);
    //- - - - - - - - - - - - - - - - - - 
    spellAttackType(spells, card);
    spellDamageType(spells, card);
    spellDamageAtSlotLevel(spells, card);
    spellDamageAtCharacterLevel(spells, card);
  } else {
    spellName(spells, card);
    spellLevel(spells, card);
    spellSchool(spells, card)
    spellDescription(spells, card);
    spellHigherLevel(spells, card);
    spellRange(spells, card);
    spellDuration(spells, card);
    spellCastingTime(spells, card);
    //- - - - - - - - - - - - - - - - - - 
    spellDc(spells, card);
    spellHealLevel(spells, card);
    spellAreaOfEffect(spells, card);
  }
  cardDisplay.appendChild(card);
}

//Functions to render sections into card

function spellName(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-name';
  title.textContent = 'Spell:';
  const description = document.createElement('dd');
  description.textContent = spells.name;
  title.appendChild(description);
  card.append(title);
}

function spellLevel(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-level';
  title.textContent = 'Level:';
  const description = document.createElement('dd');
  description.textContent = spells.level;
  title.appendChild(description);
  card.append(title);
}

function spellSchool(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-school';
  title.textContent = 'School:';
  const description = document.createElement('dd');
  description.textContent = spells.school.name;
  title.appendChild(description);
  card.append(title);
}

function spellDescription(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-description';
  title.textContent = 'Description:';
  const description = document.createElement('dd');
  description.textContent = spells.desc;
  title.appendChild(description);
  card.append(title);
}

function spellHigherLevel(spells, card) {
  if (spells.higher_level.length !== 0) {
    const title = document.createElement('dt');
    title.className = 'spell-highLvl';
    title.textContent = 'Higher Level:';
    const description = document.createElement('dd');
    description.textContent = spells.higher_level;
    title.appendChild(description);
    card.append(title);
  }
}

function spellRange(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-range';
  title.textContent = 'Range:';
  const description = document.createElement('dd');
  description.textContent = spells.range;
  title.appendChild(description);
  card.append(title);
}

function spellDuration(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-duration';
  title.textContent = 'Duration:';
  const description = document.createElement('dd');
  description.textContent = spells.duration;
  title.appendChild(description);
  card.append(title);
}

function spellCastingTime(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-castingTime';
  title.textContent = 'Casting Time:';
  const description = document.createElement('dd');
  description.textContent = spells.casting_time;
  title.appendChild(description);
  card.append(title);
}

function spellAttackType(spells, card) {
  if (spells.attack_type) {
    const title = document.createElement('dt');
    title.className = 'spell-attackType';
    title.textContent = 'Attack Type:';
    const description = document.createElement('dd');
    description.textContent = spells.attack_type;
    title.appendChild(description);
    card.append(title);
  }
}

function spellDamageType(spells, card) {
  if (spells.damage) {
    const title = document.createElement('dt');
    title.className = 'spell-dmgType';
    title.textContent = 'Damage Type:';
    const description = document.createElement('dd');
    description.textContent = spells.damage.damage_type.name;
    title.appendChild(description);
    card.append(title);
  }
}

function spellDamageAtSlotLevel(spells, card) {
  if (spells.damage.damage_at_slot_level) {
    const title = document.createElement('dt');
    title.className = 'spell-at-slotLevel';
    title.textContent = 'Damage at Slot Level: ';
    const list = document.createElement('ul');
    list.className = 'level-list'
    Object.keys(spells.damage.damage_at_slot_level).forEach(element => {
      const level = document.createElement('li');
      level.className = 'spell-levelItem'
      level.textContent = `Level ${element} --> ${spells.damage.damage_at_slot_level[element]}`;
      list.appendChild(level);
      title.appendChild(list);
      card.append(title);
    });
  }
}

function spellDamageAtCharacterLevel(spells, card) {
  if (spells.damage.damage_at_character_level) {
    const title = document.createElement('dt');
    title.className = 'spell-at-charLevel'
    title.textContent = 'Damage at Character Level: ';
    const list = document.createElement('ul');
    list.className = 'level-list'
    Object.keys(spells.damage.damage_at_character_level).forEach(element => {
      const level = document.createElement('li');
      level.className = 'spell-levelItem'
      level.textContent = `Level ${element} --> ${spells.damage.damage_at_character_level[element]}`;
      list.appendChild(level);
      title.appendChild(list);
      card.append(title);
    });
  }
}

function spellDc(spells, card) {
  if (spells.dc) {
    const title = document.createElement('dt');
    title.className = 'spell-dc';
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
    card.append(title);
  }
}

function spellHealLevel(spells, card) {
  if (spells.heal_at_slot_level) {
    const title = document.createElement('dt');
    title.className = 'spell-at-slotLevel'
    title.textContent = 'Heal at Slot Level: ';
    const list = document.createElement('ul');
    list.className = 'level-list'
    Object.entries(spells.heal_at_slot_level).forEach(element => {
      const level = document.createElement('li');
      level.className = 'spell-levelItem'
      level.textContent = `Lvl ${element[0]}: ${element[1]}`;
      list.appendChild(level);
      title.appendChild(list);
      card.append(title);
    });
  }
}

function spellAreaOfEffect(spells, card) {
  if (spells.area_of_effect) {
    const title = document.createElement('dt');
    title.className = 'spell-areaEffect';
    title.textContent = 'Area of Effect:';
    const description = document.createElement('dd');
    description.textContent = `Type: ${spells.area_of_effect.type}`;
    const description2 = document.createElement('dd');
    description2.textContent = `Size: ${spells.area_of_effect.size}`;
    title.appendChild(description);
    title.appendChild(description2);
    card.append(title);
  }

  // function renderSpell(spells, card, prop1) {
  //   const title = document.createElement('dt');
  //   title.className = `spell-${prop1}`;
  //   title.textContent = `${prop1}`.toUpperCase().replace('_', ' ');
  //   const description = document.createElement('dd');
  //   description.textContent = spells[prop1];
  //   title.appendChild(description);
  //   card.append(title);
  // }
}