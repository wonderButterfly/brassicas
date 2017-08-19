import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Card from './Card';

import { BroccoliCard } from '../internal/card';

it('renders without crashing', () => {
  const card = new BroccoliCard()
  const div = document.createElement('div');
  ReactDOM.render(<Card card={card} selectDispatch={() => {}} />, div);
});
