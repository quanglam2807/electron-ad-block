/* global describe it  */
const assert = require('assert');

const adBlock = require('../lib');

describe('Detect ads correctly', () => {
  it('shouldBeBlocked === true', () =>
    adBlock.isAdAsync(['ads'], 'http://shit.com/doubleclick.aspx')
      .then((shouldBeBlocked) => {
        assert.equal(shouldBeBlocked, true);
      }),
  );

  it('shouldBeBlocked === false', () =>
    adBlock.isAdAsync(['ads'], 'https://google.com')
      .then((shouldBeBlocked) => {
        assert.equal(shouldBeBlocked, false);
      }),
  );
});
