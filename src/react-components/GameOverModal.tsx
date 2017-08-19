import * as React from 'react';
import axios from 'axios';
import * as moment from 'moment';

import config from './config';

import ChartData from './ChartData';

import './GameOverModal.css';

interface Props {
  finalScore: number;
  startOver: () => void;
}

export default function GameOverModal(props: Props) {
  postScore(props.finalScore);
  return (
    <div className="Modal-background">
      <div className="Modal">
        <h3 className="Modal-heading">Game Over!</h3>
        
        <div className="Modal-content">
          <div className="p40">
            <h4 className="Modal-subheading">Final score: {props.finalScore}</h4>

            <button type="button" className="Modal-btn" onClick={props.startOver}>Start over</button>

            <ChartData />
          </div>
          <figure className="p60">
            <img src="/assets/img/butt-fumble.gif"/>
            <figcaption className="caption">No worries, this gif is not a commentary on your performance.</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

function postScore(score: number): void {
  axios.put(config.path + `/${moment()}.json`, score);
}