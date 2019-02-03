import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { switcher as CounterSwitcher, TState as TCounterState } from './counter';

const rootReducer = combineReducers({
  counter: (state, action) => {
    if (state === undefined) {
      return CounterSwitcher.getInitialState();
    }
    return CounterSwitcher.apply(state, action);
  },
  routing: routing as Reducer<any>
});

export interface IState {
  counter: TCounterState;
}

export default rootReducer;
