import React, { useContext } from 'react'
import { Col, Row, Tree } from 'antd'
import Context from '../commons/container/Context'

const treeData = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    {
                        title: '0-0-0-0',
                        key: '0-0-0-0',
                    },
                    {
                        title: '0-0-0-1',
                        key: '0-0-0-1',
                    },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    {
                        title: '0-0-1-0',
                        key: '0-0-1-0',
                    },
                    {
                        title: '0-0-1-1',
                        key: '0-0-1-1',
                    },
                ],
            },
        ],
    },
]

const treeComponent = props => {
    const { onSelect = () => {} } = props

    const { onSelectResource } = useContext(Context)

    const onSelectTree = param => {
        if (param.length === 0) {
            return
        }
        onSelectResource(param)
    }
    return (
        <Row justify="left" align="middle">
            <Col span={12}>
                <Tree
                    onSelect={onSelectTree}
                    defaultExpandAll
                    defaultExpandedKeys={['0-0']}
                    treeData={treeData}
                />
            </Col>
        </Row>
    )
}

export default treeComponent
