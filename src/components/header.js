import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import React from "react";
import { useNavigate } from "react-router-dom";

function HeaderComp() {
    const navigate = useNavigate();

    const routeChangeHome = () => {
        navigate("/");
    }

    const routeChangeAuthor = () => {
        navigate("/author");
    }

    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Menu theme="dark" mode="horizontal" >
                <Menu.Item key="1" onClick={routeChangeHome}>Главная</Menu.Item>
                <Menu.Item key="2" onClick={routeChangeAuthor}>Авторы</Menu.Item>
            </Menu>
        </Header>
    )
}

export default HeaderComp;