/**
 * Quiz System — Sistem Kuis Interaktif untuk Materi Pertemuan 00
 * 
 * Fitur:
 * - Kuis pilihan ganda dengan feedback langsung
 * - Field jawaban untuk latihan (textarea)
 * - Auto-save ke localStorage
 * - Export jawaban ke file Markdown (.md)
 * - Progress bar & floating panel
 * 
 * Cara pakai: tambahkan di setiap HTML page:
 *   <script> window.QUIZ_CONFIG = { pageId: '01', pageTitle: '...', questions: [...] }; </script>
 *   <script src="quiz-system.js"></script>
 */
(function () {
  'use strict';

  // ═══════════════════════════════════════
  //  CSS Injection
  // ═══════════════════════════════════════
  const STYLES = `
/* ── Student Info Bar ── */
.quiz-student-bar {
  background: var(--surface, #fff);
  border: 1.5px solid var(--border, #e2e8f0);
  border-radius: 16px;
  padding: 20px 24px;
  margin: 24px auto;
  max-width: 820px;
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,.06));
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}
.quiz-student-bar .qs-icon {
  font-size: 1.6rem;
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  background: var(--emerald-dim, rgba(16,185,129,.06));
  border-radius: 12px;
  flex-shrink: 0;
}
.quiz-student-bar .qs-fields {
  display: flex; gap: 12px; flex: 1; flex-wrap: wrap;
}
.quiz-student-bar input {
  font-family: 'DM Sans', sans-serif;
  font-size: .92rem;
  padding: 10px 14px;
  border: 1.5px solid var(--border, #e2e8f0);
  border-radius: 10px;
  background: var(--surface-2, #f1f5f9);
  color: var(--text, #1e293b);
  flex: 1;
  min-width: 160px;
  transition: border-color .2s, box-shadow .2s;
  outline: none;
}
.quiz-student-bar input:focus {
  border-color: var(--emerald, #047857);
  box-shadow: 0 0 0 3px rgba(16,185,129,.12);
}
.quiz-student-bar input::placeholder { color: var(--muted, #94a3b8); }

/* ── Quiz Section ── */
.quiz-section {
  background: var(--surface, #fff);
  border: 1.5px solid var(--border, #e2e8f0);
  border-radius: 18px;
  padding: 28px 32px;
  margin: 28px auto;
  max-width: 820px;
  box-shadow: var(--shadow-md, 0 4px 16px rgba(0,0,0,.07));
}
.quiz-section h2 {
  font-family: 'Instrument Serif', serif;
  font-size: 1.5rem;
  color: var(--text, #1e293b);
  margin: 0 0 6px;
}
.quiz-section .quiz-subtitle {
  color: var(--muted, #64748b);
  font-size: .9rem;
  margin: 0 0 20px;
}

/* ── Quiz Question Card ── */
.quiz-q-card {
  background: var(--surface-2, #f1f5f9);
  border: 1.5px solid var(--border, #e2e8f0);
  border-radius: 14px;
  padding: 20px 22px;
  margin-bottom: 16px;
  transition: border-color .3s;
}
.quiz-q-card.answered-correct { border-color: var(--emerald, #047857); }
.quiz-q-card.answered-wrong { border-color: var(--rose, #be123c); }
.quiz-q-card .q-header {
  display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
}
.quiz-q-card .q-number {
  background: var(--text, #1e293b);
  color: #fff;
  width: 28px; height: 28px;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: .82rem; font-weight: 700;
  flex-shrink: 0;
}
.quiz-q-card .q-text {
  font-size: .95rem;
  font-weight: 600;
  color: var(--text, #1e293b);
  margin: 0;
}

/* ── MC Options ── */
.quiz-options {
  display: flex; flex-direction: column; gap: 8px;
  list-style: none; padding: 0; margin: 0;
}
.quiz-opt-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 16px;
  border: 1.5px solid var(--border, #e2e8f0);
  border-radius: 10px;
  background: var(--surface, #fff);
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: .9rem;
  color: var(--text, #1e293b);
  transition: all .2s;
  text-align: left;
  width: 100%;
}
.quiz-opt-btn:hover:not(.selected):not([disabled]) {
  border-color: var(--muted, #94a3b8);
  background: var(--surface-2, #f8fafc);
}
.quiz-opt-btn .opt-letter {
  width: 26px; height: 26px;
  border-radius: 7px;
  background: var(--surface-2, #f1f5f9);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: .8rem;
  flex-shrink: 0;
  transition: all .2s;
}
.quiz-opt-btn.selected.correct {
  border-color: var(--emerald, #047857);
  background: var(--emerald-dim, rgba(16,185,129,.06));
}
.quiz-opt-btn.selected.correct .opt-letter {
  background: var(--emerald, #047857); color: #fff;
}
.quiz-opt-btn.selected.wrong {
  border-color: var(--rose, #be123c);
  background: var(--rose-dim, rgba(244,63,94,.06));
}
.quiz-opt-btn.selected.wrong .opt-letter {
  background: var(--rose, #be123c); color: #fff;
}
.quiz-opt-btn.show-correct {
  border-color: var(--emerald, #047857);
  background: var(--emerald-dim, rgba(16,185,129,.06));
}
.quiz-opt-btn.show-correct .opt-letter {
  background: var(--emerald, #047857); color: #fff;
}
.quiz-opt-btn[disabled] { cursor: default; opacity: .85; }

/* ── Feedback ── */
.quiz-feedback {
  margin-top: 10px;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: .88rem;
  line-height: 1.5;
  animation: fadeSlideIn .3s ease;
}
.quiz-feedback.correct {
  background: var(--emerald-dim, rgba(16,185,129,.06));
  color: var(--emerald, #047857);
  border-left: 3px solid var(--emerald, #047857);
}
.quiz-feedback.wrong {
  background: var(--rose-dim, rgba(244,63,94,.06));
  color: var(--rose, #be123c);
  border-left: 3px solid var(--rose, #be123c);
}

/* ── Short Answer (in quiz section) ── */
.quiz-short-input {
  width: 100%;
  font-family: 'DM Sans', sans-serif;
  font-size: .9rem;
  padding: 10px 14px;
  border: 1.5px solid var(--border, #e2e8f0);
  border-radius: 10px;
  background: var(--surface, #fff);
  color: var(--text, #1e293b);
  outline: none;
  resize: vertical;
  min-height: 60px;
  transition: border-color .2s, box-shadow .2s;
  box-sizing: border-box;
  margin-top: 4px;
}
.quiz-short-input:focus {
  border-color: var(--emerald, #047857);
  box-shadow: 0 0 0 3px rgba(16,185,129,.12);
}

/* ── Exercise Answer Fields ── */
.quiz-answer-area {
  margin-top: 14px;
  animation: fadeSlideIn .3s ease;
}
.quiz-answer-area label {
  display: block;
  font-size: .82rem;
  font-weight: 600;
  color: var(--muted, #64748b);
  margin-bottom: 6px;
}
.quiz-answer-area textarea {
  width: 100%;
  min-height: 120px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: .82rem;
  line-height: 1.6;
  padding: 14px 16px;
  border: 1.5px solid var(--border, #e2e8f0);
  border-radius: 10px;
  background: var(--surface-2, #f1f5f9);
  color: var(--text, #1e293b);
  outline: none;
  resize: vertical;
  transition: border-color .2s, box-shadow .2s;
  box-sizing: border-box;
  tab-size: 2;
}
.quiz-answer-area textarea:focus {
  border-color: var(--emerald, #047857);
  box-shadow: 0 0 0 3px rgba(16,185,129,.12);
  background: var(--surface, #fff);
}
.quiz-answer-area .save-indicator {
  font-size: .78rem;
  color: var(--muted, #94a3b8);
  margin-top: 4px;
  transition: color .2s;
}
.quiz-answer-area .save-indicator.saved { color: var(--emerald, #047857); }

/* ── Floating Panel ── */
.quiz-floating-panel {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--surface, #fff);
  border: 1.5px solid var(--border, #e2e8f0);
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,.12);
  z-index: 9999;
  min-width: 260px;
  max-width: 320px;
  font-family: 'DM Sans', sans-serif;
  transition: transform .3s, opacity .3s;
}
.quiz-floating-panel.collapsed {
  transform: translateY(calc(100% - 48px));
}
.quiz-panel-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 12px; cursor: pointer;
}
.quiz-panel-header h4 {
  margin: 0; font-size: .9rem; color: var(--text, #1e293b);
}
.quiz-panel-toggle {
  background: none; border: none; cursor: pointer;
  font-size: 1.1rem; color: var(--muted, #64748b);
  padding: 2px 6px; border-radius: 6px;
  transition: background .2s;
}
.quiz-panel-toggle:hover { background: var(--surface-2, #f1f5f9); }
.quiz-panel-body {}

/* Progress */
.quiz-progress-bar {
  height: 8px;
  background: var(--surface-2, #f1f5f9);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}
.quiz-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--emerald, #047857), #10b981);
  border-radius: 4px;
  transition: width .4s ease;
}
.quiz-progress-text {
  font-size: .82rem;
  color: var(--muted, #64748b);
  margin-bottom: 12px;
}
.quiz-progress-text strong { color: var(--text, #1e293b); }

/* Panel Buttons */
.quiz-btn {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  width: 100%;
  padding: 10px 16px;
  border: none;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: .88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s;
  margin-bottom: 8px;
}
.quiz-btn:last-child { margin-bottom: 0; }
.quiz-btn-primary {
  background: var(--emerald, #047857);
  color: #fff;
}
.quiz-btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
.quiz-btn-primary:disabled { opacity: .5; cursor: not-allowed; transform: none; }
.quiz-btn-secondary {
  background: var(--surface-2, #f1f5f9);
  color: var(--text, #1e293b);
  border: 1px solid var(--border, #e2e8f0);
}
.quiz-btn-secondary:hover { background: #e2e8f0; }
.quiz-btn-danger {
  background: var(--rose-dim, rgba(244,63,94,.06));
  color: var(--rose, #be123c);
  border: 1px solid rgba(190,18,60,.15);
  font-size: .82rem;
}
.quiz-btn-danger:hover { background: rgba(244,63,94,.12); }

/* ── Toast Notification ── */
.quiz-toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(-120%);
  background: var(--text, #1e293b);
  color: #fff;
  padding: 12px 24px;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: .9rem;
  font-weight: 500;
  box-shadow: 0 8px 24px rgba(0,0,0,.2);
  z-index: 10001;
  transition: transform .4s cubic-bezier(.34,1.56,.64,1);
  pointer-events: none;
}
.quiz-toast.show {
  transform: translateX(-50%) translateY(0);
}

/* ── Name Modal ── */
.quiz-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.4);
  z-index: 10000;
  display: flex; align-items: center; justify-content: center;
  animation: fadeIn .2s;
}
.quiz-modal {
  background: var(--surface, #fff);
  border-radius: 18px;
  padding: 32px;
  max-width: 420px;
  width: 90%;
  box-shadow: 0 16px 48px rgba(0,0,0,.15);
  animation: fadeSlideIn .3s ease;
}
.quiz-modal h3 { margin: 0 0 8px; font-size: 1.2rem; color: var(--text); }
.quiz-modal p { color: var(--muted); font-size: .9rem; margin: 0 0 20px; }
.quiz-modal input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid var(--border, #e2e8f0);
  border-radius: 10px;
  font-size: .92rem;
  font-family: 'DM Sans', sans-serif;
  color: var(--text);
  background: var(--surface-2, #f1f5f9);
  outline: none;
  margin-bottom: 12px;
  box-sizing: border-box;
}
.quiz-modal input:focus {
  border-color: var(--emerald, #047857);
  box-shadow: 0 0 0 3px rgba(16,185,129,.12);
}

/* ── Animations ── */
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .quiz-student-bar { padding: 14px 16px; }
  .quiz-section { padding: 20px 18px; }
  .quiz-floating-panel { left: 12px; right: 12px; min-width: auto; max-width: none; }
}
`;

  // ═══════════════════════════════════════
  //  Helpers
  // ═══════════════════════════════════════
  const config = window.QUIZ_CONFIG || {};
  const PAGE_ID = config.pageId || 'unknown';
  const PAGE_TITLE = config.pageTitle || document.title || 'Kuis';
  const QUESTIONS = config.questions || [];

  let saveTimer = null;
  const DEBOUNCE_MS = 400;

  function safeStorage(action, key, value) {
    try {
      if (action === 'get') return localStorage.getItem(key) || '';
      if (action === 'set') localStorage.setItem(key, value);
      if (action === 'remove') localStorage.removeItem(key);
    } catch (e) {
      console.warn('localStorage unavailable:', e);
      return '';
    }
  }

  function saveGlobal(key, value) { safeStorage('set', 'quiz-global-' + key, value); }
  function loadGlobal(key) { return safeStorage('get', 'quiz-global-' + key); }
  function savePage(key, value) { safeStorage('set', 'quiz-' + PAGE_ID + '-' + key, value); }
  function loadPage(key) { return safeStorage('get', 'quiz-' + PAGE_ID + '-' + key); }

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 40);
  }

  function debounce(fn, ms) {
    return function () {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(fn, ms);
    };
  }

  function toast(msg) {
    let t = document.querySelector('.quiz-toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'quiz-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }

  function escapeTableCell(s) {
    return (s || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
  }

  // ═══════════════════════════════════════
  //  State
  // ═══════════════════════════════════════
  const state = {
    quizAnswers: {},   // { 'q-0': selectedIndex, ... }
    shortAnswers: {},  // { 'q-short-1': 'text', ... }
    exerciseAnswers: {} // { 'ex-slug': 'code', ... }
  };

  function loadState() {
    QUESTIONS.forEach((q, i) => {
      if (q.type === 'mc') {
        const v = loadPage('q-' + i);
        if (v !== '') state.quizAnswers['q-' + i] = parseInt(v, 10);
      } else if (q.type === 'short') {
        state.shortAnswers['q-short-' + i] = loadPage('q-short-' + i);
      }
    });
    document.querySelectorAll('[data-quiz-ex-key]').forEach(el => {
      const key = el.getAttribute('data-quiz-ex-key');
      state.exerciseAnswers[key] = loadPage('ex-' + key);
    });
  }

  function countAnswered() {
    let total = 0, answered = 0;
    QUESTIONS.forEach((q, i) => {
      total++;
      if (q.type === 'mc' && state.quizAnswers['q-' + i] !== undefined) answered++;
      if (q.type === 'short' && (state.shortAnswers['q-short-' + i] || '').trim()) answered++;
    });
    document.querySelectorAll('[data-quiz-ex-key]').forEach(el => {
      total++;
      const key = el.getAttribute('data-quiz-ex-key');
      if ((state.exerciseAnswers[key] || '').trim()) answered++;
    });
    return { total, answered };
  }

  // ═══════════════════════════════════════
  //  Student Info Bar
  // ═══════════════════════════════════════
  function createStudentBar() {
    const hero = document.querySelector('.hero') || document.querySelector('section');
    if (!hero) return;
    if (document.querySelector('[data-quiz-student-bar]')) return;

    const bar = document.createElement('div');
    bar.className = 'quiz-student-bar';
    bar.setAttribute('data-quiz-student-bar', '');
    bar.innerHTML = `
      <div class="qs-icon">🎓</div>
      <div class="qs-fields">
        <input type="text" id="quiz-nama" placeholder="Nama Lengkap" value="${loadGlobal('nama')}" autocomplete="name">
        <input type="text" id="quiz-nim" placeholder="NIM" value="${loadGlobal('nim')}" autocomplete="off" style="max-width:180px">
      </div>
    `;
    hero.insertAdjacentElement('afterend', bar);

    bar.querySelector('#quiz-nama').addEventListener('input', debounce(() => {
      saveGlobal('nama', document.getElementById('quiz-nama').value);
    }, DEBOUNCE_MS));
    bar.querySelector('#quiz-nim').addEventListener('input', debounce(() => {
      saveGlobal('nim', document.getElementById('quiz-nim').value);
    }, DEBOUNCE_MS));
  }

  // ═══════════════════════════════════════
  //  Quiz Section (MC + Short Answer)
  // ═══════════════════════════════════════
  function createQuizSection() {
    if (QUESTIONS.length === 0) return;
    if (document.querySelector('[data-quiz-section]')) return;

    const latihanSection = findLatihanSection();
    const insertBefore = latihanSection || document.querySelector('.section-card:last-of-type');
    if (!insertBefore) return;

    const section = document.createElement('section');
    section.className = 'section-card reveal quiz-section';
    section.setAttribute('data-quiz-section', '');

    let html = `<h2>📝 Kuis Singkat</h2>
      <p class="quiz-subtitle">Jawab pertanyaan berikut untuk menguji pemahamanmu. Pilih jawaban yang paling tepat!</p>`;

    QUESTIONS.forEach((q, i) => {
      if (q.type === 'mc') {
        html += buildMCQuestion(q, i);
      } else if (q.type === 'short') {
        html += buildShortQuestion(q, i);
      }
    });

    section.innerHTML = html;
    insertBefore.insertAdjacentElement('beforebegin', section);

    // Bind MC clicks
    section.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', handleMCClick);
    });

    // Bind short answer inputs
    section.querySelectorAll('.quiz-short-input').forEach(input => {
      input.addEventListener('input', debounce(() => {
        const idx = input.getAttribute('data-q-idx');
        state.shortAnswers['q-short-' + idx] = input.value;
        savePage('q-short-' + idx, input.value);
        updateProgress();
      }, DEBOUNCE_MS));
    });

    // Restore saved answers
    QUESTIONS.forEach((q, i) => {
      if (q.type === 'mc' && state.quizAnswers['q-' + i] !== undefined) {
        restoreMCAnswer(section, i, state.quizAnswers['q-' + i], q);
      }
      if (q.type === 'short') {
        const input = section.querySelector(`[data-q-idx="${i}"]`);
        if (input && state.shortAnswers['q-short-' + i]) {
          input.value = state.shortAnswers['q-short-' + i];
        }
      }
    });
  }

  function buildMCQuestion(q, i) {
    const letters = ['A', 'B', 'C', 'D', 'E'];
    let optionsHtml = '<div class="quiz-options">';
    q.options.forEach((opt, oi) => {
      optionsHtml += `<button class="quiz-opt-btn" data-q-idx="${i}" data-opt-idx="${oi}">
        <span class="opt-letter">${letters[oi]}</span>
        <span>${opt}</span>
      </button>`;
    });
    optionsHtml += '</div>';

    return `<div class="quiz-q-card" data-q-card="${i}">
      <div class="q-header">
        <span class="q-number">${i + 1}</span>
        <p class="q-text">${q.question}</p>
      </div>
      ${optionsHtml}
      <div class="quiz-feedback-slot" data-feedback="${i}"></div>
    </div>`;
  }

  function buildShortQuestion(q, i) {
    return `<div class="quiz-q-card" data-q-card="${i}">
      <div class="q-header">
        <span class="q-number">${i + 1}</span>
        <p class="q-text">${q.question}</p>
      </div>
      <textarea class="quiz-short-input" data-q-idx="${i}" placeholder="Tulis jawabanmu di sini..." rows="3"></textarea>
    </div>`;
  }

  function handleMCClick(e) {
    const btn = e.currentTarget;
    const qIdx = parseInt(btn.getAttribute('data-q-idx'), 10);
    const optIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
    const q = QUESTIONS[qIdx];
    if (!q) return;

    const card = document.querySelector(`[data-q-card="${qIdx}"]`);
    if (!card) return;

    // Disable all options for this question
    card.querySelectorAll('.quiz-opt-btn').forEach(b => {
      b.setAttribute('disabled', '');
      b.classList.remove('selected', 'correct', 'wrong', 'show-correct');
    });

    const isCorrect = optIdx === q.correct;
    btn.classList.add('selected', isCorrect ? 'correct' : 'wrong');

    if (!isCorrect) {
      const correctBtn = card.querySelector(`[data-opt-idx="${q.correct}"]`);
      if (correctBtn) correctBtn.classList.add('show-correct');
    }

    card.classList.remove('answered-correct', 'answered-wrong');
    card.classList.add(isCorrect ? 'answered-correct' : 'answered-wrong');

    // Show feedback
    const slot = document.querySelector(`[data-feedback="${qIdx}"]`);
    if (slot) {
      slot.innerHTML = `<div class="quiz-feedback ${isCorrect ? 'correct' : 'wrong'}">
        ${isCorrect ? '✅ Benar!' : '❌ Kurang tepat.'} ${q.explanation || ''}
      </div>`;
    }

    // Save
    state.quizAnswers['q-' + qIdx] = optIdx;
    savePage('q-' + qIdx, String(optIdx));
    updateProgress();
  }

  function restoreMCAnswer(section, qIdx, optIdx, q) {
    const card = section.querySelector(`[data-q-card="${qIdx}"]`);
    if (!card) return;
    const btn = card.querySelector(`[data-opt-idx="${optIdx}"]`);
    if (!btn) return;

    card.querySelectorAll('.quiz-opt-btn').forEach(b => b.setAttribute('disabled', ''));
    const isCorrect = optIdx === q.correct;
    btn.classList.add('selected', isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) {
      const correctBtn = card.querySelector(`[data-opt-idx="${q.correct}"]`);
      if (correctBtn) correctBtn.classList.add('show-correct');
    }
    card.classList.add(isCorrect ? 'answered-correct' : 'answered-wrong');

    const slot = document.querySelector(`[data-feedback="${qIdx}"]`);
    if (slot) {
      slot.innerHTML = `<div class="quiz-feedback ${isCorrect ? 'correct' : 'wrong'}">
        ${isCorrect ? '✅ Benar!' : '❌ Kurang tepat.'} ${q.explanation || ''}
      </div>`;
    }
  }

  // ═══════════════════════════════════════
  //  Exercise Answer Fields
  // ═══════════════════════════════════════
  function findLatihanSection() {
    const headings = document.querySelectorAll('h2');
    for (const h of headings) {
      if (h.textContent.includes('Latihan')) {
        return h.closest('section') || h.closest('.section-card');
      }
    }
    return null;
  }

  function extractExerciseTitle(el) {
    const h4 = el.querySelector('h4');
    if (h4) return h4.textContent.trim();
    const strong = el.querySelector('strong');
    if (strong) return strong.textContent.trim();
    const exNum = el.querySelector('.ex-num, .ex-number');
    if (exNum) return 'Latihan ' + exNum.textContent.trim();
    return null;
  }

  function injectExerciseFields() {
    const selectors = ['.exercise', '.exercise-card', '.exercise-item'];
    let exerciseIndex = 0;

    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (el.querySelector('[data-quiz-ex-key]')) return; // idempotent

        const title = extractExerciseTitle(el) || ('Latihan ' + (exerciseIndex + 1));
        const slug = slugify(title);
        const key = slug || ('ex-' + exerciseIndex);

        const saved = loadPage('ex-' + key);
        state.exerciseAnswers[key] = saved;

        const area = document.createElement('div');
        area.className = 'quiz-answer-area';
        area.innerHTML = `
          <label for="ex-${key}">✍️ Tulis jawaban / kode kamu di sini:</label>
          <textarea id="ex-${key}" data-quiz-ex-key="${key}" placeholder="Ketik jawaban atau paste kode kamu...">${saved}</textarea>
          <div class="save-indicator" id="si-${key}">💾 Auto-save aktif</div>
        `;
        el.appendChild(area);

        const textarea = area.querySelector('textarea');
        textarea.addEventListener('input', debounce(() => {
          const val = textarea.value;
          state.exerciseAnswers[key] = val;
          savePage('ex-' + key, val);
          const si = document.getElementById('si-' + key);
          if (si) {
            si.textContent = '✅ Tersimpan!';
            si.classList.add('saved');
            setTimeout(() => {
              si.textContent = '💾 Auto-save aktif';
              si.classList.remove('saved');
            }, 2000);
          }
          updateProgress();
        }, DEBOUNCE_MS));

        textarea.addEventListener('keydown', (e) => {
          if (e.key === 'Tab') {
            e.preventDefault();
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 2;
          }
        });

        exerciseIndex++;
      });
    });
  }

  // ═══════════════════════════════════════
  //  Floating Panel
  // ═══════════════════════════════════════
  function createFloatingPanel() {
    if (document.querySelector('[data-quiz-panel]')) return;

    const panel = document.createElement('div');
    panel.className = 'quiz-floating-panel';
    panel.setAttribute('data-quiz-panel', '');
    panel.innerHTML = `
      <div class="quiz-panel-header">
        <h4>📝 Kuis</h4>
        <button class="quiz-panel-toggle" title="Toggle panel">▼</button>
      </div>
      <div class="quiz-panel-body">
        <div class="quiz-progress-bar"><div class="quiz-progress-fill" id="quiz-progress-fill"></div></div>
        <div class="quiz-progress-text" id="quiz-progress-text">Memuat...</div>
        <button class="quiz-btn quiz-btn-primary" id="quiz-download-btn">📥 Download Jawaban (.md)</button>
        <button class="quiz-btn quiz-btn-secondary" id="quiz-retry-btn">🔄 Ulangi Kuis</button>
        <button class="quiz-btn quiz-btn-danger" id="quiz-reset-btn">🗑️ Reset Semua</button>
      </div>
    `;
    document.body.appendChild(panel);

    // Toggle
    const header = panel.querySelector('.quiz-panel-header');
    const toggle = panel.querySelector('.quiz-panel-toggle');
    header.addEventListener('click', () => {
      panel.classList.toggle('collapsed');
      toggle.textContent = panel.classList.contains('collapsed') ? '▲' : '▼';
    });

    // Download
    panel.querySelector('#quiz-download-btn').addEventListener('click', handleDownload);

    // Retry quiz
    panel.querySelector('#quiz-retry-btn').addEventListener('click', () => {
      if (!confirm('Ulangi kuis pilihan ganda? Jawaban latihan tetap tersimpan.')) return;
      QUESTIONS.forEach((q, i) => {
        if (q.type === 'mc') {
          delete state.quizAnswers['q-' + i];
          safeStorage('remove', 'quiz-' + PAGE_ID + '-q-' + i);
        }
      });
      const qs = document.querySelector('[data-quiz-section]');
      if (qs) qs.remove();
      createQuizSection();
      updateProgress();
      toast('Kuis direset! Silakan jawab ulang.');
    });

    // Reset all
    panel.querySelector('#quiz-reset-btn').addEventListener('click', () => {
      if (!confirm('Hapus SEMUA jawaban di halaman ini? (Nama & NIM tetap tersimpan)')) return;
      QUESTIONS.forEach((_, i) => {
        safeStorage('remove', 'quiz-' + PAGE_ID + '-q-' + i);
        safeStorage('remove', 'quiz-' + PAGE_ID + '-q-short-' + i);
      });
      document.querySelectorAll('[data-quiz-ex-key]').forEach(el => {
        const key = el.getAttribute('data-quiz-ex-key');
        safeStorage('remove', 'quiz-' + PAGE_ID + '-ex-' + key);
        el.value = '';
      });
      state.quizAnswers = {};
      state.shortAnswers = {};
      state.exerciseAnswers = {};
      const qs = document.querySelector('[data-quiz-section]');
      if (qs) qs.remove();
      createQuizSection();
      updateProgress();
      toast('Semua jawaban di halaman ini sudah dihapus.');
    });

    updateProgress();
  }

  function updateProgress() {
    const { total, answered } = countAnswered();
    const pct = total > 0 ? Math.round((answered / total) * 100) : 0;
    const fill = document.getElementById('quiz-progress-fill');
    const text = document.getElementById('quiz-progress-text');
    if (fill) fill.style.width = pct + '%';
    if (text) text.innerHTML = `<strong>${answered}</strong> dari <strong>${total}</strong> terjawab (${pct}%)`;
  }

  // ═══════════════════════════════════════
  //  Download / Export
  // ═══════════════════════════════════════
  function handleDownload() {
    const nama = (document.getElementById('quiz-nama') || {}).value || '';
    const nim = (document.getElementById('quiz-nim') || {}).value || '';

    if (!nama.trim() || !nim.trim()) {
      showNameModal(() => handleDownload());
      return;
    }

    const md = generateMarkdown(nama.trim(), nim.trim());
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jawaban-' + PAGE_ID + '.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('✅ File jawaban-' + PAGE_ID + '.md berhasil didownload!');
  }

  function generateMarkdown(nama, nim) {
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    let md = `# 📝 Jawaban — ${PAGE_TITLE}\n\n`;
    md += `| Info | Detail |\n`;
    md += `|------|--------|\n`;
    md += `| **Nama** | ${escapeTableCell(nama)} |\n`;
    md += `| **NIM** | ${escapeTableCell(nim)} |\n`;
    md += `| **Halaman** | ${escapeTableCell(PAGE_TITLE)} |\n`;
    md += `| **Tanggal** | ${dateStr}, ${timeStr} |\n\n`;
    md += `---\n\n`;

    // Quiz answers
    const mcQuestions = QUESTIONS.filter(q => q.type === 'mc' || q.type === 'short');
    if (mcQuestions.length > 0) {
      md += `## 📝 Kuis Singkat\n\n`;
      QUESTIONS.forEach((q, i) => {
        md += `### ${i + 1}. ${q.question}\n\n`;
        if (q.type === 'mc') {
          const chosen = state.quizAnswers['q-' + i];
          if (chosen !== undefined) {
            const isCorrect = chosen === q.correct;
            md += `**Jawaban:** (${letters[chosen]}) ${q.options[chosen]} ${isCorrect ? '✅' : '❌'}\n\n`;
            if (!isCorrect) {
              md += `**Jawaban benar:** (${letters[q.correct]}) ${q.options[q.correct]}\n\n`;
            }
          } else {
            md += `**Jawaban:** _(belum dijawab)_\n\n`;
          }
        } else if (q.type === 'short') {
          const ans = (state.shortAnswers['q-short-' + i] || '').trim();
          if (ans) {
            md += `**Jawaban:**\n\n${ans}\n\n`;
          } else {
            md += `**Jawaban:** _(belum dijawab)_\n\n`;
          }
        }
      });
    }

    // Exercise answers
    const exKeys = [];
    document.querySelectorAll('[data-quiz-ex-key]').forEach(el => {
      exKeys.push(el.getAttribute('data-quiz-ex-key'));
    });

    if (exKeys.length > 0) {
      md += `---\n\n## ✏️ Jawaban Latihan\n\n`;
      let exNum = 1;
      document.querySelectorAll('[data-quiz-ex-key]').forEach(el => {
        const key = el.getAttribute('data-quiz-ex-key');
        const exerciseDiv = el.closest('.exercise, .exercise-card, .exercise-item, .quiz-answer-area');
        const parentEx = exerciseDiv ? exerciseDiv.closest('.exercise, .exercise-card, .exercise-item') : null;
        const title = parentEx ? (extractExerciseTitle(parentEx) || 'Latihan ' + exNum) : 'Latihan ' + exNum;
        const code = (el.value || '').trim();

        md += `### ${title}\n\n`;
        if (code) {
          md += '```js\n' + code + '\n```\n\n';
        } else {
          md += '_(belum dijawab)_\n\n';
        }
        exNum++;
      });
    }

    // Score summary
    const { total, answered } = countAnswered();
    let mcCorrect = 0, mcTotal = 0;
    QUESTIONS.forEach((q, i) => {
      if (q.type === 'mc') {
        mcTotal++;
        if (state.quizAnswers['q-' + i] === q.correct) mcCorrect++;
      }
    });

    md += `---\n\n## 📊 Ringkasan\n\n`;
    md += `| Metrik | Nilai |\n`;
    md += `|--------|-------|\n`;
    md += `| Total dijawab | ${answered} / ${total} |\n`;
    if (mcTotal > 0) {
      md += `| Skor kuis | ${mcCorrect} / ${mcTotal} (${Math.round(mcCorrect / mcTotal * 100)}%) |\n`;
    }
    md += `| Latihan terisi | ${exKeys.filter(k => (state.exerciseAnswers[k] || '').trim()).length} / ${exKeys.length} |\n\n`;
    md += `---\n\n_Dibuat otomatis oleh Sistem Kuis Pertemuan 00_\n`;

    return md;
  }

  // ═══════════════════════════════════════
  //  Name Modal (shown when download without name)
  // ═══════════════════════════════════════
  function showNameModal(callback) {
    if (document.querySelector('.quiz-modal-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'quiz-modal-overlay';
    overlay.innerHTML = `
      <div class="quiz-modal">
        <h3>📋 Isi Data Diri</h3>
        <p>Nama dan NIM diperlukan sebelum download jawaban.</p>
        <input type="text" id="modal-nama" placeholder="Nama Lengkap" value="${loadGlobal('nama')}">
        <input type="text" id="modal-nim" placeholder="NIM" value="${loadGlobal('nim')}">
        <button class="quiz-btn quiz-btn-primary" id="modal-save" style="margin-top:4px">Simpan & Download</button>
        <button class="quiz-btn quiz-btn-secondary" id="modal-cancel" style="margin-top:4px">Batal</button>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('modal-save').addEventListener('click', () => {
      const nama = document.getElementById('modal-nama').value.trim();
      const nim = document.getElementById('modal-nim').value.trim();
      if (!nama || !nim) {
        toast('⚠️ Nama dan NIM wajib diisi!');
        return;
      }
      saveGlobal('nama', nama);
      saveGlobal('nim', nim);
      if (document.getElementById('quiz-nama')) document.getElementById('quiz-nama').value = nama;
      if (document.getElementById('quiz-nim')) document.getElementById('quiz-nim').value = nim;
      overlay.remove();
      if (callback) callback();
    });

    document.getElementById('modal-cancel').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  }

  // ═══════════════════════════════════════
  //  Init
  // ═══════════════════════════════════════
  function init() {
    // Inject CSS
    const style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);

    // Build UI
    createStudentBar();
    injectExerciseFields();
    loadState();
    createQuizSection();
    createFloatingPanel();

    // Restore exercise values after state loaded
    document.querySelectorAll('[data-quiz-ex-key]').forEach(el => {
      const key = el.getAttribute('data-quiz-ex-key');
      const saved = loadPage('ex-' + key);
      if (saved) el.value = saved;
    });

    updateProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
