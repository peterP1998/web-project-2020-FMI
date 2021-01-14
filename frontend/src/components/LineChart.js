import React, { Component } from "react";
import { Chart } from "chart.js";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.labels;
    this.myChart.data.datasets = this.props.data.datasets;
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: "line",
      options: {
        title: {
          display: true,
          text: "Заетост на етажите по часове",
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100,
              },
            },
          ],
        },
      },

      data: {
        labels: this.props.data.labels,
        datasets: this.props.data.datasets,
      },
    });
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}
export default LineChart;
