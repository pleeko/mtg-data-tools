const tcgPlayerPlaceholder = 
`TOTAL: 9 cards - $8.53
1 Fissure [DRK]
1 Durkwood Boars [LEG]
1 Barbary Apes [LEG]
1 Alabaster Potion [LEG]
1 Syphon Soul [LEG]
1 The Brute [LEG]
1 Vampire Bats [LEG]
1 Flash Flood [CHR]
1 Wall of Earth [LEG]`;

const basicListPlaceholder = 
`Mountain (A) 27
Mountain (B) 29
Mountain (C) 29
Simulacrum x2
12X Evil Presence 
Sengir Vampire x1
Bog Wraith x1`;

const deckBoxPlaceholder = 'Paste csv export';

export const inputPlaceholders ={
  tcg: tcgPlayerPlaceholder,
  basicList: basicListPlaceholder,
  deckBox: deckBoxPlaceholder
}

export const description = `This tool was created to make the process of magic card inventory management easier. I Found the process of adding cards scanned in from the TCG Player app to my Deckbox account to be quite tedious.`;
export const howTo = `Simply paste in your card list data and select the appropriate output format. If you have any suggestions or wish to have more output or input formats supported please open an issue on the github project.`;