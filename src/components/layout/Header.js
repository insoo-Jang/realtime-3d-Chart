import React from 'react'

import { AccountInfo } from '../../containers/authentication'
import { MainMenu } from '../menu'

const Header = ({ routes }) => {
    // const logoStyle = {
    //     cursor: 'pointer',
    //     float: 'left',
    //     lineHeight: '60px',
    //     margin: '0 35px 0 16px',
    //     width: '60px',
    //     height: '60px',
    // };
    const itemStyle = {
        display: 'flex',
        float: 'right',
        marginRight: '0px',
        width: 'unset',
    }
    return (
        <React.Fragment>
            <div className="ant-layout-navbar">
                <div tabIndex="-1" className="ant-layout-navbar-logo">
                    <div className="ant-layout-navbar-logo-img">
                        <img src="/images/NKIA_logo_1_.png" alt="" />
                    </div>
                </div>
                <MainMenu routes={routes} />
                <div className="ant-layout-navbar-item" style={itemStyle}>
                    <AccountInfo />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header
