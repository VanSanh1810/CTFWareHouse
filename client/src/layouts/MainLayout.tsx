import React, { useEffect, useState } from 'react';
import { Collapse, Container, Row } from 'react-bootstrap';
import { Header } from '../components/Header';

type Props = {
    children: React.ReactNode;
};

const MainLayout = (props: Props) => {
    const [open, setOpen] = useState(true);
    const [scrollPos, setScrollPos] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPos((oldPost) => {
                if (oldPost > window.scrollY) {
                    //up
                    setOpen(true);
                } else {
                    //down
                    setOpen(false);
                }
                return window.scrollY;
            });
        };

        // Thêm sự kiện 'wheel'
        window.addEventListener('scroll', handleScroll);

        // Trả về một hàm để hủy sự kiện khi component bị unmount hoặc trước khi chạy lại effect
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Container fluid>
            <Collapse in={open}>
                <Row className="w-100" style={{ position: 'fixed', zIndex: 1000 }}>
                    <Header />
                    <p style={{ display: 'none' }}>{scrollPos}</p>
                </Row>
            </Collapse>
            <Row style={{ paddingTop: '80px' }} className="px-5">
                {props.children}
            </Row>
        </Container>
    );
};

export default MainLayout;
