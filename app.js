const STORAGE_KEY = 'english_30day_coach_v1';

let state = {
  currentDay: 1,
  selectedWeek: 0, // 0 = All weeks, 1..4 = specific week
  completedDays: [], // array of day numbers
  routineChecks: {}, // { [day]: { listen: bool, phrases: bool, speak: bool } }
  notes: {} // { [day]: string }
};

// Timer & Recorder state
let timerInterval = null;
let timerSeconds = 120;
let timerRunning = false;

let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;
let currentAudioUrl = null;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...state, ...parsed };
    }
  } catch (e) {
    console.warn('Could not load saved state:', e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save state:', e);
  }
}

// Text-to-Speech helper
function speakText(text, rate = 1.0, onEndCallback = null) {
  if (!('speechSynthesis' in window)) {
    alert('Your browser does not support Text-to-Speech.');
    return;
  }
  window.speechSynthesis.cancel();
  const cleanText = text.replace(/\[.*?\]/g, 'Alex');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'en-US';
  utterance.rate = rate;

  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(
    v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Microsoft'))
  ) || voices.find(v => v.lang.startsWith('en'));

  if (preferred) {
    utterance.voice = preferred;
  }

  if (onEndCallback) {
    utterance.onend = onEndCallback;
  }
  window.speechSynthesis.speak(utterance);
}

// Speech Recognition Pronunciation Check
function checkPronunciation(targetSentence, feedbackEl, btnEl) {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    feedbackEl.className = 'speech-feedback visible try-again';
    feedbackEl.textContent = 'Live speech recognition works best in Chrome or Edge. Use the Voice Recorder below to hear your pronunciation!';
    return;
  }

  const recognition = new SpeechRec();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const originalLabel = btnEl.innerHTML;
  btnEl.innerHTML = '🎙️ Listening... Speak now';
  btnEl.disabled = true;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const score = calculateSimilarity(targetSentence, transcript);

    feedbackEl.classList.add('visible');
    if (score >= 0.6) {
      feedbackEl.className = 'speech-feedback visible good';
      feedbackEl.innerHTML = `✅ <strong>Great clarity! (${Math.round(score * 100)}% match)</strong> — Heard: <em>"${transcript}"</em>`;
    } else {
      feedbackEl.className = 'speech-feedback visible try-again';
      feedbackEl.innerHTML = `💡 <strong>Keep practicing (${Math.round(score * 100)}% match)</strong> — Heard: <em>"${transcript}"</em>. Try speaking slightly slower!`;
    }
  };

  recognition.onerror = (err) => {
    feedbackEl.className = 'speech-feedback visible try-again';
    feedbackEl.textContent = `Could not capture audio (${err.error}). Make sure microphone permission is allowed.`;
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

// Header Stats & Progress
function renderHeaderStats() {
  const completedCount = state.completedDays.length;
  const pct = Math.round((completedCount / 30) * 100);

  document.getElementById('completedCountText').textContent = `${completedCount} / 30 Days`;
  document.getElementById('progressPercentText').textContent = `${pct}%`;
  document.getElementById('progressBarFill').style.width = `${pct}%`;

  // Calculate streak
  let streak = 0;
  const sorted = [...state.completedDays].sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i++) {
    if (i === 0 || sorted[i] === sorted[i - 1] + 1) {
      streak++;
    } else {
      streak = 1;
    }
  }
  document.getElementById('streakCountText').textContent = `${streak} Day${streak === 1 ? '' : 's'}`;
}

// Sidebar Day Grid & Week Filter
function renderSidebar() {
  const weekTabs = document.querySelectorAll('.week-tab');
  weekTabs.forEach((tab) => {
    const w = Number(tab.dataset.week);
    tab.classList.toggle('active', w === state.selectedWeek);
  });

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
    });
    grid.appendChild(btn);
  });

  // Render routine checks for currentDay
  const checks = state.routineChecks[state.currentDay] || {
    listen: false,
    phrases: false,
    speak: false
  };

  ['listen', 'phrases', 'speak'].forEach((key) => {
    const checkbox = document.getElementById(`check-${key}`);
    const labelWrap = checkbox.closest('.routine-item');
    checkbox.checked = !!checks[key];
    labelWrap.classList.toggle('checked', !!checks[key]);
  });

  // Update Complete Day button state
  const completeBtn = document.getElementById('markDayCompleteBtn');
  const isDone = state.completedDays.includes(state.currentDay);
  if (isDone) {
    completeBtn.className = 'btn btn-success';
    completeBtn.style.width = '100%';
    completeBtn.innerHTML = '✅ Day Completed! (Click to Undo)';
  } else {
    completeBtn.className = 'btn btn-primary';
    completeBtn.style.width = '100%';
    completeBtn.innerHTML = '🏆 Mark Day ' + state.currentDay + ' Complete';
  }
}

function selectDay(dayNum) {
  state.currentDay = Math.max(1, Math.min(30, dayNum));
  saveState();
  resetTimer();
  renderSidebar();
  renderCurrentDay();
  renderHeaderStats();
}

// Render Main Day Lesson
function renderCurrentDay() {
  const dayData = CURRICULUM_DATA.find((d) => d.day === state.currentDay) || CURRICULUM_DATA[0];

  const weekNames = {
    1: 'Week 1: Survival Phrases & Thinking in English',
    2: 'Week 2: Everyday Conversations & Questions',
    3: 'Week 3: Expressing Opinions & Storytelling',
    4: 'Week 4: Real-World Fluency & Confidence'
  };

  document.getElementById('dayEyebrow').textContent = `Day ${dayData.day} of 30 • ${weekNames[dayData.week]}`;
  document.getElementById('dayTitle').textContent = dayData.title;
  document.getElementById('dayGoal').textContent = `🎯 Goal: ${dayData.goal}`;
  document.getElementById('dayTip').innerHTML = `<strong>💡 Daily Coach Tip:</strong> ${dayData.tip}`;

  // Prev / Next buttons
  document.getElementById('prevDayBtn').disabled = state.currentDay <= 1;
  document.getElementById('nextDayBtn').disabled = state.currentDay >= 30;

  // Render 5 Phrases
  const phrasesContainer = document.getElementById('phrasesList');
  phrasesContainer.innerHTML = '';

  dayData.phrases.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'phrase-card';
    card.innerHTML = `
      <div class="phrase-top">
        <div>
          <div class="phrase-pattern">${idx + 1}. "${p.phrase}"</div>
        </div>
        <div class="phrase-actions">
          <button class="btn btn-sm listen-normal-btn" type="button">🔊 Listen (1x)</button>
          <button class="btn btn-sm listen-slow-btn" type="button">🐢 Shadow (0.75x)</button>
          <button class="btn btn-sm speak-check-btn" type="button">🎙️ Speak & Check</button>
        </div>
      </div>
      <div class="phrase-example">Example: "${p.example}"</div>
      <div class="phrase-context">${p.context}</div>
      <div class="speech-feedback"></div>
    `;

    const normalBtn = card.querySelector('.listen-normal-btn');
    const slowBtn = card.querySelector('.listen-slow-btn');
    const checkBtn = card.querySelector('.speak-check-btn');
    const feedbackEl = card.querySelector('.speech-feedback');

    normalBtn.addEventListener('click', () => speakText(p.example, 1.0));
    slowBtn.addEventListener('click', () => speakText(p.example, 0.75));
    checkBtn.addEventListener('click', () => checkPronunciation(p.example, feedbackEl, checkBtn));

    phrasesContainer.appendChild(card);
  });

  // Render Dialogue
  const dialogueContainer = document.getElementById('dialogueContainer');
  dialogueContainer.innerHTML = '';

  dayData.dialogue.forEach((line, index) => {
    const isYou = line.speaker.toLowerCase() === 'you';
    const row = document.createElement('div');
    row.className = `dialogue-line ${isYou ? 'you' : 'partner'}`;
    row.id = `dialogue-line-${index}`;
    row.innerHTML = `
      <div>
        <span class="speaker-tag ${isYou ? 'you' : 'partner'}">${isYou ? '🗣️ You (Speak Out Loud)' : '👤 Conversation Partner'}</span>
        <div>${line.text}</div>
      </div>
      <button class="btn btn-sm" type="button" title="Listen to line">🔊</button>
    `;
    row.querySelector('button').addEventListener('click', () => speakText(line.text, 1.0));
    dialogueContainer.appendChild(row);
  });

  // Render Speaking Prompt & PREP
  document.getElementById('speakingQuestion').textContent = dayData.prompt.question;
  document.getElementById('prepPoint').textContent = dayData.prompt.prep.point;
  document.getElementById('prepReason').textContent = dayData.prompt.prep.reason;
  document.getElementById('prepExample').textContent = dayData.prompt.prep.example;
  document.getElementById('prepWrap').textContent = dayData.prompt.prep.wrap;

  // Render saved notes for this day
  const notesInput = document.getElementById('dailyNotesInput');
  notesInput.value = state.notes[state.currentDay] || '';
}

// Interactive Dialogue Auto-Player
function playInteractiveRoleplay() {
  const dayData = CURRICULUM_DATA.find((d) => d.day === state.currentDay) || CURRICULUM_DATA[0];
  let idx = 0;

  function nextLine() {
    document.querySelectorAll('.dialogue-line').forEach((el) => el.classList.remove('speaking-now'));
    if (idx >= dayData.dialogue.length) return;

    const lineEl = document.getElementById(`dialogue-line-${idx}`);
    if (lineEl) lineEl.classList.add('speaking-now');

    const line = dayData.dialogue[idx];
    idx++;
    speakText(line.text, 0.95, () => {
      setTimeout(nextLine, 700);
    });
  }

  nextLine();
}

// 2-Minute Countdown Timer
function updateTimerDisplay() {
  const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
  const secs = String(timerSeconds % 60).padStart(2, '0');
  document.getElementById('timerDisplay').textContent = `${mins}:${secs}`;
}

function toggleTimer() {
  const btn = document.getElementById('timerToggleBtn');
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    btn.textContent = '▶️ Resume 2:00 Timer';
  } else {
    timerRunning = true;
    btn.textContent = '⏸️ Pause Timer';
    timerInterval = setInterval(() => {
      if (timerSeconds > 0) {
        timerSeconds--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        timerRunning = false;
        btn.textContent = '🎉 2 Minutes Complete!';
        markRoutineStep('speak', true);
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerSeconds = 120;
  updateTimerDisplay();
  const btn = document.getElementById('timerToggleBtn');
  if (btn) btn.textContent = '⏱️ Start 2:00 Timer';
}

// Browser Voice Recorder
async function toggleVoiceRecording() {
  const recordBtn = document.getElementById('recordVoiceBtn');
  const statusEl = document.getElementById('recordingIndicator');
  const playbackArea = document.getElementById('audioPlaybackArea');
  const audioEl = document.getElementById('recordedAudioPlayer');
  const downloadBtn = document.getElementById('downloadAudioBtn');

  if (isRecording && mediaRecorder) {
    mediaRecorder.stop();
    isRecording = false;
    recordBtn.className = 'btn btn-primary';
    recordBtn.innerHTML = '🎙️ Record My Voice';
    statusEl.classList.add('hidden');
    return;
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('Microphone recording is not supported in this browser.');
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
      downloadBtn.download = `Day-${state.currentDay}-English-Speaking.webm`;
      playbackArea.classList.add('visible');

      // Stop mic tracks
      stream.getTracks().forEach((t) => t.stop());
      markRoutineStep('speak', true);
    };

    mediaRecorder.start();
    isRecording = true;
    recordBtn.className = 'btn btn-danger';
    recordBtn.innerHTML = '⏹️ Stop Recording';
    statusEl.classList.remove('hidden');

    if (!timerRunning) {
      toggleTimer();
    }
  } catch (err) {
    alert('Could not access microphone. Please allow microphone permissions in your browser.');
  }
}

function markRoutineStep(stepKey, checked) {
  if (!state.routineChecks[state.currentDay]) {
    state.routineChecks[state.currentDay] = { listen: false, phrases: false, speak: false };
  }
  state.routineChecks[state.currentDay][stepKey] = checked;

  const c = state.routineChecks[state.currentDay];
  if (c.listen && c.phrases && c.speak && !state.completedDays.includes(state.currentDay)) {
    state.completedDays.push(state.currentDay);
  }
  saveState();
  renderSidebar();
  renderHeaderStats();
}

// Emergency Phrasebook Render
function renderEmergencyPhrasebook() {
  const container = document.getElementById('phrasebookGrid');
  container.innerHTML = '';

  EMERGENCY_PHRASES.forEach((group) => {
    const card = document.createElement('div');
    card.className = 'section-card';
    let itemsHtml = '';

    group.items.forEach((item) => {
      itemsHtml += `
        <div class="emergency-item">
          <div>
            <div style="font-weight: 700; color: #fff;">"${item.phrase}"</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${item.note}</div>
          </div>
          <button class="btn btn-sm emergency-speak-btn" data-phrase="${item.phrase.replace(/"/g, '&quot;')}">🔊</button>
        </div>
      `;
    });

    card.innerHTML = `
      <h3 class="section-title" style="margin-bottom: 0.5rem;">${group.category}</h3>
      ${itemsHtml}
    `;
    container.appendChild(card);
  });

  container.querySelectorAll('.emergency-speak-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      speakText(btn.dataset.phrase, 0.95);
    });
  });
}

// Initialize Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  loadState();

  // Preload voices in Chrome
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
  }

  renderHeaderStats();
  renderSidebar();
  renderCurrentDay();
  renderEmergencyPhrasebook();

  // Week filter tabs
  document.querySelectorAll('.week-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      state.selectedWeek = Number(tab.dataset.week);
      renderSidebar();
    });
  });

  // Routine checkboxes
  ['listen', 'phrases', 'speak'].forEach((key) => {
    const cb = document.getElementById(`check-${key}`);
    cb.addEventListener('change', (e) => {
      markRoutineStep(key, e.target.checked);
    });
  });

  // Mark Day Complete button
  document.getElementById('markDayCompleteBtn').addEventListener('click', () => {
    const idx = state.completedDays.indexOf(state.currentDay);
    if (idx > -1) {
      state.completedDays.splice(idx, 1);
    } else {
      state.completedDays.push(state.currentDay);
      state.routineChecks[state.currentDay] = { listen: true, phrases: true, speak: true };
    }
    saveState();
    renderSidebar();
    renderHeaderStats();
  });

  // Prev / Next day navigation
  document.getElementById('prevDayBtn').addEventListener('click', () => {
    if (state.currentDay > 1) selectDay(state.currentDay - 1);
  });
  document.getElementById('nextDayBtn').addEventListener('click', () => {
    if (state.currentDay < 30) selectDay(state.currentDay + 1);
  });

  // Play All 5 Phrases
  document.getElementById('playAllPhrasesBtn').addEventListener('click', () => {
    const dayData = CURRICULUM_DATA.find((d) => d.day === state.currentDay);
    if (!dayData) return;
    let i = 0;
    function speakNext() {
      if (i >= dayData.phrases.length) {
        markRoutineStep('phrases', true);
        return;
      }
      speakText(dayData.phrases[i].example, 0.92, () => {
        i++;
        setTimeout(speakNext, 650);
      });
    }
    speakNext();
  });

  // Play Roleplay Dialogue
  document.getElementById('playDialogueBtn').addEventListener('click', () => {
    playInteractiveRoleplay();
    markRoutineStep('listen', true);
  });

  // Timer & Voice Recorder buttons
  document.getElementById('timerToggleBtn').addEventListener('click', toggleTimer);
  document.getElementById('timerResetBtn').addEventListener('click', resetTimer);
  document.getElementById('recordVoiceBtn').addEventListener('click', toggleVoiceRecording);

  // Save Daily Notes
  document.getElementById('dailyNotesInput').addEventListener('input', (e) => {
    state.notes[state.currentDay] = e.target.value;
    saveState();
  });

  // Mode Switch Tabs (Daily Lesson vs Emergency Phrasebook vs Custom Shadowing Lab)
  document.querySelectorAll('.mode-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.mode-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const targetView = tab.dataset.view;
      document.getElementById('view-lesson').classList.toggle('hidden', targetView !== 'lesson');
      document.getElementById('view-phrasebook').classList.toggle('hidden', targetView !== 'phrasebook');
      document.getElementById('view-shadowlab').classList.toggle('hidden', targetView !== 'shadowlab');
    });
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
    if (text) {
      checkPronunciation(text, feedbackEl, e.currentTarget);
    }
  });
});
