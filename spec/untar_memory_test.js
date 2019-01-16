import { expect} from 'chai';
import { describe, it, /* beforeEach, afterEach*/} from 'mocha';

describe('true', () => {
  it('should be true', () => {
    expect(true).to.be.equal(true);
  });
});