import path from 'path';
import { esc, execScriptSync } from './utils/helpers.js';

const TEST_PATH = path.resolve('./test/');

// CLI with flags and environment variables
// Note: using child_process.execSync the stdout.isTTY is always false
// TODO:
//   - test FORCE_COLOR=0
//   - test NO_COLOR=1

describe('enable colors', () => {
  test(`--color`, (done) => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    const received = execScriptSync(filename, ['--color']);
    const expected =
      '\x1b[31mred\x1b[39m|\x1b[38;2;80;80;80mrgb\x1b[39m|\x1b[48;2;80;80;80mbgRgb\x1b[49m|\x1b[38;2;255;255;255mhex\x1b[39m|\x1b[48;2;255;255;255mbgHex\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`--color=true`, (done) => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    const received = execScriptSync(filename, ['--color=true']);
    const expected =
      '\x1b[31mred\x1b[39m|\x1b[38;2;80;80;80mrgb\x1b[39m|\x1b[48;2;80;80;80mbgRgb\x1b[49m|\x1b[38;2;255;255;255mhex\x1b[39m|\x1b[48;2;255;255;255mbgHex\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`--color=always`, (done) => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    const received = execScriptSync(filename, ['--color=always']);
    const expected =
      '\x1b[31mred\x1b[39m|\x1b[38;2;80;80;80mrgb\x1b[39m|\x1b[48;2;80;80;80mbgRgb\x1b[49m|\x1b[38;2;255;255;255mhex\x1b[39m|\x1b[48;2;255;255;255mbgHex\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`FORCE_COLOR=true`, (done) => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    const received = execScriptSync(filename, [], ['FORCE_COLOR=true']);
    const expected =
      '\x1b[31mred\x1b[39m|\x1b[38;2;80;80;80mrgb\x1b[39m|\x1b[48;2;80;80;80mbgRgb\x1b[49m|\x1b[38;2;255;255;255mhex\x1b[39m|\x1b[48;2;255;255;255mbgHex\x1b[49m';

    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`FORCE_COLOR=1`, (done) => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    const received = execScriptSync(filename, [], ['FORCE_COLOR=1']);
    const expected =
      '\x1b[31mred\x1b[39m|\x1b[38;2;80;80;80mrgb\x1b[39m|\x1b[48;2;80;80;80mbgRgb\x1b[49m|\x1b[38;2;255;255;255mhex\x1b[39m|\x1b[48;2;255;255;255mbgHex\x1b[49m';

    expect(esc(received)).toEqual(esc(expected));
    done();
  });
});

describe('disable colors', () => {
  test(`--no-color`, (done) => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    // flags has priority over env variable
    const received = execScriptSync(filename, ['--no-color'], ['FORCE_COLOR=1']);
    const expected = 'red|rgb|bgRgb|hex|bgHex';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`--color=false`, (done) => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    // flags has priority over env variable
    const received = execScriptSync(filename, ['--color=false'], ['FORCE_COLOR=1']);
    const expected = 'red|rgb|bgRgb|hex|bgHex';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`--color=never`, (done) => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    // flags has priority over env variable
    const received = execScriptSync(filename, ['--color=never'], ['FORCE_COLOR=1']);
    const expected = 'red|rgb|bgRgb|hex|bgHex';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });
});