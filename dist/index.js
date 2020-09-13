"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var solver_1 = __importDefault(require("./solver"));
var util_1 = require("./util");
if (process.argv[2])
    solver_1.default(util_1.parseBoard(process.argv[2]));
else
    console.log('A board was not provided!');
