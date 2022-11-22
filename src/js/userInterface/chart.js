import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

export let slag, totalSlag;

export function createChart(wert, wert2){
    const ctx = document.getElementById('slagChart');
    const ctx2 = document.getElementById('slagChart2');

    Chart.register(annotationPlugin);

    slag = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red'],
            datasets: [{
                label: 'Slag',
                data: [wert],
                borderWidth: 1,
                backgroundColor: '#FF0000',
                color: '#FFF'
            }]
        },
        options: {
            scales: {
                y: {
                    max: 100,
                    min: 0,
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                annotation: {
                    annotations: [{
                        type: 'line',
                        yMin: 50,
                        yMax: 50,
                        xMax: 1,
                        scaleID: 'y-axis-0',
                        borderColor: 'rgb(255, 0, 0)',
                        borderWidth: 1
                    }]
                }
            }
        }
    });

    totalSlag = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Red'],
            datasets: [{
                label: 'Slag',
                data: [wert2],
                borderWidth: 1,
                backgroundColor: '#FF0000',
                color: '#FFF'
            }]
        },
        options: {
            scales: {
                y: {
                    max: 100,
                    min: 0,
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                annotation: {
                    annotations: [{
                        type: 'line',
                        yMin: 50,
                        yMax: 50,
                        xMax: 1,
                        scaleID: 'y-axis-0',
                        borderColor: 'rgb(255, 0, 0)',
                        borderWidth: 1
                    }]
                }
            }
        }
    });
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update('none');
}

export function updateChart(chart, label, data){
    removeData(chart);
    addData(chart, label, data);
}
