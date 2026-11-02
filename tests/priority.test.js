
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { calculatePriority } = require('../priority.js');

test('Critical incident returns P1', () => {
  assert.equal(calculatePriority({
    impact: 3, urgency: 3, criticality: 2, affected: 2
  }), 'P1');
});

test('High priority incident returns P2', () => {
  assert.equal(calculatePriority({
    impact: 3, urgency: 2, criticality: 1, affected: 1
  }), 'P2');
});

test('Medium priority incident returns P3', () => {
  assert.equal(calculatePriority({
    impact: 2, urgency: 1, criticality: 1, affected: 1
  }), 'P3');
});

test('Low priority incident returns P4', () => {
  assert.equal(calculatePriority({
    impact: 1, urgency: 1, criticality: 1, affected: 1
  }), 'P4');
});

test('Invalid impact is rejected', () => {
  assert.throws(() => calculatePriority({
    impact: 4, urgency: 2, criticality: 1, affected: 1
  }), /Invalid incident assessment/);
});

test('Missing urgency is rejected', () => {
  assert.throws(() => calculatePriority({
    impact: 2, criticality: 1, affected: 1
  }), /Invalid incident assessment/);
});
