import * as React from 'react';
import './App.css';

import { connect } from 'react-redux';
import { State } from '../internal/state';
import { IBoard } from '../internal/board';
import { ICard } from '../internal/card';

import Board from './Board';
import GameOverModal from './GameOverModal';
import ShuffleAlert from './ShuffleAlert';

import { getSelectAction, getUnselectAction, reinitAction } from '../internal/actions';

class App extends React.Component<StateProps & DispatchProps, {}> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">Match the brassicas</h1>
        </div>
        <div>
          <Board order={this.props.board.order} cards={this.props.cards} select={this.props.select} unselect={this.props.unselect} selected={this.props.selected} click={this.props.board.isClickDisabled}/>
        </div>
        {
          this.props.gameOver 
          ? <GameOverModal finalScore={this.props.score} startOver={this.props.reinitalize}/>
          : null
        }
        {
          this.props.isShuffling
          ? <ShuffleAlert />
          : null
        }
        <small className="App-notice">Images By Coyau / Wikimedia Commons, CC BY-SA 3.0</small>
        <small className="App-notice">Created by <a href="http://brianl.ee">Brian Lee</a>, 2017</small>
      </div>
    );
  }
}

interface StateProps {
  board: IBoard;
  cards: {
    [id: string]: ICard
  };
  selected: string;
  gameOver: boolean;
  score: number;
  isShuffling: boolean;
}

interface DispatchProps {
  select: (id: string) => void;
  unselect: (id: string) => void;
  reinitalize: () => void;
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
    
  return { 
    board: state.board, 
    cards, 
    selected: state.selected, 
    score: state.score, 
    gameOver: state.gameOver, 
    isShuffling: state.isShuffling
  };
}

function mapDispatchtoProps(dispatch: any): DispatchProps {
  return {
    select: (id: string): void => dispatch(getSelectAction(id)),
    unselect: (id: string): void => dispatch(getUnselectAction(id)),
    reinitalize: (): void => dispatch(reinitAction())
  };
}

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
