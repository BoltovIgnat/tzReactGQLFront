import { useMutation } from "@apollo/client";
import { Breadcrumb, Button, Layout, message } from "antd";
import { Content, Footer } from "antd/lib/layout/layout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_AUTHOR } from "../server/mutation";
import HeaderComp from "./header";

function AboutAuthor() {
    let authors = useSelector(store => store.author.author)
    const navigate = useNavigate();
    let idAuthor = useSelector(store => store.author.detailAuthorId)
    const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
        onCompleted: () => {
            navigate("/")
        }
    })
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'GET_ONE_AUTHOR',
            payload: idAuthor
        })
    }, []);

    return (
        <>
            <Layout>
                <HeaderComp />
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Авторы</Breadcrumb.Item>
                        <Breadcrumb.Item>{authors.fio}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: '82vh' }}>
                        <h3>{authors.fio} ({authors.yearLife})</h3>
                        <Button onClick={e => {
                            e.preventDefault();
                            deleteAuthor({ variables: { id: idAuthor } });
                            message.error('Автор удален')
                        }} block>
                            Удалить автора
                        </Button>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
        </>
    )
}

export default AboutAuthor;