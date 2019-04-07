import React from 'react';
import { shallow } from 'enzyme';
import Oauth from './oauth';

describe('<Oauth />', () => {
  test('renders', () => {
    const wrapper = shallow(<Oauth />);
    expect(wrapper).toMatchSnapshot();
  });
});
