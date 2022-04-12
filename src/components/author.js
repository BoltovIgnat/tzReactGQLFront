import { useMutation } from "@apollo/client";
import { Breadcrumb, Button, Input, Layout, Modal } from "antd";
import { Content, Footer } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADD_AUTHOR } from "../server/mutation";
import HeaderComp from "./header";

function AuthorsPage() {
    const [visible, setVisible] = useState(false);
    const [valueFio, setValueFio] = useState([]);
    const [valueYearLife, setValueYearLife] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let authors = useSelector(store => store.author.authors)
    const [addAuthor] = useMutation(ADD_AUTHOR, {
        onCompleted: () => {
            dispatch({ type: "GET_ALL_AUTHORS" })
        }
    })

    function Add() {
        setVisible(false)
        addAuthor({
            variables: {
                fio: valueFio,
                yearLife: valueYearLife,
            }
        });
    }

    useEffect(() => {
        dispatch({
            type: "GET_ALL_AUTHORS"
        });
    }, []);

    const routeChange = (id) => {
        dispatch({ type: 'ID_AUTHOR', payload: id })
        navigate("/author-about");
    }

    const allAuthor = authors.map(({ id, fio, yearLife }) => {
        return (
            <div>
                <a onClick={() => routeChange(id)} className="link">{fio} ({yearLife})</a>
            </div>
        )
    })

    return (
        <>
            <Layout>
                <HeaderComp />
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Авторы</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: '82vh' }}>
                        {allAuthor}
                        <Button onClick={() => setVisible(true)}
                            style={{ marginTop: "20px" }}
                            block>
                            Добавить автора
                        </Button>
                        <Modal
                            visible={visible}
                            onOk={Add}
                            onCancel={() => setVisible(false)}
                        >
                            <Input
                                placeholder="Фамилия Имя Отчество"
                                value={valueFio}
                                onChange={(e) => setValueFio(e.target.value)}
                                style={{ marginTop: "15px" }} />
                            <Input
                                placeholder="Годы жизни"
                                value={valueYearLife}
                                onChange={(e) => setValueYearLife(e.target.value)}
                                style={{ marginTop: "10px" }} />
                        </Modal>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
        </>
    )
}

export default AuthorsPage;