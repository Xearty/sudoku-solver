"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copy = exports.displayBoard = void 0;
function displayBoard(board, initialCells) {
    var digitColor = '\x1b[31m';
    var resetColor = '\x1b[0m';
    var bright = '\x1b[1m';
    var initialCellsColor = '\x1b[33m';
    console.log('╭-------┬-------┬-------╮');
    for (var row = 0; row < board.length; row++) {
        var line = '';
        if (row % 3 == 0 && row != 0)
            console.log('├-------┼-------┼-------┤');
        for (var col = 0; col < board.length; col++) {
            if (col % 3 == 0)
                line += '| ';
            if (board[row][col] === 0)
                line += '·';
            else if (initialCells[row][col])
                line += "" + bright + initialCellsColor + board[row][col] + resetColor;
            else
                line += "" + bright + digitColor + board[row][col] + resetColor;
            line += ' ';
        }
        line += '|';
        console.log(line);
    }
    console.log('╰-------┴-------┴-------╯');
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
