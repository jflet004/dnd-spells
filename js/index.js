const form = document.querySelector('#search-spell');
const input = document.querySelector('#search-box');

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', handleSubmit)
  input.addEventListener('keydown', handleKeyDown)
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
    .catch((error) => {
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

function createSpellCard(spells) {
  //Grabs and creates area where spell cards will be displayed
  const spellDisplay = document.querySelector('#spell-card-display');
  const spellCard = document.createElement('div');
  spellCard.className = 'spell-card';

  //Creates button to remove each spell card
  const delBtn = document.createElement('button');
  delBtn.className = 'xBtn';
  delBtn.textContent = 'x';
  delBtn.addEventListener('click', () => spellCard.remove());
  spellCard.appendChild(delBtn);

  
  //Spell card components
  const keys = Object.keys(spells);
  const dmg = 'damage';
  if(keys.includes(dmg)) {
    spellName(spells, spellCard);
    spellLevel(spells, spellCard);
    spellSchool(spells, spellCard)
    spellDescription(spells, spellCard);
    spellHigherLevel(spells, spellCard);
    spellRange(spells, spellCard);
    spellDuration(spells, spellCard);
    spellCastingTime(spells, spellCard);
    spellAttackType(spells, spellCard);
    spellDamageType(spells, spellCard);
    spellDamageAtSlotLevel(spells, spellCard);
    spellDamageAtCharacterLevel(spells, spellCard);
    spellDc(spells, spellCard);
    spellAreaOfEffect(spells, spellCard);
  } else {
    spellName(spells, spellCard);
    spellLevel(spells, spellCard);
    spellSchool(spells, spellCard)
    spellDescription(spells, spellCard);
    spellHigherLevel(spells, spellCard);
    spellHealLevel(spells, spellCard);
    spellRange(spells, spellCard);
    spellDuration(spells, spellCard);
    spellCastingTime(spells, spellCard);
    spellDc(spells, spellCard);
    spellAreaOfEffect(spells, spellCard);

  }
  //Appends delete button to cards and cards to DOM
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

//School
function spellSchool(spells, card) {
  const title = document.createElement('dt');
  title.className = 'spell-school';
  title.textContent = 'School:';
  const description = document.createElement('dd');
  description.textContent = spells.school.name;
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

//Heal at Slot Level
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

//Damage Type (name)
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

//Damage at Slot Level
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

//Damage at Character Level
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

//DC
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

//Area of Effect
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
}