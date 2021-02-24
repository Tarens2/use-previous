import { render, act } from "@testing-library/react";
import { usePrevious } from '../src/index';
import React, { useState } from 'react';


function setup() {
  const outherValues: {
    returnVal: number | undefined,
    down: () => void,
    up: () => void
  } = {
    returnVal: 0,
    down: () => {},
    up: () => {},
  } 

  function Counter() {
    const [state, setState] = useState(0);
    outherValues.returnVal = usePrevious(state)
    outherValues.up = () => { setState(v => ++v) }
    outherValues.down = () => { setState(v => --v) }

    return null
  }

  act(() => {render(<Counter />)});

  return outherValues;
}

test('usePrevious hook', () => {
  const s = setup();

  expect(s.returnVal).toBe(undefined);
  act(s.up);
  expect(s.returnVal).toBe(0);
  act(s.up);
  expect(s.returnVal).toBe(1);
  act(s.down);
  expect(s.returnVal).toBe(2);
});