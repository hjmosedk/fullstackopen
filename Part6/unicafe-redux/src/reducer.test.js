import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('Unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test('Should return a proper initial state when called with undefined state', () => {
    const state = {};
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('Good is incremented', () => {
    const action = {
      type: 'GOOD',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });
  test('Ok is incremented', () => {
    const action = { type: 'OK' };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });

  test('Bad is incremented', () => {
    const action = { type: 'BAD' };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });

  test('Zero is correcly resetting', () => {
    const action = { type: 'ZERO' };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual(initialState);
  });

  test('Good, is correcly incremented twice', () => {
    const action = { type: 'GOOD' };
    const state = initialState;
    const newState = {
      good: 1,
      ok: 0,
      bad: 0,
    };

    deepFreeze(state);
    const testState1 = counterReducer(state, action);
    expect(testState1).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });

    const testState2 = counterReducer(newState, action);
    expect(testState2).toEqual({
      good: 2,
      ok: 0,
      bad: 0,
    });
  });
});
