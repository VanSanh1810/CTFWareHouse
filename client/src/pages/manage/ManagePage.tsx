import React, { useEffect, useState } from 'react';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { CardBox } from '../../components/CardBox';
import ManageTabLayout from '../../layouts/ManageTabLayout';

type Props = {};

const ManagePage = (props: Props) => {
    const [activeTab, setActiveTab] = useState<number>(1);

    const renderComponent = () => {
        switch (activeTab) {
            case 1:
                return <CategoryTab />;
            case 2:
                return <h3>Tab2</h3>;
            case 3:
                return <h3>Tab3</h3>;
            default:
                return <h3>Tab1</h3>;
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
    return (
        <>
            <ListGroup>
                <ListGroup.Item action active={props.activeTab === 1} onClick={() => props.setActiveTab(1)}>
                    Category
                </ListGroup.Item>
                <ListGroup.Item action active={props.activeTab === 2} onClick={() => props.setActiveTab(2)}>
                    Tag
                </ListGroup.Item>
                <ListGroup.Item action active={props.activeTab === 3} onClick={() => props.setActiveTab(3)}>
                    Challenge
                </ListGroup.Item>
            </ListGroup>
        </>
    );
};

const CategoryTab = () => {
    return (
        <ManageTabLayout title="Category" createNewFunc={() => console.log('oke')}>
            <h2>123</h2>
        </ManageTabLayout>
    );
};
