import React, { FormEventHandler, useEffect, useState } from 'react';
import { Button, Col, Container, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import { CardBox } from '../../components/CardBox';
import ManageTabLayout from '../../layouts/ManageTabLayout';
import { useSearchParams } from 'react-router-dom';
import { DataList } from '../../components/DataList';
import { Bounce, toast } from 'react-toastify';
import axiosInstance from '../../services/Axios';
import { CreateCateDto } from '../../types/Dtos/create-category.dto';

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
    const [modalEdit, setModalEdit] = React.useState<string>('');
    const [modalDelete, setModalDelete] = React.useState<string>('');

    const [reloadAction, setReloadAction] = React.useState<boolean>(false);
    const [listCate, setListCate] = React.useState<string[]>([]);
    ////////////////////////////////

    const createCateHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const cateNameInput = form.querySelector('input[name="cateName"]') as HTMLInputElement;

        if (cateNameInput && cateNameInput.value.trim()) {
            // console.log(cateNameInput.value);
            try {
                const createCateDto: CreateCateDto = { cateName: cateNameInput.value };
                const response = await axiosInstance.post('/category', createCateDto);
                toast.success(`${response.status}`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Bounce,
                });
                setReloadAction((r) => !r);
                setModalCreate(false);
            } catch (e) {
                toast.error(`${e}`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Bounce,
                });
            }
        } else {
            toast.error('Please provide category name !', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            });
        }
    };

    const editCateHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const cateNameInput = form.querySelector('input[name="cateName"]') as HTMLInputElement;

        if (cateNameInput && cateNameInput.value.trim() && modalEdit) {
            // console.log(cateNameInput.value);
            try {
                const createCateDto: CreateCateDto = { cateName: cateNameInput.value };
                const response = await axiosInstance.patch(`/category/${modalEdit}`, createCateDto);
                toast.success(`${response.status}`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Bounce,
                });
                setReloadAction((r) => !r);
                setModalEdit('');
            } catch (e) {
                toast.error(`${e}`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Bounce,
                });
            }
        } else {
            toast.error('Please provide category name !', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            });
        }
    };

    const deleteCateHandler = async () => {
        if (modalDelete) {
            // console.log(cateNameInput.value);
            try {
                const response = await axiosInstance.delete(`/category/${modalDelete}`);
                toast.success(`${response.status}`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Bounce,
                });
                setReloadAction((r) => !r);
                setModalDelete('');
            } catch (e) {
                toast.error(`${e}`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Bounce,
                });
            }
        } else {
            toast.error('Please provide category name !', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            });
        }
    };

    /////////////////////////////////////////
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/category');
                setListCate([...response.data]);
            } catch (e) {
                toast.error(`${e}`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Bounce,
                });
            }
        };
        fetchCategories();
    }, [reloadAction]);

    return (
        <ManageTabLayout title="Category" createNewFunc={() => setModalCreate(true)}>
            <h2>123</h2>
            <DataList
                listHeader={['ID', 'Name']}
                listKey={['id', 'cateName']}
                datas={[...listCate]}
                editHandler={(id: string) => setModalEdit(id)}
                deleteHandler={(id: string) => setModalDelete(id)}
            />
            {/* Create Modal */}
            <Modal
                show={modalCreate}
                onHide={() => setModalCreate(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Create new Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={createCateHandler}>
                        <Form.Group className="mb-3" controlId="cateName">
                            <Form.Label>Category name</Form.Label>
                            <Form.Control type="text" placeholder="Enter category name" name="cateName" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalCreate(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Edit Modal */}
            <Modal
                show={!!modalEdit}
                onHide={() => setModalEdit('')}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editCateHandler}>
                        <Form.Group className="mb-3" controlId="cateName">
                            <Form.Label>Category name</Form.Label>
                            <Form.Control type="text" placeholder="Enter category name" name="cateName" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalEdit('')}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Delete Modal */}
            <Modal
                show={!!modalDelete}
                onHide={() => setModalDelete('')}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Delete Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>You sure you want to delete this category</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteCateHandler}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={() => setModalDelete('')}>
                        Close
                    </Button>
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
