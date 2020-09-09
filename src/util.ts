// ╭-------┬-------┬-------╮
// | 0 0 0 | 1 1 1 | 2 2 2 |
// | 0 0 0 | 1 1 1 | 2 2 2 |
// | 0 0 0 | 1 1 1 | 2 2 2 |
// ├-------┼-------┼-------┤
// | 3 3 3 | 4 4 4 | 5 5 5 |
// | 3 3 3 | 4 4 4 | 5 5 5 |
// | 3 3 3 | 4 4 4 | 5 5 5 |
// ├-------┼-------┼-------┤
// | 6 6 6 | 7 7 7 | 8 8 8 |
// | 6 6 6 | 7 7 7 | 8 8 8 |
// | 6 6 6 | 7 7 7 | 8 8 8 |
// ╰-------┴-------┴-------╯

export function displayBoard(board: number[][], initialCells: boolean[][]): void {
    const digitColor = '\x1b[31m';
    const resetColor = '\x1b[0m';
    const bright = '\x1b[1m';
    const initialCellsColor = '\x1b[33m'

    let boardStr = '╭-------┬-------┬-------╮\n';
    for (let row = 0; row < board.length; row++) {
        if (row % 3 == 0 && row != 0)
            boardStr += '├-------┼-------┼-------┤\n';

        for (let col = 0; col < board.length; col++) {
            if (col % 3 == 0)
                boardStr += '| ';
            if (board[row][col] === 0)
                boardStr += '·';
            else if (initialCells[row][col])
                boardStr += `${bright}${initialCellsColor}${board[row][col]}${resetColor}`;
            else
                boardStr += `${bright}${digitColor}${board[row][col]}${resetColor}`;

            boardStr += ' ';
        }

        boardStr += '|\n';
    }
    boardStr += '╰-------┴-------┴-------╯';
    console.log(boardStr);
}

export function copy(board: number[][]): number[][] {
    const res: number[][] = [];

    for (const line of board)
            res.push([...line]);

    return res;
}

