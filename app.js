let MAX_INSTS = 10;
let NOTES_RANGE = 39;
$(document).ready(function () {
  // init
  const synths = Array.from({ length: MAX_INSTS }, createSynth);
  window.level = 3;
  const levelSlider = createLevelSlider();

  const wrapper = $('#wrapper');
  const playButton = $('#play');
  const nextButton = $('#next');

  function quiz() {
    wrapper.empty();
    let notes = pickRndNotes();
    notes.forEach((note, i) => {
      const synth = synths[i];
      playNote(synth, note);
      addImage(wrapper, note);
    });
  }
  $(nextButton).click(quiz);
  $(playButton).click()
});

function createSynth() {
  return new Tone.Synth({
    "oscillator": {
      "type": "sine"
    }
  }).toMaster();
}
function createLevelSlider() {
  const levelSlider = $(`<input type="range" value=${window.level} min="1" max=${MAX_INSTS} id="level"></input>`);
  const label = $(`<span id="label">${window.level}</span>`);
  const controls = $('#controls');
  levelSlider.prependTo(controls);
  label.prependTo(controls);
  levelSlider.change(e => {
    const val = e.target.value;
    label.html(val);
    window.level = val;
  });
  return levelSlider;
}

function addImage(wrapper, num) {
  const img = $('<img class="score">')
  img.attr('src', `assets/${num}.png`);
  img.appendTo(wrapper);
}

function playNote(synth, noteNum) {
  const midiNum = (noteNum / 2) + 60;
  const freq = Tone.Midi(midiNum).toFrequency();
  synth.triggerAttackRelease(freq, "2");
}

function pickRndNotes() {
  const noteCount = window.level;
  let notes = [];
  while (notes.length < noteCount) {
    const candidate = Math.floor(Math.random() * NOTES_RANGE);
    const noteIsUnique = !notes.includes(candidate);
    if (noteIsUnique) {
      notes.push(candidate);
    }
  }
  const sorted = notes.sort((a,b)=> a-b);
  return sorted;
}