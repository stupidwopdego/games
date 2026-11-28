// Small pure helpers used by the game. No page access here, so they can be
// tested with plain Node: `node tests/run-tests.js`.

// Count each letter in a word.
function letterCounts(word) {
  var m = {};
  for (var i = 0; i < word.length; i++) m[word[i]] = (m[word[i]] || 0) + 1;
  return m;
}

// Can `word` be spelled using the letters of `letters` (each letter used once)?
function canSpell(word, letters) {
  var have = letterCounts(letters), need = letterCounts(word);
  for (var k in need) if ((have[k] || 0) < need[k]) return false;
  return true;
}

// Every word on a topic's board: the featured word first, then the others.
function boardWords(p) {
  return [p.word].concat(p.words.map(function (x) { return x[0]; }));
}

// True once every word on the board is solved.
function isComplete(p, solved) {
  return boardWords(p).every(function (w) { return solved.has(w); });
}

// Which word a hint should help with. If the player has a word's clue open,
// help with that word; otherwise the featured word first, then the rest.
function hintTarget(p, solved, openWord) {
  var words = boardWords(p);
  if (openWord && words.indexOf(openWord) >= 0 && !solved.has(openWord)) return openWord;
  for (var i = 0; i < words.length; i++) if (!solved.has(words[i])) return words[i];
  return null;
}

// Pick the next topic id. Topics she hasn't discovered yet come first; topics
// seen in the last few rounds are skipped when there is anything else left.
//   puzzles: topic list, seen: Set of discovered ids,
//   recent: array of recently shown ids (current one included), rand: () => [0,1)
function pickNext(puzzles, seen, recent, rand) {
  rand = rand || Math.random;
  var ids = puzzles.map(function (p) { return p.id; });
  var current = recent.length ? recent[recent.length - 1] : null;
  var notRecent = function (id) { return recent.indexOf(id) < 0; };
  var unseen = ids.filter(function (id) { return !seen.has(id); });
  var pools = [
    unseen.filter(notRecent),
    unseen.filter(function (id) { return id !== current; }),
    ids.filter(notRecent),
    ids.filter(function (id) { return id !== current; }),
    ids
  ];
  for (var i = 0; i < pools.length; i++) {
    if (pools[i].length) return pools[i][Math.floor(rand() * pools[i].length)];
  }
  return null;
}

// Next topic from the same category, undiscovered ones first.
function pickInCategory(puzzles, cat, seen, recent, rand) {
  var same = puzzles.filter(function (p) { return p.cat === cat; });
  return same.length ? pickNext(same, seen, recent, rand) : pickNext(puzzles, seen, recent, rand);
}

// How many topics in a category are still undiscovered.
function leftInCategory(puzzles, cat, seen) {
  return puzzles.filter(function (p) { return p.cat === cat && !seen.has(p.id); }).length;
}

// Shuffle a copy of an array.
function shuffled(a, rand) {
  rand = rand || Math.random;
  var r = a.slice();
  for (var i = r.length - 1; i > 0; i--) {
    var j = Math.floor(rand() * (i + 1));
    var t = r[i]; r[i] = r[j]; r[j] = t;
  }
  return r;
}

// Quiz options in random order. The data lists the right answer first.
function quizChoices(quiz, rand) {
  return shuffled(quiz.options.map(function (text, i) { return { text: text, right: i === 0 }; }), rand);
}

// Check a saved in-progress round before resuming it, so a damaged or
// out-of-date save can't break the game. Returns a clean copy or null.
function restoreRound(saved, puzzles) {
  if (!saved || typeof saved !== "object") return null;
  var p = null;
  for (var i = 0; i < puzzles.length; i++) if (puzzles[i].id === saved.id) p = puzzles[i];
  if (!p) return null;
  var letters = Array.isArray(saved.letters) ? saved.letters.join("") : "";
  if (letters.length !== p.word.length || !canSpell(letters, p.word)) return null;
  var words = boardWords(p);
  var solved = (Array.isArray(saved.solved) ? saved.solved : []).filter(function (w) { return words.indexOf(w) >= 0; });
  var bonus = (Array.isArray(saved.bonus) ? saved.bonus : []).filter(function (w) { return typeof w === "string"; });
  var hints = {};
  if (saved.hints && typeof saved.hints === "object") {
    words.forEach(function (w) {
      var h = saved.hints[w];
      if (Array.isArray(h)) hints[w] = h.filter(function (n) { return Number.isInteger(n) && n >= 0 && n < w.length; });
    });
  }
  return { id: p.id, letters: letters.split(""), solved: solved, bonus: bonus, hints: hints };
}

var WWLogic = {
  letterCounts: letterCounts, canSpell: canSpell, boardWords: boardWords,
  isComplete: isComplete, hintTarget: hintTarget, pickNext: pickNext,
  pickInCategory: pickInCategory, leftInCategory: leftInCategory,
  shuffled: shuffled, quizChoices: quizChoices, restoreRound: restoreRound
};
if (typeof module !== "undefined") module.exports = WWLogic;
