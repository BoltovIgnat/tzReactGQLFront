import { Card, Empty } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, useNavigate } from "react-router-dom";

function CardBook() {
    let books = useSelector(store => store.books.books)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({
            type: 'GET_ALL_BOOKS',
        })
    }, []);

    const routeChange = (id) => {
        dispatch({ type: 'ID_BOOK', payload: id})
        navigate("/about");
    }

    let content = <></>
    if (books !== undefined) {
        content = books.map(({ id, title, description, author }) => {
            return <>
                <Card style={{ width: "100%", marginTop: "20px" }}>
                    <h4>{author.fio}</h4>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <a onClick={() => routeChange(id)}>Подробнее</a>
                </Card>
            </>
        })
    } else {
        content = <Empty />
    }

    return (
        <>
            {content}
        </>
    )
}

export default CardBook;