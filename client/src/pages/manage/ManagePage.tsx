import React, { useEffect, useState } from 'react';
import { Button, Col, Container, ListGroup, Modal, Row } from 'react-bootstrap';
import { CardBox } from '../../components/CardBox';
import ManageTabLayout from '../../layouts/ManageTabLayout';
import { useSearchParams } from 'react-router-dom';
import { DataList } from '../../components/DataList';

type Props = {};

const ManagePage = (props: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState<number>(parseInt(searchParams.get('tab') || '1'));

    const renderComponent = () => {
        switch (activeTab) {
            case 1:
                return <CategoryTab />;
            case 2:
                return <TagTab />;
            case 3:
                return <ChallTab />;
            default:
                setActiveTab(1);
                return <CategoryTab />;
        }
    };

    return (
        <Container>
            <Row>
                <Col xs={12} sm={6} md={4} lg={3}>
                    <CardBox>
                        <h4>Setting</h4>
                        <SideNav activeTab={activeTab} setActiveTab={setActiveTab} />
                    </CardBox>
                </Col>
                <Col xs={12} sm={6} md={8} lg={9}>
                    <CardBox>{renderComponent()}</CardBox>
                </Col>
            </Row>
        </Container>
    );
};

export default ManagePage;

interface SideNavProps {
    activeTab: number;
    setActiveTab: (tabIndex: number) => void;
}

const SideNav = (props: SideNavProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <>
            <ListGroup>
                <ListGroup.Item
                    action
                    active={props.activeTab === 1}
                    onClick={() => {
                        searchParams.set('tab', '1');
                        setSearchParams(searchParams);
                        props.setActiveTab(1);
                    }}
                >
                    Category
                </ListGroup.Item>
                <ListGroup.Item
                    action
                    active={props.activeTab === 2}
                    onClick={() => {
                        searchParams.set('tab', '2');
                        setSearchParams(searchParams);
                        props.setActiveTab(2);
                    }}
                >
                    Tag
                </ListGroup.Item>
                <ListGroup.Item
                    action
                    active={props.activeTab === 3}
                    onClick={() => {
                        searchParams.set('tab', '3');
                        setSearchParams(searchParams);
                        props.setActiveTab(3);
                    }}
                >
                    Challenge
                </ListGroup.Item>
            </ListGroup>
        </>
    );
};

const CategoryTab = () => {
    const [modalCreate, setModalCreate] = React.useState<boolean>(false);

    return (
        <ManageTabLayout title="Category" createNewFunc={() => setModalCreate(true)}>
            <h2>123</h2>
            <DataList
                listHeader={['a', 'b', 'c']}
                listKey={['a', 'b', 'c']}
                datas={[
                    { a: 1, b: 2, c: 3 },
                    { a: 1, b: 2, c: 3 },
                ]}
            />
            {/*  */}
            <Modal
                show={modalCreate}
                onHide={() => setModalCreate(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                        quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalCreate(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </ManageTabLayout>
    );
};

const TagTab = () => {
    return (
        <ManageTabLayout title="Tag" createNewFunc={() => console.log('oke')}>
            <h2>123</h2>
        </ManageTabLayout>
    );
};

const ChallTab = () => {
    return (
        <ManageTabLayout title="Chall" createNewFunc={() => console.log('oke')}>
            <h2>123</h2>
        </ManageTabLayout>
    );
};
