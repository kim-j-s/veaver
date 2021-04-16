(function ($) {
    var COLOR = {
        type1: "#fff",
        type2: "#000",
        type3: "#056bff",
        type4: "#0ca6ea",
        type5: "#ffbf00",
        type6: "#ff7300",
        type7: "#c00000",
    };

    $.fn.setChart = function (params) {

        if (this.length != 1) return false;

        var setConfig = function (obj) {
            var config = {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: []
                },
                options: null,
            };

            if (obj.type == 1) {
                config.options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                stepSize: 2,
                            },
                            afterDataLimits(scale) {
                                scale.min -= 2;
                                scale.max += 2;
                            }
                        }],
                    },
                    layout: {
                        // 레이아웃 여백
                        padding: {
                            top: 20,
                            right: 20,
                        }
                    },
                    // 차트 바탕색 정의
                    annotation: {
                        annotations: [
                            // 초과 영역
                            {
                                drawTime: "beforeDatasetsDraw",
                                type: "box",
                                xScaleID: "x-axis-0",
                                yScaleID: "y-axis-0",
                                borderWidth: 0,
                                //초과 영역 - 최대값
                                yMax: obj.cfValue[3],
                                //초과 영역 - 최소값
                                yMin: obj.cfValue[2],
                                backgroundColor: "rgba(215, 42, 43, 0.3)"
                            },
                            // 안정 영역
                            {
                                drawTime: "beforeDatasetsDraw",
                                type: "box",
                                xScaleID: "x-axis-0",
                                yScaleID: "y-axis-0",
                                borderWidth: 0,
                                //안정 영역 - 최대값
                                yMax: obj.cfValue[2],
                                //안정 영역 - 최소값
                                yMin: obj.cfValue[1],
                                backgroundColor: "rgba(246, 149, 26, 0.3)"
                            },
                            // 미달 영역
                            {
                                drawTime: "beforeDatasetsDraw",
                                type: "box",
                                xScaleID: "x-axis-0",
                                yScaleID: "y-axis-0",
                                borderWidth: 0,
                                //미달 영역 - 최대값
                                yMax: obj.cfValue[1],
                                //미달 영역 - 최소값
                                yMin: obj.cfValue[0],
                                backgroundColor: "rgba(146, 204, 85, 0.3)"
                            },
                        ]
                    }
                };

                config.data.datasets.push({
                    type: "line",
                    data: [],
                    fill: false,
                    borderColor: 'rgba(0, 0, 0, 1)',
                    lineTension: 0,
                    borderWidth: 1,
                });

                obj.data.forEach(function (v) {
                    config.data.labels.push(v.date);
                    var n = Number(v.value);

                    config.data.datasets[0].data.push(n);
                });
            } else if (obj.type == 2) {
                config.options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                stepSize: 0.2,
                            },
                            afterDataLimits(scale) {
                                scale.max += 0.2;
                            }
                        }],
                    },
                    layout: {
                        // 레이아웃 여백
                        padding: {
                            top: 20,
                            right: 20,
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 20,
                        },
                    },
                };

                config.data.datasets.push({
                    type: "line",
                    label: "좌",
                    data: [],
                    fill: false,
                    borderColor: 'rgba(91, 155, 213, 0.5)',
                    lineTension: 0,
                    borderWidth: 3,
                    pointBorderWidth: 10,
                    pointHoverBorderWidth: 10,
                    hitRadius: 10,
                    pointBackgroundColor: 'rgba(91, 155, 213, 0.5)',
                });

                config.data.datasets.push({
                    type: "line",
                    label: "우",
                    data: [],
                    fill: false,
                    borderColor: 'rgba(112, 173, 71, 0.5)',
                    lineTension: 0,
                    borderWidth: 3,
                    pointBorderWidth: 10,
                    pointHoverBorderWidth: 10,
                    hitRadius: 10,
                    pointBackgroundColor: 'rgba(112, 173, 71, 0.5)',
                });

                obj.data.forEach(function (v) {
                    config.data.labels.push(v.date);
                    var dataArray = v.value.split('/');
                    dataArray[0] = Number(dataArray[0]);
                    dataArray[1] = Number(dataArray[1]);
                    config.data.datasets[0].data.push(dataArray[0]);
                    config.data.datasets[1].data.push(dataArray[1]);
                });
            } else if (obj.type == 3) {
                config.options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                display: false,
                                beginAtZero: true,
                                stepSize: 1,
                            },
                            // 최대값  + 1
                            afterDataLimits(scale) {
                                scale.max += 1;
                            }
                        }],
                    },
                    layout: {
                        // 레이아웃 여백
                        padding: {
                            top: 20,
                            right: 20,
                        }
                    },
                    tooltips: {
                        enabled: false,
                    },

                    plugins: {
                        datalabels: {
                            align: 'top',
                            font: {
                                size: '12',
                            },
                            borderRadius: 50,
                            padding: {
                                top: 7,
                                right: 7,
                                bottom: 5,
                                left: 7,
                            },
                            // 색상 정의
                            color: function (context) {
                                var index = context.dataIndex;
                                var value = context.dataset.customTooltip[index].textColor;
                                return value ? value : '#ffffff';
                            },
                            //바탕색 정의
                            backgroundColor: function (context) {
                                var index = context.dataIndex;
                                var value = context.dataset.customTooltip[index].bgColor;
                                return value ? value : '#ffffff';
                            },
                            // Label 문구 정의
                            formatter: function (value, context) {
                                var index = context.dataIndex;
                                var value = context.dataset.customTooltip[index].text;
                                return value;
                            },
                        }
                    }
                };

                config.data.datasets.push({
                    type: "line",
                    data: [],
                    customTooltip: [],
                    fill: false,
                    borderColor: 'rgba(0, 0, 0, 1)',
                    lineTension: 0,
                    borderWidth: 1,
                });

                obj.data.forEach(function (v) {
                    config.data.labels.push(v.date);
                    var n = Number(v.value);
                    var cstTooltip = {
                        textColor: COLOR.type1,
                        bgColor: COLOR.type3,
                        text: v.text
                    };

                    if (n > 9) {
                        cstTooltip.bgColor = COLOR.type3;
                    } else if (n > 8) {
                        cstTooltip.bgColor = COLOR.type4;
                    } else if (n > 7) {
                        cstTooltip.textColor = COLOR.type2;
                        cstTooltip.bgColor = COLOR.type5;
                    } else if (n > 6) {
                        cstTooltip.bgColor = COLOR.type6;
                    } else {
                        cstTooltip.bgColor = COLOR.type7;
                    }

                    config.data.datasets[0].data.push(n);
                    config.data.datasets[0].customTooltip.push(cstTooltip);
                });
            }

            return config;
        };

        new Chart(this[0].getContext("2d"), setConfig(params));
    };
}(jQuery));