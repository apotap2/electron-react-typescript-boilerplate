import { spy } from 'sinon';
import { switcher, Actions } from '../../app/switchers/counter';
import { increment, decrement } from '../../app/switchers/counter';
import { IAction } from 'action_switcher';

const counter = (state: number, action: IAction) => {return switcher.apply(state, action);};

describe('switchers', () => {
  describe('actions', () => {
    it('should increment should create increment action', () => {
      expect(Actions.increment()).toMatchSnapshot();
    });
  
    it('should decrement should create decrement action', () => {
      expect(Actions.decrement()).toMatchSnapshot();
    });
  });

  describe('async actions', () => {
    it('should incrementIfOdd should create increment action', () => {
    const fn = Actions.incrementIfOdd();
    expect(fn).toBeInstanceOf(Function);
    const dispatch = spy();
    const getState = () => ({ counter: 1 });
    fn(dispatch, getState);
    expect(dispatch.calledWith({ type: Actions.increment.TYPE() })).toBe(true);
  });

  it('should incrementIfOdd shouldnt create increment action if counter is even', () => {
    const fn = Actions.incrementIfOdd();
    const dispatch = spy();
    const getState = () => ({ counter: 2 });
    fn(dispatch, getState);
    expect(dispatch.called).toBe(false);
  });

  // There's no nice way to test this at the moment...
  it('should incrementAsync', done => {
    const fn = Actions.incrementAsync(1);
    expect(fn).toBeInstanceOf(Function);
    const dispatch = spy();
    fn(dispatch);
    setTimeout(() => {
      expect(dispatch.calledWith({ type: Actions.increment.TYPE() })).toBe(true);
      done();
    }, 5);
  });
  });

  describe('reducer', () => {
    it('should handle INCREMENT_COUNTER', () => {
      expect(counter(1, increment())).toBe(2);
    });

    it('should handle DECREMENT_COUNTER', () => {
      expect(counter(1, decrement())).toBe(0);
    });

    it('should handle unknown action type', () => {
      expect(counter(1, { type: 'unknown' })).toBe(1);
    });
  });
  
});
