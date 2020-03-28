# Simple-Piskel-Clone
Preview project
https://pavel232.github.io/Simple-Piskel-Clone/

How to use:
1. Clone or download this project
2. Go to simple-piskel-clone folder
3. Open index.html file


## Functional requirements
You need to create a simplified clone of the https://www.piskelapp.com/, a web-based tool for Spriting and Pixel art.
An overview of the features can be found in this playlist: https://www.youtube.com/playlist?list=PLO3K3VFvlU6Akj3W29_nMLZFnwNOVbAzI

### Required functionality
#### Functional scope
- Canvas sizes: 32x32 / 64x64 / 128x128 user-defined units
- Tools
    - Pen. Required size is 1 unit. Other unit sizes (2, 3, 4) are optional.
    - Color select (Primary/Secondary)
    - Paint bucket should fill closed areas (flood fill)
    - Eraser
    - Stroke (to draw straight lines)
    - Paint all pixels of the same color
- Please use Tools in https://www.piskelapp.com/ as an ideal example of what should be done. Use only main functionality without keyboard modifiers (ALT or SHIFT keys)
- Preview
    - Small animation preview window in the top right corner
    - Full screen mode
- Frames
    - Ability to add/delete a frame
    - Ability to reorder a frame via Drag and Drop
    - Ability to duplicate a frame
- Please use `Frames` and `Preview` components of https://www.piskelapp.com/ as an ideal example of what should be done.
- Export the final result
    - to local file system in any format (.gif / .apng)
- User session
  - Current session should be saved and be accessible when user opens up the page again.
- Landing page. This page should include the following information:
   - Screenshots
   - Animation examples
   - Implemented functionality overview
   - Link to the editor itself
   - Information about the author
- Keyboard shortcuts
  - All actions should be available via keyboard shortcuts
    - tools
    - export
    - add / delete / create frame
  - Keyboard shortcuts should be available on hover
  - Modal window to change keyboard shortcuts

## Technical requirements:
1) Browser support: latest version of Google **Chrome**.
2) Usage of **JS/ES2015+** or **TypeScript**.
3) You can use libraries and frameworks like React / Angular / Vue / jQuery / Bootstrap / Lodash / wrapper for file formats / API utilisation.
4) Final version of the editor should be **available via a link**. The easiest way to do so is to host your project on GitHub pages / Google Firebase / Heroku / Netlify / any other hosting.
5) Usage of Jest / any other tool for writing tests. You also need to setup test coverage output in the package.json by 'npm run coverage'. Your tests need cover the following code:
   1) Utilities, pure functions
   2) UI components
   3) Tools functionality (i.e. adding pixels, changing pixels, adding rectangle / circle)
6) Have to use browser's Canvas API to draw frames.

### Requirements to the commits, PR, repository
* [stage2-tasks-requirements](https://github.com/rolling-scopes-school/docs/blob/master/docs/stage2.md)
* worklog of the project

#### Worklog

To show process of development it needs to describe small amount of time and what work was accomplish during that time.

##### Example

You need to provide high level, feature base (what need to score) description.


| Start time  | End time | time spent | feature |
|-----------|-------------|-------------|-------------|
| Dec 25 | Dec 25 | 1h | start project simple piskel clone, continue with image-api |
| Dec 26 | Dec 30 | 7h | pen size changer, color select inputs implementation |
| Dec 30 | Dec 30 | 15h | add frames implementation |
| Dec 31 | Dec 31 | 1h | add hatch chess canvas background |
| Jan 3 | Jan 5 | 20h | preview animation implementation |
| Jan 4 | Jan 4 | 3h | fullscreen mode, frames visible |
| Jan 4 | Jan 5 | 5h | add drag n drop function |
| Jan 5 | Jan 6 | 3h | add export implementation |
| Jan 6 | Jan 9 | 30h | bug fixes |

### Requirements to the quality of code
- Don't use nested SetTimeout, synchronization of code using timeouts etc. Use promises/async/await where it's possible.
- Don't use magic number instead of named constants.
  For example, instead of
  `if (event.keyCode === 32 || event.keyCode === 13) {….}`
  use
  `if (event.keyCode === KeyboardEvent.SPACE || key === KeyboardEvent.ENTER ) {….}` etc.
- Don't use functions that have more than 40 lines of code (excluding variable declarations).
- Minimal use of ternary operators.
- Use pure functions where it's possible. If you haven't heard this term before, you can start your acquaintance [here](https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c) or [here](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976)
- Use meaningful names for variables. Avoid single characters for variable names (i, n, j, d, etc.), abstract or common names (obj, arr, num, item1, etc.)
- Use the eslint with airbnb for all js code
