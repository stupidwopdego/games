# WonderWheel

A gentle word game. Swipe or tap the letters on the wheel to find the mystery
word and the smaller words hidden in it. Each mystery word unlocks a photo,
facts you can have read aloud, and a quick quiz question. Everything you
discover is kept in your Scrapbook.

## Playing

- **Find words:** swipe across the letters, or tap them one by one and press **Check**.
- **Clues:** tap any word on the board to see its clue, or press **❓ Clue** for the mystery word.
- **Hints (10⭐):** shows one letter of the word whose clue is open, or of the mystery word.
- **Stars:** mystery word +15, other board words +5, finishing the board +10,
  bonus words +3, a right quiz answer +5.
- **Progress:** the bar at the top counts how many of the topics you've discovered.
  New topics always come before ones you've already seen, and the game picks up
  where you left off if you close it.

## Running it

It's a plain web page with no build step. Open `index.html` in a browser, or
host the folder anywhere that serves static files (for example GitHub Pages).
Photos and summaries come from Wikipedia when there's an internet connection;
without one, the game still works using the built-in summary and facts.

## Files

| File | What's in it |
|------|--------------|
| `index.html` | The page layout |
| `css/style.css` | Colors, sizes and animations |
| `js/data.js` | Categories and all topics: words, clues, facts and quiz questions |
| `js/words.js` | The bonus word list |
| `js/logic.js` | Small rules: picking the next topic, hints, quiz order, resuming |
| `js/game.js` | Everything on screen |
| `tests/run-tests.js` | Checks the data and the rules |

## Checking your changes

You only need Node.js:

```
node tests/run-tests.js
```

It checks that every board word can be spelled from its mystery word, that
every topic has 4 facts and a quiz, that every bonus word fits at least one
topic, and that the topic picking and saving rules work.

## Adding a topic

Copy one of the entries in `js/data.js` and change it. Rules the tests check:

- `word`: 6 to 8 capital letters.
- `words`: 5 or 6 smaller words, 3 to 6 letters, using only the mystery word's letters.
- `facts`: exactly 4. Please check each fact against a reliable source.
- `quiz.options`: 3 answers, with the **right answer first** (the game shuffles them).
- `wiki`: the exact Wikipedia article title, used for the photo.

Then run the tests.
