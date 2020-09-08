import React from 'react'
import { Layout, Col, Row, Divider } from 'antd'
import { ApartmentOutlined } from '@ant-design/icons'
import TreeComponent from '../tree/TreeComponent'

const SiderComponent = props => {
    const {} = props

    return (
        <Layout.Sider
            width={320}
            id="ant-content-layout-sider"
            className="ant-content-layout-sider"
            // collapsedWidth="0"
            collapsed={false}
        >
            <Row style={{ height: '35px', alignItems: 'center' }}>
                <Col span={24}>
                    <ApartmentOutlined
                        style={{ marginRight: 8, marginLeft: 8 }}
                    />
                    <span>트리</span>
                </Col>
            </Row>
            <Divider style={{ margin: '5px 0 5px 0' }} />
            <Row style={{ height: '35px', alignItems: 'center' }}>
                <Col span={24}>
                    <TreeComponent />
                </Col>
            </Row>
        </Layout.Sider>
    )
}

export default SiderComponent
