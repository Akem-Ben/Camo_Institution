"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { PROD_URI } = process.env;
console.log('Running in prod mode');
exports.default = {
    URI: PROD_URI
};
