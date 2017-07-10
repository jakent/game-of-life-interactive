import React from 'react';
import { mount } from 'enzyme';
import {Provider} from 'react-redux';
import {store} from '../../../store';
import Game from '../';

describe('<Game />', () => {

  it('should initialize grid', () => {
    const props = {
      cells: [[false, false],[false, false]]
    };
    const game = mount(wrapWithProvider(<Game {...props} />));
    expect(game.find('#grid').length).toBe(1);
  });

  const wrapWithProvider = (component) => <Provider store={store}>{component}</Provider>

});
