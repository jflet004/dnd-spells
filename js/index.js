const spellForm = document.querySelector('#search-spell');
const inputBox = document.querySelector('#search-box');

document.addEventListener('DOMContentLoaded', () => {
  spellForm.addEventListener('submit', handleSubmit)
  inputBox.addEventListener('keydown', handleKeyDown)
});
function handleKeyDown(e) {
  const errorMsg = document.querySelector('#error-space');
  if(e.code === 'Space') {
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
    
    //Creates card section for name of Spell:
    const spellName = document.createElement('dt');
    spellName.className = 'spell-name';
    spellName.textContent = 'Spell:';
    const spellNameDef = document.createElement('dd');
    spellNameDef.textContent = spells.name;
    spellName.appendChild(spellNameDef);
    
     //Creates card section for Level: of spell
    const spellLevel = document.createElement('dt');
    spellLevel.className = 'spell-lvl';
    spellLevel.textContent = 'Level:';
    const spellLevelDef = document.createElement('dd');
    spellLevel.appendChild(spellLevelDef);
    
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
    
    //Creates spacing between cards
    const cardBreak = document.createElement('br');
    
    //Appends card to display and card info to card
    spellDisplay.appendChild(spellCard);
    spellCard.append(delBtn, spellName, spellLevel, spellDescription, spellHigherLvlDesc, spellRange, spellDuration, spellCastingTime, spellAttackType, spellDamageType, cardBreak);
    
  }




  // function spellCardObj(spells) {
    
  //   // const card = {
  //   //   Spell: spells.name,
  //   //   Level: spells.level,
  //   //   Description: spells.desc,
  //   //   HigherLevel: spells.higher_level,
  //   //   Range: spells.range,
  //   //   Duration: spells.duration,
  //   //   CastingTime: spells.casting_time,
  //   //   AttackType: spells.attack_type,
  //   //   DamageType: spells.damage.damage_type.name
  //   // }
  
  //   //Create and select area where spell cards will be displayed
    
  //   const spellDisplay = document.querySelector('#spell-card-display');
  //   const spellCard = document.createElement('div');
  //   spellCard.className = 'spell-card';
  //   spellDisplay.appendChild(spellCard);
  
  //   //Create delete button(x), add it to the card and add event listener to delete card
  //   const delBtn = document.createElement('button');
  //   delBtn.className = 'xBtn';
  //   delBtn.textContent = 'x';
  //   delBtn.addEventListener('click', () => spellCard.remove());
  //   spellCard.append(delBtn);
    
  //   //Iterate through the card's object keys, while adding its corresponding values according to the user's input; appending it to the dom once its done.
  //   for(let key in spells) {
  //     const spellKey = document.createElement('dt');
  //     spellKey.className = 'spell-key';
  //     spellKey.textContent = key;
      
  //     const spellValue = document.createElement('dd');
  //     spellValue.className = 'spell-value';
  //     spellValue.textContent = spells[key];
  
  //     spellCard.append(spellKey, spellValue);
  //   }
  // }