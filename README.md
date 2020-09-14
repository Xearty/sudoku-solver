# Sudoku solver
This is a sudoku solver written in typescript with the TUI for 
entering the numbers written in C++ using the ncurses library.

To start the TUI run the sudoku.sh script in the project root.

When you are done entering the numbers press <Enter>. The TUI
will generate a string with the sudoku board and pass it to
the solver as a command-line argument.

The string format is ((<digit> * 9) + ',') * 9 - ','

#### CONTROLS

Movement: Arrow keys or [hjkl]

Entering numbers: [1-9]

Clearing a cell: 'X' or 0

Submit: Enter

Quit: 'Q'

#### DEPENDENCIES

All you need is to have node installed on your system and in your PATH.

The TS script doesn't depend on any npm packages.
