const REG = require("reg");
const GEN = require("general");
const CANVAS = require("canvas.js");
const simple = require("simple");
const validate = require("validate");
const index = require("../udb/DB/index.js");

module.exports = {
  REG, ...GEN, CANVAS, ...simple, ...validate, ...index, 
};