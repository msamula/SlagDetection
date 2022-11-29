import Chart from 'chart.js/auto';
//import annotationPlugin from 'chartjs-plugin-annotation';

export let slagChart, totalSlagChart, timeChart;

export function createChart(){
    const ctx = document.getElementById('slagChart');
    const ctx2 = document.getElementById('slagChart2');
    const ctx3 = document.getElementById('timeChart');

    //Chart.register(annotationPlugin);

    slagChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red'],
            datasets: [{
                label: 'Slag',
                data: [],
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
/*            plugins: {
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
            }*/
        }
    });

    totalSlagChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Red'],
            datasets: [{
                label: 'Slag',
                data: [],
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
        }
    });

    timeChart = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: [''],
            datasets: [{
                label: 'Slag',
                data: [],
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
            }
        }
    });

    for (let i = 0; i < 100; i++) {
        addData(timeChart, '', 0);
    }
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


export function updateTimeChart(data){
    let date = new Date();

    //add data
    timeChart.data.labels.push(`${(date.getMinutes()<10?'0':'') + date.getMinutes()}:${(date.getSeconds()<10?'0':'') + date.getSeconds()}`);
    timeChart.data.datasets[0].data.push(data);


    //remove data
    if(timeChart.data.labels.length > 100){
        timeChart.data.labels.shift();
        timeChart.data.datasets[0].data.shift();
    }

    timeChart.update('none');
}