import React from 'react';
import Chart from 'chart.js';

export default class LineChart extends React.Component {

    static defaultProps = {
        height: 200,
        width: 800,
        data: []
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.renderChart();
    }

    componentDidUpdate() {
        this.updateChart();
    }
    
    updateChart() {
        const data = this.props.data;
        let chartInst = this.chartInst;
        chartInst.data.datasets.forEach((dataset) => {
            dataset.data = data.slice(Math.max(data.length - 12, 0));
        });
        this.chartInst.update();
    }

    renderChart() {
        const node = this.element;
        this.chartInst = new Chart(node, {
            type: 'line',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "Monthly Active Users",
                    fill: false,
                    backgroundColor: '#e9242b',
                    borderColor: '#e9242b',
                    data: this.props.data,
                }]
            },
            options: {}
        });
    }

    ref = (element) => {
        this.element = element
    }

    render() {
        const {height, width} = this.props;
        return (
            <canvas ref={this.ref} width={width} height={height}></canvas>
        );
    }
}