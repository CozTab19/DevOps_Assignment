# OpsPriority

A static, browser-based IT incident priority calculator for a DevOps pipeline demonstration.

## Run locally

Open `index.html` in a browser. No dependencies, server, build tools or accounts are required.

## Features

- Interactive incident assessment using four factors
- P1–P4 suggested priority and illustrative response targets
- Form validation and reset
- Last five assessments in browser local storage
- Responsive interface

## Scoring

Impact 1–3 + urgency 1–3 + service criticality 1–2 + users affected 1–2 = total score from 4 to 10.

- P1: 9–10
- P2: 7–8
- P3: 5–6
- P4: 4

These are illustrative demonstration rules, not an ITIL standard or production SLA.

## Deployment

Upload `index.html`, `styles.css`, and `app.js` to static hosting such as Amazon S3. Infrastructure as Code and CI/CD are intentionally separate future assessment tasks.

## AI disclosure

The initial static application code was generated with AI assistance. Retain the conversation prompt and generated output and declare use as required by your university brief.
