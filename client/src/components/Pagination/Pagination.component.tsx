import React from 'react';
import { Button } from '../Button';

type Props = {
    currentPage: number;
    changePageFunc: (value: number) => void;
};

const Pagination = (props: Props) => {
    return (
        <div className="pagination cardbox">
            <Button type="icon">
                <i className="fa-solid fa-less-than"></i>
                <i className="fa-solid fa-less-than"></i>
            </Button>
            <Button onClickFunc={() => props.changePageFunc(-1)} type="icon">
                <i className="fa-solid fa-less-than"></i>
            </Button>
            <button className="pagination-btn selected">1</button>
            <button className="pagination-btn">1</button>
            <button className="pagination-btn">1</button>
            ...
            <button className="pagination-btn selected">1</button>
            <Button onClickFunc={() => props.changePageFunc(1)} type="icon">
                <i className="fa-solid fa-greater-than"></i>
            </Button>
            <Button type="icon">
                <i className="fa-solid fa-greater-than"></i>
                <i className="fa-solid fa-greater-than"></i>
            </Button>
        </div>
    );
};

export default Pagination;
