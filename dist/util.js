"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBoard = exports.copy = exports.displayBoard = void 0;
function displayBoard(board, initialCells) {
    var digitColor = '\x1b[31m';
    var resetColor = '\x1b[0m';
    var bright = '\x1b[1m';
    var initialCellsColor = '\x1b[33m';
    var boardStr = '╭───────┬───────┬───────╮\n';
    for (var row = 0; row < board.length; row++) {
        if (row % 3 == 0 && row != 0)
            boardStr += '├───────┼───────┼───────┤\n';
        for (var col = 0; col < board.length; col++) {
            if (col % 3 == 0)
                boardStr += '│ ';
            if (board[row][col] === 0)
                boardStr += '·';
            else if (initialCells[row][col])
                boardStr += "" + bright + initialCellsColor + board[row][col] + resetColor;
            else
                boardStr += "" + bright + digitColor + board[row][col] + resetColor;
            boardStr += ' ';
        }
        boardStr += '|\n';
    }
    boardStr += '╰───────┴───────┴───────╯';
    console.log(boardStr);
}
exports.displayBoard = displayBoard;
function copy(board) {
    var res = [];
    for (var _i = 0, board_1 = board; _i < board_1.length; _i++) {
        var line = board_1[_i];
        res.push(__spreadArrays(line));
    }
    return res;
}
exports.copy = copy;
function parseBoard(boardStr) {
    var lines = boardStr.split(',');
    var board = [];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        board.push(line.split('').map(function (ch) { return +ch; }));
    }
    return board;
}
exports.parseBoard = parseBoard;
