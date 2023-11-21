export const areaChartData = {

    series: [{
        name: 'BTC',
        data: [50, 45, 50, 45, 50, 45, 20, 45, 50],
        color: "#3A57E8",
    }, {
        name: 'ETH',
        data: [0, 38, 43, 32, 46, 31, 38, 35, 20],
        color: "#85C5FA"
    },
        //  {
        //     name: 'LTC',
        //     data: [20, 15, 10, 15, 20, 35, 10, 25, 5],
        //     color: "#85C5FA"
        // }, {
        //     name: 'USDT',
        //     data: [0, 25, 33, 36, 15, 25, 45, 10, 15],
        //     color: "#85C5FA"
        // }, {
        //     name: 'USDC',
        //     data: [25, 32, 44, 37, 43, 33, 31, 32, 44],
        //     color: "#85C5FA"
        // }
    ],
    options: {
        legend: {
            show: false,
            position: 'top',
        },
        grid: {
            show: false,      // you can either change hear to disable all grids
            yaxis: {
                lines: {
                    show: false  //or just here to disable only x axis grids
                }
            },
            xaxis: {
                lines: {
                    show: false  //or just here to disable only x axis grids
                }
            }
        },
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'butt',
            colors: undefined,
            width: 1,
            dashArray: 0,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "vertical",
                shadeIntensity: 0.2,
                gradientToColors: '#3A57E8', // optional, if not defined - uses the shades of same color in series
                inverseColors: false,
                opacityFrom: 0.4,
                opacityTo: 0,
                stops: [0, 25],
                colorStops: []
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                format: "MMM"
            },
            categories: ["2017-12-19T00:00:00.000Z", "2018-01-19T00:00:00.000Z", "2018-02-19T01:30:00.000Z", "2018-03-19T02:30:00.000Z", "2018-04-19T03:30:00.000Z", "2018-05-19T04:30:00.000Z", "2018-06-19T05:30:00.000Z", "2018-07-19T06:30:00.000Z", "2018-08-19T06:30:00.000Z"]
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    },
};

export const blueAreaGraphFR = {
    stroke: {
        width: 2
    },
    chart: {
        height: 280,
        type: "area",
        toolbar: {
            show: false
        },
    },
    grid: {
        show: false,      // you can either change hear to disable all grids
        yaxis: {
            lines: {
                show: false  //or just here to disable only x axis grids
            }
        },
        xaxis: {
            lines: {
                show: false  //or just here to disable only x axis grids
            }
        },
    },
    dataLabels: {
        enabled: false,
    },
    series: [
        {
            name: "Series 1",
            data: [45, 0, 40, 25, 50],
            color: "#3A57E8"
        },
    ],
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
        },
    },
    yaxis: {
        show: false
    },
    xaxis: {
        labels: {
            show: false
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false,
        },
        show: false,
        categories: [
            "01 Jan",
            "02 Jan",
            "03 Jan",
            "04 Jan",
            "05 Jan",
            "06 Jan",
            "07 Jan",
        ],
    },
}