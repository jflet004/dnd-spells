document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#search-spell');
  const input = document.querySelector('#search-box');

  const handleSubmit = e => {
    e.preventDefault();
    const spellNameInput = e.target[0].value.trim();
    fetch(`https://www.dnd5eapi.co/api/spells/${spellNameInput}`)
      .then(response => response.json())
      .then(spellData => {
        renderSpellCard(spellData)
      })
      .catch(() => noSpellErrorMsg());
    form.reset();
  }

  const handleKeyDown = e => {
    const errorMsg = document.querySelector('#error-space');
    if (e.code === 'Space') {
      errorMsg.style.display = 'block';
      setTimeout(() => errorMsg.style.display = 'none', 4000);
    }
  }

  form.addEventListener('submit', handleSubmit);
  input.addEventListener('keydown', handleKeyDown);
});


function noSpellErrorMsg() {
  const noSpell = document.querySelector('#error-spell');
  noSpell.style.display = 'block';
  setTimeout(() => noSpell.style.display = 'none', 4000);
}

function renderSpellCard(spell) {
  const cardDisplay = document.querySelector('#spell-card-display');
  const card = document.createElement('div');
  card.className = 'spell-card';

  const btnX = document.createElement('button');
  btnX.className = 'xBtn';
  btnX.textContent = 'x';
  btnX.addEventListener('click', () => card.remove());
  card.appendChild(btnX);

  const keys = Object.keys(spell);
  const dmg = 'damage';

  if (keys.includes(dmg)) {
    spellName(spell, card);
    spellLevel(spell, card);
    spellSchool(spell, card)
    spellDescription(spell, card);
    spellHigherLevel(spell, card);
    spellRange(spell, card);
    spellDuration(spell, card);
    spellCastingTime(spell, card);
    //- - - - - - - - - - - - - - - - - - 
    spellAttackType(spell, card);
    spellDamageType(spell, card);
    spellDamageAtSlotLevel(spell, card);
    spellDamageAtCharacterLevel(spell, card);
  } else {
    spellName(spell, card);
    spellLevel(spell, card);
    spellSchool(spell, card)
    spellDescription(spell, card);
    spellHigherLevel(spell, card);
    spellRange(spell, card);
    spellDuration(spell, card);
    spellCastingTime(spell, card);
    //- - - - - - - - - - - - - - - - - - 
    spellDc(spell, card);
    spellHealLevel(spell, card);
    spellAreaOfEffect(spell, card);
  }
  cardDisplay.appendChild(card);
}
// change spell to spell
function spellName(spell, card) {
  const title = document.createElement('dt');
  title.className = 'spell-name';
  title.textContent = 'Spell:';
  const description = document.createElement('dd');
  description.textContent = spell.name;
  title.appendChild(description);
  card.append(title);
}

function spellLevel(spell, card) {
  const title = document.createElement('dt');
  title.className = 'spell-level';
  title.textContent = 'Level:';
  const description = document.createElement('dd');
  description.textContent = spell.level;
  title.appendChild(description);
  card.append(title);
}

function spellSchool(spell, card) {
  const title = document.createElement('dt');
  title.className = 'spell-school';
  title.textContent = 'School:';
  const description = document.createElement('dd');
  description.textContent = spell.school.name;
  title.appendChild(description);
  card.append(title);
}

function spellDescription(spell, card) {
  const title = document.createElement('dt');
  title.className = 'spell-description';
  title.textContent = 'Description:';
  const description = document.createElement('dd');
  description.textContent = spell.desc;
  title.appendChild(description);
  card.append(title);
}

function spellHigherLevel(spell, card) {
  if (spell.higher_level.length !== 0) {
    const title = document.createElement('dt');
    title.className = 'spell-highLvl';
    title.textContent = 'Higher Level:';
    const description = document.createElement('dd');
    description.textContent = spell.higher_level;
    title.appendChild(description);
    card.append(title);
  }
}

function spellRange(spell, card) {
  const title = document.createElement('dt');
  title.className = 'spell-range';
  title.textContent = 'Range:';
  const description = document.createElement('dd');
  description.textContent = spell.range;
  title.appendChild(description);
  card.append(title);
}

function spellDuration(spell, card) {
  const title = document.createElement('dt');
  title.className = 'spell-duration';
  title.textContent = 'Duration:';
  const description = document.createElement('dd');
  description.textContent = spell.duration;
  title.appendChild(description);
  card.append(title);
}

function spellCastingTime(spell, card) {
  const title = document.createElement('dt');
  title.className = 'spell-castingTime';
  title.textContent = 'Casting Time:';
  const description = document.createElement('dd');
  description.textContent = spell.casting_time;
  title.appendChild(description);
  card.append(title);
}

function spellAttackType(spell, card) {
  if (spell.attack_type) {
    const title = document.createElement('dt');
    title.className = 'spell-attackType';
    title.textContent = 'Attack Type:';
    const description = document.createElement('dd');
    description.textContent = spell.attack_type;
    title.appendChild(description);
    card.append(title);
  }
}

function spellDamageType(spell, card) {
  if (spell.damage) {
    const title = document.createElement('dt');
    title.className = 'spell-dmgType';
    title.textContent = 'Damage Type:';
    const description = document.createElement('dd');
    description.textContent = spell.damage.damage_type.name;
    title.appendChild(description);
    card.append(title);
  }
}

function spellDamageAtSlotLevel(spell, card) {
  if (spell.damage.damage_at_slot_level) {
    const title = document.createElement('dt');
    title.className = 'spell-at-slotLevel';
    title.textContent = 'Damage at Slot Level: ';
    const list = document.createElement('ul');
    list.className = 'level-list'
    Object.keys(spell.damage.damage_at_slot_level).forEach(element => {
      const level = document.createElement('li');
      level.className = 'spell-levelItem'
      level.textContent = `Level ${element} --> ${spell.damage.damage_at_slot_level[element]}`;
      list.appendChild(level);
      title.appendChild(list);
      card.append(title);
    });
  }
}

function spellDamageAtCharacterLevel(spell, card) {
  if (spell.damage.damage_at_character_level) {
    const title = document.createElement('dt');
    title.className = 'spell-at-charLevel'
    title.textContent = 'Damage at Character Level: ';
    const list = document.createElement('ul');
    list.className = 'level-list'
    Object.keys(spell.damage.damage_at_character_level).forEach(element => {
      const level = document.createElement('li');
      level.className = 'spell-levelItem'
      level.textContent = `Level ${element} --> ${spell.damage.damage_at_character_level[element]}`;
      list.appendChild(level);
      title.appendChild(list);
      card.append(title);
    });
  }
}

function spellDc(spell, card) {
  if (spell.dc) {
    const title = document.createElement('dt');
    title.className = 'spell-dc';
    title.textContent = 'DC:';
    const description = document.createElement('dd');
    description.textContent = `Type: ${spell.dc.dc_type.name}`;
    const description2 = document.createElement('dd');
    description2.textContent = `Success: ${spell.dc.dc_success}`;
    const description3 = document.createElement('dd');
    description3.textContent = `Notes: ${spell.dc.desc}`;
    title.appendChild(description);
    title.appendChild(description2);
    title.appendChild(description3);
    card.append(title);
  }
}

function spellHealLevel(spell, card) {
  if (spell.heal_at_slot_level) {
    const title = document.createElement('dt');
    title.className = 'spell-at-slotLevel'
    title.textContent = 'Heal at Slot Level: ';
    const list = document.createElement('ul');
    list.className = 'level-list'
    Object.entries(spell.heal_at_slot_level).forEach(element => {
      const level = document.createElement('li');
      level.className = 'spell-levelItem'
      level.textContent = `Lvl ${element[0]} --> ${element[1]}`;
      list.appendChild(level);
      title.appendChild(list);
      card.append(title);
    });
  }
}

function spellAreaOfEffect(spell, card) {
  if (spell.area_of_effect) {
    const title = document.createElement('dt');
    title.className = 'spell-areaEffect';
    title.textContent = 'Area of Effect:';
    const description = document.createElement('dd');
    description.textContent = `Type: ${spell.area_of_effect.type}`;
    const description2 = document.createElement('dd');
    description2.textContent = `Size: ${spell.area_of_effect.size}`;
    title.appendChild(description);
    title.appendChild(description2);
    card.append(title);
  }
}

const x = () => "Hello"