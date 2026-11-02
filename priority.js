
'use strict';

function calculatePriority({ impact, urgency, criticality, affected }) {
  const values = [impact, urgency, criticality, affected];

  if (
    values.some(value => !Number.isInteger(value)) ||
    impact < 1 || impact > 3 ||
    urgency < 1 || urgency > 3 ||
    criticality < 1 || criticality > 2 ||
    affected < 1 || affected > 2
  ) {
    throw new Error('Invalid incident assessment');
  }

  const score = impact + urgency + criticality + affected;

  if (score >= 9) return 'P1';
  if (score >= 7) return 'P2';
  if (score >= 5) return 'P3';
  return 'P4';
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculatePriority };
}
