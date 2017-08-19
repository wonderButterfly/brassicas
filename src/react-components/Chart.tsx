import * as React from 'react';
import './Chart.css';

interface Props {
  index: string[];
  frequencies: number[];
}
 
export default function Chart({ index, frequencies}: Props) {
  return (
    <div className="Chart">
      <div className="Chart-row Chart-row-above">
        {
          index.map(range => <div className="Chart-cell" key={range}>{range}</div>)
        }
      </div>
      <div className="Chart-row Chart-row-below">
        {
          frequencies.map((freq, i) => <div className="Chart-cell" key={i}>{freq}</div>)
        }
      </div>
    </div>
  )
}