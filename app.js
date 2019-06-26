let MAX_INSTS = 10;
let NOTES_RANGE = 39;
$(document).ready(function () {
  // init
  const synths = Array.from({ length: MAX_INSTS }, createSynth);
  window.level = 3;
  let notes = [];
  const levelSlider = createLevelSlider();

  const wrapper = $('#wrapper');
  const playButton = $('#play');
  const nextButton = $('#next');
  const showButton = $('#show');

  function playAll(notes) {
    notes.forEach((note, i) => {
      const synth = synths[i];
      playNote(synth, note);
    });
  }
  function showAll(notes) {
    notes.forEach((note, i) => {
      addImage(wrapper, note);
    });
  }

  function quiz() {
    wrapper.empty();
    const span = $('<div>Click on each image to play the individual note</div>');
    span.appendTo(wrapper);
    notes = pickRndNotes();
    showAll(notes);
    wrapper.addClass('hide');
    playAll(notes);
  }

  $(nextButton).click(quiz);
  $(playButton).click(()=>playAll(notes));
  $(showButton).click(() => {
    wrapper.toggleClass('hide');
  })
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
  const labelWrapper = $('<div>Level: </div>');
  const label = $(`<span id="label">${window.level}</span>`);
  const controls = $('#controls');
  levelSlider.prependTo(controls);
  labelWrapper.prependTo(controls);
  label.appendTo(labelWrapper);
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
  img.attr('onclick', `playNote(Array.from({ length: 1 }, createSynth)[0], ${num}, 1)`)
  img.appendTo(wrapper);
}

function playNote(synth, noteNum, length) {
  length = length || "2";
  const midiNum = (noteNum / 2) + 60;
  const freq = Tone.Midi(midiNum).toFrequency();
  synth.triggerAttackRelease(freq, length);
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