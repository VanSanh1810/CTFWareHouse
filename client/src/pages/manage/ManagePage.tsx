import React, { useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { CardBox } from '../../components/CardBox';
import ManageTabLayout from '../../layouts/ManageTabLayout';
import { useSearchParams } from 'react-router-dom';

import { CategoryTab } from './CategoryTab';
import { TagTab } from './TagTab';
import { ChallTab } from './ChallTab';

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
