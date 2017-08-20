import * as React from 'react';
import axios, { AxiosPromise } from 'axios';
import config from './config';
import Chart from './Chart';

interface Props {
  score: number;
  postScore: (score: number) => void;
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

    this.props.postScore(this.props.score);

    this.state = {
      loading: null,
      aggregates: [],
      intervals: [],
      selectedDate: 'all'
    };
    this.selectDate = this.selectDate.bind(this);
  }

  selectDate(date: string) {
    this.handleData(axios.get(config.frequencyURL(date)));
    this.setState({ selectedDate: date });
  }

  render() {
    const { loading, aggregates, intervals, selectedDate } = this.state;
    if (loading === null) return <img src="/assets/img/loading.svg" />;
    return loading 
      ? (
        <Chart 
          index={intervals} 
          frequencies={aggregates} 
          selectDate={this.selectDate} 
          selectedDate={selectedDate} 
          score={this.props.score} 
        />
      ) 
      : null;
  }

  componentDidMount() {
    this.handleData(axios.get(config.frequencyURL()));
  }

  private handleData(promise: AxiosPromise) {
    promise.then(({data}) => {
      this.setState({loading: true, aggregates: data.aggregates, intervals: data.intervals});
    }).catch(() => {
      this.setState({loading: false});
    });
  }
}