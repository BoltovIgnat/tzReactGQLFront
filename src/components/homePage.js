import { useMutation } from "@apollo/client";
import { Button, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADD_BOOK } from "../server/mutation";
import CardBook from "./card";

function HomePage() {
    const [visible, setVisible] = useState(false);
    const [valueTitle, setValueTitle] = useState([]);
    const [valueDescription, setValueDescription] = useState([]);
    const [value, setValue] = useState('');
    const { Search } = Input;
    const [addBook] = useMutation(ADD_BOOK, {
        onCompleted: () => {
            dispatch({ type: "GET_ALL_BOOKS" })
        }
    })
    const authors = useSelector(store => store.author.authors);
    let books = useSelector(store => store.books.books)
    const { Option } = Select;
    const dispatch = useDispatch();

    function Add() {
        setVisible(false)
        addBook({
            variables: {
                title: valueTitle,
                description: valueDescription,
                authorId: valueAuthor,
            }
        });
    }

    let valueAuthor;

    function SelectAuthor() {
        return (
            <Select placeholder="Выберите автора" style={{ width: '100%', marginTop: "10px" }} onChange={handleChangeAuthor}>
                {allAuthor}
            </Select>
        )
    }

    function onClickSearch(event) {
        if(value==""){
            dispatch({ type: "GET_ALL_BOOKS" })
        }else{
            dispatch({ type: "GET_BOOKS_BY_NAME", payload: value })
        }
        
    }
    function onChangeSearch(event) {
        setValue(event.target.value)
    }
    
    const allAuthor = authors.map(({ id, fio, yearLife }) => {
        return (
            <Option value={id} key={id}>
                {fio} ({yearLife})
            </Option>
        )
    })

    function handleChangeAuthor(value) {
        valueAuthor = value
    }

    useEffect(() => {
        dispatch({
            type: "GET_ALL_AUTHORS"
        });
    }, []);

    return (
        <>
            <Search
                placeholder="Поиск..."
                allowClear
                enterButton="Поиск"
                size="large"
                onChange={(event) => onChangeSearch(event)}
                onSearch={(event) => onClickSearch(event)}
                
            />
            <CardBook />
            <Button
                onClick={() => setVisible(true)}
                style={{ marginTop: "20px" }}
                block>
                Добавить книгу
            </Button>
            <Modal
                visible={visible}
                onOk={Add}
                onCancel={() => setVisible(false)}
            >
                <Input
                    placeholder="Название книги"
                    onChange={(e) => setValueTitle(e.target.value)}
                    value={valueTitle}
                    style={{ marginTop: "15px" }} />
                <Input
                    placeholder="Описание книги"
                    value={valueDescription}
                    onChange={(e) => setValueDescription(e.target.value)}
                    style={{ marginTop: "10px" }} />
                <SelectAuthor />
            </Modal>
        </>
    )
}

export default HomePage;