import React from "react";
import { Link } from "react-router-dom";
import { Layout, Typography } from "antd";

const { Header } = Layout;
const { Title } = Typography;


export const AppHeader = () => {

    return (
        <Header className="app-header">
            <div className="app-header__logo-search-section">
                <div className="app-header__logo">
                    <Link to="/">
                        <Title level={4}>Anime News</Title>
                    </Link>
                </div>
                <div className="app-header__search-input">

                </div>
            </div>
            <div className="app-header__menu-section">
                
            </div>
        </Header>
    );
}