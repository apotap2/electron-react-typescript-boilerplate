import { ActionSwitcher, createActionFactory } from "action_switcher";

export type TState = number;

export const switcher = new ActionSwitcher<TState>(0);

export const increment = createActionFactory(switcher, {
  apply(state: TState): TState {
      return state + 1;
  },
  TYPE: "INCREMENT_COUNTER",
});

export const decrement = createActionFactory(switcher, {
  apply(state: TState): TState {
      return state - 1;
  },
  TYPE: "DECREMENT_COUNTER",
});

export function incrementIfOdd() {
  return (dispatch: Function, getState: Function) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: Function) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}

export const Actions = {
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync,
};
