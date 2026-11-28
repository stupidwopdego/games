// Plain Node tests, no installs needed:  node tests/run-tests.js
"use strict";
var path = require("path");
var root = path.join(__dirname, "..");
var data = require(path.join(root, "js/data.js"));
var BONUS = require(path.join(root, "js/words.js")).BONUS;
var L = require(path.join(root, "js/logic.js"));
var CATS = data.CATS, PUZZLES = data.PUZZLES;

var passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log("  ok  " + name); }
  catch (e) { failed++; console.log("  FAIL " + name + "\n       " + e.message); }
}
function check(cond, msg) { if (!cond) throw new Error(msg); }
function problems(list) { check(list.length === 0, list.slice(0, 10).join("; ") + (list.length > 10 ? " …" : "")); }

// Seeded random numbers so tests are repeatable.
function seeded(n) { return function () { n = (n * 16807) % 2147483647; return (n - 1) / 2147483646; }; }

console.log("Topic data");

test("there are about 100 topics, at least 10 in every category", function () {
  check(PUZZLES.length >= 90, "only " + PUZZLES.length + " topics");
  Object.keys(CATS).forEach(function (c) {
    var n = PUZZLES.filter(function (p) { return p.cat === c; }).length;
    check(n >= 10, c + " has " + n + " topics");
  });
});

test("every topic has all its fields", function () {
  var bad = [];
  PUZZLES.forEach(function (p) {
    ["id", "cat", "word", "wiki", "clue", "summary"].forEach(function (k) {
      if (typeof p[k] !== "string" || !p[k].trim()) bad.push(p.id + " missing " + k);
    });
    if (!CATS[p.cat]) bad.push(p.id + " has unknown category " + p.cat);
  });
  problems(bad);
});

test("topic ids and featured words are unique", function () {
  var ids = {}, words = {}, bad = [];
  PUZZLES.forEach(function (p) {
    if (ids[p.id]) bad.push("id " + p.id); ids[p.id] = 1;
    if (words[p.word]) bad.push("word " + p.word); words[p.word] = 1;
  });
  problems(bad);
});

test("featured words are 6 to 8 capital letters", function () {
  problems(PUZZLES.filter(function (p) { return !/^[A-Z]{6,8}$/.test(p.word); }).map(function (p) { return p.word; }));
});

test("every topic has 4 facts, each a full sentence", function () {
  var bad = [];
  PUZZLES.forEach(function (p) {
    if (!Array.isArray(p.facts) || p.facts.length !== 4) bad.push(p.id + " has " + (p.facts || []).length + " facts");
    else p.facts.forEach(function (f, i) { if (!/^[A-Z0-9'"].*[.!?'"”]$/.test(f)) bad.push(p.id + " fact " + (i + 1)); });
  });
  problems(bad);
});

test("every quiz has a question and 3 different answers", function () {
  var bad = [];
  PUZZLES.forEach(function (p) {
    var q = p.quiz;
    if (!q || typeof q.q !== "string" || !/\?$/.test(q.q)) bad.push(p.id + " question");
    else if (!Array.isArray(q.options) || q.options.length !== 3) bad.push(p.id + " options");
    else if (new Set(q.options).size !== 3) bad.push(p.id + " repeated option");
  });
  problems(bad);
});

test("board words are 3 to 6 letters, spellable from the featured word, and not repeated", function () {
  var bad = [];
  PUZZLES.forEach(function (p) {
    if (!Array.isArray(p.words) || p.words.length < 5 || p.words.length > 6) bad.push(p.id + " has " + (p.words || []).length + " words");
    var seenW = {};
    (p.words || []).forEach(function (pair) {
      var w = pair[0];
      if (!/^[A-Z]{3,6}$/.test(w)) bad.push(p.id + " " + w + " length");
      if (!L.canSpell(w, p.word)) bad.push(p.id + " " + w + " can't be spelled from " + p.word);
      if (w === p.word) bad.push(p.id + " " + w + " is the featured word");
      if (seenW[w]) bad.push(p.id + " " + w + " twice");
      if (typeof pair[1] !== "string" || !pair[1].trim()) bad.push(p.id + " " + w + " has no clue");
      seenW[w] = 1;
    });
  });
  problems(bad);
});

console.log("Bonus words");

test("the bonus list is big", function () {
  check(BONUS.size >= 1000, "only " + BONUS.size + " words");
});

test("every bonus word is 3 to 8 capital letters and can be found in some topic", function () {
  var bad = [];
  BONUS.forEach(function (w) {
    if (!/^[A-Z]{3,8}$/.test(w)) bad.push(w + " format");
    else if (!PUZZLES.some(function (p) { return L.canSpell(w, p.word); })) bad.push(w + " fits no topic");
  });
  problems(bad);
});

test("every topic has some bonus words to find", function () {
  var bad = [];
  PUZZLES.forEach(function (p) {
    var n = 0;
    BONUS.forEach(function (w) { if (L.canSpell(w, p.word)) n++; });
    if (n < 3) bad.push(p.word + " has " + n);
  });
  problems(bad);
});

console.log("Game rules");

test("canSpell uses each letter only once", function () {
  check(L.canSpell("POPE", "POMPEII"), "POPE fits POMPEII");
  check(!L.canSpell("MIME", "POMPEII"), "MIME needs two Ms");
  check(L.canSpell("MOP", "POMPEII"), "MOP fits POMPEII");
});

test("pickNext gives undiscovered topics first", function () {
  var rand = seeded(7), seen = new Set(PUZZLES.slice(0, PUZZLES.length - 3).map(function (p) { return p.id; }));
  var left = PUZZLES.slice(-3).map(function (p) { return p.id; });
  for (var i = 0; i < 50; i++) {
    var id = L.pickNext(PUZZLES, seen, [], rand);
    check(left.indexOf(id) >= 0, "picked already-discovered " + id);
  }
});

test("pickNext never repeats the current topic and avoids recent ones", function () {
  var rand = seeded(3), all = new Set(PUZZLES.map(function (p) { return p.id; }));
  var recent = PUZZLES.slice(0, 5).map(function (p) { return p.id; });
  for (var i = 0; i < 100; i++) {
    var id = L.pickNext(PUZZLES, all, recent, rand);
    check(recent.indexOf(id) < 0, "picked recent " + id);
  }
  var one = [PUZZLES[0], PUZZLES[1]];
  for (var j = 0; j < 20; j++) check(L.pickNext(one, new Set(), ["a1"], rand) === one[1].id, "repeated current topic");
});

test("pickNext goes back to an unseen topic she skipped before repeating seen ones", function () {
  var two = PUZZLES.slice(0, 3), seen = new Set([two[0].id, two[1].id]);
  check(L.pickNext(two, seen, [two[2].id, two[0].id], seeded(5)) === two[2].id, "should come back to the unseen one");
});

test("pickInCategory stays in the category, new topics first", function () {
  var rand = seeded(9), cat = PUZZLES[0].cat;
  var inCat = PUZZLES.filter(function (p) { return p.cat === cat; });
  var seen = new Set(inCat.slice(0, inCat.length - 2).map(function (p) { return p.id; }));
  var left = inCat.slice(-2).map(function (p) { return p.id; });
  for (var i = 0; i < 40; i++) {
    var id = L.pickInCategory(PUZZLES, cat, seen, [inCat[0].id], rand);
    check(left.indexOf(id) >= 0, "picked " + id);
  }
  check(L.leftInCategory(PUZZLES, cat, seen) === 2, "two left");
  var all = new Set(inCat.map(function (p) { return p.id; }));
  check(L.leftInCategory(PUZZLES, cat, all) === 0, "none left");
  for (var j = 0; j < 40; j++) {
    var p2 = L.pickInCategory(PUZZLES, cat, all, [inCat[0].id], rand);
    check(p2 !== inCat[0].id && inCat.some(function (p) { return p.id === p2; }), "replay stays in category, not current");
  }
});

test("hintTarget helps with the word whose clue is open", function () {
  var p = PUZZLES[0], solved = new Set();
  check(L.hintTarget(p, solved, null) === p.word, "featured word first");
  check(L.hintTarget(p, solved, p.words[2][0]) === p.words[2][0], "open clue word");
  solved.add(p.words[2][0]);
  check(L.hintTarget(p, solved, p.words[2][0]) === p.word, "solved open word falls back");
  L.boardWords(p).forEach(function (w) { solved.add(w); });
  check(L.hintTarget(p, solved, null) === null, "nothing left");
});

test("quizChoices keeps all answers and marks exactly one right", function () {
  PUZZLES.forEach(function (p) {
    var c = L.quizChoices(p.quiz, seeded(11));
    check(c.length === 3, p.id + " lost an answer");
    check(c.filter(function (x) { return x.right; }).length === 1, p.id + " right answers");
    check(c.filter(function (x) { return x.right; })[0].text === p.quiz.options[0], p.id + " wrong one marked right");
  });
});

test("restoreRound accepts a good save and rejects a broken one", function () {
  var p = PUZZLES[0];
  var good = L.restoreRound({ id: p.id, letters: p.word.split("").reverse(), solved: [p.words[0][0], "JUNK"], bonus: ["PAY"], hints: { PLAY: [0, 9] } }, PUZZLES);
  check(good && good.id === p.id, "good save restored");
  check(good.solved.length === 1, "junk solved word dropped");
  check(good.hints.PLAY.length === 1, "out-of-range hint dropped");
  check(L.restoreRound({ id: "zz", letters: [] }, PUZZLES) === null, "unknown topic");
  check(L.restoreRound({ id: p.id, letters: ["X", "Y"] }, PUZZLES) === null, "wrong letters");
  check(L.restoreRound("nonsense", PUZZLES) === null, "not an object");
  check(L.restoreRound(null, PUZZLES) === null, "nothing saved");
});

test("board-word clues tie to the topic and never give away the mystery word", function () {
  PUZZLES.forEach(function (p) {
    p.words.forEach(function (w) {
      var m = L.maskClue(w[1], p);
      check(m.toUpperCase().indexOf(p.word) === -1, p.id + " " + w[0] + " clue gives away " + p.word);
      check(m.replace(/\(mystery word\)/g, "").replace(/[^a-z]/gi, "").length >= 3, p.id + " " + w[0] + " clue is empty after masking");
    });
  });
  var cheetah = { word: "CHEETAH" };
  check(L.maskClue("Cheetahs eat fast", cheetah) === "(mystery word) eat fast", "plural masked");
  check(L.maskClue("A cheetah's spots", cheetah) === "A (mystery word)'s spots", "possessive masked");
  check(L.maskClue("Leonardo painted the Mona Lisa", { word: "MONALISA" }) === "Leonardo painted the (mystery word)", "two-word name masked");
  check(L.maskClue("Lions hunt at night", cheetah) === "Lions hunt at night", "other words untouched");
});

console.log("\n" + passed + " passed, " + failed + " failed");
process.exit(failed ? 1 : 0);
