#include <iostream>
#include <ncurses.h>
#include <sstream>
#include <string>

#define NOT_EMPTY_COLOR_PAIR 1
#define EMPTY_COLOR_PAIR 2

#define FIRST_HORIZONTAL_CELL 2
#define LAST_HORIZONTAL_CELL 22
#define FIRST_VERTICAL_CELL 1
#define LAST_VERTICAL_CELL 12

void draw_board();
void draw_top_line();
void draw_number_line();
void draw_middle_line();
void draw_bottom_line();
std::string stringify_board();
inline void draw_in_between_horizontal_line();
inline void draw_three_number_lines();
inline void print_three_empty_cells();

int main(int argc, char **argv) {
  int ch;

  initscr();

  start_color();
  use_default_colors();
  init_pair(NOT_EMPTY_COLOR_PAIR, COLOR_RED, -1);
  init_pair(EMPTY_COLOR_PAIR, COLOR_WHITE, -1);

  draw_board();

  cbreak();
  keypad(stdscr, TRUE);
  noecho();

  move(1, 2);

  while (ch != KEY_ENTER) {
    ch = toupper(getch());
    int y, x;
    getyx(stdscr, y, x);

    if (ch == 10) { // enter
      break;

    } else if (ch == 'H' || ch == KEY_LEFT) {
      int steps = 2;
      if (mvinch(y, x - steps) == ACS_VLINE)
        steps += 2;

      move(y, x);

      int new_x = x - steps;
      if (new_x >= 2)
        move(y, new_x);

    } else if (ch == 'L' || ch == KEY_RIGHT) {
      int steps = 2;
      if (mvinch(y, x + steps) == ACS_VLINE)
        steps += 2;

      move(y, x);

      int new_x = x + steps;
      if (new_x <= LAST_HORIZONTAL_CELL)
        move(y, new_x);

    } else if (ch == 'J' || ch == KEY_DOWN) {
      int steps = 1;
      if (mvinch(y + steps, x) == ACS_HLINE)
        steps += 1;

      move(y, x);

      int new_y = y + steps;
      if (new_y <= LAST_VERTICAL_CELL)
        move(new_y, x);

    } else if (ch == 'K' || ch == KEY_UP) {
      int steps = 1;
      if (mvinch(y - steps, x) == ACS_HLINE)
        steps += 1;

      move(y, x);

      int new_y = y - steps;
      if (new_y >= FIRST_VERTICAL_CELL)
        move(new_y, x);

    } else if (ch >= '0' && ch <= '9') {
      if (ch == '0') {
        attron(COLOR_PAIR(EMPTY_COLOR_PAIR));
        addch(ACS_BULLET);
        attroff(COLOR_PAIR(EMPTY_COLOR_PAIR));
      } else {
        attron(COLOR_PAIR(NOT_EMPTY_COLOR_PAIR));
        addch(ch);
        attroff(COLOR_PAIR(NOT_EMPTY_COLOR_PAIR));
      }
      move(y, x);
    } else if (ch == 'Q') {
      endwin();
      return 0;
    }
  }

  endwin();

  std::string board = stringify_board();
  std::string path_to_solver = "./dist/index.js";

  std::stringstream cmd;
  cmd << "node " << path_to_solver << " " << board;
  system(cmd.str().c_str());

  return 0;
}

std::string stringify_board() {
  std::string board_str = "";
  move(1, 2);
  int y, x;

  while (y <= LAST_VERTICAL_CELL) {
    getyx(stdscr, y, x);
    char ch = inch();

    // q is horizontal line
    // ~ is a bullet
    if (ch >= '0' && ch <= '9' || ch == '~')
      board_str += ch == '~' ? '0' : ch;

    if (x + 2 <= LAST_HORIZONTAL_CELL) {
      move(y, x + 2);
    } else {
      move(y + 1, 2);
      if (ch != 'q')
        board_str += ',';
    }
  }
  board_str.pop_back();
  return board_str;
}

void draw_board() {
  draw_top_line();
  draw_three_number_lines();
  draw_middle_line();
  draw_three_number_lines();
  draw_middle_line();
  draw_three_number_lines();
  draw_bottom_line();

  refresh();
}

void draw_top_line() {
  addch(ACS_ULCORNER);
  draw_in_between_horizontal_line();
  addch(ACS_TTEE);
  draw_in_between_horizontal_line();
  addch(ACS_TTEE);
  draw_in_between_horizontal_line();
  addch(ACS_URCORNER);
  addch('\n');
}

void draw_number_line() {
  addch(ACS_VLINE);
  print_three_empty_cells();
  addch(ACS_VLINE);
  print_three_empty_cells();
  addch(ACS_VLINE);
  print_three_empty_cells();
  addch(ACS_VLINE);
  addch('\n');
}

void draw_middle_line() {
  addch(ACS_LTEE);
  draw_in_between_horizontal_line();
  addch(ACS_PLUS);
  draw_in_between_horizontal_line();
  addch(ACS_PLUS);
  draw_in_between_horizontal_line();
  addch(ACS_RTEE);
  addch('\n');
}

void draw_bottom_line() {
  addch(ACS_LLCORNER);
  draw_in_between_horizontal_line();
  addch(ACS_BTEE);
  draw_in_between_horizontal_line();
  addch(ACS_BTEE);
  draw_in_between_horizontal_line();
  addch(ACS_LRCORNER);
  addch('\n');
}

inline void draw_in_between_horizontal_line() {
  for (int i = 0; i < 7; i++) {
    addch(ACS_HLINE);
  }
}

inline void draw_three_number_lines() {
  for (int i = 0; i < 3; i++) {
    draw_number_line();
  }
}

inline void print_three_empty_cells() {
  for (int i = 0; i < 7; i++) {
    if (i % 2 == 0) {
      addch(' ');
    } else {
      addch(ACS_BULLET);
    }
  }
}
