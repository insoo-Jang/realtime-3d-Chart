import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, List } from 'antd'
import SubContainer from '../commons/container/SubContainer'

const data = [
    {
        title: <Link to="/MonitoringComponent/0-0-0-0">0-0-0-0</Link>,
        avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    },
    {
        title: <Link to="/MonitoringComponent/0-0-0-1">0-0-0-1</Link>,
        avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    },
    {
        title: <Link to="/MonitoringComponent/0-0-1-0">0-0-1-0</Link>,
        avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    },
    {
        title: <Link to="/MonitoringComponent/0-0-1-1">0-0-1-1</Link>,
        avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    },
]

const ListComponent = () => {
    const main = (
        <div
            style={{
                overflow: 'auto',
                height: 'calc(100vh - 90px)',
                padding: '16px',
            }}
        >
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
    return <SubContainer content={main} />
}

export default ListComponent
