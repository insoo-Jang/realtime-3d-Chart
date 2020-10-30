import React, { useEffect, useRef } from 'react'
import { Col, Row } from 'antd'

import * as echarts from 'echarts'
import * as echartGL from 'echarts-gl'

import i18n from 'i18next'

const convertDBm = param => {
    const dBm = (param * 55) / 255 - 55
    return dBm.toFixed(0)
}

const keyValue = (i = 1) => {
    const result = []
    for (let j = i; j < 50 + i; j++) {
        result.push(j)
    }
    return result
}

const timeValue = (param = 311) => {
    const result = []
    for (let j = 0; j < param; j++) {
        result.push(j)
    }
    return result
}

const phaseValue = () => {
    const result = []
    for (let j = 0; j < 128; j++) {
        result.push(j)
    }
    return result
}
const Chart = props => {
    const { data = {}, defaultData = [], minMaxValue = {}, pd3DPlay } = props
    let chartInstance = null
    let timeLineChartInstance = null
    const chartRef = useRef(null)
    const timeLineRef = useRef(null)
    const getTimeLineOption = () => {
        return {
            baseOption: {
                timeline: {
                    currentIndex: 0,
                    axisType: 'value',
                    autoPlay: false,
                    playInterval: 1000 / 80,
                    data: timeValue(data.timeLength),
                    loop: true,
                    symbol: 'none',
                    label: {
                        // show: false,
                        formatter: type =>
                            Number.isInteger(type / 36) ? type / 36 : null,
                    },
                    controlStyle: {
                        itemSize: 22,
                        showPlayBtn: false,
                        showPrevBtn: true,
                        showNextBtn: true,
                    },
                },
            },
        }
    }
    const getChartInstance = instance => {
        if (instance) {
            return echarts.getInstanceByDom(instance) || echarts.init(instance)
        }
    }
    const getOption = (dataParam = [], data2param = {}) => {
        const { max = 0, average = 0 } = data2param
        return {
            title: {
                subtext: `${i18n.t('chart.maximum-discharge', {
                    arg: max,
                })} / ${i18n.t('chart.average-discharge', { arg: average })}`,
                top: 0,
                left: 10,
            },
            visualMap: {
                show: true,
                dimension: 2,
                calculable: true,
                textStyle: {
                    color: '#96a6bd',
                },
                min: 0,
                // max: 50,
                //max default : 255
                max: 255,
                inRange: {
                    color: [
                        '#1515f9',
                        '#30fae7',
                        '#fff838',
                        '#fda043',
                        '#ff3432',
                    ],
                },
                formatter: type => convertDBm(type),
            },
            grid3D: {
                viewControl: {
                    distance: 243,
                    alpha: 10,
                    // autoRotate:true,
                    // beta: 25,
                },
                right: 20,
                left: 60,
                bottom: 10,
                top: 5,

                boxDepth: 150,
            },
            xAxis3D: {
                name: 'Phase',
                nameLocation: 'center',
                nameTextStyle: {
                    fontSize: 12,
                },
                min: 0,
                max: 127,
                type: 'value',
                // boundaryGap: false,
                splitLine: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: '#414d5e',
                    },
                },
                axisTick: {
                    show: false,
                },
                interval: 31.75,
                axisLabel: {
                    // textStyle: {
                    //     color: '#414d5e',
                    // },
                    color: '#96a6bd',
                    formatter: type => {
                        switch (type) {
                            case 0:
                                return 0
                            case 31.75:
                                return 90
                            case 63.5:
                                return 180
                            case 95.25:
                                return 270
                            case 127:
                                return 360
                            default:
                                return null
                        }
                    },
                },
                data: phaseValue(),
                axisPointer: {
                    show: false,
                },
            },
            yAxis3D: {
                show: false,
                type: 'time',
                name: '　',
                boundaryGap: false,
                data: keyValue(),
                nameTextStyle: {
                    color: '#96a6bd',
                    fontSize: 12,
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: '#414d5e',
                    },
                },
                axisLabel: {
                    show: false,
                },
                axisPointer: {
                    show: false,
                },
            },
            zAxis3D: {
                name: 'dBm',
                nameLocation: 'end',
                nameTextStyle: {
                    fontSize: 12,
                },
                min: 0,
                max: 255,
                nameGap: 18,
                boundaryGap: false,
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: '#414d5e',
                    },
                },
                axisLabel: {
                    color: '#96a6bd',
                    // textStyle: {
                    //     color: '#414d5e',
                    // },
                    // margin: 5,
                    formatter: type => {
                        switch (type) {
                            case 0:
                                return -55
                            case 63.75:
                                return -41
                            case 127.5:
                                return -27
                            case 191.25:
                                return -13
                            case 255:
                                return 0
                            default:
                                return type
                        }
                    },
                },
                axisPointer: {
                    show: false,
                },
                interval: 63.75,
            },
            series: [
                {
                    wireframe: {
                        show: false,
                    },
                    emphasis: {
                        label: {
                            formatter: type => convertDBm(type.data[2]),
                        },
                    },
                    shading: 'color',
                    type: 'bar3D',
                    data: dataParam || [],
                },
            ],
        }
    }

    useEffect(() => {
        const chart = getChartInstance(chartRef.current)
        const timeLineChart = getChartInstance(timeLineRef.current)
        chart.setOption(getOption(defaultData, data))
        timeLineChart.setOption(getTimeLineOption())
        timeLineChart.on('timelinechanged', params => {
            // const startIndex = 128 * params.currentIndex * 10
            const startIndex = 128 * params.currentIndex

            const endIndex = 6400 + startIndex
            const prps3DData = data.prps3D.slice(startIndex, endIndex)
            chart.setOption(getOption(prps3DData, data))
        })
    }, [defaultData, data])
    useEffect(() => {
        if (pd3DPlay !== null) {
            const timeLineChart = getChartInstance(timeLineRef.current)

            timeLineChart.dispatchAction({
                type: 'timelinePlayChange',
                playState: pd3DPlay,
            })
        }
    }, [pd3DPlay])
    return (
        <div>
            <Row justify="center" align="top">
                <Col span={24}>
                    <div
                        id="main"
                        style={{ width: '100%', height: '500px' }}
                        ref={chartRef}
                    />
                </Col>
            </Row>
            <Row justify="center" align="top">
                <Col span={24}>
                    <div
                        id="timeline"
                        style={{ width: '100%', height: '50px' }}
                        ref={timeLineRef}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Chart
