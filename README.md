# Project1
## Proposal
Project Description
  Our goal is to create a retro-themed ‘brick breaker’ style game. We plan on an initial
start/menu screen to land on, with the ability to choose a different game mode. Tentatively,
these will be Normal Mode, Zen Mode, and Hardcore/Challange mode. Normal mode will
consist of a moving paddle to bounce a ball around to ‘break’ bricks scattered around the
screen. We will give the user X amounts of ‘lives’ and the game ends when the lives are
expended. The score will be tracked via bricks broken and lives will be lost when the paddle
misses, passing into the bottom frame. After the screen is cleared the bricks will respawn in
different locations. Zen mode will function similarly, but the user will have infinite lives and
the game will continue until it has been quit. Finally, Hardcore/Challange mode will consist of
a smaller paddle, faster moving balls, and/or multiple balls.
Project Implementation
  We will use HTML5, CSS, and JavaScript with JQuery to complete the project.
Animation and rendering will be accomplished through manipulation of the HTML DOM using
JQuery where possible. We will aim to create an MVC architecture, with the rendering of the
game independent from the backend logic, so that the game could theoretically be ported to
another technology stack. We will attempt to reuse code as much as possible and have the
different game modes build off a core set of functionality in a modular way. The main game
loop, or controller, will reside in one file, with all the rendering code (the view) in another, and
the domain model classes each in their own files as necessary.
Division of Responsibility
● Alexandra Hurst - Ball + Physics
● Andrew Baldwin - Different Game Modes
● Devon Pirestani - Game Size + Borders and Collision
● Karl Stomberg - Landing/Menu Page
● Vince Sargeni - Brick Generation + Collisions
● Zhihao Zhang - Background & Other Artwork
