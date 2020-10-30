import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { Card, Col, Row, Spin, Button } from 'antd'
import axios from 'axios'
import Chart from './Chart'

const fetchData = async param => {
    try {
        const response = await axios.get('/assets/sample/test.json')
        if (response.status === 200 && response.data) {
            return response.data
        }
        return null
    } catch (e) {
        console.error('[ERROR] : 3D-Chart. fetchData()', e)
    }
}

const ChartContainer = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({ prps3D: [] })
    const [defaultData, setDefaultData] = useState([])
    const [play, setPlay] = useState(null)
    const onClick = param => {
        setPlay(param)
    }
    const title = () => {
        return (
            <div>
                <Row justify="space-between">
                    <Col>PRPS(3D)</Col>
                    <Button onClick={() => onClick(true)}>START</Button>
                    <Button onClick={() => onClick(false)}>STOP</Button>
                </Row>
            </div>
        )
    }
    useEffect(() => {
        setLoading(true)
        fetchData()
            .then(response => {
                if (response) {
                    const { value, average, max } = response
                    const timeSeriesData = value.reduce((prev, next) => {
                        prev.push(...next)
                        return prev
                    }, [])
                    const initData = timeSeriesData.slice(0, 6400)
                    const newData = {
                        prps3D: timeSeriesData,
                        max,
                        average,
                        timeLength: !isEmpty(timeSeriesData)
                            ? (timeSeriesData.length - 5120) / 1280
                            : 360,
                        // timeLength: timeSeriesData ? (timeSeriesData.length - 6400) / 128 : 310,
                    }
                    setDefaultData(initData)
                    setData(newData)
                    setLoading(false)
                } else {
                    setDefaultData([])
                    setData([])
                    setLoading(false)
                }
            })
            .catch(error => {
                setLoading(false)
                console.error('[ERROR] : ChartContainer useEffect()', e)
            })
    }, [])

    return (
        <Row justify="center" align="middle" style={{ height: '100%' }}>
            <Col span={8}>
                <Card title={title()} style={{ width: '100%', height: '100%' }}>
                    <Spin spinning={loading}>
                        <Chart
                            data={data}
                            defaultData={defaultData}
                            pd3DPlay={play}
                        />
                    </Spin>
                </Card>
            </Col>
        </Row>
    )
}

export default ChartContainer
