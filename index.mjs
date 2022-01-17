#!/usr/bin/env node

import { createRequire } from 'module';
import { argv, exit } from 'process';

const require = createRequire(import.meta.url);
const dictionary = require('an-array-of-english-words');

const ARG_REGEX = /(?<letter>[a-z]+)(?<position>[0-9]*)(?<negation>[!]*)/i;

function printHelp() {
  console.log('Wordle helper utility.');
  console.log('Usage examples:');
  console.log('  `wordleh 5` - shows the best initial word with the given length (5 letters here).');
  console.log('  `wordleh 5 a0 b2 c! d! e1!` - shows the next word recommendation when some letter already known:');
  console.log('    `5` - word length;');
  console.log('    `a0 b2` - letter `a` MUST exist in the word at position 0, letter `b` MUST be at position 2; position MUST be smaller than the word length;');
  console.log('    `c! d!` - letters `c` and `d` MUST NOT be in the word in any position;');
  console.log('    `e1!` - letters `e` MUST be in the word but MUST NOT be the second;');
  console.log('  `wordleh -h` - shows this help.');
}

function parseConfig(args) {
  return args.reduce((config, arg, index) => {
    if (index === 0) {
      const size = +arg;
      if (!Number.isFinite(size)) {
        throw new Error('Word length MUST be a number. Use `wordleh -h` for help.');
      }
      config.size = size;
      return config;
    }

    if (arg === '-e') {
      config.explicit = true;
      return config;
    }

    const execArray = ARG_REGEX.exec(arg);
    if (!Array.isArray(execArray) || execArray.length !== 4) {
      throw new Error(`Invalid argument \`${arg}\`. Use \`wordleh -h\` for help.`);
    }

    const letter = execArray[1];
    if (letter.length !== 1) {
      throw new Error(`Invalid argument \`${arg}\`. Use \`wordleh -h\` for help.`);
    }
    let position = -1;
    if (execArray[2].length > 0) {
      position = +execArray[2];
      if (!Number.isFinite(position) || position >= config.size) {
        throw new Error(`Invalid argument \`${arg}\`. Use \`wordleh -h\` for help.`);
      }
    }
    const negation = execArray[3] === '!';

    if (!negation) { // a0
      if (position < 0) {
        throw new Error(`Invalid argument \`${arg}\`. Use \`wordleh -h\` for help.`);
      }
      config.must.push({ letter, position });
    } else if (position < 0) { // c!
      config.not.push({ letter });
    } else { // e1!
      config.exclude.push({ letter, position });
    }

    return config;
  }, { size: 0, explicit: false, must: [], not: [], exclude: [] });
}

function buildLetters(words) {
  const hash = words.reduce((hash, word) => {
    [...word].forEach((letter) => {
      if (hash[letter]) {
        hash[letter] += 1;
      } else {
        hash[letter] = 1;
      }
    });
    return hash;
  }, Object.create(null));

  return Object
    .entries(hash)
    .sort((left, right) => right[1] - left[1])
    .map(([letter, count]) => {
      return { letter, count };
    });
}

function findPossibles(words, config, letters) {
  let possibles = words;
  let filters = config.size;

  for (let i = 0; i < letters.length; i++) {
    const filtered = possibles.filter((word) => word.includes(letters[i].letter));
    if (filtered.length > 0) {
      possibles = filtered;
      filters -= 1;
      if (filters === 0) {
        break;
      }
    }
  }

  return possibles;
}

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
  console.log('Use one of these words:');
  console.log(`  ${possibles.slice(0, 5).join(' , ')}`);
  if (config.explicit) {
    console.log('Full list of possible words:');
    console.log(`  ${possibles.join(' , ')}`);
  }
}

main(argv.slice(2), dictionary);
