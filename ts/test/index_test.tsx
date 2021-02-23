import { strict as assert } from 'assert';
import { render } from "@testing-library/react";
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

  render(<Counter />)

  return outherValues;
}

test('usePrevious hook', () => {
  const s = setup();

  assert.equal(s.returnVal, undefined);
  s.up();
  assert.equal(s.returnVal, 0);
  s.up();
  assert.equal(s.returnVal, 1);
  s.down();
  assert.equal(s.returnVal, 2);
});