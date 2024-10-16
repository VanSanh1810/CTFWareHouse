import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import axiosInstance from '../../services/Axios';
import { CardBox } from '../../components/CardBox';
import { WriteupDto } from '../../types/Dtos/writeup.dto';

type Props = {};

const WriteupPage = (props: Props) => {
    const { id } = useParams<string>();

    const [writeUp, setWriteUp] = useState<WriteupDto[]>([]);

    useEffect(() => {
        const fetchWriteups = async () => {
            // try {
            //     const response = await axiosInstance.get(`/writeup?chall=${id || ''}`);
            // } catch (e) {
            //     console.log(e);
            // }
            setWriteUp([
                {
                    id: '1234',
                    title: 'Writeup',
                    content: '123',
                    createDate: new Date(),
                    updateDate: new Date(),
                    cite: 'cite',
                    challenge: 'chall',
                },
            ]);
        };
        fetchWriteups();
    }, [id]);

    return (
        <Container fluid>
            {writeUp.map((wU) => {
                return (
                    <>
                        <Row key={wU.id} className="mb-3">
                            <Col>
                                <CardBox selectable={true}>
                                    <div>{wU.title}</div>
                                </CardBox>
                            </Col>
                        </Row>
                    </>
                );
            })}
        </Container>
    );
};

export default WriteupPage;
