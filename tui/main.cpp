#include <ncurses.h>
#include <sstream>
#include <string>

#define NOT_EMPTY_COLOR_PAIR 1
#define EMPTY_COLOR_PAIR 2

#define FIRST_HORIZONTAL_CELL 2
#define LAST_HORIZONTAL_CELL 22
#define FIRST_VERTICAL_CELL 1
#define LAST_VERTICAL_CELL 12

inline void draw_board();
inline void draw_top_line();
inline void draw_number_line();
inline void draw_middle_line();
inline void draw_bottom_line();
inline void draw_in_between_horizontal_line();
inline void draw_three_number_lines();
inline void print_three_empty_cells();
inline void move_left(int curr_y, int curr_x);
inline void move_right(int curr_y, int curr_x);
inline void move_down(int curr_y, int curr_x);
inline void move_up(int curr_y, int curr_x);
inline void clear_cell();
inline void write_number(char ch);
std::string stringify_board();

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

    move(FIRST_VERTICAL_CELL, FIRST_HORIZONTAL_CELL);

    while (ch != KEY_ENTER) {
        ch = toupper(getch());
        int y, x;
        getyx(stdscr, y, x);

        if (ch == 10) { // enter
            break;

        } else if (ch == 'H' || ch == KEY_LEFT) {
            move_left(y, x);

        } else if (ch == 'L' || ch == KEY_RIGHT) {
            move_right(y, x);

        } else if (ch == 'J' || ch == KEY_DOWN) {
            move_down(y, x);

        } else if (ch == 'K' || ch == KEY_UP) {
            move_up(y, x);

        } else if (ch >= '1' && ch <= '9') {
            write_number(ch);
            move(y, x);

        } else if (ch == '0' || ch == 'X') {
            clear_cell();
            move(y, x);

        } else if (ch == 'Q') {
            endwin();
            return 0;
        }
    }


    std::string board = stringify_board();
    std::string path_to_solver = "./dist/index.js";
    std::stringstream cmd;
    cmd << "node " << path_to_solver << " " << board;

    endwin();

    system(cmd.str().c_str());

    return 0;
}

std::string stringify_board() {
    std::string board_str = "";
    move(FIRST_VERTICAL_CELL, FIRST_HORIZONTAL_CELL);
    int y, x;

    while (y <= LAST_VERTICAL_CELL) {
        getyx(stdscr, y, x);
        char ch = inch();

        // q is horizontal line
        // ~ is a bullet
        if (ch >= '1' && ch <= '9' || ch == '~')
            board_str += ch == '~' ? '0' : ch;

        if (x + 2 <= LAST_HORIZONTAL_CELL) {
            move(y, x + 2);
        } else {
            move(y + 1, FIRST_HORIZONTAL_CELL);
            if (ch != 'q')
                board_str += ',';
        }
    }
    board_str.pop_back();
    return board_str;
}

inline void clear_cell() {
    attron(COLOR_PAIR(EMPTY_COLOR_PAIR));
    addch(ACS_BULLET);
    attroff(COLOR_PAIR(EMPTY_COLOR_PAIR));
}

inline void write_number(char ch) {
    attron(COLOR_PAIR(NOT_EMPTY_COLOR_PAIR));
    addch(ch);
    attroff(COLOR_PAIR(NOT_EMPTY_COLOR_PAIR));
}

inline void move_left(int curr_y, int curr_x) {
    int steps = 2;
    if (mvinch(curr_y, curr_x - steps) == ACS_VLINE)
        steps += 2;

    move(curr_y, curr_x);

    int new_x = curr_x - steps;
    if (new_x >= 2)
        move(curr_y, new_x);
}

inline void move_right(int curr_y, int curr_x) {
    int steps = 2;
    if (mvinch(curr_y, curr_x + steps) == ACS_VLINE)
        steps += 2;

    move(curr_y, curr_x);

    int new_x = curr_x + steps;
    if (new_x <= LAST_HORIZONTAL_CELL)
        move(curr_y, new_x);
}

inline void move_down(int curr_y, int curr_x) {
    int steps = 1;
    if (mvinch(curr_y + steps, curr_x) == ACS_HLINE)
        steps += 1;

    move(curr_y, curr_x);

    int new_y = curr_y + steps;
    if (new_y <= LAST_VERTICAL_CELL)
        move(new_y, curr_x);
}

inline void move_up(int curr_y, int curr_x) {
    int steps = 1;
    if (mvinch(curr_y - steps, curr_x) == ACS_HLINE)
        steps += 1;

    move(curr_y, curr_x);

    int new_y = curr_y - steps;
    if (new_y >= FIRST_VERTICAL_CELL)
        move(new_y, curr_x);
}

inline void draw_board() {
    draw_top_line();
    draw_three_number_lines();
    draw_middle_line();
    draw_three_number_lines();
    draw_middle_line();
    draw_three_number_lines();
    draw_bottom_line();

    refresh();
}

inline void draw_top_line() {
    addch(ACS_ULCORNER);
    draw_in_between_horizontal_line();
    addch(ACS_TTEE);
    draw_in_between_horizontal_line();
    addch(ACS_TTEE);
    draw_in_between_horizontal_line();
    addch(ACS_URCORNER);
    addch('\n');
}

inline void draw_number_line() {
    addch(ACS_VLINE);
    print_three_empty_cells();
    addch(ACS_VLINE);
    print_three_empty_cells();
    addch(ACS_VLINE);
    print_three_empty_cells();
    addch(ACS_VLINE);
    addch('\n');
}

inline void draw_middle_line() {
    addch(ACS_LTEE);
    draw_in_between_horizontal_line();
    addch(ACS_PLUS);
    draw_in_between_horizontal_line();
    addch(ACS_PLUS);
    draw_in_between_horizontal_line();
    addch(ACS_RTEE);
    addch('\n');
}

inline void draw_bottom_line() {
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
