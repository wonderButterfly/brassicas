import * as React from 'react';
import axios from 'axios';
import config from './config';
import Chart from './Chart';

interface Props {
  score: number;
}

interface State {
  loading: boolean | null;
  aggregates: number[];
  intervals: string[];
  selectedDate: string;
}

export default class ChartData extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: null,
      aggregates: [],
      intervals: [],
      selectedDate: 'all'
    };
    this.selectDate = this.selectDate.bind(this);
  }

  private handleData(promise: Promise<any>) {
    promise.then(({data}) => {
      this.setState({loading: true, aggregates: data.aggregates, intervals: data.intervals});
    }).catch(() => {
      this.setState({loading: false})
    });
  }
  
  selectDate(date: string) {
    this.handleData(axios.get(config.frequencyURL(date)))
    this.setState({ selectedDate: date })
  }

  render() {
    const { loading, aggregates, intervals, selectedDate } = this.state;
    if (loading === null) return null;
    return loading ? <Chart index={intervals} frequencies={aggregates} selectDate={this.selectDate} selectedDate={selectedDate} score={this.props.score} /> : null;
  }

  componentDidMount() {
    this.handleData(axios.get(config.frequencyURL()))
  }
}

