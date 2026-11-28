// WonderWheel game screen. Data lives in data.js and words.js, and the small
// rules (picking topics, hints, quiz order) live in logic.js.
(function () {
  "use strict";
  var L = WWLogic;
  var $ = function (id) { return document.getElementById(id); };
  var byId = {};
  PUZZLES.forEach(function (p) { byId[p.id] = p; });

  // ── Saved data ────────────────────────────────────────────────
  function getLS(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }
  function getJSON(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function setLS(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var scrap = getJSON("ww_scrapbook", []);
  if (!Array.isArray(scrap)) scrap = [];
  scrap = scrap.filter(function (x) { return x && typeof x === "object" && typeof x.id === "string"; });

  // Topics she has discovered. Older saves only had the scrapbook, so count those too.
  var seenList = getJSON("ww_seen", []);
  var seen = new Set((Array.isArray(seenList) ? seenList : []).filter(function (id) { return byId[id]; }));
  scrap.forEach(function (x) { if (byId[x.id]) seen.add(x.id); });

  var quizDone = getJSON("ww_quiz", {});
  if (!quizDone || typeof quizDone !== "object" || Array.isArray(quizDone)) quizDone = {};

  var state = {
    stars: Number(getLS("ww_stars", "60")) || 60,
    sound: getLS("ww_sound", "true") !== "false",
    recent: [], p: PUZZLES[0], letters: [], sel: [],
    solved: new Set(), bonus: new Set(), hints: {},
    mainClue: false, slotClue: null, filter: "All", pop: null
  };

  function save() {
    var hints = {};
    Object.keys(state.hints).forEach(function (w) { hints[w] = Array.from(state.hints[w]); });
    setLS("ww_stars", String(state.stars));
    setLS("ww_sound", String(state.sound));
    setLS("ww_scrapbook", JSON.stringify(scrap));
    setLS("ww_seen", JSON.stringify(Array.from(seen)));
    setLS("ww_quiz", JSON.stringify(quizDone));
    setLS("ww_current", JSON.stringify({
      id: state.p.id, letters: state.letters, solved: Array.from(state.solved),
      bonus: Array.from(state.bonus), hints: hints
    }));
    $("starsCount").textContent = state.stars;
    $("scrapCount").textContent = scrap.length;
    $("soundBtn").textContent = state.sound ? "🔊" : "🔇";
    var n = PUZZLES.length, d = seen.size;
    $("progressText").textContent = d >= n ? "All " + n + " topics discovered! 🎉" : "Discovered " + d + " of " + n + " topics";
    $("progressFill").style.width = Math.round(100 * d / n) + "%";
  }

  // ── Sound ─────────────────────────────────────────────────────
  var actx = null;
  function tone(freq, dur, vol) {
    if (!state.sound) return;
    dur = dur || 0.09; vol = vol || 0.12;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!actx) actx = new AC();
      if (actx.state === "suspended") actx.resume();
      var o = actx.createOscillator(), g = actx.createGain();
      o.frequency.value = freq;
      g.gain.setValueAtTime(vol, actx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur);
      o.connect(g); g.connect(actx.destination);
      o.start(); o.stop(actx.currentTime + dur);
    } catch (e) {}
  }
  function chime(major) {
    (major ? [523, 659, 784, 1046] : [659, 880]).forEach(function (f, i) { setTimeout(function () { tone(f, 0.22, 0.11); }, i * 55); });
  }

  // ── Rounds ────────────────────────────────────────────────────
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function catName(c) { return (CATS[c] && CATS[c].n) || c; }
  function catOf(c) { return CATS[c] || { e: "⭐", c: "#256d5b", s: "rgba(37,109,91,.15)" }; }

  function startRound(p, restored) {
    stopSpeech(); closeModals();
    state.p = p;
    if (state.recent[state.recent.length - 1] !== p.id) state.recent.push(p.id);
    if (state.recent.length > 6) state.recent.shift();
    state.sel = []; state.mainClue = false; state.slotClue = null; state.pop = null;
    if (restored) {
      state.letters = restored.letters;
      state.solved = new Set(restored.solved);
      state.bonus = new Set(restored.bonus);
      state.hints = {};
      Object.keys(restored.hints).forEach(function (w) { state.hints[w] = new Set(restored.hints[w]); });
    } else {
      state.letters = L.shuffled(p.word.split(""));
      if (state.letters.join("") === p.word) state.letters = L.shuffled(state.letters);
      state.solved = new Set(); state.bonus = new Set(); state.hints = {};
    }
    var t = catOf(p.cat);
    document.documentElement.style.setProperty("--accent", t.c);
    document.documentElement.style.setProperty("--soft", t.s);
    $("catBadge").textContent = t.e + " " + catName(p.cat);
    $("clueBtn").textContent = "❓ Clue";
    renderAll();
  }

  function nextPuzzle() {
    var id = L.pickNext(PUZZLES, seen, state.recent);
    startRound(byId[id] || PUZZLES[0], null);
  }

  // ── Drawing the board ─────────────────────────────────────────
  function renderAll() {
    save(); renderClue(); renderBoard(); renderStatus(); renderWheel();
    var done = state.solved.has(state.p.word);
    $("viewFactBtn").hidden = !done;
    $("skipBtn").hidden = done;
    state.pop = null;
  }

  function renderClue() {
    var box = $("clueBox");
    if (state.slotClue) {
      $("clueTitle").textContent = "Word clue · " + state.slotClue.w.length + " letters";
      $("clueText").textContent = state.slotClue.q;
      box.classList.add("visible");
    } else if (state.mainClue) {
      $("clueTitle").textContent = "Mystery word clue";
      $("clueText").textContent = state.p.clue;
      box.classList.add("visible");
    } else box.classList.remove("visible");
  }

  function makeTiles(word) {
    var row = el("div", "tiles-row");
    var ok = state.solved.has(word), h = state.hints[word] || new Set(), pop = state.pop === word;
    for (var i = 0; i < word.length; i++) {
      var t = el("div", "tile" + (ok ? " solved" : "") + (pop ? " pop" : "") + (!ok && h.has(i) ? " hinted" : ""));
      t.style.setProperty("--i", i);
      t.textContent = (ok || h.has(i)) ? word[i] : "";
      row.appendChild(t);
    }
    return row;
  }

  function renderBoard() {
    var b = $("board"), p = state.p, ok = state.solved.has(p.word);
    b.textContent = "";
    var fc = el("button", "featured-card" + (p.word.length >= 8 ? " long" : "") + (state.slotClue && state.slotClue.w === p.word ? " active-clue" : ""));
    fc.type = "button";
    fc.append(el("div", "featured-label", ok ? "✨ Discovered! Tap for photo & facts" : "🔍 Mystery word · tap for a clue"), makeTiles(p.word));
    fc.onclick = function () { if (ok) openDiscovery(); else toggleSlot(p.word, p.clue); };
    b.appendChild(fc);

    var g = el("div", "subgrid");
    p.words.forEach(function (pair) {
      var w = pair[0], q = pair[1];
      var card = el("button", "word-card" + (state.slotClue && state.slotClue.w === w ? " active-clue" : "") + (state.solved.has(w) ? " done" : ""));
      card.type = "button";
      card.appendChild(makeTiles(w));
      card.onclick = function () { if (!state.solved.has(w)) toggleSlot(w, q); };
      g.appendChild(card);
    });
    b.appendChild(g);
  }

  function toggleSlot(w, q) {
    state.slotClue = (state.slotClue && state.slotClue.w === w) ? null : { w: w, q: q };
    state.mainClue = false; $("clueBtn").textContent = "❓ Clue";
    tone(587, 0.06, 0.08); renderClue(); renderBoard();
  }

  var bTimer = null;
  function renderStatus(msg, warn) {
    var s = $("statusStrip"); s.textContent = "";
    if (msg) { s.appendChild(el("div", "banner-pill" + (warn ? " warn" : ""), msg)); return; }
    var w = state.sel.map(function (i) { return state.letters[i]; }).join("");
    if (w) {
      var pill = el("div", "preview-pill");
      var clr = el("button", "mini-btn mini-clear", "✕"); clr.setAttribute("aria-label", "Clear letters");
      clr.onclick = function () { state.sel = []; renderStatus(); renderWheel(); };
      var chk = el("button", "mini-btn mini-check", "Check");
      chk.onclick = submitWord;
      pill.append(clr, el("span", "preview-letters", w), chk); s.appendChild(pill);
    } else {
      s.appendChild(el("div", "hint-text", "Swipe or tap letters · Tap a word for its clue"));
    }
  }
  function banner(m, warn) {
    clearTimeout(bTimer); renderStatus(m, warn);
    bTimer = setTimeout(function () { renderStatus(); }, 2200);
  }

  // ── Letter wheel ──────────────────────────────────────────────
  var wheelEl = $("wheel");
  var pDown = false, dragging = false, firstNode = null, wasLast = false, dragPt = null;

  function centers() {
    var size = wheelEl.clientWidth || 260, r = size / 2, ring = r - size * 0.15;
    return state.letters.map(function (_, i) {
      var a = (2 * Math.PI / state.letters.length) * i - Math.PI / 2;
      return { x: r + Math.cos(a) * ring, y: r + Math.sin(a) * ring };
    });
  }

  function renderWheel() {
    var svg = $("wheelSvg"), cts = centers();
    wheelEl.querySelectorAll(".letter-node").forEach(function (n) { n.remove(); });
    state.letters.forEach(function (ch, i) {
      var n = el("div", "letter-node" + (state.sel.indexOf(i) >= 0 ? " selected" : ""), ch);
      n.style.left = cts[i].x + "px"; n.style.top = cts[i].y + "px";
      wheelEl.appendChild(n);
    });
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (state.sel.length) {
      var pts = state.sel.map(function (i) { return cts[i].x + "," + cts[i].y; });
      if (dragPt && dragging) pts.push(dragPt.x + "," + dragPt.y);
      var poly = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      poly.setAttribute("points", pts.join(" ")); poly.setAttribute("fill", "none");
      poly.setAttribute("stroke", catOf(state.p.cat).c); poly.setAttribute("stroke-width", "10");
      poly.setAttribute("stroke-opacity", ".85");
      poly.setAttribute("stroke-linecap", "round"); poly.setAttribute("stroke-linejoin", "round");
      svg.appendChild(poly);
    }
  }

  function hitWheel(cx, cy) {
    var r = wheelEl.getBoundingClientRect(), x = cx - r.left, y = cy - r.top;
    dragPt = { x: x, y: y };
    var cts = centers(), hitR = (wheelEl.clientWidth || 260) * 0.13;
    for (var i = 0; i < cts.length; i++) if (Math.hypot(x - cts[i].x, y - cts[i].y) <= hitR) return i;
    return null;
  }
  var NOTES = [523, 587, 659, 698, 784, 880, 988, 1046];

  wheelEl.addEventListener("pointerdown", function (e) {
    if (e.target.closest("#shuffleBtn")) return;
    e.preventDefault();
    try { wheelEl.setPointerCapture(e.pointerId); } catch (err) {}
    pDown = true; dragging = false; firstNode = null; wasLast = false;
    var hit = hitWheel(e.clientX, e.clientY);
    if (hit !== null) {
      firstNode = hit;
      wasLast = state.sel.length && state.sel[state.sel.length - 1] === hit;
      if (state.sel.indexOf(hit) < 0) {
        state.sel.push(hit); tone(NOTES[state.sel.length % 8]);
        renderWheel(); renderStatus();
      }
    }
  });

  wheelEl.addEventListener("pointermove", function (e) {
    if (!pDown) return;
    var hit = hitWheel(e.clientX, e.clientY);
    if (hit !== null) {
      if (firstNode === null) firstNode = hit;
      else if (hit !== firstNode) dragging = true;
      if (dragging && state.sel.length >= 2 && hit === state.sel[state.sel.length - 2]) {
        state.sel.pop(); tone(440);
      } else if (state.sel.indexOf(hit) < 0) {
        state.sel.push(hit); tone(NOTES[state.sel.length % 8]);
      }
    }
    renderWheel(); renderStatus();
  });

  function endPtr() {
    if (!pDown) return;
    pDown = false; dragPt = null;
    if (dragging) { dragging = false; submitWord(); }
    else { if (wasLast && state.sel.length) state.sel.pop(); renderWheel(); renderStatus(); }
    firstNode = null; wasLast = false;
  }
  wheelEl.addEventListener("pointerup", endPtr);
  wheelEl.addEventListener("pointercancel", endPtr);
  window.addEventListener("resize", renderWheel);

  // ── Finding words ─────────────────────────────────────────────
  function submitWord() {
    var w = state.sel.map(function (i) { return state.letters[i]; }).join("");
    state.sel = []; renderWheel();
    if (w.length < 3) { if (w) { tone(230, 0.13); banner("Use at least 3 letters", true); } else renderStatus(); return; }
    if (state.solved.has(w) || state.bonus.has(w)) { tone(250, 0.12); banner("Already found " + w + "!", true); return; }
    if (L.boardWords(state.p).indexOf(w) >= 0) { solveWord(w, false); return; }
    if (BONUS.has(w)) { state.bonus.add(w); state.stars += 3; chime(false); save(); banner("Bonus word: " + w + "! +3⭐"); return; }
    tone(220, 0.14); banner("Not in the word list", true);
  }

  // Mark a board word solved, by typing it or by the last hint letter.
  function solveWord(w, byHint) {
    var p = state.p, isF = w === p.word;
    state.solved.add(w); state.pop = w;
    if (state.slotClue && state.slotClue.w === w) state.slotClue = null;
    var pts = byHint ? 0 : (isF ? 15 : 5);
    state.stars += pts;
    if (isF) seen.add(p.id);
    var all = L.isComplete(p, state.solved);
    if (all) state.stars += 10;
    chime(isF || all); renderAll();
    var msg = isF ? "Discovered " + w + "!" : (all ? "Board complete!" : "Great! " + w);
    var extra = pts + (all ? 10 : 0);
    banner(extra ? msg + " +" + extra + "⭐" : msg);
    if (isF || all) confetti();
    if (isF) openDiscovery();
  }

  function confetti() {
    var cols = [catOf(state.p.cat).c, "#f59e0b", "#ec4899", "#06b6d4", "#22c55e"];
    for (var i = 0; i < 26; i++) {
      var d = el("div", "confetti");
      d.style.left = (10 + Math.random() * 80) + "vw"; d.style.top = (15 + Math.random() * 25) + "vh";
      d.style.background = cols[i % cols.length];
      d.style.animationDelay = (Math.random() * 0.25) + "s";
      document.body.appendChild(d);
      (function (n) { setTimeout(function () { n.remove(); }, 1700); })(d);
    }
  }

  // ── Buttons ───────────────────────────────────────────────────
  $("shuffleBtn").onclick = function () { state.sel = []; state.letters = L.shuffled(state.letters); tone(587, 0.07); save(); renderWheel(); renderStatus(); };
  $("clueBtn").onclick = function () {
    state.slotClue = null; state.mainClue = !state.mainClue;
    $("clueBtn").textContent = state.mainClue ? "❓ Hide Clue" : "❓ Clue";
    tone(523, 0.06); renderClue(); renderBoard();
  };
  $("hintBtn").onclick = function () {
    var p = state.p, w = L.hintTarget(p, state.solved, state.slotClue && state.slotClue.w);
    if (!w) return banner("All words solved!");
    if (state.stars < 10) { state.stars += 30; save(); return banner("Gift refill: +30⭐ added!"); }
    if (!state.hints[w]) state.hints[w] = new Set();
    var left = [];
    for (var i = 0; i < w.length; i++) if (!state.hints[w].has(i)) left.push(i);
    if (!left.length) return;
    state.stars -= 10;
    state.hints[w].add(left[Math.floor(Math.random() * left.length)]);
    tone(784, 0.1);
    if (state.hints[w].size === w.length) solveWord(w, true);
    else renderAll();
  };
  $("nextBtn").onclick = nextPuzzle;
  $("skipBtn").onclick = nextPuzzle;
  $("viewFactBtn").onclick = function () { openDiscovery(); };
  $("soundBtn").onclick = function () { state.sound = !state.sound; save(); };

  // ── Photo & facts ─────────────────────────────────────────────
  function fetchSummary(title) {
    var url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title.replace(/ /g, "_"));
    var ctl = window.AbortController ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, 8000) : null;
    return fetch(url, ctl ? { signal: ctl.signal } : {})
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; })
      .then(function (d) { if (timer) clearTimeout(timer); return d; });
  }

  // Get (and keep in the scrapbook) the photo and summary for a topic.
  function fetchFact(p) {
    var ex = scrap.find(function (x) { return x.id === p.id; });
    if (ex && ex.img) return Promise.resolve(ex);
    return fetchSummary(p.wiki).then(function (d) {
      var img = d && ((d.originalimage && d.originalimage.source) || (d.thumbnail && d.thumbnail.source));
      var page = d && d.content_urls && d.content_urls.desktop && d.content_urls.desktop.page;
      var item = {
        id: p.id, c: p.cat, w: p.word,
        title: (d && d.title) || p.wiki,
        sub: (d && d.description) || catName(p.cat),
        sum: (d && d.extract) || p.summary,
        img: (typeof img === "string" && /^https:\/\//.test(img)) ? img : null,
        url: (typeof page === "string" && /^https:\/\/en\.wikipedia\.org\//.test(page)) ? page : null
      };
      var i = scrap.findIndex(function (x) { return x.id === item.id; });
      if (i >= 0) scrap[i] = item; else scrap.unshift(item);
      save();
      return item;
    });
  }

  var discToken = 0;
  function openDiscovery(custom) {
    stopSpeech();
    var token = ++discToken;
    var body = $("discoveryBody"), p = state.p;
    $("finishWordsBtn").hidden = !!custom || L.isComplete(p, state.solved);
    $("modalNextBtn").textContent = custom ? "Close" : "Next Topic →";
    $("discoveryModal").classList.add("open");
    body.textContent = "";
    body.appendChild(el("p", "loading", "Loading picture & facts…"));
    var ready = custom ? Promise.resolve(custom) : fetchFact(p);
    ready.then(function (item) {
      if (token !== discToken || !$("discoveryModal").classList.contains("open")) return;
      showDiscovery(item);
    });
  }

  function showDiscovery(item) {
    var body = $("discoveryBody"), topic = byId[item.id];
    var facts = topic ? topic.facts : (Array.isArray(item.facts) ? item.facts : []);
    var t = catOf(item.c);
    $("modalCatLabel").textContent = t.e + " " + catName(item.c);
    body.style.setProperty("--accent", t.c);
    body.style.setProperty("--soft", t.s);
    body.textContent = "";
    body.append(el("h2", "disc-title", item.title), el("div", "disc-sub", item.sub || ""));
    if (item.img) {
      var img = el("img", "discovery-img"); img.src = item.img; img.alt = item.title;
      img.onerror = function () { img.remove(); };
      body.appendChild(img);
    }
    var sp = el("button", "speak-btn", "🔊 Read Facts Aloud");
    sp.onclick = function () { toggleSpeech(item.title + ". " + item.sum + " Did you know? " + facts.join(" "), sp); };
    body.append(sp, el("p", "disc-summary", item.sum || ""));

    var box = el("div", "facts-box");
    box.appendChild(el("h4", null, "💡 Did You Know?"));
    var list = el("div", "fact-list");
    facts.forEach(function (f, i) {
      var row = el("div", "fact-row");
      row.style.setProperty("--i", i);
      row.append(el("span", "fact-num", String(i + 1)), el("span", null, f));
      list.appendChild(row);
    });
    box.appendChild(list);
    body.appendChild(box);

    if (topic && topic.quiz) body.appendChild(renderQuiz(topic));

    if (item.url) {
      var a = el("a", "wiki-link", "Read more on Wikipedia ↗");
      a.href = item.url; a.target = "_blank"; a.rel = "noopener noreferrer";
      body.appendChild(a);
    }
  }

  // One quick question per topic. A right answer the first time earns 5 stars.
  function renderQuiz(topic) {
    var box = el("div", "quiz-box");
    box.appendChild(el("h4", null, "🧠 Quick Quiz"));
    box.appendChild(el("div", "quiz-q", topic.quiz.q));
    var opts = el("div", "quiz-opts"), msg = el("div", "quiz-msg");
    var choices = L.quizChoices(topic.quiz);
    var answered = quizDone[topic.id];
    var buttons = choices.map(function (c) {
      var b = el("button", "quiz-opt", c.text);
      b.type = "button";
      b.onclick = function () { answer(c, b); };
      opts.appendChild(b);
      return b;
    });
    function lock(picked) {
      buttons.forEach(function (b, i) {
        b.disabled = true;
        if (choices[i].right) b.classList.add("right");
        else if (b === picked) b.classList.add("wrong");
      });
    }
    function answer(c, b) {
      if (quizDone[topic.id]) return;
      quizDone[topic.id] = c.right ? "right" : "tried";
      lock(b);
      if (c.right) {
        state.stars += 5; chime(true);
        msg.textContent = "That's right! +5⭐";
      } else {
        tone(300, 0.15);
        msg.textContent = "Good try! The answer is: " + topic.quiz.options[0];
      }
      save();
    }
    if (answered) {
      lock(null);
      msg.textContent = answered === "right" ? "You got this one right ✓" : "The answer is: " + topic.quiz.options[0];
    }
    box.append(opts, msg);
    return box;
  }

  function toggleSpeech(txt, btn) {
    if (!("speechSynthesis" in window)) return;
    if (window.speechSynthesis.speaking) { stopSpeech(); btn.textContent = "🔊 Read Facts Aloud"; return; }
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(txt); u.rate = 0.92;
    u.onend = u.onerror = function () { btn.textContent = "🔊 Read Facts Aloud"; };
    btn.textContent = "⏹ Stop Reading"; window.speechSynthesis.speak(u);
  }
  function stopSpeech() { try { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); } catch (e) {} }
  function closeModals() {
    stopSpeech(); discToken++;
    $("discoveryModal").classList.remove("open"); $("scrapbookModal").classList.remove("open");
  }

  $("closeDiscoveryBtn").onclick = closeModals;
  $("finishWordsBtn").onclick = closeModals;
  $("modalNextBtn").onclick = function () { if ($("modalNextBtn").textContent === "Close") closeModals(); else nextPuzzle(); };
  $("scrapbookBtn").onclick = function () { renderScrap(); $("scrapbookModal").classList.add("open"); };
  $("closeScrapbookBtn").onclick = closeModals;
  ["discoveryModal", "scrapbookModal"].forEach(function (id) {
    $(id).addEventListener("click", function (e) { if (e.target === $(id)) closeModals(); });
  });

  // ── Scrapbook ─────────────────────────────────────────────────
  function renderScrap() {
    var f = $("scrapFilters"), l = $("scrapList");
    f.textContent = "";
    var cats = ["All"].concat(Object.keys(CATS).filter(function (c) { return scrap.some(function (x) { return x.c === c; }); }));
    if (cats.indexOf(state.filter) < 0) state.filter = "All";
    cats.forEach(function (c) {
      var cnt = c === "All" ? scrap.length : scrap.filter(function (x) { return x.c === c; }).length;
      var label = c === "All" ? "All" : catOf(c).e + " " + catName(c);
      var b = el("button", "filter-chip" + (state.filter === c ? " active" : ""), label + " (" + cnt + ")");
      b.onclick = function () { state.filter = c; renderScrap(); };
      f.appendChild(b);
    });
    var items = state.filter === "All" ? scrap : scrap.filter(function (x) { return x.c === state.filter; });
    l.textContent = "";
    if (!items.length) { l.appendChild(el("p", "empty", "Solve mystery words to collect photos and facts here!")); return; }
    items.forEach(function (it) {
      var row = el("button", "scrap-item"); row.type = "button";
      var t = catOf(it.c);
      if (it.img) { var i = el("img", "scrap-thumb"); i.src = it.img; i.alt = ""; row.appendChild(i); }
      else row.appendChild(el("div", "scrap-thumb", t.e));
      var inf = el("div", "scrap-info");
      var cat = el("div", "scrap-cat", catName(it.c)); cat.style.color = t.c;
      var sum = String(it.sum || "");
      inf.append(el("div", "scrap-title", String(it.title || it.w || "")), cat,
        el("div", "scrap-sum", sum.length > 80 ? sum.slice(0, 80) + "…" : sum));
      if (quizDone[it.id] === "right") inf.appendChild(el("div", "scrap-quiz", "🧠 Quiz ✓"));
      row.appendChild(inf);
      row.onclick = function () { $("scrapbookModal").classList.remove("open"); openDiscovery(it); };
      l.appendChild(row);
    });
  }

  // ── Start: carry on where she left off, or pick a new topic ──
  var resume = L.restoreRound(getJSON("ww_current", null), PUZZLES);
  if (resume && !L.isComplete(byId[resume.id], new Set(resume.solved))) startRound(byId[resume.id], resume);
  else nextPuzzle();
})();
