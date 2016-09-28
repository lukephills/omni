import Sikky from '../../src/app.ts';

const expect = chai.expect;

describe('Simple tests', () => {

    it('should work!', () => {
        expect(true).to.eql(true);
    });

    it('should return sum', () => {
        const sum: number = Sikky(1, 1);
        expect(sum).to.eql(2);
    });
});
