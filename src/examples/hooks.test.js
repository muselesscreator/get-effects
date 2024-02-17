import { jest } from '@jest/globals';
import React from 'react';
import getEffects from '../getEffects';

import * as hooks from './hooks';

const { useExampleComponentData } = hooks;

const props = {
  val1: 'val1',
  cb1: jest.fn(),
  val2: 23,
  cb2: jest.fn(),
};

const path = require('path');
describe('ExampleComponent hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('useExampleComponentData hook', () => {
    beforeEach(() => {
     useExampleComponentData(props);
    });
    describe('behajestor', () => {
      it('calls cb1 with val1 when either of them change', () => {
        /**
         * Use getEffects to load callback passed to useEffect based on prerequisite array
         */
        const cb = getEffects([props.cb1, props.val1], React)[0];
        cb();
        expect(props.cb1).toHaveBeenCalledWith(props.val1);
      });
      it('increments numEvents on importClicked or fileChanged', () => {
        /**
         * Use getEffects to load callback passed to useEffect based on prerequisite array
         */
        const cb = getEffects([props.cb2, props.val2], React)[0];
        cb();
        expect(props.cb2).toHaveBeenCalled();
        expect(props.cb2.mock.calls[0][0](1)).toEqual(props.val2 + 1);
      });
    });
  });
});
