# QuickNotes

QuickNotes is a simple note-taking web app built with plain HTML, CSS and JavaScript. You can add short notes, sort them into categories, search through them and delete the ones you no longer need. Your notes are saved in the browser, so they are still there after a page refresh.

## Features

- Add notes (up to 200 characters) with a category: Personal, Work or Study
- Colour-coded note cards for each category
- Each note shows its text, category, and the date and time it was created
- Delete individual notes
- Live search that filters notes as you type (not case-sensitive)
- Validation messages for empty notes and notes over 200 characters
- Note count that reads correctly for zero, one and many notes
- Notes saved to localStorage so they survive a refresh
- Responsive layout that stacks the form on small screens
- "Clear all" button with a confirmation prompt

## How to run locally

1. Clone the repository: `git clone https://github.com/jLuseno161/quicknotes-app.git`
2. Open the `quicknotes-app` folder in VS Code.
3. Right-click `index.html` and choose "Open with Live Server" (or just open `index.html` in your browser).

## What I learned

- (Write this in your own words. Example: how `createElement` and `textContent` build the list safely without `innerHTML`.)
- (Example: how `JSON.stringify` and `JSON.parse` let me save an array of objects in localStorage.)
- (Example: how Flexbox and a media query change the form layout on small screens.)