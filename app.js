const STORAGE_KEY = 'english_30day_coach_v2';

let state = {
  currentDay: 1,
  currentStep: 1, // 1, 2, or 3
  flowMode: 'step', // 'step' (Guided Step-by-Step) or 'all' (All Steps Visible)
  selectedWeek: 0,
  completedDays: [],
  routineChecks: {}, // { [day]: { phrases: bool, listen: bool, speak: bool } }
  practicedPhrases: {}, // { [day]: [0, 1, 2...] }
  savedPhrases: [], // array of { day, phrase, example, context }
  notes: {},
  selectedVoiceURI: ''
};

// Studio Timer & Recording State
let targetDurationSeconds = 120;
let timerSeconds = 120;
let timerInterval = null;
let timerRunning = false;

let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;
let currentAudioUrl = null;

// Web Audio Visualizer State
let audioCtx = null;
let analyser = null;
let visualizerFrame = null;

// Live Speech Recognition during Studio Recording
let studioRecognition = null;
let studioTranscriptText = '';
let recordingStartTime = 0;

// Roleplay & Flashcard State
let blindListeningMode = false;
let flashcardDeck = [];
let flashcardIndex = 0;
let flashcardFlipped = false;

/* ===== PERSISTENCE ===== */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...state, ...parsed };
    } else {
      const v1 = localStorage.getItem('english_30day_coach_v1');
      if (v1) {
        const parsedV1 = JSON.parse(v1);
        state = { ...state, ...parsedV1 };
      }
    }
  } catch (e) {
    console.warn('Could not load state:', e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save state:', e);
  }
}

/* ===== TOAST NOTIFICATIONS ===== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 260);
  }, 2600);
}

/* ===== MOBILE DRAWER CONTROLLER ===== */
function openMobileDrawer() {
  const sidebar = document.getElementById('appSidebar');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  if (sidebar) sidebar.classList.add('drawer-open');
  if (backdrop) backdrop.classList.remove('hidden');
}

function closeMobileDrawer() {
  const sidebar = document.getElementById('appSidebar');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  if (sidebar) sidebar.classList.remove('drawer-open');
  if (backdrop) backdrop.classList.add('hidden');
}

/* ===== THEME & BRAND SCHEMA CONTROLLER ===== */
function initThemeAndBrand() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const currentBrand = document.documentElement.getAttribute('data-brand') || 'indigo';

  updateThemeUI(currentTheme, currentBrand);

  document.getElementById('themeToggleBtn').addEventListener('click', () => {
    const now = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', now);
    localStorage.setItem('fluent30_theme', now);
    updateThemeUI(now, document.documentElement.getAttribute('data-brand'));
    showToast(now === 'light' ? '☀️ Crisp Daylight Mode' : '🌙 Midnight Aurora Mode');
  });

  document.querySelectorAll('[data-brand-choice]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const brand = btn.dataset.brandChoice;
      document.documentElement.setAttribute('data-brand', brand);
      localStorage.setItem('fluent30_brand', brand);
      updateThemeUI(document.documentElement.getAttribute('data-theme'), brand);
      const names = {
        indigo: 'Royal Indigo',
        emerald: 'Emerald Mint',
        ocean: 'Ocean Sapphire',
        amber: 'Sunset Amber'
      };
      showToast(`🎨 Color Schema: ${names[brand] || brand}`);
    });
  });
}

function updateThemeUI(theme, brand) {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) {
    toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  document.querySelectorAll('[data-brand-choice]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.brandChoice === brand);
  });
}

/* ===== VOICE SELECTOR & TEXT-TO-SPEECH ===== */
function populateVoiceList() {
  if (!('speechSynthesis' in window)) return;
  const selects = [
    document.getElementById('voiceSelect'),
    document.getElementById('voiceSelectMobile')
  ].filter(Boolean);
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'));
  if (!voices.length) return;

  selects.forEach((select) => {
    select.innerHTML = '<option value="">🌐 Auto Best English Voice</option>';
    voices.forEach((v) => {
      const opt = document.createElement('option');
      opt.value = v.voiceURI;
      opt.textContent = `${v.name.replace(/Microsoft |Google /g, '')} (${v.lang})`;
      if (state.selectedVoiceURI === v.voiceURI) opt.selected = true;
      select.appendChild(opt);
    });
  });
}

function speakText(text, rate = 1.0, onEndCallback = null) {
  if (!('speechSynthesis' in window)) {
    showToast('⚠️ Text-to-Speech is not supported in this browser.');
    return;
  }
  window.speechSynthesis.cancel();
  const cleanText = text.replace(/\[.*?\]/g, 'Alex');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'en-US';
  utterance.rate = rate;

  const voices = window.speechSynthesis.getVoices();
  let chosen = null;
  if (state.selectedVoiceURI) {
    chosen = voices.find((v) => v.voiceURI === state.selectedVoiceURI);
  }
  if (!chosen) {
    chosen =
      voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Online'))
      ) || voices.find((v) => v.lang.startsWith('en'));
  }
  if (chosen) utterance.voice = chosen;

  if (onEndCallback) utterance.onend = onEndCallback;
  window.speechSynthesis.speak(utterance);
}

/* ===== PRONUNCIATION CHECKER ===== */
function checkPronunciation(targetSentence, feedbackEl, btnEl, onSuccess = null) {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    feedbackEl.className = 'speech-feedback visible try-again';
    feedbackEl.textContent =
      'Live speech check requires Chrome or Edge. Practice out loud and use Step 3 Studio Recorder!';
    if (onSuccess) onSuccess();
    return;
  }

  const recognition = new SpeechRec();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const originalLabel = btnEl.innerHTML;
  btnEl.innerHTML = '🔴 Listening...';
  btnEl.disabled = true;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const score = calculateSimilarity(targetSentence, transcript);

    feedbackEl.classList.add('visible');
    if (score >= 0.58) {
      feedbackEl.className = 'speech-feedback visible good';
      feedbackEl.innerHTML = `✅ <strong>Clear Pronunciation! (${Math.round(
        score * 100
      )}% match)</strong> — Heard: <em>"${transcript}"</em>`;
      if (onSuccess) onSuccess();
    } else {
      feedbackEl.className = 'speech-feedback visible try-again';
      feedbackEl.innerHTML = `💡 <strong>Almost there (${Math.round(
        score * 100
      )}% match)</strong> — Heard: <em>"${transcript}"</em>. Try speaking slowly!`;
    }
  };

  recognition.onerror = (err) => {
    feedbackEl.className = 'speech-feedback visible try-again';
    feedbackEl.textContent = `Could not capture voice (${err.error}). Check browser mic permissions.`;
  };

  recognition.onend = () => {
    btnEl.innerHTML = originalLabel;
    btnEl.disabled = false;
  };

  recognition.start();
}

function calculateSimilarity(target, spoken) {
  const normalize = (s) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(Boolean);

  const targetWords = normalize(target);
  const spokenWords = normalize(spoken);
  if (!targetWords.length) return 0;

  let matches = 0;
  targetWords.forEach((w) => {
    if (spokenWords.includes(w)) matches++;
  });
  return matches / targetWords.length;
}

/* ===== HEADER, MOBILE STRIP & SIDEBAR RENDERING ===== */
function renderHeaderStats() {
  const completedCount = state.completedDays.length;
  const pct = Math.round((completedCount / 30) * 100);

  document.getElementById('completedCountText').textContent = `${completedCount}/30`;
  document.getElementById('progressPercentText').textContent = `${pct}%`;
  document.getElementById('progressBarFill').style.width = `${pct}%`;

  let streak = 0;
  const sorted = [...state.completedDays].sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i++) {
    if (i === 0 || sorted[i] === sorted[i - 1] + 1) streak++;
    else streak = 1;
  }
  document.getElementById('streakCountText').textContent = `${streak}d`;
  document.getElementById('savedCountBadge').textContent = state.savedPhrases.length;

  const mobileDayBtnText = document.getElementById('mobileDayBtnText');
  if (mobileDayBtnText) {
    mobileDayBtnText.textContent = `Day ${state.currentDay}`;
  }
}

function renderMobileDayStrip() {
  const strip = document.getElementById('mobileDayStrip');
  if (!strip) return;
  strip.innerHTML = '';

  CURRICULUM_DATA.forEach((item) => {
    const pill = document.createElement('button');
    const isCompleted = state.completedDays.includes(item.day);
    const isActive = item.day === state.currentDay;

    pill.type = 'button';
    pill.className = `strip-day-pill ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
    pill.innerHTML = `<span>Day ${item.day}</span>${isCompleted ? '<span>✓</span>' : ''}`;
    pill.addEventListener('click', () => selectDay(item.day));
    strip.appendChild(pill);

    if (isActive) {
      setTimeout(() => {
        pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }, 50);
    }
  });
}

function renderSidebar() {
  document.querySelectorAll('.week-tab').forEach((tab) => {
    const w = Number(tab.dataset.week);
    tab.classList.toggle('active', w === state.selectedWeek);
  });

  const weekLabels = {
    0: 'All 30 Days',
    1: 'Week 1: Survival',
    2: 'Week 2: Small Talk',
    3: 'Week 3: PREP Story',
    4: 'Week 4: Fluency'
  };
  document.getElementById('currentWeekBadge').textContent = weekLabels[state.selectedWeek];

  const grid = document.getElementById('daysGrid');
  grid.innerHTML = '';

  const filteredDays = CURRICULUM_DATA.filter(
    (d) => state.selectedWeek === 0 || d.week === state.selectedWeek
  );

  filteredDays.forEach((item) => {
    const btn = document.createElement('button');
    const isCompleted = state.completedDays.includes(item.day);
    const isActive = item.day === state.currentDay;

    btn.className = `day-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
    btn.title = `Day ${item.day}: ${item.title}`;
    btn.innerHTML = `
      <span>${item.day}</span>
      <span class="check-dot">${isCompleted ? '✓' : '•'}</span>
    `;
    btn.addEventListener('click', () => {
      selectDay(item.day);
      closeMobileDrawer();
    });
    grid.appendChild(btn);
  });

  const checks = state.routineChecks[state.currentDay] || {
    phrases: false,
    listen: false,
    speak: false
  };

  let doneCount = 0;
  ['phrases', 'listen', 'speak'].forEach((key) => {
    const checkbox = document.getElementById(`check-${key}`);
    const labelWrap = checkbox.closest('.routine-item');
    checkbox.checked = !!checks[key];
    labelWrap.classList.toggle('checked', !!checks[key]);
    if (checks[key]) doneCount++;
  });

  document.getElementById('routineProgressText').textContent = `${doneCount}/3 Done`;

  const completeBtn = document.getElementById('markDayCompleteBtn');
  const isDone = state.completedDays.includes(state.currentDay);
  if (isDone) {
    completeBtn.className = 'btn btn-success';
    completeBtn.innerHTML = `✅ Day ${state.currentDay} Completed! (Undo)`;
  } else {
    completeBtn.className = 'btn btn-primary';
    completeBtn.innerHTML = `🏆 Mark Day ${state.currentDay} Complete`;
  }

  renderMobileDayStrip();
}

/* ===== GUIDED WORKFLOW STEPPER ===== */
function renderWorkflowSteps() {
  const checks = state.routineChecks[state.currentDay] || {
    phrases: false,
    listen: false,
    speak: false
  };
  const practicedArr = state.practicedPhrases[state.currentDay] || [];

  document.getElementById('stepSub1').textContent = `${practicedArr.length}/5 done`;
  document.getElementById('phrasesPracticedBadge').textContent = `${practicedArr.length} / 5 Practiced`;
  document.getElementById('stepSub2').textContent = checks.listen ? '✓ Done' : '15m Shadow';
  document.getElementById('stepSub3').textContent = checks.speak ? '✓ Done' : 'PREP + Mic';

  const stepMap = { 1: checks.phrases, 2: checks.listen, 3: checks.speak };

  document.querySelectorAll('.step-pill').forEach((pill) => {
    const s = Number(pill.dataset.step);
    pill.classList.toggle('active', state.flowMode === 'step' && s === state.currentStep);
    pill.classList.toggle('done', !!stepMap[s]);
    const numEl = pill.querySelector('.step-num');
    numEl.textContent = stepMap[s] ? '✓' : s;
  });

  const flowBtn = document.getElementById('toggleFlowModeBtn');
  if (state.flowMode === 'all') {
    flowBtn.textContent = '📑 View: All Steps';
    document.getElementById('stepCard1').classList.remove('hidden');
    document.getElementById('stepCard2').classList.remove('hidden');
    document.getElementById('stepCard3').classList.remove('hidden');
  } else {
    flowBtn.textContent = '🎯 View: Step-by-Step';
    document.getElementById('stepCard1').classList.toggle('hidden', state.currentStep !== 1);
    document.getElementById('stepCard2').classList.toggle('hidden', state.currentStep !== 2);
    document.getElementById('stepCard3').classList.toggle('hidden', state.currentStep !== 3);
  }
}

function setStep(stepNum) {
  state.currentStep = stepNum;
  saveState();
  renderWorkflowSteps();
}

function selectDay(dayNum) {
  state.currentDay = Math.max(1, Math.min(30, dayNum));
  state.currentStep = 1;
  saveState();
  resetTimer();
  renderSidebar();
  renderCurrentDay();
  renderWorkflowSteps();
  renderHeaderStats();
}

/* ===== SWITCH ACTIVE MAIN VIEW (Desktop Tabs + Mobile Bottom Nav) ===== */
function switchMainView(targetView) {
  document.querySelectorAll('.mode-tab').forEach((t) => {
    t.classList.toggle('active', t.dataset.view === targetView);
  });
  document.querySelectorAll('[data-mobile-view]').forEach((t) => {
    t.classList.toggle('active', t.dataset.mobileView === targetView);
  });

  document.getElementById('view-lesson').classList.toggle('hidden', targetView !== 'lesson');
  document.getElementById('view-flashcards').classList.toggle('hidden', targetView !== 'flashcards');
  document.getElementById('view-phrasebook').classList.toggle('hidden', targetView !== 'phrasebook');
  document.getElementById('view-shadowlab').classList.toggle('hidden', targetView !== 'shadowlab');

  if (targetView === 'flashcards') {
    buildFlashcardDeck(state.savedPhrases.length ? 'saved' : 'today');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===== RENDER CURRENT DAY LESSON ===== */
function renderCurrentDay() {
  const dayData = CURRICULUM_DATA.find((d) => d.day === state.currentDay) || CURRICULUM_DATA[0];

  const weekNames = {
    1: 'Week 1: Survival Phrases',
    2: 'Week 2: Everyday Conversations',
    3: 'Week 3: PREP Storytelling',
    4: 'Week 4: Real-World Fluency'
  };

  document.getElementById('dayEyebrow').textContent = `Day ${dayData.day} of 30 • ${weekNames[dayData.week]}`;
  document.getElementById('dayTitle').textContent = dayData.title;
  document.getElementById('dayGoal').textContent = `🎯 Goal: ${dayData.goal}`;
  document.getElementById('dayTip').innerHTML = `<strong>💡 Daily Coach Tip:</strong> ${dayData.tip}`;

  document.getElementById('prevDayBtn').disabled = state.currentDay <= 1;
  document.getElementById('nextDayBtn').disabled = state.currentDay >= 30;

  // Render Step 1: 5 Phrases
  const phrasesContainer = document.getElementById('phrasesList');
  phrasesContainer.innerHTML = '';
  const practicedArr = state.practicedPhrases[state.currentDay] || [];

  dayData.phrases.forEach((p, idx) => {
    const isPracticed = practicedArr.includes(idx);
    const isSaved = state.savedPhrases.some((sp) => sp.phrase === p.phrase);

    const card = document.createElement('div');
    card.className = `phrase-card ${isPracticed ? 'practiced' : ''}`;
    card.innerHTML = `
      <div class="phrase-top">
        <div class="phrase-pattern">
          ${idx + 1}. "${p.phrase}"
          ${isPracticed ? '<span style="color: var(--status-success); font-size: 0.78rem; margin-left: 4px;">✓</span>' : ''}
        </div>
        <div class="phrase-actions">
          <button class="btn btn-sm listen-normal-btn" type="button">🔊 Listen</button>
          <button class="btn btn-sm listen-slow-btn" type="button">🐢 Shadow</button>
          <button class="btn btn-sm speak-check-btn" type="button">🎙️ Speak</button>
          <button class="bookmark-btn ${isSaved ? 'saved' : ''}" type="button" title="Save to Flashcards">
            ${isSaved ? '⭐ Saved' : '☆ Save'}
          </button>
        </div>
      </div>
      <div class="phrase-example-box">
        <span class="phrase-example">"${p.example}"</span>
      </div>
      <div class="phrase-context">💡 ${p.context}</div>
      <div class="speech-feedback"></div>
    `;

    const normalBtn = card.querySelector('.listen-normal-btn');
    const slowBtn = card.querySelector('.listen-slow-btn');
    const checkBtn = card.querySelector('.speak-check-btn');
    const bookmarkBtn = card.querySelector('.bookmark-btn');
    const feedbackEl = card.querySelector('.speech-feedback');

    normalBtn.addEventListener('click', () => {
      speakText(p.example, 1.0);
      markPhrasePracticed(idx);
    });
    slowBtn.addEventListener('click', () => {
      speakText(p.example, 0.75);
      markPhrasePracticed(idx);
    });
    checkBtn.addEventListener('click', () => {
      checkPronunciation(p.example, feedbackEl, checkBtn, () => markPhrasePracticed(idx));
    });
    bookmarkBtn.addEventListener('click', () => {
      toggleSavePhrase(dayData.day, p, bookmarkBtn);
    });

    phrasesContainer.appendChild(card);
  });

  renderDialogue(dayData);

  document.getElementById('speakingQuestion').textContent = dayData.prompt.question;
  document.getElementById('prepPoint').textContent = dayData.prompt.prep.point;
  document.getElementById('prepReason').textContent = dayData.prompt.prep.reason;
  document.getElementById('prepExample').textContent = dayData.prompt.prep.example;
  document.getElementById('prepWrap').textContent = dayData.prompt.prep.wrap;

  document.getElementById('dailyNotesInput').value = state.notes[state.currentDay] || '';
}

function renderDialogue(dayData) {
  const dialogueContainer = document.getElementById('dialogueContainer');
  dialogueContainer.innerHTML = '';

  dayData.dialogue.forEach((line, index) => {
    const isYou = line.speaker.toLowerCase() === 'you';
    const row = document.createElement('div');
    row.className = `dialogue-line ${isYou ? 'you' : 'partner'}`;
    row.id = `dialogue-line-${index}`;
    row.innerHTML = `
      <div style="flex: 1; min-width: 0;">
        <span class="speaker-tag ${isYou ? 'you' : 'partner'}">
          ${isYou ? '🗣️ YOU (Your Turn)' : '👤 PARTNER'}
        </span>
        <div class="dialogue-text ${blindListeningMode ? 'blurred' : ''}" title="${
      blindListeningMode ? 'Tap to reveal text' : ''
    }">${line.text}</div>
        <div class="speech-feedback" id="dialogue-feedback-${index}"></div>
      </div>
      <div style="display: flex; gap: 0.35rem; flex-shrink: 0;">
        <button class="btn btn-sm listen-line-btn" type="button" title="Listen">🔊</button>
        ${
          isYou
            ? `<button class="btn btn-sm practice-line-btn" type="button" title="Speak this line">🎙️</button>`
            : ''
        }
      </div>
    `;

    const textEl = row.querySelector('.dialogue-text');
    textEl.addEventListener('click', () => {
      textEl.classList.remove('blurred');
    });

    row.querySelector('.listen-line-btn').addEventListener('click', () => {
      speakText(line.text, 1.0);
    });

    const practiceBtn = row.querySelector('.practice-line-btn');
    if (practiceBtn) {
      const fbEl = row.querySelector(`#dialogue-feedback-${index}`);
      practiceBtn.addEventListener('click', () => {
        checkPronunciation(line.text, fbEl, practiceBtn, () => {
          markRoutineStep('listen', true);
        });
      });
    }

    dialogueContainer.appendChild(row);
  });
}

function markPhrasePracticed(phraseIdx) {
  if (!state.practicedPhrases[state.currentDay]) {
    state.practicedPhrases[state.currentDay] = [];
  }
  if (!state.practicedPhrases[state.currentDay].includes(phraseIdx)) {
    state.practicedPhrases[state.currentDay].push(phraseIdx);
    if (state.practicedPhrases[state.currentDay].length >= 5) {
      markRoutineStep('phrases', true);
      showToast('🎯 All 5 phrases practiced! Ready for Step 2.');
    }
    saveState();
    renderCurrentDay();
    renderWorkflowSteps();
  }
}

function toggleSavePhrase(dayNum, phraseObj, btnEl) {
  const existingIdx = state.savedPhrases.findIndex((item) => item.phrase === phraseObj.phrase);
  if (existingIdx > -1) {
    state.savedPhrases.splice(existingIdx, 1);
    btnEl.classList.remove('saved');
    btnEl.textContent = '☆ Save';
    showToast('Removed phrase from Saved Flashcards');
  } else {
    state.savedPhrases.push({
      day: dayNum,
      phrase: phraseObj.phrase,
      example: phraseObj.example,
      context: phraseObj.context
    });
    btnEl.classList.add('saved');
    btnEl.textContent = '⭐ Saved';
    showToast('⭐ Saved to your Flashcard Deck!');
  }
  saveState();
  renderHeaderStats();
}

/* ===== STEP 2: INTERACTIVE ROLEPLAY MODES ===== */
function playFullDialogue() {
  const dayData = CURRICULUM_DATA.find((d) => d.day === state.currentDay) || CURRICULUM_DATA[0];
  const statusEl = document.getElementById('roleplayStatusText');
  let idx = 0;

  function nextLine() {
    document.querySelectorAll('.dialogue-line').forEach((el) => el.classList.remove('speaking-now'));
    if (idx >= dayData.dialogue.length) {
      statusEl.textContent = '✅ Full dialogue finished! Now try Interactive Roleplay.';
      markRoutineStep('listen', true);
      return;
    }

    const lineEl = document.getElementById(`dialogue-line-${idx}`);
    if (lineEl) lineEl.classList.add('speaking-now');

    const line = dayData.dialogue[idx];
    statusEl.textContent = `🔊 Playing ${line.speaker}'s line (${idx + 1}/${dayData.dialogue.length})...`;
    idx++;
    speakText(line.text, 0.95, () => {
      setTimeout(nextLine, 650);
    });
  }
  nextLine();
}

function startInteractiveRoleplay() {
  const dayData = CURRICULUM_DATA.find((d) => d.day === state.currentDay) || CURRICULUM_DATA[0];
  const statusEl = document.getElementById('roleplayStatusText');
  let idx = 0;

  function stepRoleplay() {
    document.querySelectorAll('.dialogue-line').forEach((el) => el.classList.remove('speaking-now'));
    if (idx >= dayData.dialogue.length) {
      statusEl.textContent = '🎉 Roleplay complete! Great back-and-forth fluency!';
      markRoutineStep('listen', true);
      showToast('🎭 Interactive Roleplay Completed!');
      return;
    }

    const line = dayData.dialogue[idx];
    const lineEl = document.getElementById(`dialogue-line-${idx}`);
    if (lineEl) lineEl.classList.add('speaking-now');

    const isYou = line.speaker.toLowerCase() === 'you';
    if (!isYou) {
      statusEl.textContent = `👤 Partner is speaking... Listen closely!`;
      idx++;
      speakText(line.text, 0.96, () => {
        setTimeout(stepRoleplay, 500);
      });
    } else {
      statusEl.textContent = `🎙️ YOUR TURN! Read the highlighted line out loud now...`;
      const fbEl = document.getElementById(`dialogue-feedback-${idx}`);
      const btnEl = lineEl.querySelector('.practice-line-btn') || lineEl.querySelector('.listen-line-btn');
      idx++;

      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRec) {
        checkPronunciation(line.text, fbEl, btnEl, () => {
          setTimeout(stepRoleplay, 900);
        });
      } else {
        setTimeout(stepRoleplay, 4500);
      }
    }
  }

  stepRoleplay();
}

/* ===== STEP 3: 2-MINUTE SPEAKING STUDIO, RING TIMER & WAVEFORM ===== */
function updateTimerDisplay() {
  const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
  const secs = String(timerSeconds % 60).padStart(2, '0');
  document.getElementById('timerDisplay').textContent = `${mins}:${secs}`;

  const ring = document.getElementById('timerRingProgress');
  if (ring) {
    const fraction = (targetDurationSeconds - timerSeconds) / targetDurationSeconds;
    const offset = 345 - fraction * 345;
    ring.style.strokeDashoffset = String(Math.max(0, offset));
  }
}

function toggleTimer() {
  const btn = document.getElementById('timerToggleBtn');
  const subText = document.getElementById('timerSubText');
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    btn.textContent = '▶️ Resume';
    subText.textContent = 'PAUSED';
  } else {
    timerRunning = true;
    btn.textContent = '⏸️ Pause';
    subText.textContent = isRecording ? 'RECORDING' : 'SPEAKING';
    timerInterval = setInterval(() => {
      if (timerSeconds > 0) {
        timerSeconds--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        timerRunning = false;
        subText.textContent = 'DONE!';
        btn.textContent = '🎉 Done!';
        if (isRecording) toggleVoiceRecording();
        markRoutineStep('speak', true);
        showToast('🎉 Speaking Challenge Complete!');
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerSeconds = targetDurationSeconds;
  updateTimerDisplay();
  const btn = document.getElementById('timerToggleBtn');
  const subText = document.getElementById('timerSubText');
  if (btn) btn.textContent = '⏱️ Timer Only';
  if (subText) subText.textContent = 'READY';
}

function startWaveformVisualizer(stream) {
  const canvas = document.getElementById('waveformCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioCtx.createMediaStreamSource(stream);
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 128;
  source.connect(analyser);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    if (!isRecording) return;
    visualizerFrame = requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / bufferLength) * 1.8;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * canvas.height * 0.9;
      ctx.fillStyle = '#6366f1';
      ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
      x += barWidth;
    }
  }
  draw();
}

function stopWaveformVisualizer() {
  if (visualizerFrame) cancelAnimationFrame(visualizerFrame);
  if (audioCtx && audioCtx.state !== 'closed') {
    audioCtx.close().catch(() => {});
  }
}

function startLiveTranscript() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const box = document.getElementById('liveTranscriptBox');
  const wpmBadge = document.getElementById('wpmStatsBadge');
  studioTranscriptText = '';
  recordingStartTime = Date.now();

  if (!SpeechRec) {
    box.innerHTML = '🎙️ <em>Recording audio... Speak clearly using the P-R-E-P points above!</em>';
    return;
  }

  studioRecognition = new SpeechRec();
  studioRecognition.lang = 'en-US';
  studioRecognition.continuous = true;
  studioRecognition.interimResults = true;

  studioRecognition.onresult = (event) => {
    let interim = '';
    let finalStr = '';
    for (let i = 0; i < event.results.length; i++) {
      const t = event.results[i][0].transcript;
      if (event.results[i].isFinal) finalStr += t + ' ';
      else interim += t;
    }
    studioTranscriptText = (finalStr + interim).trim();
    box.innerHTML = studioTranscriptText
      ? `🗣️ "${studioTranscriptText}"`
      : '🎙️ <em>Listening to your speech...</em>';

    const words = studioTranscriptText.split(/\s+/).filter(Boolean).length;
    const elapsedMins = Math.max(0.1, (Date.now() - recordingStartTime) / 60000);
    const wpm = Math.round(words / elapsedMins);
    wpmBadge.textContent = `${words} Words • ~${wpm} WPM`;
  };

  studioRecognition.onerror = () => {};
  try {
    studioRecognition.start();
  } catch (e) {}
}

function stopLiveTranscript() {
  if (studioRecognition) {
    try {
      studioRecognition.stop();
    } catch (e) {}
    studioRecognition = null;
  }
}

async function toggleVoiceRecording() {
  const recordBtn = document.getElementById('recordVoiceBtn');
  const playbackArea = document.getElementById('audioPlaybackArea');
  const audioEl = document.getElementById('recordedAudioPlayer');
  const downloadBtn = document.getElementById('downloadAudioBtn');
  const subText = document.getElementById('timerSubText');

  if (isRecording && mediaRecorder) {
    mediaRecorder.stop();
    isRecording = false;
    stopWaveformVisualizer();
    stopLiveTranscript();
    if (timerRunning) toggleTimer();

    recordBtn.className = 'btn btn-primary';
    recordBtn.innerHTML = '🎙️ Record Voice';
    subText.textContent = 'SAVED';
    return;
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showToast('⚠️ Microphone recording is not supported in this browser.');
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioChunks = [];
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      if (currentAudioUrl) URL.revokeObjectURL(currentAudioUrl);
      currentAudioUrl = URL.createObjectURL(blob);
      audioEl.src = currentAudioUrl;
      downloadBtn.href = currentAudioUrl;
      downloadBtn.download = `Day-${state.currentDay}-English-Studio.webm`;
      playbackArea.classList.add('visible');

      stream.getTracks().forEach((t) => t.stop());
      markRoutineStep('speak', true);
      showToast('🎧 Studio voice recording ready! Listen back below.');
    };

    mediaRecorder.start();
    isRecording = true;
    recordBtn.className = 'btn btn-danger';
    recordBtn.innerHTML = '⏹️ Stop Recording';
    subText.textContent = 'RECORDING';

    startWaveformVisualizer(stream);
    startLiveTranscript();

    if (!timerRunning) toggleTimer();
  } catch (err) {
    showToast('⚠️ Please allow microphone access to record your voice.');
  }
}

function markRoutineStep(stepKey, checked) {
  if (!state.routineChecks[state.currentDay]) {
    state.routineChecks[state.currentDay] = { phrases: false, listen: false, speak: false };
  }
  state.routineChecks[state.currentDay][stepKey] = checked;

  const c = state.routineChecks[state.currentDay];
  if (c.phrases && c.listen && c.speak && !state.completedDays.includes(state.currentDay)) {
    state.completedDays.push(state.currentDay);
    showToast(`🏆 Awesome! All 3 steps for Day ${state.currentDay} completed!`);
  }
  saveState();
  renderSidebar();
  renderWorkflowSteps();
  renderHeaderStats();
}

/* ===== FLASHCARD DECK & QUIZ VIEW ===== */
function buildFlashcardDeck(source = 'saved') {
  if (source === 'saved' && state.savedPhrases.length > 0) {
    flashcardDeck = [...state.savedPhrases];
  } else if (source === 'random') {
    const allPhrases = [];
    CURRICULUM_DATA.forEach((d) => {
      d.phrases.forEach((p) => allPhrases.push({ day: d.day, ...p }));
    });
    flashcardDeck = allPhrases.sort(() => Math.random() - 0.5).slice(0, 10);
  } else {
    const dayData = CURRICULUM_DATA.find((d) => d.day === state.currentDay) || CURRICULUM_DATA[0];
    flashcardDeck = dayData.phrases.map((p) => ({ day: dayData.day, ...p }));
  }
  flashcardIndex = 0;
  flashcardFlipped = false;
  renderFlashcard();
}

function renderFlashcard() {
  if (!flashcardDeck.length) return;
  const item = flashcardDeck[flashcardIndex];
  document.getElementById('flashcardCounter').textContent = `Day ${item.day} • Card ${
    flashcardIndex + 1
  } of ${flashcardDeck.length}`;
  document.getElementById('flashcardFront').textContent = `"${item.phrase}"`;
  document.getElementById('flashcardExample').textContent = `"${item.example}"`;
  document.getElementById('flashcardContext').textContent = item.context;

  document.getElementById('flashcardBack').classList.toggle('hidden', !flashcardFlipped);
}

/* ===== EMERGENCY PHRASEBOOK WITH SEARCH ===== */
function renderEmergencyPhrasebook(filterQuery = '') {
  const container = document.getElementById('phrasebookGrid');
  container.innerHTML = '';
  const q = filterQuery.toLowerCase().trim();

  EMERGENCY_PHRASES.forEach((group) => {
    const matchingItems = group.items.filter(
      (item) =>
        !q ||
        item.phrase.toLowerCase().includes(q) ||
        item.note.toLowerCase().includes(q) ||
        group.category.toLowerCase().includes(q)
    );
    if (!matchingItems.length) return;

    const card = document.createElement('div');
    card.className = 'section-card';
    let itemsHtml = '';

    matchingItems.forEach((item) => {
      itemsHtml += `
        <div class="emergency-item">
          <div>
            <div style="font-weight: 700; color: var(--text-primary);">"${item.phrase}"</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${item.note}</div>
          </div>
          <button class="btn btn-sm emergency-speak-btn" data-phrase="${item.phrase.replace(
            /"/g,
            '&quot;'
          )}">🔊</button>
        </div>
      `;
    });

    card.innerHTML = `
      <h3 class="section-title" style="margin-bottom: 0.4rem;">${group.category}</h3>
      ${itemsHtml}
    `;
    container.appendChild(card);
  });

  container.querySelectorAll('.emergency-speak-btn').forEach((btn) => {
    btn.addEventListener('click', () => speakText(btn.dataset.phrase, 0.95));
  });
}

/* ===== INITIALIZE APPLICATION ===== */
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initThemeAndBrand();

  if ('speechSynthesis' in window) {
    populateVoiceList();
    window.speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  // Sync Desktop & Mobile Voice Selectors
  ['voiceSelect', 'voiceSelectMobile'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', (e) => {
        state.selectedVoiceURI = e.target.value;
        saveState();
        populateVoiceList();
        showToast('🔊 Updated English speaking voice!');
      });
    }
  });

  // Mobile Drawer Controls
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileBottomRoadmapBtn = document.getElementById('mobileBottomRoadmapBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const backdrop = document.getElementById('mobileDrawerBackdrop');

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileDrawer);
  if (mobileBottomRoadmapBtn) mobileBottomRoadmapBtn.addEventListener('click', openMobileDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeMobileDrawer);
  if (backdrop) backdrop.addEventListener('click', closeMobileDrawer);

  renderHeaderStats();
  renderSidebar();
  renderCurrentDay();
  renderWorkflowSteps();
  renderEmergencyPhrasebook();
  buildFlashcardDeck('today');

  // Week Filter Tabs
  document.querySelectorAll('.week-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      state.selectedWeek = Number(tab.dataset.week);
      renderSidebar();
    });
  });

  // Step Pills Click
  document.querySelectorAll('.step-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      const stepNum = Number(pill.dataset.step);
      if (state.flowMode === 'all') {
        document.getElementById(`stepCard${stepNum}`).scrollIntoView({ behavior: 'smooth' });
      } else {
        setStep(stepNum);
      }
    });
  });

  // Step Footer Navigation Buttons
  document.querySelectorAll('.goto-step-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = Number(btn.dataset.targetStep);
      setStep(target);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    });
  });

  // Toggle Guided Step-by-Step vs All Steps View
  document.getElementById('toggleFlowModeBtn').addEventListener('click', () => {
    state.flowMode = state.flowMode === 'step' ? 'all' : 'step';
    saveState();
    renderWorkflowSteps();
  });

  // Routine Checkboxes
  ['phrases', 'listen', 'speak'].forEach((key) => {
    const cb = document.getElementById(`check-${key}`);
    cb.addEventListener('change', (e) => markRoutineStep(key, e.target.checked));
  });

  // Mark Day Complete Button
  document.getElementById('markDayCompleteBtn').addEventListener('click', () => {
    const idx = state.completedDays.indexOf(state.currentDay);
    if (idx > -1) {
      state.completedDays.splice(idx, 1);
      showToast(`Day ${state.currentDay} unmarked.`);
    } else {
      state.completedDays.push(state.currentDay);
      state.routineChecks[state.currentDay] = { phrases: true, listen: true, speak: true };
      showToast(`🎉 Congratulations! Day ${state.currentDay} Completed!`);
    }
    saveState();
    renderSidebar();
    renderWorkflowSteps();
    renderHeaderStats();
  });

  // Finish Day & Advance Button in Step 3
  document.getElementById('finishDayCelebrationBtn').addEventListener('click', () => {
    if (!state.completedDays.includes(state.currentDay)) {
      state.completedDays.push(state.currentDay);
    }
    state.routineChecks[state.currentDay] = { phrases: true, listen: true, speak: true };
    saveState();
    showToast(`🏆 Day ${state.currentDay} Complete! Moving to next day...`);
    if (state.currentDay < 30) {
      selectDay(state.currentDay + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      renderSidebar();
      renderHeaderStats();
    }
  });

  // Prev / Next Day Navigation
  document.getElementById('prevDayBtn').addEventListener('click', () => {
    if (state.currentDay > 1) selectDay(state.currentDay - 1);
  });
  document.getElementById('nextDayBtn').addEventListener('click', () => {
    if (state.currentDay < 30) selectDay(state.currentDay + 1);
  });

  // Auto-Play All 5 Phrases
  document.getElementById('playAllPhrasesBtn').addEventListener('click', () => {
    const dayData = CURRICULUM_DATA.find((d) => d.day === state.currentDay);
    if (!dayData) return;
    let i = 0;
    function speakNext() {
      if (i >= dayData.phrases.length) {
        markRoutineStep('phrases', true);
        showToast('✅ Finished playing all 5 phrases!');
        return;
      }
      markPhrasePracticed(i);
      speakText(dayData.phrases[i].example, 0.94, () => {
        i++;
        setTimeout(speakNext, 650);
      });
    }
    speakNext();
  });

  // Roleplay Controls
  document.getElementById('playDialogueBtn').addEventListener('click', playFullDialogue);
  document.getElementById('interactiveRoleplayBtn').addEventListener('click', startInteractiveRoleplay);
  document.getElementById('blindListenToggleBtn').addEventListener('click', (e) => {
    blindListeningMode = !blindListeningMode;
    e.currentTarget.textContent = blindListeningMode
      ? '👁️ Blind Mode: On'
      : '🙈 Blind Mode: Off';
    const dayData = CURRICULUM_DATA.find((d) => d.day === state.currentDay) || CURRICULUM_DATA[0];
    renderDialogue(dayData);
  });

  // Duration Presets (1:00, 2:00, 3:00)
  document.querySelectorAll('.duration-preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.duration-preset-btn').forEach((b) => {
        b.style.borderColor = '';
      });
      btn.style.borderColor = 'var(--brand-primary)';
      targetDurationSeconds = Number(btn.dataset.seconds);
      resetTimer();
    });
  });

  // Studio Timer & Voice Recorder
  document.getElementById('timerToggleBtn').addEventListener('click', toggleTimer);
  document.getElementById('timerResetBtn').addEventListener('click', resetTimer);
  document.getElementById('recordVoiceBtn').addEventListener('click', toggleVoiceRecording);

  // Save Daily Notes
  document.getElementById('dailyNotesInput').addEventListener('input', (e) => {
    state.notes[state.currentDay] = e.target.value;
    saveState();
  });

  // Desktop View Switcher Tabs
  document.querySelectorAll('.mode-tab').forEach((tab) => {
    tab.addEventListener('click', () => switchMainView(tab.dataset.view));
  });

  // Mobile Bottom Navigation Bar Tabs
  document.querySelectorAll('[data-mobile-view]').forEach((btn) => {
    btn.addEventListener('click', () => switchMainView(btn.dataset.mobileView));
  });

  // Flashcard Controls
  document.getElementById('flashcardBox').addEventListener('click', () => {
    flashcardFlipped = !flashcardFlipped;
    renderFlashcard();
  });
  document.getElementById('prevFlashcardBtn').addEventListener('click', () => {
    if (!flashcardDeck.length) return;
    flashcardIndex = (flashcardIndex - 1 + flashcardDeck.length) % flashcardDeck.length;
    flashcardFlipped = false;
    renderFlashcard();
  });
  document.getElementById('nextFlashcardBtn').addEventListener('click', () => {
    if (!flashcardDeck.length) return;
    flashcardIndex = (flashcardIndex + 1) % flashcardDeck.length;
    flashcardFlipped = false;
    renderFlashcard();
  });
  document.getElementById('speakFlashcardBtn').addEventListener('click', () => {
    if (!flashcardDeck.length) return;
    flashcardFlipped = true;
    renderFlashcard();
    speakText(flashcardDeck[flashcardIndex].example, 0.95);
  });

  document.getElementById('deckSourceSavedBtn').addEventListener('click', () => {
    if (!state.savedPhrases.length) {
      showToast('💡 Tap ☆ Save on any phrase in your Daily Workout first!');
      buildFlashcardDeck('today');
    } else {
      buildFlashcardDeck('saved');
    }
  });
  document.getElementById('deckSourceCurrentDayBtn').addEventListener('click', () =>
    buildFlashcardDeck('today')
  );
  document.getElementById('deckSourceRandomBtn').addEventListener('click', () =>
    buildFlashcardDeck('random')
  );

  // Phrasebook Search
  document.getElementById('phrasebookSearchInput').addEventListener('input', (e) => {
    renderEmergencyPhrasebook(e.target.value);
  });

  // Custom Shadowing Lab Controls
  document.getElementById('customSpeakNormalBtn').addEventListener('click', () => {
    const text = document.getElementById('customShadowInput').value.trim();
    if (text) speakText(text, 1.0);
  });
  document.getElementById('customSpeakSlowBtn').addEventListener('click', () => {
    const text = document.getElementById('customShadowInput').value.trim();
    if (text) speakText(text, 0.75);
  });
  document.getElementById('customCheckPronunciationBtn').addEventListener('click', (e) => {
    const text = document.getElementById('customShadowInput').value.trim();
    const feedbackEl = document.getElementById('customSpeechFeedback');
    if (text) checkPronunciation(text, feedbackEl, e.currentTarget);
  });
});
