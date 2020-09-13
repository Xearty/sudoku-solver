"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function getSector(coords) {
    return Math.floor(coords.row / 3) * 3 + Math.floor(coords.col / 3);
}
function doesNotExistInRow(board, row, value) {
    for (var _i = 0, _a = board[row]; _i < _a.length; _i++) {
        var number = _a[_i];
        if (number == value)
            return false;
    }
    return true;
}
function doesNotExistInColumn(board, column, value) {
    for (var i = 0; i < board.length; i++) {
        if (board[i][column] === value)
            return false;
    }
    return true;
}
function doesNotExistInSector(board, sector, value) {
    var row = Math.floor(sector / 3) * 3;
    var col = sector % 3 * 3;
    for (var i = row; i < row + 3; i++) {
        for (var j = col; j < col + 3; j++) {
            if (board[i][j] === value) {
                return false;
            }
        }
    }
    return true;
}
function isValidMove(board, position, value) {
    var row = position.row, col = position.col;
    return (doesNotExistInRow(board, row, value) &&
        doesNotExistInColumn(board, col, value) &&
        doesNotExistInSector(board, getSector(position), value));
}
function makeMove(board, position, value) {
    var isValid = isValidMove(board, position, value);
    var row = position.row, col = position.col;
    if (isValid)
        board[row][col] = value;
    return isValid;
}
function getInitialCells(board) {
    var result = new Array(board.length)
        .fill([])
        .map(function () { return new Array(board.length).fill(false); });
    for (var row = 0; row < board.length; row++) {
        for (var col = 0; col < board.length; col++) {
            if (board[row][col]) {
                result[row][col] = true;
            }
        }
    }
    return result;
}
function getNextCoords(board, row, col) {
    var nextRow = row;
    var nextCol = col + 1;
    if (nextCol >= board.length) {
        nextRow++;
        nextCol = 0;
    }
    return { nextRow: nextRow, nextCol: nextCol };
}
function reachedTheEnd(board, row, col) {
    return row >= board.length || col >= board.length;
}
function printSolutions(board, initialCells, row, col) {
    if (row === void 0) { row = 0; }
    if (col === void 0) { col = 0; }
    if (reachedTheEnd(board, row, col)) {
        util_1.displayBoard(board, initialCells);
        return;
    }
    var _a = getNextCoords(board, row, col), nextRow = _a.nextRow, nextCol = _a.nextCol;
    if (board[row][col]) {
        printSolutions(board, initialCells, nextRow, nextCol);
        return;
    }
    for (var i = 1; i <= 9; i++) {
        if (makeMove(board, { row: row, col: col }, i)) {
            printSolutions(board, initialCells, nextRow, nextCol);
            board[row][col] = 0;
        }
    }
}
function solve(board) {
    var initialCells = getInitialCells(board);
    printSolutions(board, initialCells);
}
exports.default = solve;
