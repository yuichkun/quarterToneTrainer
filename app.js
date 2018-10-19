let MAX_INSTS = 10;
let NOTES_RANGE = 39;
let LEVEL = 3;
$(document).ready(function () {
  const synths = Array.from({ length: MAX_INSTS }, createSynth);
  const wrapper = $('#wrapper');
  function quiz() {
    wrapper.empty();
    let notes = pickRndNotes(LEVEL);
    notes.forEach((note, i) => {
      const synth = synths[i];
      playNote(synth, note);
      addImage(wrapper, note);
    });
  }
  $(document).click(quiz);
});

function createSynth() {
  return new Tone.Synth({
    "oscillator": {
      "type": "sine"
    }
  }).toMaster();
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

function pickRndNotes(noteCount) {
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