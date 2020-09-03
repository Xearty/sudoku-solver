"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var solver_1 = __importDefault(require("./solver"));
var util_1 = require("./util");
var board = [
    [8, 7, 0, 0, 0, 0, 6, 0, 0],
    [2, 5, 0, 9, 0, 7, 0, 0, 0],
    [0, 0, 4, 0, 1, 0, 0, 0, 7],
    [0, 8, 0, 1, 0, 5, 0, 3, 0],
    [0, 0, 2, 0, 8, 0, 7, 0, 0],
    [0, 4, 0, 6, 0, 2, 0, 9, 0],
    [3, 0, 0, 0, 5, 0, 1, 0, 0],
    [0, 0, 0, 4, 0, 1, 0, 6, 8],
    [0, 0, 5, 0, 0, 0, 0, 7, 3],
];
solver_1.default(util_1.copy(board));
