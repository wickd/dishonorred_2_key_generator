let Generator = require('./generator');
let argument = process.argv[2];
let generator = new Generator();

generator.testYourLucky(argument);