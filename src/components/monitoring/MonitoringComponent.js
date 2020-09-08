import React from 'react'
import SiderComponent from '../sider/SiderComponent'
import SubContainer from '../commons/container/SubContainer'

const MonitoringComponent = props => {
    const { history, location, match } = props

    const main = <div>{match.params.id} </div>
    return <SubContainer leftSider={<SiderComponent />} content={main} />
}

export default MonitoringComponent
