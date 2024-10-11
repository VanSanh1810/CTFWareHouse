type Props = {
    totalPage: number;
    currentPage: number;
    changePageFunc: (value: number) => void;
};

const Pagination = (props: Props) => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={props.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                    <a className="page-link" href="#" onClick={() => props.changePageFunc(props.currentPage - 1)}>
                        Previous
                    </a>
                </li>
                {props.totalPage < 8 ? (
                    [...Array.from({ length: props.totalPage }, (_, i) => i + 1)].map((i) => (
                        <li key={`page-${i}`} className={i === props.currentPage ? 'page-item disabled' : 'page-item'}>
                            <a className="page-link" href="#" onClick={() => props.changePageFunc(i)}>
                                {i}
                            </a>
                        </li>
                    ))
                ) : (
                    <>
                        <li className={1 === props.currentPage ? 'page-item disabled' : 'page-item'}>
                            <a className="page-link" href="#" onClick={() => props.changePageFunc(1)}>
                                1
                            </a>
                        </li>
                        {props.currentPage - 1 <= 3 ? (
                            <>
                                <li className={2 === props.currentPage ? 'page-item disabled' : 'page-item'}>
                                    <a className="page-link" href="#" onClick={() => props.changePageFunc(2)}>
                                        2
                                    </a>
                                </li>
                                <li className={3 === props.currentPage ? 'page-item disabled' : 'page-item'}>
                                    <a className="page-link" href="#" onClick={() => props.changePageFunc(3)}>
                                        3
                                    </a>
                                </li>
                                <li className={4 === props.currentPage ? 'page-item disabled' : 'page-item'}>
                                    <a className="page-link" href="#" onClick={() => props.changePageFunc(4)}>
                                        4
                                    </a>
                                </li>
                                <li className={5 === props.currentPage ? 'page-item disabled' : 'page-item'}>
                                    <a className="page-link" href="#" onClick={() => props.changePageFunc(5)}>
                                        5
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        ...
                                    </a>
                                </li>
                            </>
                        ) : null}
                        {props.totalPage - props.currentPage <= 3 ? (
                            <>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        ...
                                    </a>
                                </li>
                                <li className={props.totalPage - 4 === props.currentPage ? 'page-item disabled' : 'page-item'}>
                                    <a className="page-link" href="#">
                                        {props.totalPage - 4}
                                    </a>
                                </li>
                                <li className={props.totalPage - 3 === props.currentPage ? 'page-item disabled' : 'page-item'}>
                                    <a className="page-link" href="#">
                                        {props.totalPage - 3}
                                    </a>
                                </li>
                                <li className={props.totalPage - 2 === props.currentPage ? 'page-item disabled' : 'page-item'}>
                                    <a className="page-link" href="#" onClick={() => props.changePageFunc(props.currentPage + 1)}>
                                        {props.totalPage - 2}
                                    </a>
                                </li>
                                <li className={props.totalPage - 1 === props.currentPage ? 'page-item disabled' : 'page-item'}>
                                    <a className="page-link" href="#" onClick={() => props.changePageFunc(props.currentPage + 2)}>
                                        {props.totalPage - 1}
                                    </a>
                                </li>
                            </>
                        ) : null}
                        {props.totalPage - props.currentPage > 3 && props.currentPage - 1 > 3 ? (
                            <>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        ...
                                    </a>
                                </li>
                                <li className={props.currentPage - 1 === props.currentPage ? 'page-item disabled' : 'page-item'}>
                                    <a className="page-link" href="#" onClick={() => props.changePageFunc(props.currentPage - 1)}>
                                        {props.currentPage - 1}
                                    </a>
                                </li>
                                <li className={props.currentPage === props.currentPage ? 'page-item disabled' : 'page-item'}>
                                    <a className="page-link" href="#">
                                        {props.currentPage}
                                    </a>
                                </li>
                                <li className={props.currentPage + 1 === props.currentPage ? 'page-item disabled' : 'page-item'}>
                                    <a className="page-link" href="#" onClick={() => props.changePageFunc(props.currentPage + 1)}>
                                        {props.currentPage + 1}
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        ...
                                    </a>
                                </li>
                            </>
                        ) : null}
                        <li className={props.totalPage === props.currentPage ? 'page-item disabled' : 'page-item'}>
                            <a className="page-link" href="#" onClick={() => props.changePageFunc(props.totalPage)}>
                                {props.totalPage}
                            </a>
                        </li>
                    </>
                )}
                <li className={props.currentPage === props.totalPage ? 'page-item disabled' : 'page-item'}>
                    <a className="page-link" href="#" onClick={() => props.changePageFunc(props.currentPage + 1)}>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
