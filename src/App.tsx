import * as React from 'react';
import './App.css';

import { connect } from 'react-redux';
import { State } from './internal/state';
import { IBoard } from './internal/board';
import { ICard } from './internal/card';

import Board from './Board';

import { getSelectAction, getUnselectAction } from './internal/actions';

const logo = require('./logo.svg');

class App extends React.Component<StateProps & DispatchProps, {}> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <Board order={this.props.board.order} cards={this.props.cards} select={this.props.select} unselect={this.props.unselect} selected={this.props.selected} click={this.props.board.isClickDisabled}/>
        </div>
        
      </div>
    );
  }
}

interface StateProps {
  board: IBoard;
  cards: {
    [id: string]: ICard
  }
  selected: string;
}

interface DispatchProps {
  select: (id: string) => void;
  unselect: (id: string) => void;
}

function mapStatetoProps(state: State): StateProps {
  const cards = {
    a1: state.a1,
    a2: state.a2,
    a3: state.a3,
    a4: state.a4,
    b1: state.b1,    
    b2: state.b2,    
    b3: state.b3,    
    b4: state.b4,      
    c1: state.c1,
    c2: state.c2,
    c3: state.c3,
    c4: state.c4,
    d1: state.d1,
    d2: state.d2,
    d3: state.d3,
    d4: state.d4,
    e1: state.e1,
    e2: state.e2,
    e3: state.e3,
    e4: state.e4,
    f1: state.f1,
    f2: state.f2,      
    f3: state.f3,      
    f4: state.f4,
    g1: state.g1
  };
    
  return { board: state.board, cards, selected: state.selected };
}

function mapDispatchtoProps(dispatch:any): DispatchProps {
  return {
    select: (id: string): void => dispatch(getSelectAction(id)),
    unselect: (id: string): void => dispatch(getUnselectAction(id))
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
