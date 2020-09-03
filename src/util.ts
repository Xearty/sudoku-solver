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
    const  initialCellsColor = '\x1b[33m'
    console.log('╭-------┬-------┬-------╮');
    for (let row = 0; row < board.length; row++) {
        let line = '';
        if (row % 3 == 0 && row != 0)
            console.log('├-------┼-------┼-------┤');

        for (let col = 0; col < board.length; col++) {
            if (col % 3 == 0) line += '| ';
            if (board[row][col] === 0)
                line += '·';
            else if (initialCells[row][col])
                line += `${bright}${initialCellsColor}${board[row][col]}${resetColor}`;
            else
                line += `${bright}${digitColor}${board[row][col]}${resetColor}`;

            line += ' ';
        }

        line += '|';

        console.log(line);

    }
    console.log('╰-------┴-------┴-------╯');
}

export function copy(board: number[][]): number[][] {
    const res: number[][] = [];

    for (const line of board)
            res.push([...line]);

    return res;
}

