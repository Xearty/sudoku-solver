import solve from './solver';
import { parseBoard } from './util';

if (process.argv[2])
    solve(parseBoard(process.argv[2]));
else
    console.log('A board was not provided!');

