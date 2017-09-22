/**
 * Module dependencies.
 */
import should from 'should';
import mongoose from 'mongoose';
import app from '../../src/server';  // eslint-disable-line
import User from './../../src/app/models/user';

// Globals
let user;

// The tests
describe('<Unit Test>', () => {
  after(() => {
    mongoose.disconnect();
  });
  describe('Model User:', () => {
    before((done) => {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      done();
    });

    describe('importhod Save', () => {
      it('should be able to save whithout problems', () => user.save((err) => {
        should.not.exist(err);
      }));

      it('should be able to show an error when try to save without name', (done) => {
        user.name = '';
        user.save((err) => {
          should.exist(err);
          done();
        });
      });
    });

    after((done) => {
      done();
    });
  });
});
