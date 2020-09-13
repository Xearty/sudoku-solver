import { displayBoard } from './util';

// sectors
// ╭───────┬───────┬───────╮
// │ 0 0 0 │ 1 1 1 │ 2 2 2 │
// │ 0 0 0 │ 1 1 1 │ 2 2 2 │
// │ 0 0 0 │ 1 1 1 │ 2 2 2 │
// ├───────┼───────┼───────┤
// │ 3 3 3 │ 4 4 4 │ 5 5 5 │
// │ 3 3 3 │ 4 4 4 │ 5 5 5 │
// │ 3 3 3 │ 4 4 4 │ 5 5 5 │
// ├───────┼───────┼───────┤
// │ 6 6 6 │ 7 7 7 │ 8 8 8 │
// │ 6 6 6 │ 7 7 7 │ 8 8 8 │
// │ 6 6 6 │ 7 7 7 │ 8 8 8 │
// ╰───────┴───────┴───────╯

// 0 based
interface Coords {
    row: number;
    col: number;
}

function getSector(coords: Coords): number {
    return Math.floor(coords.row / 3) * 3 + Math.floor(coords.col / 3);
}

function doesNotExistInRow(board: number[][], row: number, value: number): boolean {
    for (const number of board[row])
        if (number == value) return false;

    return true;
}

function doesNotExistInColumn(board: number[][], column: number, value: number): boolean {
    for (let i = 0; i < board.length; i++) {
        if (board[i][column] === value)
            return false;
    }

    return true;
}

function doesNotExistInSector(board: number[][], sector: number, value: number): boolean {
    // the top left point of the sector
    const row = Math.floor(sector / 3) * 3;
    const col = sector % 3 * 3;

    for (let i = row; i < row + 3; i++) {
        for (let j = col; j < col + 3; j++) {
            if (board[i][j] === value) {
                return false;
            }
        }
    }
    return true;
}

// doesn't check if there is already a value in the corresponding cell
function isValidMove(board: number[][], position: Coords, value: number): boolean {
    const { row, col } = position;
    return (
        doesNotExistInRow(board, row, value) &&
        doesNotExistInColumn(board, col, value) &&
        doesNotExistInSector(board, getSector(position), value)
    );
}

// returns a success value
function makeMove(board: number[][], position: Coords, value: number): boolean {
    const isValid = isValidMove(board, position, value);
    const { row, col } = position;

    if (isValid) board[row][col] = value;

    return isValid;
}

function getInitialCells(board: number[][]) {
    const result: boolean[][] = new Array<boolean[]>(board.length)
        .fill([])
        .map(() => new Array<boolean>(board.length).fill(false));

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            if (board[row][col]) {
                result[row][col] = true;
            }
        }
    }

    return result;
}

function getNextCoords(board: number[][], row: number,  col: number) {
    let nextRow = row;
    let nextCol = col + 1;
    if (nextCol >= board.length) {
        nextRow++;
        nextCol = 0;
    }

    return { nextRow, nextCol };
}

function reachedTheEnd(board: number[][], row: number, col: number): boolean {
    return row >= board.length || col >= board.length;
}

function printSolutions(board: number[][], initialCells: boolean[][], row = 0, col = 0): void {
    // means it is solved
    if (reachedTheEnd(board, row, col)) {
        displayBoard(board, initialCells);
        return;
    }

    const { nextRow, nextCol } = getNextCoords(board, row, col);

    // skip the cells that already have values in them
    if (board[row][col]) {
        printSolutions(board, initialCells, nextRow, nextCol);
        return;
    }
    for (let i = 1; i <= 9; i++) {
        if (makeMove(board, { row, col }, i)) {
            printSolutions(board, initialCells, nextRow, nextCol);
            board[row][col] = 0;
        }
    }
}

export default function solve(board: number[][]): void {
    const initialCells = getInitialCells(board);
    printSolutions(board, initialCells);
}

