// WonderWheel topic data.
//
// Each topic:
//   id      unique id (letter for category + number)
//   cat     category key (must match a key in CATS; "n" is an optional display name)
//   word    the featured mystery word (6-8 capital letters)
//   wiki    Wikipedia article title used to load the photo
//   clue    short clue for the featured word
//   summary fallback summary if Wikipedia can't be reached
//   facts   four "Did you know?" facts
//   quiz    one question; the FIRST option is the right answer
//           (the game shuffles the options before showing them)
//   words   smaller words spelled from the featured word's letters, with clues
//
// Run `node tests/run-tests.js` after editing to check every word can be
// spelled from its featured word.

var CATS = {
  Animals:    { e: "🐾", c: "#256d5b", s: "rgba(37,109,91,.15)" },
  Geography:  { e: "🌍", c: "#2563eb", s: "rgba(37,99,235,.15)" },
  History:    { e: "🏛️", c: "#c2621a", s: "rgba(194,98,26,.15)" },
  Space:      { e: "🚀", c: "#4f46e5", s: "rgba(79,70,229,.15)" },
  Food:       { e: "🍰", c: "#be123c", s: "rgba(190,18,60,.13)" },
  Nature:     { e: "🌿", c: "#4d7c0f", s: "rgba(77,124,15,.15)" },
  Music:      { e: "🎨", c: "#a21caf", s: "rgba(162,28,175,.13)", n: "Music & Art" },
  Inventions: { e: "💡", c: "#0e7490", s: "rgba(14,116,144,.15)" }
};

var PUZZLES = [
  // ───────────── Animals ─────────────
  { id: "a1", cat: "Animals", word: "PLATYPUS", wiki: "Platypus",
    clue: "Egg-laying Australian mammal with a duck-like bill.",
    summary: "The platypus is a semiaquatic, egg-laying mammal native to eastern Australia, famous for its duck-like bill and webbed feet.",
    facts: [
      "It hunts underwater with its eyes, ears and nostrils shut, sensing the tiny electric signals given off by its prey.",
      "Males have venomous spurs on their back legs.",
      "It is one of only five kinds of mammal alive today that lay eggs. The other four are echidnas.",
      "Under ultraviolet light, platypus fur glows a blue-green color."
    ],
    quiz: { q: "How does a platypus find food underwater?", options: ["By sensing electric signals", "By smell", "By sight"] },
    words: [["LAY","A platypus is a mammal that does this with eggs"],["SALT","Platypuses live in fresh water, not ___ water"],["STAY","Platypus eggs ___ snug in the mother's burrow"],["SPY","Its eyes shut underwater, so it can't ___ its prey"],["PLAY","Have fun"]] },

  { id: "a2", cat: "Animals", word: "DOLPHIN", wiki: "Dolphin",
    clue: "Smart ocean mammal that leaps and uses clicks to navigate.",
    summary: "Dolphins are highly social, mostly marine mammals that communicate with whistles and navigate with echolocation.",
    facts: [
      "They sleep with half their brain at a time, so they can keep surfacing to breathe.",
      "Each bottlenose dolphin develops its own signature whistle, a bit like a name.",
      "They find food by echolocation: sending out clicks and listening for the echoes.",
      "The orca, or killer whale, is the largest member of the dolphin family."
    ],
    quiz: { q: "What is the largest member of the dolphin family?", options: ["The orca", "The blue whale", "The narwhal"] },
    words: [["POD","A family group of dolphins"],["HOLD","Dolphins ___ their breath when they dive"],["NOD","Dolphins ___ off with only half the brain at a time"],["LION","Sea ___, another ocean mammal like the dolphin"],["DIP","Dolphins leap up and ___ back into the waves"]] },

  { id: "a3", cat: "Animals", word: "GIRAFFE", wiki: "Giraffe",
    clue: "Tallest land animal, reaching treetops with a spotted neck.",
    summary: "Giraffes are tall African mammals and the tallest living land animals on Earth.",
    facts: [
      "A giraffe has seven neck bones, the same number as a person.",
      "Its dark tongue can be about 18 inches long.",
      "A giraffe's heart can weigh about 25 pounds.",
      "A newborn giraffe drops about 6 feet to the ground when it is born."
    ],
    quiz: { q: "How many neck bones does a giraffe have?", options: ["Seven", "Fourteen", "Twenty-six"] },
    words: [["AIR","A newborn giraffe drops through the ___ to the ground"],["FAR","From way up high, a giraffe's sharp eyes see ___"],["EAR","What you hear with"],["FIG","Fruit in a Newton cookie"],["FAIR","Just, or a carnival"],["GEAR","Equipment"]] },

  { id: "a4", cat: "Animals", word: "PENGUIN", wiki: "Penguin",
    clue: "Tuxedo-patterned flightless bird built for icy seas.",
    summary: "Penguins are aquatic flightless birds living almost exclusively in the Southern Hemisphere.",
    facts: [
      "Emperor penguins can hold their breath for more than 20 minutes.",
      "Some penguins, like the gentoo, court a mate by offering a smooth pebble.",
      "Emperor penguin fathers keep the egg warm on their feet for about two months of the Antarctic winter.",
      "Only the Galápagos penguin lives partly north of the equator."
    ],
    quiz: { q: "Which emperor penguin parent keeps the egg warm through winter?", options: ["The father", "The mother", "Neither"] },
    words: [["NUN","She may wear black and white, like a penguin"],["PEN","Writing tool"],["PINE","Evergreen tree"],["NINE","After eight"],["UNPIN","Remove a fastener"]] },

  { id: "a5", cat: "Animals", word: "CHEETAH", wiki: "Cheetah",
    clue: "Fastest land animal on Earth, sprinting at about 60 mph.",
    summary: "The cheetah is a large cat native to Africa and Iran, renowned as the fastest land mammal.",
    facts: [
      "The dark 'tear marks' on its face are thought to cut down glare from the sun.",
      "Cheetahs can't roar. They purr, and they chirp like birds.",
      "Unlike most big cats, cheetahs hunt mostly during the day.",
      "Its long tail works like a rudder to help it turn at high speed."
    ],
    quiz: { q: "Which sound can a cheetah NOT make?", options: ["A roar", "A purr", "A chirp"] },
    words: [["CAT","A cheetah is a large wild one of these"],["ACE","An ___ sprinter, the fastest land mammal"],["EAT","Cheetahs ___ fast, before lions or hyenas steal food"],["HEAT","Cheetahs often hunt in cool hours, dodging midday ___"],["TEACH","Cheetah moms ___ their cubs how to hunt"]] },

  { id: "a6", cat: "Animals", word: "OCTOPUS", wiki: "Octopus",
    clue: "Clever eight-armed sea creature that changes color.",
    summary: "Octopuses are soft-bodied eight-limbed mollusks known for problem-solving and camouflage.",
    facts: [
      "An octopus has three hearts and blue blood.",
      "About two-thirds of its nerve cells are in its arms.",
      "It can squirt a cloud of ink to escape a predator.",
      "Most octopuses live only a year or two."
    ],
    quiz: { q: "How many hearts does an octopus have?", options: ["Three", "One", "Eight"] },
    words: [["CUPS","The suckers on its arms work like suction ___"],["OUT","A squirt of ink helps it get ___ of trouble"],["SPOT","Hard to ___ when it changes color to hide"],["POT","Fishers set clay ___s, since octopuses hide in them"],["SCOUT","Explore ahead"]] },

  { id: "a7", cat: "Animals", word: "GAZELLE", wiki: "Gazelle",
    clue: "Graceful, swift antelope famous for high leaps.",
    summary: "Gazelles are swift antelopes found across dry grasslands in Africa and Asia.",
    facts: [
      "When a predator is near, gazelles bound high into the air, perhaps to show they are too fit to be worth chasing.",
      "Thomson's gazelles can run at about 50 mph.",
      "Many gazelles can go a long time without drinking, getting water from the plants they eat.",
      "Gazelles are a favorite prey of cheetahs."
    ],
    quiz: { q: "Which big cat often hunts gazelles?", options: ["The cheetah", "The jaguar", "The cougar"] },
    words: [["LEG","A gazelle's long, slim running limb"],["GAZE","Gazelles keep a watchful ___ out for cheetahs"],["EAGLE","Big bird of prey"],["GALE","Strong wind"],["GLAZE","Shiny coating"]] },

  { id: "a8", cat: "Animals", word: "FLAMINGO", wiki: "Flamingo",
    clue: "Tall pink wading bird that balances on one leg.",
    summary: "Flamingos are wading birds known for long slender legs, curved bills, and pink plumage.",
    facts: [
      "Flamingos are born gray and turn pink from pigments in the shrimp and algae they eat.",
      "A group of flamingos is called a 'flamboyance.'",
      "Standing on one leg may help them save body heat.",
      "They eat with their heads upside down, filtering food out of the water."
    ],
    quiz: { q: "What turns flamingos pink?", options: ["Pigments in their food", "Sunlight", "Cold water"] },
    words: [["LONG","Flamingo legs are very ___ and thin"],["GAIN","Flamingos ___ their pink from shrimp and algae"],["MANGO","Sweet tropical fruit"],["GOAL","Aim or score"],["FOAM","Frothy bubbles"],["LOAF","Baked bread"]] },

  { id: "a9", cat: "Animals", word: "PELICAN", wiki: "Pelican",
    clue: "Big water bird with a stretchy pouch under its bill.",
    summary: "Pelicans are large water birds with a long bill and a big throat pouch used to scoop up fish.",
    facts: [
      "A pelican's throat pouch can hold about three gallons of water.",
      "Brown pelicans dive headfirst from the air to catch fish.",
      "After a catch, a pelican tips its bill to drain the water before swallowing.",
      "Pelican fossils about 30 million years old have been found in France."
    ],
    quiz: { q: "What does a pelican use its throat pouch for?", options: ["Scooping up fish", "Storing eggs", "Keeping warm"] },
    words: [["CAN","A pelican's big pouch ___ hold gallons of water"],["PLANE","It flies from an airport"],["PENCIL","Writing stick"],["PLACE","Spot or location"],["CLEAN","Not dirty"],["LANE","Narrow road"]] },

  { id: "a10", cat: "Animals", word: "MEERKAT", wiki: "Meerkat",
    clue: "Small African mongoose that stands upright on lookout duty.",
    summary: "The meerkat is a small mongoose from southern Africa that lives in family groups called mobs.",
    facts: [
      "A family group of meerkats is called a mob, gang or clan.",
      "One meerkat often stands guard and gives an alarm call when danger is near.",
      "Dark patches around their eyes are thought to cut the sun's glare.",
      "Meerkats eat scorpions and are partly resistant to their venom."
    ],
    quiz: { q: "What is a family group of meerkats called?", options: ["A mob", "A flock", "A pod"] },
    words: [["TEAM","A meerkat mob works as a ___ to stay safe"],["EAT","Meerkats even ___ scorpions"],["TAKE","Meerkats ___ turns standing guard"],["TREE","A guard meerkat may perch on a ___ branch"],["MARKET","Place to shop"]] },

  { id: "a11", cat: "Animals", word: "TORTOISE", wiki: "Tortoise",
    clue: "Slow land reptile that carries a domed shell.",
    summary: "Tortoises are land-dwelling reptiles with heavy, domed shells; some live well over 100 years.",
    facts: [
      "Jonathan, a giant tortoise on the island of St Helena, is thought to be the oldest living land animal.",
      "A tortoise's shell is part of its skeleton, so it can never crawl out of it.",
      "Galápagos tortoises can weigh more than 500 pounds.",
      "The Galápagos Islands are named after them: 'galápago' is an old Spanish word for tortoise."
    ],
    quiz: { q: "Can a tortoise climb out of its shell?", options: ["No, it's part of its skeleton", "Yes, when it grows", "Only when it sleeps"] },
    words: [["REST","In the fable, the hare stopped to ___ and the tortoise won"],["TOTE","A tortoise seems to ___ its home on its back"],["OTTER","Playful river swimmer"],["ROOT","Plant's anchor"],["STORE","Desert tortoises ___ water in their bladders for dry spells"],["TRIO","Group of three"]] },

  { id: "a12", cat: "Animals", word: "SEAHORSE", wiki: "Seahorse",
    clue: "Tiny fish with a horse-shaped head and curly tail.",
    summary: "Seahorses are small marine fish that swim upright and cling to sea grass with their curling tails.",
    facts: [
      "In seahorses, the father carries the eggs in a pouch and gives birth.",
      "Each eye can move on its own, so a seahorse can look two ways at once.",
      "They are slow swimmers and hold on to plants with their tails.",
      "Seahorses have no stomach, so they eat almost all the time."
    ],
    quiz: { q: "Which seahorse parent gives birth?", options: ["The father", "The mother", "Both"] },
    words: [["HORSE","Its head is shaped a bit like this animal's"],["SHE","In seahorses, he carries the eggs, not ___"],["SEE","Each eye moves alone, to ___ two ways at once"],["SHORE","Seahorses live in shallow water near the ___"],["SHARE","Split with others"]] },

  // ───────────── Geography ─────────────
  { id: "g1", cat: "Geography", word: "EVEREST", wiki: "Mount Everest",
    clue: "Earth's highest mountain above sea level.",
    summary: "Mount Everest sits on the Nepal–China border in the Himalayas, rising 29,031.7 feet.",
    facts: [
      "It is called Sagarmatha in Nepal and Chomolungma in Tibet.",
      "Moving tectonic plates still push it a tiny bit higher each year.",
      "Edmund Hillary and Tenzing Norgay made the first confirmed climb to the top, in 1953.",
      "The rock at its summit holds fossils of sea creatures from an ancient ocean floor."
    ],
    quiz: { q: "Who first reached the top of Everest in 1953?", options: ["Hillary and Tenzing", "Lewis and Clark", "Amundsen and Scott"] },
    words: [["SET","Hillary and Tenzing first ___ foot on top in 1953"],["REST","Climbers stop to do this at camps on the way up"],["SEE","What climbers hope to do from the top on a clear day"],["VEST","Warm layer a climber might wear"],["TREES","None grow on the mountain's icy upper slopes"],["SEVERE","Like the cold and wind near the summit"]] },

  { id: "g2", cat: "Geography", word: "TUNDRA", wiki: "Tundra",
    clue: "Treeless polar land with frozen ground year-round.",
    summary: "The tundra is a cold, treeless biome in the Arctic and on high mountains; in the Arctic its subsoil stays frozen all year.",
    facts: [
      "In the Arctic summer the sun shines nearly 24 hours a day, sparking wildflowers.",
      "The word comes from a Sámi word meaning 'treeless upland.'",
      "Caribou, Arctic foxes and snowy owls live on the Arctic tundra.",
      "The growing season there lasts only about 50 to 60 days."
    ],
    quiz: { q: "What does 'tundra' mean?", options: ["Treeless upland", "Frozen sea", "Windy plain"] },
    words: [["RUN","Caribou herds do this across the tundra"],["DART","Arctic foxes do this before pouncing on lemmings"],["TURN","Tundra plants ___ red and yellow in the fall"],["DAUNT","Icy tundra winds could ___ even a brave traveler"],["AUNT","Your mother's or father's sister"]] },

  { id: "g3", cat: "Geography", word: "ICELAND", wiki: "Iceland",
    clue: "Nordic island of glaciers, geysers, and volcanoes.",
    summary: "Iceland is a volcanic island in the North Atlantic famed for glaciers and geothermal energy.",
    facts: [
      "About 9 in 10 homes are heated by natural hot water from underground.",
      "Iceland had no mosquitoes until a few were first found there in October 2025.",
      "Its parliament, the Althing, was founded in 930 and is one of the oldest in the world.",
      "The island sits on the Mid-Atlantic Ridge, where two tectonic plates pull apart."
    ],
    quiz: { q: "Which animal has no wild population in Iceland?", options: ["Snakes", "Arctic foxes", "Puffins"] },
    words: [["ICE","Iceland's glaciers are made of it"],["LAND","Dry ground, not sea"],["LINE","The Arctic Circle ___ runs across its island Grimsey"],["CLEAN","Hot water from underground gives Iceland ___ energy"],["CANDLE","A Yule Lad of this land loves to steal one"]] },

  { id: "g4", cat: "Geography", word: "VOLCANO", wiki: "Volcano",
    clue: "Opening in Earth's crust where lava and ash erupt.",
    summary: "A volcano is a rupture in Earth's crust that lets hot magma, ash, and gases escape.",
    facts: [
      "About three-quarters of the world's active volcanoes ring the Pacific Ocean, along the 'Ring of Fire.'",
      "Volcanic ash breaks down into very fertile farmland.",
      "The word comes from Vulcan, the Roman god of fire.",
      "Mauna Loa in Hawaii is the largest active volcano on Earth."
    ],
    quiz: { q: "Where is the 'Ring of Fire'?", options: ["Around the Pacific Ocean", "Across Africa", "Around the North Pole"] },
    words: [["COOL","What lava does as it hardens into rock"],["COAL","Black fuel; red-hot lava glows a bit like it"],["CAN","Tin container"],["OVAL","Egg shape"],["CLAN","Family group"],["VOCAL","Spoken aloud"]] },

  { id: "g5", cat: "Geography", word: "GLACIER", wiki: "Glacier",
    clue: "Slow-moving river of dense, ancient compressed ice.",
    summary: "Glaciers are massive bodies of dense ice that flow slowly downhill and carve out valleys.",
    facts: [
      "Glaciers and ice caps hold about two-thirds of Earth's fresh water.",
      "Thick glacier ice looks blue because it soaks up red light.",
      "Glaciers cover about 10 percent of Earth's land.",
      "A glacier forms where more snow falls each winter than melts each summer."
    ],
    quiz: { q: "About how much of Earth's fresh water is frozen in glaciers and ice caps?", options: ["About two-thirds", "About a tenth", "Almost none"] },
    words: [["ICE","A glacier is a huge, slow-moving mass of it"],["AGE","Ice ___: a time when glaciers spread far and wide"],["GEAR","Crampons and ice axes are glacier hiking ___"],["RACE","Glaciers would lose one; they creep slowly"],["GLARE","Bright sunlight bouncing off glacier ice"],["LARGE","Big, like the ice sheet covering Antarctica"]] },

  { id: "g6", cat: "Geography", word: "VENICE", wiki: "Venice",
    clue: "Italian city of 100+ islands linked by canals and gondolas.",
    summary: "Venice is a historic Italian lagoon city famous for winding canals and arched bridges.",
    facts: [
      "More than 400 bridges connect its more than 100 small islands.",
      "Its buildings stand on millions of wooden piles driven into the mud centuries ago.",
      "There are no cars in the old city; people get around by boat and on foot.",
      "High tides called 'acqua alta' sometimes flood St. Mark's Square."
    ],
    quiz: { q: "How do people get around Venice's old city?", options: ["By boat and on foot", "By subway", "By car"] },
    words: [["VIE","Rowers do this in Venice's historic regatta"],["VEIN","Venice's canals run through it like these"],["VINE","Grape plant, grown in Venice's home region"],["NICE","Pleasant; kind"],["NIECE","Your brother's or sister's daughter"]] },

  { id: "g7", cat: "Geography", word: "NIAGARA", wiki: "Niagara Falls",
    clue: "Three thundering waterfalls between Ontario and New York.",
    summary: "Niagara Falls is a group of three large waterfalls on the Niagara River, on the border of Canada and the US.",
    facts: [
      "At high flow, about six million cubic feet of water go over the falls every minute.",
      "The falls make clean hydroelectric power for millions of people.",
      "In 1901, 63-year-old schoolteacher Annie Edson Taylor became the first person to go over in a barrel and survive.",
      "The falls formed as glaciers melted at the end of the last ice age."
    ],
    quiz: { q: "Who first survived going over Niagara Falls in a barrel?", options: ["A schoolteacher", "A firefighter", "A sailor"] },
    words: [["AIR","Spray from the falls fills it with mist"],["RAN","The river ___ over cliffs to make the falls"],["RAIN","Mist from the falls can soak you like this"],["AGAIN","Annie Taylor warned no one should try it ___"],["GRAIN","Wheat or oats"]] },

  { id: "g8", cat: "Geography", word: "CANYON", wiki: "Canyon",
    clue: "Deep steep-walled gorge carved by a river over ages.",
    summary: "A canyon is a deep gorge between cliffs, often carved by a river over millions of years.",
    facts: [
      "The rock walls of the Grand Canyon show nearly two billion years of Earth's history.",
      "The bottom of the Grand Canyon can be about 20°F warmer than the rim.",
      "The Grand Canyon is about 277 miles long and more than a mile deep.",
      "The Colorado River carved the Grand Canyon."
    ],
    quiz: { q: "Which river carved the Grand Canyon?", options: ["The Colorado", "The Mississippi", "The Rio Grande"] },
    words: [["YON","Over there, like a canyon's far rim"],["CAN","Tin container"],["CYAN","Greenish-blue, like Havasu Falls in the Grand Canyon"],["CANON","Church rule; sounds like the Spanish word for canyon"],["ANNOY","Bother mildly"]] },

  { id: "g9", cat: "Geography", word: "ATLANTIC", wiki: "Atlantic Ocean",
    clue: "Second-largest ocean, between the Americas and Europe and Africa.",
    summary: "The Atlantic Ocean is the world's second-largest ocean, separating the Americas from Europe and Africa.",
    facts: [
      "It covers about one-fifth of Earth's surface.",
      "An underwater mountain range, the Mid-Atlantic Ridge, runs down its middle.",
      "The Atlantic grows a few centimeters wider every year.",
      "Its name comes from Atlas, a Titan of Greek myth."
    ],
    quiz: { q: "Which mountain range runs down the middle of the Atlantic?", options: ["The Mid-Atlantic Ridge", "The Andes", "The Alps"] },
    words: [["TAN","What the sun gives you on an Atlantic beach"],["LIT","Like lighthouses guiding ships along its coasts"],["TAIL","Humpback whales lift this out of Atlantic waters"],["CANAL","The Panama ___ links the Atlantic and Pacific"],["TITAN","Atlas, who gave the ocean its name, was one"]] },

  { id: "g10", cat: "Geography", word: "YOSEMITE", wiki: "Yosemite National Park",
    clue: "California park of granite cliffs, waterfalls and giant sequoias.",
    summary: "Yosemite National Park in California's Sierra Nevada is famous for granite cliffs, waterfalls and giant sequoias.",
    facts: [
      "Yosemite Falls drops about 2,425 feet, one of the tallest waterfalls in North America.",
      "El Capitan is a granite wall that rises about 3,000 feet from the valley floor.",
      "In 1864, President Abraham Lincoln signed a law protecting Yosemite Valley.",
      "Naturalist John Muir campaigned for a national park, and one was created around the valley in 1890."
    ],
    quiz: { q: "Which president signed the 1864 law protecting Yosemite Valley?", options: ["Abraham Lincoln", "George Washington", "Theodore Roosevelt"] },
    words: [["SEE","From Glacier Point you can ___ Half Dome"],["MIST","The ___ Trail climbs beside Vernal Fall"],["SITE","Yosemite is a World Heritage ___"],["TIME","1864: the first ___ the US set aside wild land for the public"],["MOIST","How hikers feel in the waterfall spray"]] },

  { id: "g11", cat: "Geography", word: "OUTBACK", wiki: "Outback",
    clue: "Australia's vast, dry and lightly populated interior.",
    summary: "The Outback is the vast, remote and mostly dry interior of Australia.",
    facts: [
      "Uluru, a giant sandstone rock, rises from the plains near the middle of Australia.",
      "Children on remote farms have taken lessons by two-way radio through the 'School of the Air.'",
      "The Royal Flying Doctor Service flies doctors out to people far from any hospital.",
      "Red kangaroos, emus and dingoes roam the Outback."
    ],
    quiz: { q: "How did children on remote Outback farms take school lessons?", options: ["By two-way radio", "By carrier pigeon", "They didn't"] },
    words: [["OAK","Desert ___: a tree that grows near Uluru"],["BACK","Opposite of front"],["BUCK","A male kangaroo, also called a boomer"],["COAT","Most dingoes have a ginger one"],["TUCK","Add -er for Aussie slang meaning food"],["ABOUT","Roughly; more or less"]] },

  { id: "g12", cat: "Geography", word: "ISTANBUL", wiki: "Istanbul",
    clue: "Turkish city that straddles Europe and Asia.",
    summary: "Istanbul is Turkey's largest city, split by the Bosporus strait between Europe and Asia.",
    facts: [
      "It was once called Byzantium, and later Constantinople.",
      "The Grand Bazaar is one of the largest and oldest covered markets in the world.",
      "The Hagia Sophia, finished in 537, was the world's largest cathedral for nearly a thousand years.",
      "Istanbul is usually counted as the most populous city in Europe."
    ],
    quiz: { q: "What was Istanbul once called?", options: ["Constantinople", "Athens", "Alexandria"] },
    words: [["NUT","Pistachio is one; it fills much Turkish baklava"],["SAIL","Ships do this on the Bosporus between Europe and Asia"],["BAIT","Anglers on the Galata Bridge put it on their hooks"],["BASIL","Herb, and name of an emperor who ruled from here"],["SULTAN","Ottoman ruler who lived in Topkapi Palace"]] },

  // ───────────── History ─────────────
  { id: "h1", cat: "History", word: "PYRAMID", wiki: "Great Pyramid of Giza",
    clue: "Ancient Egyptian stone tombs built over 4,500 years ago.",
    summary: "The Great Pyramid of Giza is the oldest and largest of the pyramids at Giza, built as a tomb for a pharaoh.",
    facts: [
      "The Great Pyramid was the tallest structure built by people for more than 3,800 years.",
      "It was built for the pharaoh Khufu around 2560 BC.",
      "It is made of about 2.3 million stone blocks.",
      "Archaeologists believe it was built by well-fed Egyptian work crews, not slaves."
    ],
    quiz: { q: "Which pharaoh was the Great Pyramid built for?", options: ["Khufu", "Tutankhamun", "Ramesses II"] },
    words: [["ARID","Like the dry desert land around Giza"],["RAMP","Builders likely hauled its stones up one"],["RAID","Tomb robbers' break-in, the fate of many pyramids"],["ARMY","Big crowd, like the work crews who built it"],["DIARY","Merer's ___, an old papyrus log of its building"],["MYRIAD","A great many, like its 2.3 million stone blocks"]] },

  { id: "h2", cat: "History", word: "VIKINGS", wiki: "Vikings",
    clue: "Norse seafarers who sailed sleek longships from Scandinavia.",
    summary: "Vikings were medieval Norse seafarers who raided, traded and settled across Europe and reached North America.",
    facts: [
      "Leif Erikson reached North America about 500 years before Columbus.",
      "Vikings took care of their looks; combs are common finds at their sites.",
      "Their longships could sail the open sea and also travel up shallow rivers.",
      "There's no evidence Vikings wore horned helmets in battle. That idea came from 1800s art and opera."
    ],
    quiz: { q: "Did Vikings wear horned helmets in battle?", options: ["No, that's a myth", "Yes, always", "Only their kings"] },
    words: [["KIN","Family; Norse sagas tell of their feuds"],["SKI","Snow runner; the word comes from Old Norse"],["SINK","What a sturdy longship was built not to do"],["KINGS","Cnut and Harald Bluetooth were Viking ones"],["SKIN","Outer layer of the body"],["SIGN","Posted notice"]] },

  { id: "h3", cat: "History", word: "POMPEII", wiki: "Pompeii",
    clue: "Ancient Roman city preserved under volcanic ash in 79 AD.",
    summary: "Pompeii was a Roman city buried by the eruption of Mount Vesuvius in 79 AD, preserving daily Roman life.",
    facts: [
      "Archaeologists found loaves of bread still inside a bakery oven.",
      "Bright wall paintings, painted shop signs and election notices survived under the ash.",
      "Plaster casts made from hollows in the ash show people's final moments.",
      "It lay buried for nearly 1,700 years until digging began in 1748."
    ],
    quiz: { q: "Which volcano buried Pompeii?", options: ["Vesuvius", "Etna", "Stromboli"] },
    words: [["PIPE","Pompeii's water flowed through lead ones"],["POEM","Verse; Romans scratched some on Pompeii's walls"],["PIE","Baked pastry"],["POPE","Church leader"],["MOP","Floor cleaner"]] },

  { id: "h4", cat: "History", word: "SPARTA", wiki: "Sparta",
    clue: "Ancient Greek city-state famed for discipline and warriors.",
    summary: "Sparta was a powerful ancient Greek city-state celebrated for its soldiers and its stand at Thermopylae.",
    facts: [
      "Spartan women could own property and took part in physical training.",
      "Their short, blunt way of speaking gave us the word 'laconic.'",
      "Spartan boys began military training at about age seven.",
      "In 480 BC, King Leonidas and 300 Spartans made a famous stand at Thermopylae."
    ],
    quiz: { q: "Which word comes from the Spartans' short, blunt speech?", options: ["Laconic", "Eloquent", "Chatty"] },
    words: [["SPAR","Practice fight, like Spartan boys' training"],["STRAP","A Spartan's shield had one to hold it on the arm"],["PAST","Long-gone days, like those of ancient Sparta"],["APART","Separated"],["TRAP","Mouse catcher"],["APT","Fitting or suitable"]] },

  { id: "h5", cat: "History", word: "GALILEO", wiki: "Galileo Galilei",
    clue: "Italian astronomer who discovered Jupiter's four largest moons.",
    summary: "Galileo Galilei (1564–1642) pioneered telescope astronomy and modern physics.",
    facts: [
      "In 1610 he spotted four moons circling Jupiter.",
      "With his telescope he saw mountains and craters on the Moon.",
      "In 1633 he was put on trial for teaching that the Earth moves around the Sun.",
      "NASA's Galileo spacecraft, which studied Jupiter, was named for him."
    ],
    quiz: { q: "What did Galileo discover circling Jupiter in 1610?", options: ["Four moons", "Rings", "A comet"] },
    words: [["AGO","Over 400 years ___, he aimed a telescope at the sky"],["LOG","Record, like his notes on Jupiter's moons"],["LEGAL","Allowed by law"],["GOAL","Target or aim"],["GALE","Strong wind"],["AGILE","Quick and nimble"]] },

  { id: "h6", cat: "History", word: "CAESAR", wiki: "Julius Caesar",
    clue: "Roman general who crossed the Rubicon and reshaped Rome.",
    summary: "Julius Caesar was a Roman general and statesman whose rise to power led to the end of the Roman Republic.",
    facts: [
      "He introduced the 365-day Julian calendar, with a leap year.",
      "The month of July is named after him.",
      "He was assassinated on the Ides of March, March 15, 44 BC.",
      "His name later became a title, which led to the words 'Kaiser' and 'Tsar.'"
    ],
    quiz: { q: "Which month is named after Julius Caesar?", options: ["July", "June", "March"] },
    words: [["EARS","Friends, Romans, countrymen, lend me your ___"],["SEA","He crossed it to reach Britain in 55 BC"],["RACE","Chariot contest Romans loved to watch"],["ERA","Period of history"],["ACRE","Land measure"],["SCARE","Frighten"]] },

  { id: "h7", cat: "History", word: "TITANIC", wiki: "Titanic",
    clue: "Famous luxury ocean liner that struck an iceberg in 1912.",
    summary: "RMS Titanic sank in the North Atlantic on April 15, 1912, during her first voyage.",
    facts: [
      "Her wreck was found in 1985, more than two miles under the sea.",
      "First-class passengers had a swimming pool, a gym and a squash court.",
      "More than 1,500 people died.",
      "There were lifeboats for only about half of the people on board."
    ],
    quiz: { q: "In what year did the Titanic sink?", options: ["1912", "1898", "1929"] },
    words: [["TITAN","Giant of Greek myth the ship was named for"],["INTACT","Whole; her wreck was not, lying in two parts"],["ATTIC","Room under the roof"],["TINT","Soft shade of color"],["CAT","Purring pet"],["ACT","Perform on stage"]] },

  { id: "h8", cat: "History", word: "CASTLE", wiki: "Castle",
    clue: "Medieval stone fortress with towers and drawbridges.",
    summary: "Castles were fortified homes built across Europe and the Middle East during the Middle Ages.",
    facts: [
      "Sweet-smelling herbs and rushes were scattered on castle floors.",
      "A moat was a deep ditch, often filled with water, dug around a castle for defense.",
      "Narrow slits in the walls let archers shoot out while staying protected.",
      "Windsor Castle in England has been a royal home for more than 900 years."
    ],
    quiz: { q: "What was a castle's moat?", options: ["A ditch around the walls", "A tall tower", "A secret tunnel"] },
    words: [["SCALE","Attackers used ladders to ___ castle walls"],["ALE","Everyday drink in a medieval castle hall"],["TALES","Fairy ___ are full of castles"],["SALT","To sit above the ___ was an honor at a feast"],["SEAT","A lord's castle was the ___ of his power"]] },

  { id: "h9", cat: "History", word: "NAPOLEON", wiki: "Napoleon",
    clue: "French emperor who conquered much of Europe in the early 1800s.",
    summary: "Napoleon Bonaparte rose from army officer to Emperor of the French and reshaped Europe's laws and borders.",
    facts: [
      "He wasn't really short. At about 5 feet 7 inches, he was a little taller than the average Frenchman of his time.",
      "His Napoleonic Code still shapes the laws of many countries.",
      "He was finally defeated at the Battle of Waterloo in 1815.",
      "He died in exile on the remote island of St Helena in 1821."
    ],
    quiz: { q: "Where was Napoleon finally defeated in 1815?", options: ["Waterloo", "Trafalgar", "Gettysburg"] },
    words: [["PENAL","Type of code; he brought in one in 1810"],["LONE","Isolated, like his far-off exile island"],["PLAN","Battle scheme, one of his great strengths"],["PLANE","Jet or flat surface"],["OPEN","Not shut"],["POOL","Place to swim"]] },

  { id: "h10", cat: "History", word: "KNIGHTS", wiki: "Knight",
    clue: "Armored medieval warriors on horseback who swore a code of honor.",
    summary: "Knights were mounted warriors of medieval Europe, often bound by a code of conduct called chivalry.",
    facts: [
      "Training started young: a boy served as a page, then a squire, before becoming a knight.",
      "A full suit of plate armor usually weighed about 30 to 55 pounds.",
      "A knight was 'dubbed' in a ceremony with a touch of a sword on the shoulder.",
      "People in Britain can still be knighted today and called 'Sir.'"
    ],
    quiz: { q: "What was a knight-in-training called after being a page?", options: ["A squire", "A jester", "A friar"] },
    words: [["NIGHT","Dark time after sunset"],["KING","Ruler a knight swore to serve"],["SHIN","Armor called greaves guarded this"],["KIT","A knight's gear, from sword to shield"],["SING","Minstrels would ___ of brave knights"],["KNIT","Make a sweater with needles"]] },

  { id: "h11", cat: "History", word: "AZTECS", wiki: "Aztecs",
    clue: "People who built a great island city on a lake in Mexico.",
    summary: "The Aztecs ruled a powerful empire in central Mexico from their island capital, Tenochtitlan, until 1521.",
    facts: [
      "Their capital, Tenochtitlan, was built on an island in Lake Texcoco, where Mexico City stands today.",
      "They farmed on man-made garden islands called chinampas.",
      "Aztec nobles and warriors drank chocolate as a frothy drink.",
      "Spanish forces led by Hernán Cortés conquered the city in 1521."
    ],
    quiz: { q: "Which modern city stands where the Aztec capital was?", options: ["Mexico City", "Lima", "Havana"] },
    words: [["SEAT","Tenochtitlan was the ___ of their empire"],["SEA","Cortes crossed it from Spain to reach them"],["EAT","Their garden islands grew food to ___"],["EAST","Where the sun rises"],["CAT","Purring pet"],["ZEST","Lemon peel flavor"]] },

  { id: "h12", cat: "History", word: "SAMURAI", wiki: "Samurai",
    clue: "Warrior class of old Japan who followed a strict code of honor.",
    summary: "The samurai were Japan's warrior class for centuries, until the class was abolished in the 1870s.",
    facts: [
      "Their code of honor is often called bushido, 'the way of the warrior.'",
      "Samurai carried two swords: a long katana and a shorter one.",
      "In 1876 samurai were banned from wearing swords in public.",
      "Many samurai also studied poetry, tea ceremony and calligraphy."
    ],
    quiz: { q: "What is the samurai code of honor often called?", options: ["Bushido", "Origami", "Haiku"] },
    words: [["ARMS","Swords and bows were a samurai's ___"],["AIM","Samurai archers had to ___ from horseback"],["ARIA","Opera solo"],["AURA","Glowing feel"],["SUM","Total"],["RIM","Edge of a cup"]] },

  // ───────────── Space ─────────────
  { id: "s1", cat: "Space", word: "JUPITER", wiki: "Jupiter",
    clue: "Biggest planet, a gas giant with a giant red storm.",
    summary: "Jupiter, the fifth planet from the Sun, is a gas giant more than twice as massive as all the other planets combined.",
    facts: [
      "Its Great Red Spot is a storm bigger than Earth.",
      "A day on Jupiter lasts only about 10 hours.",
      "Its moon Ganymede is the largest moon in the solar system.",
      "More than 1,300 Earths could fit inside Jupiter."
    ],
    quiz: { q: "Jupiter's Great Red Spot is a giant what?", options: ["Storm", "Crater", "Ocean"] },
    words: [["TRIP","NASA's Juno took a five-year one to reach Jupiter"],["JET","Fast plane, or the wind streams that stripe Jupiter"],["TRUE","Not false, as in: Jupiter is the biggest planet"],["TIE","Even score in a game"],["RIPE","Ready to eat"],["PIER","Dock for boats"]] },

  { id: "s2", cat: "Space", word: "SATURN", wiki: "Saturn",
    clue: "Ringed gas giant, sixth planet from the Sun.",
    summary: "Saturn is the sixth planet from the Sun, famous for its bright rings of ice and rock.",
    facts: [
      "Saturn is the only planet that is less dense than water.",
      "Its rings are mostly chunks of ice, from tiny grains to pieces as big as houses.",
      "Its moon Titan has a thick atmosphere and lakes of liquid methane.",
      "One year on Saturn lasts about 29 Earth years."
    ],
    quiz: { q: "What are Saturn's rings mostly made of?", options: ["Ice", "Gold dust", "Gas"] },
    words: [["SUN","Saturn is the sixth planet from it"],["STAR","Saturn can look like a bright one in the night sky"],["TURN","One spin; Saturn does one in about 10.5 hours"],["SAT","Short for Saturday, named for the Roman god Saturn"],["RUST","Orange on old iron"],["AUNT","Parent's sister"]] },

  { id: "s3", cat: "Space", word: "NEPTUNE", wiki: "Neptune",
    clue: "Windy, deep-blue planet farthest from the Sun.",
    summary: "Neptune is the eighth and farthest known planet from the Sun, an icy giant with the strongest winds in the solar system.",
    facts: [
      "It was found by math before anyone saw it; astronomers first spotted it in 1846.",
      "Its winds can blow at more than 1,200 miles per hour.",
      "One year on Neptune lasts about 165 Earth years.",
      "Only one spacecraft, Voyager 2, has visited Neptune, in 1989."
    ],
    quiz: { q: "Which spacecraft is the only one to have visited Neptune?", options: ["Voyager 2", "Apollo 11", "Hubble"] },
    words: [["PEN","Neptune was found by math, with the point of a ___"],["NET","Fishing tool, fit for Neptune, god of the sea"],["TUNE","Melody"],["TEEN","Age 13 to 19"],["NUT","Squirrel snack"],["TEN","Number of fingers"]] },

  { id: "s4", cat: "Space", word: "MERCURY", wiki: "Mercury (planet)",
    clue: "Smallest planet and the closest to the Sun.",
    summary: "Mercury is the smallest planet and the closest to the Sun, circling it every 88 days.",
    facts: [
      "A year on Mercury is just 88 Earth days.",
      "With almost no air, it swings from about 800°F by day to about −290°F at night.",
      "Even though it's closest to the Sun, it isn't the hottest planet. Venus is.",
      "Mercury has no moons."
    ],
    quiz: { q: "Which planet is hotter than Mercury?", options: ["Venus", "Mars", "Neptune"] },
    words: [["MERCY","Kindness"],["CURRY","Spicy dish"],["MERRY","Cheerful"],["CURE","Make well"],["CRY","Shed tears"],["RYE","Bread grain"]] },

  { id: "s5", cat: "Space", word: "ECLIPSE", wiki: "Solar eclipse",
    clue: "When the Moon blocks the Sun, turning day to dusk.",
    summary: "A solar eclipse happens when the Moon passes between Earth and the Sun and its shadow falls on Earth.",
    facts: [
      "The Sun is about 400 times wider than the Moon, but also about 400 times farther away, so they look the same size.",
      "During a total eclipse you can see the Sun's glowing outer layer, the corona.",
      "At any one spot, totality lasts at most about seven and a half minutes.",
      "Only look at the Sun without eclipse glasses while the Moon covers it completely."
    ],
    quiz: { q: "What blocks the Sun during a solar eclipse?", options: ["The Moon", "Earth", "A dust cloud"] },
    words: [["SEE","Wear eclipse glasses to ___ the Sun safely"],["PIECE","A partial eclipse hides just a ___ of the Sun"],["SLEEP","Nightly rest; a total eclipse can feel like bedtime"],["EPIC","Grand and heroic, like the sight of a total eclipse"],["SLICE","Thin cut"],["CLIP","Fasten or trim"]] },

  { id: "s6", cat: "Space", word: "NEBULA", wiki: "Nebula",
    clue: "Giant cloud of gas and dust where stars are born.",
    summary: "A nebula is a huge cloud of gas and dust in space; many are nurseries where new stars form.",
    facts: [
      "Nebula is the Latin word for 'mist' or 'cloud.'",
      "The Orion Nebula can be seen without a telescope, as a fuzzy spot in Orion's sword.",
      "Some nebulae are the glowing leftovers of stars that exploded.",
      "Hubble's famous 'Pillars of Creation' photo shows part of the Eagle Nebula."
    ],
    quiz: { q: "What does the Latin word 'nebula' mean?", options: ["Mist or cloud", "Star", "Light"] },
    words: [["BLUE","Color of dusty nebulae that shine with starlight"],["ABLE","Capable; you're this to see Orion's nebula unaided"],["LAB","Science room"],["BEAN","Coffee seed"],["LANE","Narrow road"],["LEAN","Tilt"]] },

  { id: "s7", cat: "Space", word: "ASTEROID", wiki: "Asteroid",
    clue: "Rocky space chunk; most circle the Sun between Mars and Jupiter.",
    summary: "Asteroids are rocky leftovers from the early solar system; most circle the Sun in a belt between Mars and Jupiter.",
    facts: [
      "Ceres, the largest object in the asteroid belt, is now called a dwarf planet.",
      "An asteroid that struck Earth about 66 million years ago helped wipe out the dinosaurs.",
      "In 2022, NASA's DART spacecraft crashed into an asteroid on purpose and changed its orbit.",
      "The asteroid belt is mostly empty space; the rocks are usually very far apart."
    ],
    quiz: { q: "What happened when NASA's DART spacecraft hit an asteroid in 2022?", options: ["It changed the asteroid's orbit", "It turned it to dust", "It bounced off"] },
    words: [["STAR","Asteroid comes from the Greek for looking like a ___"],["DART","NASA craft that hit an asteroid in 2022; pub game"],["ERA","The dinosaurs' one ended after an asteroid hit"],["ORE","Metal-rich rock some hope to mine from asteroids"],["RADIO","Kind of waves radar uses to study asteroids"],["TRADE","Swap"]] },

  { id: "s8", cat: "Space", word: "METEOR", wiki: "Meteoroid",
    clue: "Streak of light from a space rock burning up: a 'shooting star.'",
    summary: "A meteor, or shooting star, is the streak of light made when a small space rock burns up in Earth's atmosphere.",
    facts: [
      "Most meteors come from bits no bigger than a pea, many as small as a grain of sand.",
      "The Perseid meteor shower peaks every August.",
      "A space rock that survives the trip and lands on the ground is called a meteorite.",
      "Meteors hit the air at tens of thousands of miles per hour."
    ],
    quiz: { q: "What is a space rock that reaches the ground called?", options: ["A meteorite", "A comet", "A nebula"] },
    words: [["TERM","Word; shooting star is a common one for meteor"],["REMOTE","Far off, like dark spots that are best for meteors"],["MORE","Extra; you see ___ meteors after midnight than before"],["METER","Unit of length; most meteor bits are far smaller"],["TREE","Woody plant"],["TOE","Foot digit"]] },

  { id: "s9", cat: "Space", word: "APOLLO", wiki: "Apollo program",
    clue: "NASA program that landed the first people on the Moon.",
    summary: "NASA's Apollo program landed twelve astronauts on the Moon between 1969 and 1972.",
    facts: [
      "Neil Armstrong and Buzz Aldrin of Apollo 11 walked on the Moon on July 20, 1969.",
      "Twelve people have walked on the Moon, all during Apollo.",
      "Astronauts brought back about 842 pounds of Moon rock and soil.",
      "Apollo 13's crew survived an explosion on the way and made it home safely in 1970."
    ],
    quiz: { q: "How many people have walked on the Moon?", options: ["Twelve", "Two", "Fifty"] },
    words: [["LOOP","Apollo 13 swung this way around the Moon to get home"],["ALL","Every one; ___ 12 Moon walkers flew on Apollo"],["PAL","Buddy or friend"],["POOL","Place to swim"],["OPAL","Rainbow gemstone"],["POLL","Survey"]] },

  { id: "s10", cat: "Space", word: "ROCKET", wiki: "Rocket",
    clue: "Engine-driven vehicle that blasts off into space.",
    summary: "A rocket moves by pushing gas out of its back, so it can fly even in the vacuum of space.",
    facts: [
      "China was using gunpowder rockets by the 1200s.",
      "Robert Goddard launched the first liquid-fueled rocket in 1926.",
      "Rockets work in space because they carry their own oxygen, or a chemical that does its job, to burn their fuel.",
      "The Saturn V, which carried Apollo astronauts to the Moon, is one of the most powerful rockets ever flown."
    ],
    quiz: { q: "Why can rockets work in airless space?", options: ["They carry their own oxygen", "They ride the solar wind", "They push against the stars"] },
    words: [["CORE","Center; NASA's big SLS rocket has this kind of stage"],["TREK","Long journey, like a rocket ride to the Moon"],["ROCK","Stone; Apollo crews flew home with Moon ones"],["ORE","Mined rock"],["CORK","Bottle stopper"],["TORE","Ripped"]] },

  { id: "s11", cat: "Space", word: "SPUTNIK", wiki: "Sputnik 1",
    clue: "First man-made satellite, launched by the Soviet Union in 1957.",
    summary: "Sputnik 1 was the first artificial satellite, launched by the Soviet Union on October 4, 1957.",
    facts: [
      "It was a shiny metal ball about 23 inches wide with four long antennas.",
      "People around the world could pick up its 'beep-beep' radio signal.",
      "Its launch started the Space Race between the US and the Soviet Union.",
      "It circled Earth about every 96 minutes and burned up after three months."
    ],
    quiz: { q: "What did Sputnik 1 send down to Earth?", options: ["A beeping radio signal", "Photos", "Music"] },
    words: [["STUN","Amaze; Sputnik's 1957 launch did this to Americans"],["INK","Pen fluid; it printed the Sputnik headlines"],["UNIT","One piece"],["SKIN","Outer layer"],["PINK","Light red"],["SPIN","Twirl"]] },

  { id: "s12", cat: "Space", word: "UNIVERSE", wiki: "Universe",
    clue: "Everything that exists: all of space, time, stars and galaxies.",
    summary: "The universe is all of space and time and everything in it, from planets and stars to galaxies.",
    facts: [
      "Scientists estimate the universe is about 13.8 billion years old.",
      "It has been expanding ever since the Big Bang.",
      "Light from the Sun takes about 8 minutes to reach Earth.",
      "Our galaxy, the Milky Way, holds an estimated 100 to 400 billion stars."
    ],
    quiz: { q: "About how old is the universe?", options: ["13.8 billion years", "500 years", "1 million years"] },
    words: [["SUN","Its light takes about 8 minutes to reach Earth"],["EVER","Always, as in: growing ___ since the Big Bang"],["SEE","Look; on dark nights you can ___ the Milky Way"],["SEVEN","Days in a week"],["NURSE","Hospital helper"],["VERSE","Line of a song"]] },

  // ───────────── Food ─────────────
  { id: "f1", cat: "Food", word: "PANCAKE", wiki: "Pancake",
    clue: "Flat breakfast cake cooked on a griddle, often stacked.",
    summary: "Pancakes are flat cakes made from batter and cooked on a hot griddle or pan.",
    facts: [
      "People in ancient Greece and Rome ate pancakes.",
      "Shrove Tuesday, the day before Lent, is called Pancake Day in Britain.",
      "In Olney, England, women race with frying pans, tossing their pancakes, a custom said to date back to 1445.",
      "Real maple syrup is made from the sap of maple trees."
    ],
    quiz: { q: "What is Pancake Day also called?", options: ["Shrove Tuesday", "Boxing Day", "Leap Day"] },
    words: [["PAN","Flat dish you cook pancakes in"],["CAKE","A pancake is a flat one, cooked on a griddle"],["PACE","Running speed in Olney's pancake race"],["PEAK","Mountain top, or the top of a pancake stack"],["NAP","A snooze after a big pancake breakfast"],["CANE","Walking stick"]] },

  { id: "f2", cat: "Food", word: "PUMPKIN", wiki: "Pumpkin",
    clue: "Big orange squash carved into jack-o'-lanterns.",
    summary: "Pumpkins are round orange squash, grown for autumn pies, soups and jack-o'-lanterns.",
    facts: [
      "A pumpkin is a fruit, because it holds seeds.",
      "In Ireland, the first jack-o'-lanterns were carved from turnips.",
      "The heaviest pumpkin on record weighed more than 3,000 pounds.",
      "Pumpkins first came from North America."
    ],
    quiz: { q: "What did people in Ireland first carve jack-o'-lanterns from?", options: ["Turnips", "Apples", "Melons"] },
    words: [["KIN","Family, as squash are to the pumpkin"],["NIP","A chilly one is in the air at pumpkin time"],["IMP","Little Halloween rascal"],["PUN","Wordplay joke"],["PUMP","Gas station machine"],["INK","Pen fluid"]] },

  { id: "f3", cat: "Food", word: "CHEDDAR", wiki: "Cheddar cheese",
    clue: "Popular firm cheese named after an English village.",
    summary: "Cheddar is a firm cheese that comes from the village of Cheddar in Somerset, England.",
    facts: [
      "It's named for the village of Cheddar in Somerset, England, where nearby caves were used to age it.",
      "Cheddar is naturally white to pale yellow. Orange cheddar gets its color from annatto, a seed.",
      "Cheddar is the most popular cheese in the United Kingdom.",
      "'Cheddaring' is a step where slabs of curd are stacked and turned to squeeze out the whey."
    ],
    quiz: { q: "What gives orange cheddar its color?", options: ["Annatto, a plant seed", "Egg yolks", "Long aging"] },
    words: [["HERD","Group of cows whose milk makes cheddar"],["HARD","Firm cheese like cheddar is called this"],["CARE","Cheese makers age cheddar with patience and this"],["HEAD","Top of the body"],["CEDAR","Fragrant tree"],["ARCH","Curved doorway"]] },

  { id: "f4", cat: "Food", word: "BAGUETTE", wiki: "Baguette",
    clue: "Long, thin French loaf with a crisp crust.",
    summary: "The baguette is a long, thin loaf of French bread with a crunchy crust and a soft inside.",
    facts: [
      "In 2022, UNESCO added the craft of the French baguette to its cultural heritage list.",
      "By French law, a 'traditional' baguette is made mainly from just flour, water, salt and yeast.",
      "France bakes billions of baguettes every year.",
      "'Baguette' means 'little stick' or 'wand.'"
    ],
    quiz: { q: "What does 'baguette' mean in French?", options: ["Little stick", "Morning bread", "Long loaf"] },
    words: [["BAG","Long paper one for carrying a baguette home"],["EAT","Best thing to do with a fresh baguette"],["TUG","Pull, as when you tear off a piece of bread"],["BEAT","Drum rhythm"],["GATE","Fence door"],["TUBE","Hollow pipe"]] },

  { id: "f5", cat: "Food", word: "VANILLA", wiki: "Vanilla",
    clue: "Sweet flavor from the pods of a tropical orchid.",
    summary: "Vanilla is a flavoring made from the cured seed pods of tropical orchids, first grown in Mexico.",
    facts: [
      "Vanilla comes from the seed pods of an orchid.",
      "After saffron, it is one of the most expensive spices.",
      "In 1841, a 12-year-old boy named Edmond Albius found a quick way to hand-pollinate vanilla flowers.",
      "Madagascar grows more vanilla than any other country."
    ],
    quiz: { q: "Vanilla comes from what kind of plant?", options: ["An orchid", "A cactus", "A palm"] },
    words: [["VIAL","Small bottle, like one of vanilla extract"],["VILLA","Fancy house"],["LAVA","Hot melted rock"],["NAVAL","Of the navy"],["VAIN","Conceited"],["VAN","Delivery truck"]] },

  { id: "f6", cat: "Food", word: "CINNAMON", wiki: "Cinnamon",
    clue: "Warm brown spice made from rolled tree bark.",
    summary: "Cinnamon is a spice made from the inner bark of several trees in the genus Cinnamomum.",
    facts: [
      "Cinnamon sticks are strips of inner bark that curl up as they dry.",
      "The ancient Egyptians used cinnamon.",
      "Most of the world's 'true' or Ceylon cinnamon comes from Sri Lanka.",
      "Much of the cinnamon sold in US stores is cassia, a close cousin."
    ],
    quiz: { q: "What part of the tree does cinnamon come from?", options: ["The inner bark", "The leaves", "The roots"] },
    words: [["MAIN","Chief, like the star spice in a sticky bun"],["CANNON","Big old gun"],["COIN","Penny or dime"],["ICON","Little symbol"],["INN","Cozy roadside hotel"],["MOAN","Groan"]] },

  { id: "f7", cat: "Food", word: "NOODLES", wiki: "Noodle",
    clue: "Long strips of dough boiled for soups and stir-fries.",
    summary: "Noodles are strips of dough, boiled or fried, eaten in kitchens all over the world.",
    facts: [
      "The oldest known noodles, about 4,000 years old, were found in China.",
      "Momofuku Ando invented instant noodles in Japan in 1958.",
      "In parts of Asia, long noodles are eaten on birthdays as a wish for a long life.",
      "Italian pasta is a kind of noodle made from wheat."
    ],
    quiz: { q: "Who invented instant noodles?", options: ["Momofuku Ando", "Marco Polo", "Thomas Edison"] },
    words: [["OLD","The first known noodles are 4,000 years this"],["DONE","Taste a noodle to see if it's this"],["SOON","Instant noodles are ready very this"],["LOOSEN","Stir the pot to do this to stuck noodles"],["NOSE","Smelling part"],["SEND","Mail off"]] },

  { id: "f8", cat: "Food", word: "POPCORN", wiki: "Popcorn",
    clue: "Corn kernels that puff up when heated.",
    summary: "Popcorn is a kind of corn whose kernels puff up and pop open when heated.",
    facts: [
      "A tiny drop of water inside each kernel turns to steam and bursts the shell.",
      "People in Peru were popping corn more than 6,000 years ago.",
      "Movie theaters began selling popcorn widely during the Great Depression.",
      "Kernels that don't pop are nicknamed 'old maids.'"
    ],
    quiz: { q: "What makes a popcorn kernel pop?", options: ["Water turning to steam", "Air bubbles", "Salt"] },
    words: [["CORN","Popcorn is a special kind of this"],["POP","Sound a kernel makes when heated"],["CROP","Farm harvest, like the corn that pops"],["POOR","Short of money, like many who ate popcorn in the Depression"],["PROP","Stage object"],["COOP","Chicken house"]] },

  { id: "f9", cat: "Food", word: "PEANUT", wiki: "Peanut",
    clue: "Legume that grows underground, mashed into a famous butter.",
    summary: "The peanut is a legume that flowers above ground and then grows its pods under the soil.",
    facts: [
      "Peanuts are legumes, related to beans and peas, not true nuts.",
      "After the flower is pollinated, a stalk called a peg grows down and pushes the young pod into the soil.",
      "George Washington Carver promoted peanuts and shared hundreds of ways to use them.",
      "China grows more peanuts than any other country."
    ],
    quiz: { q: "Peanuts are close relatives of which food?", options: ["Beans", "Walnuts", "Potatoes"] },
    words: [["NUT","Despite its name, a peanut isn't a true one"],["PEA","Small green legume, a peanut's cousin"],["TAN","Light brown, like a peanut shell"],["TUNE","Ballpark song asking for peanuts has a catchy one"],["AUNT","Parent's sister"],["TAPE","Sticky strip"]] },

  { id: "f10", cat: "Food", word: "MUSTARD", wiki: "Mustard (condiment)",
    clue: "Tangy yellow spread made from tiny seeds.",
    summary: "Mustard is a condiment made from the seeds of the mustard plant mixed with water, vinegar or wine.",
    facts: [
      "The bright yellow of American mustard comes from turmeric.",
      "Dijon, France, has been famous for its mustard since the Middle Ages.",
      "The Romans mixed ground mustard seeds with unfermented grape juice, called 'must.'",
      "The name comes from Latin for 'burning must.'"
    ],
    quiz: { q: "What gives American yellow mustard its bright color?", options: ["Turmeric", "Egg yolk", "Lemon"] },
    words: [["MUST","Grape juice Romans mixed with mustard seed"],["STAR","Twinkler in the sky"],["DRUM","Beat it"],["SMART","Clever"],["DUST","Fine dirt"],["ARMS","Upper limbs"]] },

  { id: "f11", cat: "Food", word: "GARLIC", wiki: "Garlic",
    clue: "Strong-smelling bulb made of cloves, loved in cooking.",
    summary: "Garlic is a bulb in the onion family, made of cloves and used in cooking around the world.",
    facts: [
      "Garlic is a close relative of onions, leeks and chives.",
      "China grows most of the world's garlic.",
      "Its strong smell comes from a compound called allicin, made when a clove is crushed.",
      "Gilroy, California, calls itself the 'Garlic Capital of the World.'"
    ],
    quiz: { q: "Garlic is in the same plant family as which vegetable?", options: ["Onion", "Carrot", "Potato"] },
    words: [["CIGAR","Rolled tobacco"],["GIRL","Young lady"],["RAIL","Train track"],["LIAR","Fibber"],["CAR","Auto"],["AIR","What we breathe"]] },

  { id: "f12", cat: "Food", word: "LASAGNA", wiki: "Lasagna",
    clue: "Baked Italian dish of wide pasta sheets layered with sauce.",
    summary: "Lasagna is a baked Italian dish of wide, flat pasta sheets layered with sauce, cheese and often meat.",
    facts: [
      "Lasagna is one of the oldest kinds of pasta.",
      "In Bologna, the classic lasagne is made with green spinach pasta.",
      "Italians usually use the plural, 'lasagne.'",
      "The name may come from the Greek 'laganon,' a flat sheet of dough."
    ],
    quiz: { q: "What color is the pasta in classic lasagne from Bologna?", options: ["Green", "Black", "Red"] },
    words: [["SLANG","Casual words"],["NASAL","Of the nose"],["SANG","Past of sing"],["SAGA","Long story"],["GALA","Fancy party"],["GAS","Fuel"]] },

  // ───────────── Nature ─────────────
  { id: "n1", cat: "Nature", word: "TORNADO", wiki: "Tornado",
    clue: "Violent spinning column of air that touches the ground.",
    summary: "A tornado is a violently spinning column of air reaching from a thunderstorm down to the ground.",
    facts: [
      "The United States has more tornadoes than any other country.",
      "'Tornado Alley' is a nickname for a stretch of the Great Plains.",
      "The strongest tornadoes can have winds of more than 300 mph.",
      "In the United States, tornadoes are rated on the Enhanced Fujita scale, from EF0 to EF5."
    ],
    quiz: { q: "Which country has the most tornadoes?", options: ["The United States", "Australia", "Japan"] },
    words: [["TORN","Ripped apart, as by a twister's winds"],["ROAD","Dorothy followed a yellow brick one after the twister"],["DOOR","Dorothy opened it after the twister to find Oz"],["ROOT","Kind of cellar where farm folks hid from twisters"],["TON","Strong twisters can toss cars weighing over one"],["DONOR","Giver, like one who helps after a storm"]] },

  { id: "n2", cat: "Nature", word: "RAINBOW", wiki: "Rainbow",
    clue: "Arc of colors when sunlight shines through raindrops.",
    summary: "A rainbow is an arc of colors made when sunlight is bent and reflected inside raindrops.",
    facts: [
      "To see a rainbow, the Sun has to be behind you.",
      "In a double rainbow, the colors of the outer bow are in reverse order.",
      "A rainbow is really a full circle; the ground usually hides the bottom half.",
      "Isaac Newton named the seven colors of the rainbow."
    ],
    quiz: { q: "Where must the Sun be for you to see a rainbow?", options: ["Behind you", "In front of you", "Straight overhead"] },
    words: [["RAIN","Drops that bend sunlight into a rainbow"],["BOW","Arc shape that gives this sky sight half its name"],["BROWN","Chocolate color you won't find in a rainbow"],["ROW","Rainbow colors sit in a neat one, red to violet"],["AIR","Rainbows shine where raindrops fill it"],["ROBIN","Red-breasted bird"]] },

  { id: "n3", cat: "Nature", word: "ORCHID", wiki: "Orchid",
    clue: "Huge flower family, from vanilla to exotic blooms.",
    summary: "Orchids are one of the two largest families of flowering plants, with about 28,000 species.",
    facts: [
      "There are about 28,000 kinds of orchids, more than all the kinds of birds and mammals combined.",
      "Orchid seeds are as fine as dust.",
      "Vanilla comes from an orchid.",
      "The bee orchid's flower looks like a female bee, which can lure male bees to visit."
    ],
    quiz: { q: "Which flavor comes from an orchid?", options: ["Vanilla", "Mint", "Cinnamon"] },
    words: [["RICH","Wealthy, like many Victorian orchid collectors"],["CHOIR","Group of singers"],["CHORD","Notes played together"],["CORD","Thin rope"],["ROD","Fishing pole"],["HID","Stayed out of sight"]] },

  { id: "n4", cat: "Nature", word: "MUSHROOM", wiki: "Mushroom",
    clue: "Fungus that pops up from soil or logs after rain.",
    summary: "A mushroom is the fruiting body of a fungus, the part that grows above ground to spread spores.",
    facts: [
      "Fungi, like mushrooms, are more closely related to animals than to plants.",
      "One honey fungus in Oregon spreads underground over about 3.7 square miles, one of the largest living things on Earth.",
      "Mushrooms spread by spores, not seeds.",
      "Some mushrooms glow in the dark."
    ],
    quiz: { q: "Mushrooms are more closely related to what?", options: ["Animals", "Plants", "Rocks"] },
    words: [["HUMOR","Funny side: a fungus is a fun guy"],["HOURS","Some mushrooms pop up in just a few of these"],["ROOM","Store mushrooms often grow in a dark, damp one"],["MOOR","Open, wet land where wild mushrooms may sprout"],["RUSH","Hurry"],["SOUR","Lemony taste"]] },

  { id: "n5", cat: "Nature", word: "THUNDER", wiki: "Thunder",
    clue: "Booming sound made when lightning heats the air.",
    summary: "Thunder is the sound caused by lightning, which heats the air so fast that it bursts outward with a boom.",
    facts: [
      "Lightning heats the air to around 50,000°F, hotter than the surface of the Sun.",
      "Count the seconds between the flash and the thunder: every five seconds is about a mile.",
      "Thunder can usually be heard up to about 10 miles away.",
      "If you can hear thunder, you are close enough to be struck by lightning."
    ],
    quiz: { q: "What causes thunder?", options: ["Lightning heating the air", "Clouds bumping together", "Rain hitting the ground"] },
    words: [["TEN","Thunder can usually be heard about this many miles"],["UNDER","Get ___ a roof when thunder roars"],["THEN","Flash first, ___ the boom"],["TRUE","Not false: hearing thunder means lightning is near"],["HERD","Cattle group a thunderclap could start stampeding"],["RUN","What a scared dog may do at a clap of thunder"]] },

  { id: "n6", cat: "Nature", word: "PRAIRIE", wiki: "Prairie",
    clue: "Wide grassland plain with few trees.",
    summary: "Prairies are wide, flat or rolling grasslands with few trees, like the Great Plains of North America.",
    facts: [
      "Some prairie plants have roots that reach more than 10 feet deep.",
      "Most of North America's tallgrass prairie has been turned into farmland.",
      "Tens of millions of bison once roamed the North American prairies.",
      "Prairie dogs aren't dogs at all. They're burrowing squirrels."
    ],
    quiz: { q: "What kind of animal is a prairie dog?", options: ["A squirrel", "A dog", "A rabbit"] },
    words: [["REAP","Harvest, as farmers do on old prairie land"],["RARE","Uncommon, like untouched tallgrass prairie today"],["EAR","An ___ of corn, grown where prairie once stood"],["RIPE","Ready to harvest, like wheat on the plains"],["REPAIR","Fix"],["PAIR","Two of a kind"]] },

  { id: "n7", cat: "Nature", word: "BLIZZARD", wiki: "Blizzard",
    clue: "Severe snowstorm with strong winds and low visibility.",
    summary: "A blizzard is a severe snowstorm with strong winds and blowing snow that make it hard to see.",
    facts: [
      "In the US, a blizzard means winds of 35 mph or more and very poor visibility for at least three hours.",
      "The Great Blizzard of 1888 dropped as much as 58 inches of snow in parts of the Northeast.",
      "Blowing snow can cause a 'whiteout,' when you can't tell the ground from the sky.",
      "A 'ground blizzard' can happen with no new snow, when strong winds whip up snow already on the ground."
    ],
    quiz: { q: "What is it called when blowing snow hides the ground and sky?", options: ["A whiteout", "A blackout", "A deep freeze"] },
    words: [["AIR","It fills with blowing snow in a blizzard"],["LAIR","Den where a bear may sleep through a blizzard"],["RAIL","Train line; the 1888 blizzard shut many down"],["BAD","Very ___ weather, like a blizzard"],["DIAL","Turn this on the radio for storm news"],["LIZARD","Scaly reptile"]] },

  { id: "n8", cat: "Nature", word: "ICEBERG", wiki: "Iceberg",
    clue: "Floating chunk of glacier ice, mostly hidden underwater.",
    summary: "An iceberg is a large piece of freshwater ice that has broken off a glacier or ice shelf and floats in the sea.",
    facts: [
      "About 90 percent of an iceberg is under the water.",
      "Icebergs are fresh water, even though they float in the salty sea.",
      "The International Ice Patrol has watched for icebergs in the North Atlantic since the Titanic sank.",
      "Small icebergs are nicknamed 'growlers' and 'bergy bits.'"
    ],
    quiz: { q: "About how much of an iceberg is underwater?", options: ["About 90%", "About half", "About 10%"] },
    words: [["ICE","An iceberg is made of this, and it's fresh water"],["BERG","Short name for this floating ice"],["BIG","Large, like the hidden part of an iceberg"],["BRIG","Two-masted sailing ship that had to dodge icebergs"],["RIG","Oil ___: tugboats tow icebergs away from it"],["BEIGE","Light tan color"]] },

  { id: "n9", cat: "Nature", word: "REDWOOD", wiki: "Sequoia sempervirens",
    clue: "Towering California tree, the tallest on Earth.",
    summary: "Coast redwoods are evergreen trees of coastal California and Oregon, and the tallest trees on Earth.",
    facts: [
      "The tallest known tree, a redwood named Hyperion, is about 380 feet tall.",
      "Some coast redwoods are more than 2,000 years old.",
      "Their thick, spongy bark helps them survive forest fires.",
      "Summer fog from the Pacific gives redwoods much of the water they need."
    ],
    quiz: { q: "What is the tallest known tree called?", options: ["Hyperion", "Goliath", "Atlas"] },
    words: [["WOOD","Lumber; this tree's is prized for its reddish color"],["RED","Color of this tree's thick bark"],["DEW","Morning wetness, like the fog drops redwoods drink"],["WOODED","Covered in trees, like the redwood coast"],["DOE","Female deer seen in redwood forests"],["DOOR","Way in"]] },

  { id: "n10", cat: "Nature", word: "BAMBOO", wiki: "Bamboo",
    clue: "Giant grass that can grow incredibly fast.",
    summary: "Bamboo is a giant grass with hollow stems; some kinds are among the fastest-growing plants in the world.",
    facts: [
      "Some bamboo can grow about 3 feet in a single day.",
      "Bamboo is a grass, not a tree.",
      "Giant pandas eat almost nothing but bamboo.",
      "Some kinds of bamboo flower only once every several decades, all at the same time."
    ],
    quiz: { q: "What kind of plant is bamboo?", options: ["A grass", "A tree", "A fern"] },
    words: [["BOOM","Bang a bamboo stalk can make when it bursts in a fire"],["BOMB","Explosive"],["BOB","Bounce up and down"],["MOB","Unruly crowd"],["BOO","Ghost's shout"]] },

  { id: "n11", cat: "Nature", word: "SEAWEED", wiki: "Seaweed",
    clue: "Leafy algae growing in the ocean, from kelp to nori.",
    summary: "Seaweed is the common name for many kinds of large algae that grow in the sea.",
    facts: [
      "Seaweed is algae, not a true plant.",
      "Giant kelp can grow up to about 2 feet in a single day.",
      "Nori, the wrap on sushi rolls, is made from seaweed.",
      "Seaweed extracts help thicken foods like ice cream."
    ],
    quiz: { q: "Which sushi wrap is made from seaweed?", options: ["Nori", "Wasabi", "Tofu"] },
    words: [["SEA","Where seaweed grows"],["WEED","Garden pest plant; seaweed isn't really one"],["SEED","Plant starter that seaweed doesn't use"],["WADE","Walk through shallow water past seaweed"],["AWE","What a giant kelp forest can inspire"],["EASE","Comfort"]] },

  { id: "n12", cat: "Nature", word: "TULIPS", wiki: "Tulip",
    clue: "Cup-shaped spring flowers famous in the Netherlands.",
    summary: "Tulips are spring flowers that grow from bulbs and come originally from Central Asia and Turkey.",
    facts: [
      "During 'Tulip Mania' in 1630s Holland, a single bulb could sell for more than a craftsman earned in years.",
      "The Netherlands grows most of the world's tulip bulbs.",
      "Tulips came to Europe from the Ottoman Empire in the 1500s.",
      "Tulip bulbs need a cold winter to bloom in spring."
    ],
    quiz: { q: "What was 'Tulip Mania' in 1630s Holland?", options: ["A craze that made bulbs hugely expensive", "A tulip disease", "A flower parade"] },
    words: [["PUT","Place, as you do tulip bulbs in the ground in fall"],["TIP","Gardening hint, like plant tulip bulbs before winter"],["LIST","Shopping note, maybe with tulip bulbs on it"],["SPLIT","Break in two"],["SUIT","Jacket and pants"],["SLIP","Slide and fall"]] },

  // ───────────── Music & Art (category key "Music") ─────────────
  { id: "m1", cat: "Music", word: "MOZART", wiki: "Wolfgang Amadeus Mozart",
    clue: "Austrian composer who wrote music from the age of five.",
    summary: "Wolfgang Amadeus Mozart (1756–1791) was an Austrian composer who wrote more than 600 works in his short life.",
    facts: [
      "He wrote his first pieces of music at age five.",
      "He wrote more than 600 works, including the opera The Magic Flute.",
      "As a child, he toured Europe's royal courts with his sister Nannerl.",
      "He died at just 35."
    ],
    quiz: { q: "How old was Mozart when he wrote his first music?", options: ["Five", "Fifteen", "Twenty-five"] },
    words: [["ART","Mozart mastered the ___ of writing music"],["ROAM","Travel about, as boy Mozart did across Europe"],["TRAM","Streetcar of Vienna, the city Mozart made home"],["MOAT","Water ring around a castle"],["ARM","Limb with an elbow"]] },

  { id: "m2", cat: "Music", word: "BALLET", wiki: "Ballet",
    clue: "Graceful dance often performed on tiptoe in pointe shoes.",
    summary: "Ballet is a formal style of dance that began in Italian Renaissance courts and grew in France and Russia.",
    facts: [
      "Ballet began in the grand courts of Renaissance Italy in the 1400s.",
      "Ballet steps have French names because it grew up in France under King Louis XIV.",
      "Tchaikovsky wrote the music for The Nutcracker and Swan Lake.",
      "Dancing on the tips of the toes is called dancing 'en pointe.'"
    ],
    quiz: { q: "Which king helped make ballet popular in France?", options: ["Louis XIV", "Henry VIII", "Charlemagne"] },
    words: [["BALL","Fancy dance party, like in the ballet Cinderella"],["BEAT","Dancers count it to keep time with the music"],["TALE","Swan Lake and The Nutcracker each tell one"],["TEA","A Nutcracker dance is named for this hot drink"],["TALL","Rising en pointe makes a dancer look this"],["BELL","Ringing chime"]] },

  { id: "m3", cat: "Music", word: "MONALISA", wiki: "Mona Lisa",
    clue: "Leonardo da Vinci's famous painting of a smiling woman (two words).",
    summary: "The Mona Lisa is a portrait painted by Leonardo da Vinci in the early 1500s and kept at the Louvre in Paris.",
    facts: [
      "It hangs in the Louvre in Paris behind bulletproof glass.",
      "It was stolen in 1911 and missing for more than two years.",
      "It's painted on a wooden panel of poplar, not on canvas.",
      "The woman is believed to be Lisa Gherardini, wife of a merchant in Florence."
    ],
    quiz: { q: "What is the Mona Lisa painted on?", options: ["A wooden panel", "Canvas", "A stone wall"] },
    words: [["OIL","Leonardo painted the Mona Lisa in this paint"],["MAN","Leonardo da Vinci was the ___ who painted her"],["LOAN","France lent it to the US in 1963, a rare ___"],["MAIN","Many call her the Louvre's ___ attraction"],["ALIAS","Other name, like La Gioconda for Mona Lisa"],["SALON","It was stolen from the Louvre's ___ Carré in 1911"]] },

  { id: "m4", cat: "Music", word: "BEATLES", wiki: "The Beatles",
    clue: "Liverpool band of John, Paul, George and Ringo.",
    summary: "The Beatles were an English rock band formed in Liverpool in 1960, one of the most influential bands ever.",
    facts: [
      "They are the best-selling music act of all time.",
      "About 73 million people watched their first Ed Sullivan Show appearance in 1964.",
      "Their last public performance was a surprise show on their London office rooftop in 1969.",
      "The band was John Lennon, Paul McCartney, George Harrison and Ringo Starr."
    ],
    quiz: { q: "Where did the Beatles give their last public performance?", options: ["On a London rooftop", "At Shea Stadium", "In a Liverpool club"] },
    words: [["BEAT","Music word the band's name plays on"],["LET","Their song ___ It Be was a famous hit"],["SEA","Their hometown Liverpool lies by the Irish ___"],["LAST","Their ___ public show was on a London rooftop"],["BEST","They are the ___-selling music act of all time"],["TALES","Story songs like Eleanor Rigby tell these"]] },

  { id: "m5", cat: "Music", word: "TRUMPET", wiki: "Trumpet",
    clue: "Brass horn with three valves and a bright, bold sound.",
    summary: "The trumpet is a brass instrument with the highest voice in the brass family, played by buzzing the lips into a cup-shaped mouthpiece.",
    facts: [
      "A player makes the sound by buzzing their lips into the mouthpiece.",
      "Two trumpets, one silver and one bronze, were found in King Tut's tomb.",
      "Most modern trumpets have three valves.",
      "Louis Armstrong was one of the most famous jazz trumpet players."
    ],
    quiz: { q: "How does a trumpet player make sound?", options: ["By buzzing their lips", "By blowing across a hole", "By plucking a reed"] },
    words: [["MUTE","Cup put in a trumpet's bell to soften its sound"],["TERM","Embouchure is the ___ for a player's lip setup"],["PUT","Place, as a player does lips to a mouthpiece"],["TRUE","Not false"],["UTTER","Say out loud"],["PET","Furry friend"]] },

  { id: "m6", cat: "Music", word: "VANGOGH", wiki: "Vincent van Gogh",
    clue: "Dutch painter of The Starry Night and sunflowers (two words).",
    summary: "Vincent van Gogh (1853–1890) was a Dutch painter whose bold colors and swirling brushwork changed modern art.",
    facts: [
      "He made about 2,100 artworks in just over ten years.",
      "He sold very few paintings while he was alive.",
      "He painted The Starry Night in 1889.",
      "His brother Theo supported him, and hundreds of their letters survive."
    ],
    quiz: { q: "Which famous painting did Van Gogh make in 1889?", options: ["The Starry Night", "The Mona Lisa", "The Scream"] },
    words: [["VAN","Dutch word in his name, Vincent ___ Gogh"],["HANG","His paintings now ___ in museums worldwide"],["AGO","He painted The Starry Night long ___, in 1889"],["NOVA","Star that flares up; he loved painting night skies"],["GONG","Big metal disc you strike"]] },

  { id: "m7", cat: "Music", word: "BROADWAY", wiki: "Broadway theatre",
    clue: "New York theater district famous for musicals.",
    summary: "Broadway theatre means the large professional theaters in New York City's Theater District.",
    facts: [
      "There are 41 Broadway theaters, each with at least 500 seats.",
      "The Phantom of the Opera ran for 35 years, the longest run in Broadway history.",
      "The Tony Awards honor the best Broadway shows each year.",
      "Its bright lights earned it the nickname 'the Great White Way.'"
    ],
    quiz: { q: "Which awards honor the best Broadway shows?", options: ["The Tony Awards", "The Oscars", "The Grammys"] },
    words: [["AWARD","A Tony is one, for the best Broadway shows"],["BOW","Actors take one at the curtain call"],["ROW","Theater seats are set in these, like Row A"],["ROAD","Broadway is a long ___ through New York City"],["WORD","Actors learn every ___ of the script"],["BARD","Shakespeare's nickname, the ___ of Avon"]] },

  { id: "m8", cat: "Music", word: "SYMPHONY", wiki: "Symphony",
    clue: "Long piece for full orchestra, often in four parts.",
    summary: "A symphony is a large piece of music for orchestra, usually in several sections called movements.",
    facts: [
      "Joseph Haydn wrote over 100 symphonies and is called the 'Father of the Symphony.'",
      "Beethoven wrote his Ninth Symphony when he was almost completely deaf.",
      "A symphony usually has four sections called movements.",
      "Beethoven's Ninth ends with the famous 'Ode to Joy.'"
    ],
    quiz: { q: "Which composer wrote his Ninth Symphony while nearly deaf?", options: ["Beethoven", "Mozart", "Bach"] },
    words: [["HYMN","Ode to Joy's tune is also sung as a church ___"],["SON","Beethoven was the ___ of a court singer"],["PONY","Small horse"],["SHOP","Store"],["SPY","Secret agent"],["PHONY","Fake"]] },

  { id: "m9", cat: "Music", word: "CLARINET", wiki: "Clarinet",
    clue: "Woodwind with a single reed and a smooth, warm tone.",
    summary: "The clarinet is a woodwind instrument with a single reed, invented in Germany around 1700.",
    facts: [
      "It was invented in Germany around 1700; Johann Christoph Denner is usually given the credit.",
      "Mozart wrote a famous clarinet concerto.",
      "Benny Goodman, the 'King of Swing,' was a famous jazz clarinet player.",
      "Many clarinets are made of a dark, dense wood called African blackwood."
    ],
    quiz: { q: "What does a clarinet use to make its sound?", options: ["A single reed", "Strings", "Buzzing lips"] },
    words: [["AIR","A player blows this past the reed to make sound"],["CANE","Clarinet reeds are cut from this tall grass"],["LATE","Mozart wrote his clarinet concerto ___ in life"],["LEARN","Many kids ___ the clarinet in school band"],["RENTAL","Many school band clarinets start as one"],["TRAIN","Railway cars"]] },

  { id: "m10", cat: "Music", word: "GUITAR", wiki: "Guitar",
    clue: "Six-string instrument that is strummed or plucked.",
    summary: "The guitar is a string instrument, usually with six strings, played by strumming or plucking.",
    facts: [
      "Most guitars have six strings.",
      "The modern guitar shape was developed in Spain.",
      "Most electric guitars use magnetic pickups to turn the strings' vibrations into an electric signal.",
      "Frets are the metal strips across the neck that mark the notes."
    ],
    quiz: { q: "What are the metal strips across a guitar's neck called?", options: ["Frets", "Keys", "Pedals"] },
    words: [["GUT","Old guitar strings were made of this"],["AIR","Pretend guitar played in thin ___"],["RIG","A guitarist's ___: amp, pedals and gear"],["RAG","Bouncy ragtime tune, played on guitar or piano"],["TUG","Pull hard"],["GRIT","Courage, or sand"]] },

  { id: "m11", cat: "Music", word: "CHOPIN", wiki: "Frédéric Chopin",
    clue: "Polish composer known as the poet of the piano.",
    summary: "Frédéric Chopin (1810–1849) was a Polish composer and pianist who wrote mostly for solo piano.",
    facts: [
      "Almost all of his music is for solo piano.",
      "He gave his first public concert when he was only about eight.",
      "He left Poland at 20 and spent most of the rest of his life in France.",
      "His heart was taken back to Warsaw and rests in a church there."
    ],
    quiz: { q: "Which instrument did Chopin write almost all his music for?", options: ["The piano", "The violin", "The flute"] },
    words: [["ICON","Chopin is a national ___ of Poland"],["COIN","Penny or dime"],["CHOP","Cut with an axe"],["CHIN","Below the mouth"],["PINCH","Small squeeze"],["PIN","Sewing needle's cousin"]] },

  { id: "m12", cat: "Music", word: "POTTERY", wiki: "Pottery",
    clue: "Clay shaped and fired hard into pots and dishes.",
    summary: "Pottery is the craft of shaping clay into objects and firing them at high heat to harden them.",
    facts: [
      "Pottery is one of the oldest human inventions, more than 20,000 years old.",
      "Clay is fired in a very hot oven called a kiln.",
      "The potter's wheel was invented more than 5,000 years ago.",
      "China's Terracotta Army is thought to have more than 8,000 life-size clay soldiers."
    ],
    quiz: { q: "What is the hot oven that hardens pottery called?", options: ["A kiln", "A forge", "A smoker"] },
    words: [["POT","A potter shapes clay into one"],["POTTER","Clay artist at the wheel"],["ROPE","Ancient Japanese potters pressed this into clay"],["TYPE","Stoneware is one ___ of pottery"],["PRETTY","A glazed bowl can be very this"]] },

  // ───────────── Inventions ─────────────
  { id: "i1", cat: "Inventions", word: "PRINTING", wiki: "Printing press",
    clue: "Press developed by Gutenberg that spread books everywhere.",
    summary: "The printing press, developed by Johannes Gutenberg around 1440, made it possible to print books quickly and cheaply.",
    facts: [
      "Johannes Gutenberg's press, using movable metal type, appeared around 1440.",
      "The Gutenberg Bible, printed in the 1450s, was one of the first major books printed in Europe.",
      "Movable type made of clay was invented in China by Bi Sheng about 400 years earlier.",
      "By 1500, European presses had printed more than 20 million books."
    ],
    quiz: { q: "Who developed the printing press in Europe around 1440?", options: ["Johannes Gutenberg", "Thomas Edison", "Leonardo da Vinci"] },
    words: [["PRINT","What a press does to a page"],["TIN","Metal mixed with lead to cast printing type"],["GRIP","Firm hold"],["RING","Jewelry band"],["GRIN","Big smile"],["TRIP","Journey"]] },

  { id: "i2", cat: "Inventions", word: "COMPASS", wiki: "Compass",
    clue: "Magnetic tool whose needle points north.",
    summary: "A compass is a tool for finding direction; its magnetized needle lines up with Earth's magnetic field.",
    facts: [
      "The first compasses were made in China, from a magnetic stone called lodestone.",
      "A compass points to magnetic north, which isn't quite the same place as the North Pole.",
      "Magnetic north slowly wanders; lately it has been drifting toward Siberia.",
      "Sailors began using compasses to navigate around 1,000 years ago."
    ],
    quiz: { q: "Where does a compass needle point?", options: ["Toward magnetic north", "Toward the Sun", "Toward the nearest ocean"] },
    words: [["MAP","What a compass helps you read"],["MOSS","Old saying: it grows on a tree's north side"],["CAMP","Hikers use a compass to find their way back to it"],["PASS","Go by"],["SOAP","Bubbly cleaner"],["MASS","Weight of matter"]] },

  { id: "i3", cat: "Inventions", word: "CAMERA", wiki: "Camera",
    clue: "Device that captures light to make pictures.",
    summary: "A camera is a device that captures light through a lens to record pictures.",
    facts: [
      "The oldest surviving photograph, from about 1827, needed many hours, maybe days, of light.",
      "The word comes from 'camera obscura,' Latin for 'dark room.'",
      "Kodak's first camera, in 1888, was sold with the slogan 'You press the button, we do the rest.'",
      "Steven Sasson, an engineer at Kodak, built the first digital camera in 1975."
    ],
    quiz: { q: "What does 'camera obscura' mean?", options: ["Dark room", "Bright light", "Magic box"] },
    words: [["CAM","Short word for it, as in a dash ___"],["ERA","Time period; photos went digital in this one"],["ARM","Hold a camera at ___'s length for a selfie"],["CARE","Gentle handling a camera lens needs"],["CREAM","Milk's top layer"],["ACRE","Land measure"]] },

  { id: "i4", cat: "Inventions", word: "EDISON", wiki: "Thomas Edison",
    clue: "American inventor of the phonograph and a long-lasting light bulb.",
    summary: "Thomas Edison (1847–1931) was an American inventor who developed the phonograph, a practical light bulb and early movie cameras.",
    facts: [
      "He held 1,093 US patents.",
      "His lab in Menlo Park, New Jersey, was one of the first industrial research labs.",
      "His phonograph of 1877 was the first machine that could record sound and play it back.",
      "In 1882 he opened the Pearl Street power station in New York, one of the first of its kind."
    ],
    quiz: { q: "What did Edison's phonograph do?", options: ["Record and play back sound", "Take photos", "Send telegrams"] },
    words: [["NOISE","Sound, which Edison's phonograph could record"],["ONE","Edison held over ___ thousand US patents"],["SON","Charles, Edison's ___, became New Jersey governor"],["SEND","Edison's telegraph could ___ four messages on one wire"],["NOSE","Smelling part"],["DONE","Finished"]] },

  { id: "i5", cat: "Inventions", word: "ELEVATOR", wiki: "Elevator",
    clue: "Moving car that lifts people between floors.",
    summary: "An elevator is a car that moves people and goods between floors, usually pulled by steel cables.",
    facts: [
      "In 1854, Elisha Otis showed off his safety brake by having the rope cut while he stood on the platform.",
      "Safe elevators made tall skyscrapers practical.",
      "Ancient Romans used lifts to raise animals into the Colosseum arena.",
      "Most tall-building elevators hang from steel cables with a heavy counterweight."
    ],
    quiz: { q: "What did Elisha Otis show off in 1854?", options: ["An elevator safety brake", "The escalator", "The skyscraper"] },
    words: [["TRAVEL","What elevators help you do between floors"],["REVEAL","Show off, as Otis did with his safety brake in 1854"],["LEVER","Pry bar"],["LATER","Afterward"],["OVAL","Egg shape"],["VOTER","Ballot caster"]] },

  { id: "i6", cat: "Inventions", word: "VACCINE", wiki: "Vaccine",
    clue: "Shot that trains your body to fight a disease.",
    summary: "A vaccine trains the immune system to recognize and fight a disease, without causing the illness.",
    facts: [
      "Edward Jenner made the first vaccine, against smallpox, in 1796.",
      "The word comes from 'vacca,' Latin for cow, because Jenner used cowpox.",
      "Thanks to vaccines, smallpox was wiped out worldwide by 1980.",
      "Jonas Salk's polio vaccine was announced as safe and effective in 1955."
    ],
    quiz: { q: "Which disease did the first vaccine protect against?", options: ["Smallpox", "The flu", "Measles"] },
    words: [["NICE","Pleasant"],["VICE","Bad habit"],["CAVE","Rocky hollow"],["VEIN","Blood vessel"],["VINE","Grape plant"],["CANE","Walking stick"]] },

  { id: "i7", cat: "Inventions", word: "INTERNET", wiki: "Internet",
    clue: "Worldwide network linking billions of computers.",
    summary: "The Internet is a global network of computers that share information using common rules called protocols.",
    facts: [
      "It grew out of ARPANET, a US research network that sent its first message in 1969.",
      "Tim Berners-Lee invented the World Wide Web in 1989.",
      "The first ARPANET message was meant to be 'LOGIN,' but the system crashed after 'LO.'",
      "Most internet traffic between continents travels through cables on the ocean floor."
    ],
    quiz: { q: "What was the first message sent over ARPANET?", options: ["LO", "HELLO", "TEST"] },
    words: [["NET","Surf the ___: go on the Internet"],["ENTER","Key you press to send an online search"],["ENTIRE","Whole, like the globe the Internet spans"],["NINE","After eight"],["TREE","Woody plant"],["TENT","Camping shelter"]] },

  { id: "i8", cat: "Inventions", word: "BATTERY", wiki: "Electric battery",
    clue: "Stores chemical energy and gives it back as electricity.",
    summary: "A battery stores chemical energy and releases it as electricity through a circuit.",
    facts: [
      "Alessandro Volta built the first electric battery, the 'voltaic pile,' in 1800.",
      "The unit of electrical pressure, the volt, is named after him.",
      "Rechargeable lithium-ion batteries power phones and electric cars.",
      "Benjamin Franklin first used the word 'battery' for a set of linked glass jars that stored electric charge."
    ],
    quiz: { q: "Which unit is named after battery inventor Alessandro Volta?", options: ["The volt", "The watt", "The amp"] },
    words: [["YEAR","Volta built his battery in the ___ 1800"],["BAR","A battery icon may show charge as a filled ___"],["RATE","Charge ___: how fast a battery refills"],["BATTER","Pancake mix, or a hitter at the plate"],["TREAT","Special snack"],["TRAY","Serving plate"]] },

  { id: "i9", cat: "Inventions", word: "RAILROAD", wiki: "First transcontinental railroad",
    clue: "Iron tracks that first linked the US coasts in 1869.",
    summary: "The first transcontinental railroad, finished in 1869, linked the eastern US rail network with California.",
    facts: [
      "It was finished with a golden spike at Promontory Summit, Utah, on May 10, 1869.",
      "Thousands of Chinese immigrant workers built much of the western part.",
      "It cut a cross-country trip from months to about a week.",
      "Two companies built it: the Central Pacific from the west and the Union Pacific from the east."
    ],
    quiz: { q: "What was used to finish the first transcontinental railroad?", options: ["A golden spike", "A silver hammer", "A brass bell"] },
    words: [["RAIL","Steel track a train rolls on"],["LAID","Put down, like miles of track by 1869"],["ARID","Dry, like the Nevada desert the railroad crossed"],["ROAR","Loud sound of a steam engine"],["LOAD","Freight a train carries"],["OIL","Engine lube"]] },

  { id: "i10", cat: "Inventions", word: "WRIGHTS", wiki: "Wright brothers",
    clue: "Brothers who made the first powered airplane flight in 1903.",
    summary: "Orville and Wilbur Wright were American brothers who made the first controlled, powered airplane flights in 1903.",
    facts: [
      "Their first flight, near Kitty Hawk, North Carolina, lasted 12 seconds.",
      "They ran a bicycle shop in Dayton, Ohio.",
      "They tested wing shapes in a homemade wind tunnel.",
      "A piece of their 1903 Flyer went to the Moon with Apollo 11."
    ],
    quiz: { q: "How long did the Wright brothers' first flight last?", options: ["12 seconds", "12 minutes", "1 hour"] },
    words: [["RIGHT","Correct, or the opposite of left"],["GRIT","Sandy bits, like on the Kitty Hawk dunes"],["WISH","Dream of flying the brothers made come true"],["SIT","The 1903 Flyer's pilot didn't ___; he lay flat"],["SIGHT","Vision"],["WRIST","Watch spot"]] },

  { id: "i11", cat: "Inventions", word: "MAGNET", wiki: "Magnet",
    clue: "Object that pulls on iron, with a north and a south pole.",
    summary: "A magnet makes a magnetic field that pulls on iron and pushes or pulls on other magnets.",
    facts: [
      "Opposite poles pull together, and matching poles push apart.",
      "Lodestone is a naturally magnetic rock that people discovered thousands of years ago.",
      "Electric motors and generators work using magnets and coils of wire.",
      "The Earth itself acts like a giant magnet."
    ],
    quiz: { q: "What happens when two north poles of magnets meet?", options: ["They push apart", "They stick together", "Nothing"] },
    words: [["NAME","Magnet's ___ likely comes from old Magnesia"],["AGENT","Spy or rep"],["GAME","Something to play"],["TEAM","Players together"],["GATE","Fence door"],["MEAT","Steak or ham"]] },

  { id: "i12", cat: "Inventions", word: "ROBOTS", wiki: "Robot",
    clue: "Machines that do tasks on their own, sometimes shaped like people.",
    summary: "A robot is a machine that can carry out tasks on its own, often controlled by a computer.",
    facts: [
      "The word 'robot' first appeared in a 1920 play by Czech writer Karel Čapek.",
      "It comes from the Czech word 'robota,' meaning forced labor.",
      "Unimate, the first industrial robot, went to work at a General Motors plant in 1961.",
      "The first robot rover drove on Mars in 1997."
    ],
    quiz: { q: "Where does the word 'robot' come from?", options: ["A Czech play", "A NASA lab", "A Japanese toy"] },
    words: [["SORT","Some warehouse robots ___ packages"],["TORSO","Body middle, which many humanoid robots have"],["BOOT","Start up a robot's computer: ___ it up"],["BOOST","Lift up"],["ROOT","Plant's anchor"],["ORB","Round sphere"]] }
];

if (typeof module !== "undefined") module.exports = { CATS: CATS, PUZZLES: PUZZLES };
