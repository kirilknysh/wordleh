#!/usr/bin/env node

import { createRequire } from 'module';
import { argv, exit } from 'process';

import { buildLetters, findPossibles, parseConfig, printHelp } from './helpers.mjs';

const require = createRequire(import.meta.url);
const dictionary = require('an-array-of-english-words');

function main(args, dictionary) {
  if (args.length === 0) {
    console.log('At least one argument is required. Pass `-h` for help.');
    return exit(1);
  }

  if (args[0] === '-h') {
    printHelp();
    return exit(0);
  }

  const config = parseConfig(args);

  const words = dictionary.filter((word) => {
    return word.length === config.size &&
      config.must.every(({ letter, position }) => word[position] === letter) &&
      config.not.every(({ letter }) => !word.includes(letter)) &&
      config.exclude.every(({ letter, position }) => word.includes(letter) && word[position] !== letter);
  });
  const letters = buildLetters(words);

  const possibles = findPossibles(words, config, letters);
  console.log(words.length, 'words potentially correct.');
  console.log('Use one of these words:');
  console.log(`  ${possibles.join(' , ')}`);
  if (config.verbose) {
    console.log('Full list of possible words:');
    console.log(`  ${words.join(' , ')}`);
  }
}

main(argv.slice(2), dictionary);
