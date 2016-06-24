import assign from '../src/utils/assign';
import { expect } from 'chai';

describe('Assign function', () => {
  it('should throw error when target is null', () => {
    expect(assign.bind(null, null, {})).to.throw(TypeError);
  });

  it('should accept null source', () => {
    expect(assign({}, null)).to.deep.equal({});
  });

  it('should merge ', () => {
    const first = { a: 1 };
    const second = {
      b: {
        c: 2,
      },
    };
    const expected = {
      a: 1,
      b: {
        c: 2,
      },
    };

    expect(assign({}, first, second)).to.deep.equal(expected);
  });
});
