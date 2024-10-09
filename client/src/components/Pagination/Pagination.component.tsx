import React from 'react';
import { Button } from '../Button';

type Props = {
    totalPage: number;
    currentPage: number;
    changePageFunc: (value: number) => void;
};

const Pagination = (props: Props) => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <a className="page-link" href="#" onClick={() => props.changePageFunc(props.currentPage - 1)}>
                        Previous
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">
                        1
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">
                        2
                    </a>
                </li>
                <li className="page-item disabled">
                    <a className="page-link" href="#">
                        ...
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#" onClick={() => props.changePageFunc(props.totalPage - 1)}>
                        {props.totalPage - 1}
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#" onClick={() => props.changePageFunc(props.totalPage)}>
                        {props.totalPage}
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#" onClick={() => props.changePageFunc(props.currentPage + 1)}>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
