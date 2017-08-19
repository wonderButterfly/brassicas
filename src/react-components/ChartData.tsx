import * as React from 'react';
import axios from 'axios';
import config from './config';
import Chart from './Chart';

interface Props {

}

interface State {
  loading: boolean | null;
  aggregates: number[];
  intervals: string[];
}

export default class ChartData extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: null,
      aggregates: [],
      intervals: [],
    }
  } 

  render() {
    const { loading, aggregates, intervals } = this.state;
    if (loading === null) return null;
    return loading ? <Chart index={intervals} frequencies={aggregates} /> : null;
  }

  componentDidMount() {
    axios.get(config.frequencyURL).then(({data}) => {
      this.setState({loading: true, aggregates: data.aggregates, intervals: data.intervals});
    }).catch(() => {
      this.setState({loading: false});
    })
  }
}

