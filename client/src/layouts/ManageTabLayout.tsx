import React from 'react';
import { Button, Container } from 'react-bootstrap';

type Props = {
    children: React.ReactNode;
    title: string;
    createNewFunc: () => void;
};

const ManageTabLayout = (props: Props) => {
    return (
        <Container>
            <div className="d-flex flex-direction-row align-items-center" style={{ justifyContent: 'space-between' }}>
                <h2>{props.title}</h2>
                <Button variant="success" onClick={props.createNewFunc}>
                    + New {props.title}
                </Button>
            </div>
            <div>{props.children}</div>
        </Container>
    );
};

export default ManageTabLayout;
