import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { Badge, Button, Col, Container, Dropdown, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import { CardBox } from '../../components/CardBox';
import { Pagination } from '../../components/Pagination';
import { ChallCard } from '../../components/ChallCard';
import { AppContext, AppContextType } from '../../contexts/app/AppContext';
import { Link, useSearchParams } from 'react-router-dom';
import axiosInstance from '../../services/Axios';

const ChallPage = () => {
    return (
        <Container className="pt-2">
            <Row>
                <Col lg={3} md={5} sm={12} className="mb-3">
                    <SearchFillter />
                </Col>
                <Col lg={9} md={7} sm={12}>
                    <ChallList />
                </Col>
            </Row>
        </Container>
    );
};

export default ChallPage;

type SearchFillterProps = {};

const SearchFillter = (props: SearchFillterProps) => {
    // useSearchParams hook
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedCate, setSelectedCate] = useState();

    // Lấy giá trị của tham số 'paramName'

    return (
        <>
            <CardBox>
                <Form.Check // prettier-ignore
                    type="checkbox"
                    id="hideshow-switch"
                    label="Hide Solved"
                    style={{ userSelect: 'none', fontWeight: 'bold' }}
                    onChange={(e) => {
                        searchParams.set('hidesolve', e.currentTarget.checked ? '1' : '0');
                        setSearchParams(searchParams);
                    }}
                />
                <Form.Check // prettier-ignore
                    type="checkbox"
                    id="showbookmarked-switch"
                    label="Show Bookmarked"
                    style={{ userSelect: 'none', fontWeight: 'bold' }}
                    onChange={(e) => {
                        searchParams.set('bookmark', e.currentTarget.checked ? '1' : '0');
                        setSearchParams(searchParams);
                    }}
                    defaultValue={searchParams.get('bookmark') ?? 1}
                />
                <h4 className="mt-4" style={{ userSelect: 'none' }}>
                    Category
                </h4>
                <ListGroup style={{ zIndex: -10 }}>
                    <ListGroup.Item
                        action
                        onClick={(e) => {
                            searchParams.set('bookmark', e.currentTarget.checked ? '1' : '0');
                            setSearchParams(searchParams);
                        }}
                        active
                    >
                        All Category
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={() => {}}>
                        Web Exploitation
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={() => {}}>
                        Cryptography
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={() => {}}>
                        Reverse Engineering
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={() => {}}>
                        Forensics
                    </ListGroup.Item>
                </ListGroup>
                {/* <h4 className="mt-4" style={{ userSelect: 'none' }}>
                    Sub catagory
                </h4> */}
                {/* <div style={{ border: '1px solid black', paddingLeft: '1rem' }}>
                    <Form.Check type="radio" id="custom-switch" label="Check this switch" />
                </div> */}
            </CardBox>
        </>
    );
};

const ChallList = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const queryPage = parseInt(searchParams.get('page') || '1');
    const queryCategory = searchParams.get('category');
    const queryHideSolve = searchParams.get('hidesolve');
    const queryBookmark = searchParams.get('bookmark');

    const [challList, setChallList] = React.useState([]);

    useEffect(() => {
        alert([queryPage, queryCategory, queryHideSolve, queryBookmark]);
    }, [queryPage, queryCategory, queryHideSolve, queryBookmark]);

    const changePage = (value: number) => {
        const newPageNum = queryPage + value;
        console.log(newPageNum);
        if (newPageNum > 0) {
            searchParams.set('page', newPageNum.toString());
            setSearchParams(searchParams);
        }
    };

    return (
        <Container fluid>
            <Row className="d-flex justify-content-center align-item-center">
                <Pagination changePageFunc={changePage} currentPage={queryPage} />
            </Row>
            <Row>
                <Col xl={4} md={4} sm={6} className="mb-4">
                    <ChallCard challId="123" />
                </Col>
            </Row>
            <Row className="d-flex justify-content-center align-item-center">
                <Pagination changePageFunc={changePage} currentPage={queryPage} />
            </Row>
            {/* ------------------------------------MODAL---------------------------------------- */}
            <ChallModal />
        </Container>
    );
};

const ChallModal = () => {
    const { closeModal, currentChallModal } = React.useContext(AppContext) as AppContextType;

    const [isBookmarked, setIsBookmarked] = React.useState<boolean>(false);

    return (
        <Modal show={!!currentChallModal?.challId} onHide={closeModal} backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ color: '#a5a5a5' }}>{currentChallModal?.category}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="chall-modal-body">
                    <div className="tag-list">
                        <Badge bg="primary">Primary</Badge>
                        <Badge bg="primary">Primary</Badge>
                        <Badge bg="primary">Primary</Badge>
                        <Badge bg="primary">Primary</Badge>
                        <Badge bg="primary">Primary</Badge>
                        <Badge bg="primary">Primary</Badge>
                    </div>
                    <div className="title">
                        <h1>{currentChallModal?.title}</h1>
                        <Button variant="outline-warning" onClick={() => setIsBookmarked((isBM: boolean) => !isBM)}>
                            {isBookmarked ? <i className="fa-solid fa-bookmark"></i> : <i className="fa-regular fa-bookmark"></i>}
                        </Button>
                    </div>
                    <div className="desc">
                        <h3>Description</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quisquam, expedita excepturi ab illo quo
                            eaque ullam consequuntur delectus esse, aperiam eum labore tempore voluptatem in non itaque iste
                            exercitationem.
                        </p>
                    </div>
                    <h5>Credit: PicoCTF</h5>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
