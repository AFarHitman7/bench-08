/* Bench 08 — small runtime for stages, filters and the compare page */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     Theme
     ------------------------------------------------------------------ */

  var themeToggle = document.getElementById('themeToggle');

  function effectiveTheme() {
    var set = document.documentElement.dataset.theme;
    if (set === 'dark' || set === 'light') return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function syncTheme() {
    if (!themeToggle) return;
    var next = effectiveTheme() === 'dark' ? 'Light' : 'Dark';
    var word = themeToggle.querySelector('.theme-word');
    if (word) word.textContent = next;
    themeToggle.setAttribute('aria-label', 'Switch to ' + next.toLowerCase() + ' theme');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem('bench-theme', next);
      } catch (e) {}
      syncTheme();
    });
    syncTheme();
  }

  /* ------------------------------------------------------------------
     Stages: scale fixed-size iframes into their containers
     ------------------------------------------------------------------ */

  function scaleStages() {
    document.querySelectorAll('.stage[data-w]').forEach(function (stage) {
      var frame = stage.querySelector('iframe');
      if (!frame) return;
      var w = Number(stage.dataset.w);
      var h = Number(stage.dataset.h);
      if (!w || !h) return;
      var width = stage.clientWidth;
      if (!width) return;
      var scale = width / w;
      frame.style.width = w + 'px';
      frame.style.height = h + 'px';
      frame.style.transform = 'scale(' + scale + ')';
      stage.style.height = h * scale + 'px';
    });
  }

  var scaleTimer = null;
  function scheduleScale() {
    if (scaleTimer) clearTimeout(scaleTimer);
    scaleTimer = setTimeout(scaleStages, 40);
  }

  window.addEventListener('resize', scheduleScale, { passive: true });

  document.querySelectorAll('iframe').forEach(function (frame) {
    frame.addEventListener('load', scheduleScale);
  });

  /* ------------------------------------------------------------------
     Reveal (motion, only when allowed)
     ------------------------------------------------------------------ */

  if (!reduceMotion && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.section, .page-head, .closing');
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    revealEls.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     Results filters
     ------------------------------------------------------------------ */

  var resultsList = document.getElementById('resultsList');
  if (resultsList) {
    var state = { task: 'all', model: 'all', variant: 'all' };
    var taskButtons = Array.from(document.querySelectorAll('[data-filter-task]'));
    var variantButtons = Array.from(document.querySelectorAll('[data-filter-variant]'));
    var modelSelect = document.getElementById('modelFilter');
    var countEl = document.getElementById('resultCount');
    var emptyEl = document.getElementById('emptyState');
    var resetBtns = [document.getElementById('resetFilters'), document.getElementById('emptyReset')].filter(Boolean);

    var params = new URLSearchParams(window.location.search);
    if (params.get('task') && /^0[1-8]$/.test(params.get('task'))) state.task = params.get('task');
    if (params.get('model')) state.model = params.get('model');
    if (['thin', 'thick'].indexOf(params.get('variant')) !== -1) state.variant = params.get('variant');
    if (modelSelect) {
      var validModels = Array.from(modelSelect.options).map(function (o) { return o.value; });
      if (validModels.indexOf(state.model) === -1) state.model = 'all';
    }

    function syncUrl() {
      var q = new URLSearchParams();
      if (state.task !== 'all') q.set('task', state.task);
      if (state.model !== 'all') q.set('model', state.model);
      if (state.variant !== 'all') q.set('variant', state.variant);
      var qs = q.toString();
      history.replaceState(null, '', qs ? '?' + qs : window.location.pathname);
    }

    function apply() {
      var shown = 0;
      document.querySelectorAll('.task-section').forEach(function (section) {
        var taskMatch = state.task === 'all' || section.dataset.sectionTask === state.task;
        section.classList.toggle('is-hidden', !taskMatch);
        if (!taskMatch) return;
        section.querySelectorAll('.result-card').forEach(function (card) {
          var match =
            (state.model === 'all' || card.dataset.model === state.model) &&
            (state.variant === 'all' || card.dataset.variant === state.variant);
          card.classList.toggle('is-hidden', !match);
          if (match) shown++;
        });
      });

      taskButtons.forEach(function (b) {
        var on = b.dataset.filterTask === state.task;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      variantButtons.forEach(function (b) {
        var on = b.dataset.filterVariant === state.variant;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      if (modelSelect) modelSelect.value = state.model;

      document.documentElement.setAttribute('data-filter-task', state.task);
      document.documentElement.setAttribute('data-filter-model', state.model);
      document.documentElement.setAttribute('data-filter-variant', state.variant);

      if (countEl) countEl.textContent = shown + (shown === 1 ? ' result' : ' results');
      if (emptyEl) emptyEl.hidden = shown !== 0;
      if (resultsList) resultsList.hidden = shown === 0;
      syncUrl();
      scheduleScale();
    }

    taskButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        state.task = button.dataset.filterTask;
        apply();
      });
    });

    variantButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        state.variant = button.dataset.filterVariant;
        apply();
      });
    });

    if (modelSelect) {
      modelSelect.addEventListener('change', function () {
        state.model = modelSelect.value;
        apply();
      });
    }

    resetBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state = { task: 'all', model: 'all', variant: 'all' };
        apply();
      });
    });

    apply();
  }

  /* ------------------------------------------------------------------
     Shared renderers for compare / artifact
     ------------------------------------------------------------------ */

  function esc(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  }

  function inline(value) {
    var out = esc(value);
    out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
    return out;
  }

  function mdToHtml(md) {
    var lines = String(md).replace(/\r\n/g, '\n').split('\n');
    var html = '';
    var para = [];
    var list = [];
    var code = [];
    var inCode = false;

    function flushPara() {
      if (para.length) {
        html += '<p>' + inline(para.join(' ')) + '</p>';
        para = [];
      }
    }
    function flushList() {
      if (list.length) {
        html += '<ul>' + list.map(function (li) { return '<li>' + inline(li) + '</li>'; }).join('') + '</ul>';
        list = [];
      }
    }

    lines.forEach(function (line) {
      if (line.trim().startsWith('```')) {
        flushPara();
        flushList();
        if (inCode) {
          html += '<pre><code>' + esc(code.join('\n')) + '</code></pre>';
          code = [];
          inCode = false;
        } else {
          inCode = true;
        }
        return;
      }
      if (inCode) {
        code.push(line);
        return;
      }
      if (!line.trim()) {
        flushPara();
        flushList();
        return;
      }
      var heading = line.match(/^(#{1,4})\s+(.*)$/);
      if (heading) {
        flushPara();
        flushList();
        var level = Math.min(4, heading[1].length) + 1;
        html += '<h' + level + '>' + inline(heading[2]) + '</h' + level + '>';
        return;
      }
      var bullet = line.match(/^\s*[-*]\s+(.*)$/);
      if (bullet) {
        flushPara();
        list.push(bullet[1]);
        return;
      }
      flushList();
      para.push(line.trim());
    });
    flushPara();
    flushList();
    if (inCode) html += '<pre><code>' + esc(code.join('\n')) + '</code></pre>';
    return html;
  }

  function reviewToHtml(md) {
    return String(md)
      .replace(/\r\n/g, '\n')
      .split('\n')
      .map(function (line) {
        var s = line.trim();
        if (!s) return '';
        var m = s.match(/^\[(blocker|major|minor|nit)\]\s*(.*)$/i);
        if (m) {
          return '<p class="finding"><span class="sev ' + m[1].toLowerCase() + '">' + m[1].toLowerCase() + '</span><span>' + inline(m[2]) + '</span></p>';
        }
        return '<p>' + inline(s) + '</p>';
      })
      .join('');
  }

  function healthHtml(model) {
    return '<span class="health ' + model.health + '"><span class="dot"></span>' + esc(model.healthLabel) + '</span>';
  }

  function chipsHtml(chips) {
    return '<div class="chips">' + chips.map(function (c) {
      return '<span class="chip' + (c.tone ? ' ' + c.tone : '') + '"' +
        (c.title ? ' title="' + esc(c.title) + '"' : '') + '>' + esc(c.text) + '</span>';
    }).join('') + '</div>';
  }

  function mediaHtml(model, task, variant, suffix) {
    var artifact = window.BENCH.artifacts[model.id][task.id][variant];
    var label = model.label + ' — ' + task.name + ' (' + variant + ')';
    if (task.id === '01') {
      return '<div class="poster-frame ' + suffix + '"><img src="' + artifact.path + '" alt="Poster by ' + esc(model.label) + '" loading="eager"></div>';
    }
    if (task.id === '02' || task.id === '03' || task.id === '04') {
      var w = task.id === '04' ? 1280 : 1440;
      var h = task.id === '04' ? 720 : 900;
      var lazy = suffix === 'card' ? ' loading="lazy"' : '';
      return '<div class="stage ' + suffix + '" data-w="' + w + '" data-h="' + h + '"><iframe src="' + artifact.path + '" title="' + esc(label) + '"' + lazy + ' sandbox="allow-scripts" scrolling="no"></iframe></div>';
    }
    if (task.id === '05' || task.id === '06') {
      return '<div class="prose ' + suffix + '">' + mdToHtml(artifact.text) + '</div>';
    }
    if (task.id === '07') {
      return '<pre class="code ' + suffix + '"><code>' + esc(artifact.text) + '</code></pre>';
    }
    if (task.id === '08') {
      return variant === 'thick'
        ? '<div class="review ' + suffix + '">' + reviewToHtml(artifact.text) + '</div>'
        : '<div class="prose ' + suffix + '">' + mdToHtml(artifact.text) + '</div>';
    }
    return '';
  }

  function noteHtml(note) {
    if (!note) return '';
    return '<div class="technical-note"><span class="note-label">Technical note</span><p>' + esc(note) + '</p></div>';
  }

  /* ------------------------------------------------------------------
     Compare page
     ------------------------------------------------------------------ */

  var compareGrid = document.getElementById('compareGrid');
  if (compareGrid && window.BENCH) {
    var taskSelect = document.getElementById('compareTask');
    var aSelect = document.getElementById('compareA');
    var bSelect = document.getElementById('compareB');
    var variantButtons = Array.from(document.querySelectorAll('[data-compare-variant]'));
    var swap = document.getElementById('compareSwap');
    var copy = document.getElementById('compareCopy');

    var params = new URLSearchParams(window.location.search);
    var compareState = {
      task: params.get('task') && /^0[1-8]$/.test(params.get('task')) ? params.get('task') : '02',
      variant: params.get('variant') === 'thin' ? 'thin' : 'thick',
      a: params.get('a') || 'hy4',
      b: params.get('b') || 'haiku2',
    };

    function modelById(id) {
      return window.BENCH.models.find(function (m) { return m.id === id; }) || window.BENCH.models[0];
    }
    function taskById(id) {
      return window.BENCH.tasks.find(function (t) { return t.id === id; }) || window.BENCH.tasks[0];
    }

    function panelHtml(modelId) {
      var model = modelById(modelId);
      var task = taskById(compareState.task);
      var artifact = window.BENCH.artifacts[model.id][task.id][compareState.variant];
      var compareUrl = 'compare.html?task=' + task.id + '&variant=' + compareState.variant + '&a=' + model.id + '&b=' + (model.id === compareState.a ? compareState.b : compareState.a);
      return '<header class="compare-head"><div class="compare-who"><span class="compare-model">' + esc(model.label) + '</span><span class="compare-run">' + esc(model.run) + ' · ' + esc(task.name) + ' · ' + compareState.variant + '</span></div>' + healthHtml(model) + '</header>' +
        '<p class="compare-caveat">' + esc(model.short) + '</p>' +
        (artifact.note ? '<div class="compare-note">' + noteHtml(artifact.note) + '</div>' : '') +
        '<div class="compare-media">' + mediaHtml(model, task, compareState.variant, 'compare') + '</div>' +
        '<div class="compare-body">' + chipsHtml(artifact.chips) +
        '<div class="compare-links"><a class="text-link" href="artifact.html?m=' + model.id + '&t=' + task.id + '&v=' + compareState.variant + '">Open full <span aria-hidden="true">→</span></a><a class="text-link muted-link" href="' + artifact.path + '" target="_blank" rel="noopener">Raw file</a></div></div>';
    }

    function syncCompareUrl() {
      var q = new URLSearchParams({
        task: compareState.task,
        variant: compareState.variant,
        a: compareState.a,
        b: compareState.b,
      });
      history.replaceState(null, '', '?' + q.toString());
    }

    function renderCompare() {
      document.getElementById('panelA').innerHTML = panelHtml(compareState.a);
      document.getElementById('panelB').innerHTML = panelHtml(compareState.b);
      taskSelect.value = compareState.task;
      aSelect.value = compareState.a;
      bSelect.value = compareState.b;
      variantButtons.forEach(function (b) {
        var on = b.dataset.compareVariant === compareState.variant;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      syncCompareUrl();
      scheduleScale();
    }

    taskSelect.addEventListener('change', function () {
      compareState.task = taskSelect.value;
      renderCompare();
    });
    aSelect.addEventListener('change', function () {
      compareState.a = aSelect.value;
      renderCompare();
    });
    bSelect.addEventListener('change', function () {
      compareState.b = bSelect.value;
      renderCompare();
    });
    variantButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        compareState.variant = button.dataset.compareVariant;
        renderCompare();
      });
    });
    if (swap) {
      swap.addEventListener('click', function () {
        var a = compareState.a;
        compareState.a = compareState.b;
        compareState.b = a;
        renderCompare();
      });
    }
    if (copy) {
      copy.addEventListener('click', function () {
        var original = copy.textContent;
        var done = function () {
          copy.textContent = 'Copied';
          setTimeout(function () { copy.textContent = original; }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(window.location.href).then(done, done);
        } else {
          done();
        }
      });
    }

    renderCompare();
  }

  /* ------------------------------------------------------------------
     Artifact page
     ------------------------------------------------------------------ */

  var artifactShell = document.getElementById('artifactContent');
  if (artifactShell && window.BENCH) {
    var params = new URLSearchParams(window.location.search);
    var mId = params.get('m') || 'hy4';
    var tId = params.get('t') || '02';
    var vId = params.get('v') === 'thin' ? 'thin' : 'thick';
    var model = window.BENCH.models.find(function (m) { return m.id === mId; }) || window.BENCH.models[0];
    var task = window.BENCH.tasks.find(function (t) { return t.id === tId; }) || window.BENCH.tasks[0];
    var artifact = window.BENCH.artifacts[model.id][task.id][vId];

    document.getElementById('artifactCrumb').textContent = task.id + ' · ' + task.name + ' / ' + model.label + ' ' + model.run;
    document.title = task.name + ' — ' + model.label + ' — Bench 08';

    var compareOther = window.BENCH.models.find(function (m) { return m.id !== model.id; }) || window.BENCH.models[0];
    artifactShell.innerHTML =
      '<header class="artifact-head"><div><p class="kicker">' + task.id + ' · ' + esc(task.name) + ' · ' + vId + '</p><h1 class="artifact-title">' + esc(model.label) + '</h1><p class="artifact-sub">' + esc(model.run) + ' — ' + esc(task.blurb) + '</p></div><div class="artifact-meta">' + healthHtml(model) + chipsHtml(artifact.chips) + '</div></header>' +
      '<div class="artifact-note">' + noteHtml(artifact.note) + '</div>' +
      '<div class="artifact-media">' + mediaHtml(model, task, vId, 'full') + '</div>' +
      '<div class="artifact-actions"><a class="btn btn-primary" href="compare.html?task=' + task.id + '&variant=' + vId + '&a=' + model.id + '&b=' + compareOther.id + '">Compare this run</a><a class="btn btn-ghost" href="' + artifact.path + '" target="_blank" rel="noopener">Open raw file</a><a class="btn btn-ghost" href="results.html?task=' + task.id + '&model=' + model.id + '&variant=' + vId + '">Back to results</a></div>' +
      '<p class="compare-foot"><b>Run caveat:</b> ' + esc(model.short) + '</p>';

    scheduleScale();
  }

  /* ------------------------------------------------------------------
     Initial paint
     ------------------------------------------------------------------ */

  scaleStages();
  window.addEventListener('load', scheduleScale);
})();
