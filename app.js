'use strict';
const STORAGE_KEY = 'opspriority-history-v1';
const form = document.querySelector('#incident-form');
const historyContent = document.querySelector('#history-content');
const result = document.querySelector('#result');
const emptyResult = document.querySelector('#empty-result');
const priorities = {
  P1: { title: 'Critical incident', description: 'Severe disruption requiring immediate coordination and escalation.', target: '15 minutes' },
  P2: { title: 'High priority', description: 'Significant disruption requiring prompt investigation and response.', target: '1 hour' },
  P3: { title: 'Medium priority', description: 'Moderate impact that should be addressed through normal support processes.', target: '4 hours' },
  P4: { title: 'Low priority', description: 'Limited disruption that can be scheduled into routine support.', target: '1 business day' }
};
function calculatePriority({ impact, urgency, criticality, affected }) {
  const values = [impact, urgency, criticality, affected];
  if (values.some(value => !Number.isInteger(value)) || impact < 1 || impact > 3 || urgency < 1 || urgency > 3 || criticality < 1 || criticality > 2 || affected < 1 || affected > 2) {
    throw new Error('Invalid incident assessment');
  }
  const score = impact + urgency + criticality + affected;
  return score >= 9 ? 'P1' : score >= 7 ? 'P2' : score >= 5 ? 'P3' : 'P4';
}
function getHistory() {
  try { const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(data) ? data.slice(0, 5) : []; }
  catch { return []; }
}
function renderHistory() {
  const entries = getHistory();
  historyContent.replaceChildren();
  if (!entries.length) { historyContent.className = 'history-empty'; historyContent.textContent = 'No assessments recorded yet.'; return; }
  historyContent.className = '';
  entries.forEach(entry => {
    const row = document.createElement('div'); row.className = 'history-row';
    const label = document.createElement('strong'); label.textContent = entry.priority; label.className = `priority-${entry.priority.toLowerCase()}`;
    const details = document.createElement('span'); details.textContent = `Score ${entry.score} / 10`;
    const date = document.createElement('span'); date.className = 'history-date'; date.textContent = new Date(entry.date).toLocaleString('en-GB');
    row.append(label, details, date); historyContent.append(row);
  });
}
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const input = Object.fromEntries(['impact', 'urgency', 'criticality', 'affected'].map(id => [id, Number(document.getElementById(id).value)]));
  const priority = calculatePriority(input);
  const score = Object.values(input).reduce((sum, value) => sum + value, 0);
  const info = priorities[priority];
  document.querySelector('#priority-code').textContent = priority;
  document.querySelector('#priority-code').className = `priority-code priority-${priority.toLowerCase()}`;
  document.querySelector('#priority-title').textContent = info.title;
  document.querySelector('#priority-description').textContent = info.description;
  document.querySelector('#response-target').textContent = info.target;
  emptyResult.hidden = true; result.hidden = false;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([{ priority, score, date: new Date().toISOString() }, ...getHistory()].slice(0, 5))); } catch { /* Storage may be disabled. */ }
  renderHistory();
});
form.addEventListener('reset', () => { result.hidden = true; emptyResult.hidden = false; });
document.querySelector('#clear-history').addEventListener('click', () => { try { localStorage.removeItem(STORAGE_KEY); } catch { /* Storage may be disabled. */ } renderHistory(); });
renderHistory();
