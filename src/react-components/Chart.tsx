import * as React from 'react';
import './Chart.css';

interface Props {
  index: string[];
  frequencies: number[];
  selectDate(date: string): void;
  score: number;
  selectedDate: string;
}

interface Label {
  label: string;
  select: string;
}

const labels: Label[] = [
  {label:'all', select:'all'},
  {label: 'past year', select: 'year'},
  {label: 'past month', select: 'month'}
];
 
export default function Chart({ index, frequencies, score, selectDate, selectedDate }: Props) {
  function AnchorTags({label, select}: Label) {
    const className = select === selectedDate ? 'Chart-link Chart-link-selected' : 'Chart-link';
    return <a key={label} onClick={() => {selectDate(select)}} className={className}>{label}</a>
  }

  function findRange(score: number): number {
    let i: number;
    for (i = 0; i < index.length - 1; i++) {
      const [a, b] = index[i].split('-')
      if (score >= +a && score <= +b) break;
    }
    return i;
  } 

  const currentRange = findRange(score);

  return (
    <div className="Chart">
      <h6 className="Chart-menu">
        View data from: {labels.map(AnchorTags)} 
      </h6>
      <div className="Chart-row Chart-row-above">
        {
          index.map((range, i) => <div className={i !== currentRange ? 'Chart-cell' : 'Chart-cell Chart-cell-highlight'} key={range}>{range}</div>)
        }
      </div>
      <div className="Chart-row Chart-row-below">
        {
          frequencies.map((freq, i) => <div className={i !== currentRange ? 'Chart-cell' : 'Chart-cell Chart-cell-highlight'} key={i}>{freq}</div>)
        }
      </div>
    </div>
  )
}
