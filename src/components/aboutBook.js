import { useMutation } from "@apollo/client";
import { Breadcrumb, Button, Empty, message } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_BOOK } from "../server/mutation";

function AboutBook() {
    let books = useSelector(store => store.books.book)
    const navigate = useNavigate();
    let idBook = useSelector(store => store.books.detailBookId)
    const [deleteBook] = useMutation(DELETE_BOOK, {
        onCompleted: () => {
            navigate("/")
        }
    })
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'GET_ONE_BOOK',
            payload: idBook
        })
    }, []);

    let content = <></>
    if (books.length !== 0) {
        content = <>
            <h3>{books.author.fio} ({books.author.yearLife})</h3>
            <h1>{books.title}</h1>
            <p>{books.description}</p>
            <Button onClick={e => {
                e.preventDefault();
                deleteBook({ variables: { id: idBook } });
                message.error('Книга удалена')
            }}>
                Удалить
            </Button>
        </>
    } else {
        content = <Empty />
    }


    return (
        <>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Главная</Breadcrumb.Item>
                    <Breadcrumb.Item>{books.title}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: '82vh' }}>
                    {content}
                </div>
            </Content>

        </>
    )
}

export default AboutBook;