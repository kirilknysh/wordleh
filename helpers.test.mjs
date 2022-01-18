import assert from 'assert/strict';

import * as helpers from './helpers.mjs';

describe('helpers', () => {
  describe('parseConfig', () => {
    it('should return default config', () => {
      assert.deepEqual(
        helpers.parseConfig(['0']),
        { size: 0, verbose: false, must: [], not: [], exclude: [] }
      );
    });

    it('should parse first argument as word size', () => {
      assert.deepEqual(helpers.parseConfig(['3']).size, 3);
    });

    it('should throw when size argument is invalid', () => {
      assert.throws(() => {
        helpers.parseConfig(['a']);
      });
    });

    it('should parse `verbose` argument', () => {
      assert.deepEqual(helpers.parseConfig(['3', '-v']).verbose, true);
    });

    it('should throw when argument is formatted incorrectly', () => {
      assert.throws(() => {
        helpers.parseConfig(['4', '=']);
      });
    });

    it('should throw when argument position is incorrect', () => {
      assert.throws(() => {
        helpers.parseConfig(['4', 'aa']);
      });
      assert.throws(() => {
        helpers.parseConfig(['4', 'a9']);
      });
      assert.throws(() => {
        helpers.parseConfig(['4', 'a']);
      });
    });

    it('should parse multiple `must` arguments', () => {
      assert.deepEqual(
        helpers.parseConfig(['5', '-v', 'a3', 'b2', 'a4']).must,
        [{ letter: 'a', position: 3 }, { letter: 'b', position: 2 }, { letter: 'a', position: 4 }]
      );
    });

    it('should parse multiple `not` arguments', () => {
      assert.deepEqual(
        helpers.parseConfig(['5', 'k!', 'a3', 'g!']).not,
        [{ letter: 'k' }, { letter: 'g' }]
      );
    });

    it('should parse multiple `exclude` arguments', () => {
      assert.deepEqual(
        helpers.parseConfig(['5', 'h2!', 'a3', 'm4!']).exclude,
        [{ letter: 'h', position: 2 }, { letter: 'm', position: 4 }]
      );
    });
  });

  describe('buildLetters', () => {
    it('should return a sorted arrays of letters', () => {
      assert.deepEqual(
        helpers.buildLetters(['abc', 'cv', 'b', 'bacb']),
        [
          { letter: 'b', count: 4 },
          { letter: 'c', count: 3 },
          { letter: 'a', count: 2 },
          { letter: 'v', count: 1 },
        ]
      );
    });
  });

  describe('findPossibles', () => {
    it('should find the words that consist of the most popular letters', () => {
      const words = ['abc', 'abb', 'bbb', 'qwa', 'sde', 'gcp', 'bac'];
      const config = { size: 3, verbose: false, must: [], not: [], exclude: [] };
      const letters = helpers.buildLetters(words);

      assert.deepEqual(
        helpers.findPossibles(words, config, letters),
        ['abc', 'bac']
      );
    });

    it('should skip some (even popular) letters', () => {
      const words = ['bbc', 'jbb', 'bbb', 'qwa', 'saa', 'gca'];
      const config = { size: 3, verbose: false, must: [], not: [], exclude: [] };
      const letters = helpers.buildLetters(words);

      assert.deepEqual(
        helpers.findPossibles(words, config, letters),
        ['bbc']
      );
    });
  });
});
