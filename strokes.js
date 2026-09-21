// Sequence: load local data → draw each stroke → enable replay.
const STROKE_TIMING = { speed: 1, pause: 250 };
const strokePanel = document.getElementById('strokes');
const strokeCanvas = document.getElementById('stroke-canvas');
const strokeStatus = document.getElementById('stroke-status');
const replayStroke = document.getElementById('stroke-replay');
let strokeWriter, strokeRevision = 0, strokeCharacter = '';
async function playStrokes() {
  const current = strokeWriter, revision = strokeRevision;
  if (!current) return;
  replayStroke.disabled = true;
  await current.animateCharacter();
  if (revision === strokeRevision) replayStroke.disabled = false;
}
async function updateStrokes() {
  const char = document.getElementById('text').value.trim();
  if (char === strokeCharacter) return;
  strokeCharacter = char;
  const revision = ++strokeRevision;
  strokeWriter?.pauseAnimation(); strokeWriter = null;
  strokeCanvas.replaceChildren(); replayStroke.disabled = true;
  strokePanel.hidden = !/^\p{Script=Han}$/u.test(char);
  schedulePages();
  if (strokePanel.hidden) return;
  strokeStatus.textContent = 'Loading stroke order…';
  try {
    const response = await fetch('vendor/strokes/' + encodeURIComponent(char) + '.json');
    if (!response.ok) throw Error('Unavailable');
    const data = await response.json();
    if (revision !== strokeRevision) return;
    strokeStatus.textContent = data.strokes.length + ' strokes';
    strokeCanvas.setAttribute('aria-label', 'Stroke order for ' + char + ', ' + data.strokes.length + ' strokes');
    strokeWriter = HanziWriter.create(strokeCanvas, char, {
      width:148,height:148,padding:10,showCharacter:false,showOutline:true,
      strokeColor:'#235d48',outlineColor:'#e0e5da',
      strokeAnimationSpeed:STROKE_TIMING.speed,delayBetweenStrokes:STROKE_TIMING.pause,
      charDataLoader:() => data
    });
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      await strokeWriter.showCharacter(); replayStroke.disabled = false;
    } else await playStrokes();
  } catch {
    if (revision === strokeRevision) strokeStatus.textContent = 'Stroke order unavailable for this character.';
  }
}
replayStroke.addEventListener('click', playStrokes);
document.getElementById('text').addEventListener('input', updateStrokes);
window.addEventListener('hashchange', updateStrokes);
updateStrokes();
