import React, { FormEventHandler, useEffect } from 'react';
import { CreateCateDto } from '../../../types/Dtos/create-category.dto';
import axiosInstance from '../../../services/Axios';
import { Bounce, toast } from 'react-toastify';
import ManageTabLayout from '../../../layouts/ManageTabLayout';
import { Button, Form, Modal } from 'react-bootstrap';
import { AxiosError } from 'axios';

const CategoryTab = () => {
    const [modalCreate, setModalCreate] = React.useState<boolean>(false);
    interface ModalEditDto {
        id: string;
        cateName: string;
    }
    const [modalEdit, setModalEdit] = React.useState<ModalEditDto | undefined>(undefined);
    const [modalDelete, setModalDelete] = React.useState<string>('');

    const [reloadAction, setReloadAction] = React.useState<boolean>(false);
    const [listCate, setListCate] = React.useState<ModalEditDto[]>([]);
    ////////////////////////////////

    const createCateHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const cateNameInput = form.querySelector('input[name="cateName"]') as HTMLInputElement;

        if (cateNameInput && cateNameInput.value.trim()) {
            // console.log(cateNameInput.value);
            try {
                const createCateDto: CreateCateDto = { cateName: cateNameInput.value };
                await axiosInstance.post('/category', createCateDto);
                toast.success('Category created !', {
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
                if (e instanceof AxiosError) {
                    toast.error(`${e.response?.data.message}`, {
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
                } else {
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
                await axiosInstance.patch(`/category/${modalEdit}`, createCateDto);
                toast.success('Category updated !', {
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
                setModalEdit(undefined);
            } catch (e) {
                if (e instanceof AxiosError) {
                    toast.error(`${e.response?.data.message}`, {
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
                } else {
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
                await axiosInstance.delete(`/category/${modalDelete}`);
                toast.success('Category deleted !', {
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
                if (e instanceof AxiosError) {
                    toast.error(`${e.response?.data.message}`, {
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
                } else {
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
            <div className="data-list">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3 mb-lg-5">
                            <div className="overflow-hidden card table-nowrap table-card">
                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <thead className="small text-uppercase bg-body text-muted">
                                            <tr>
                                                <th>ID</th>
                                                <th>Category name</th>
                                                <th className="text-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listCate.map((cate, rowIndex) => (
                                                <tr className="align-middle" key={rowIndex}>
                                                    <td>{cate.id}</td>
                                                    <td>{cate.cateName}</td>
                                                    <td className="text-end">
                                                        <div className="drodown">
                                                            <Button
                                                                variant="outline-info"
                                                                className="me-1"
                                                                onClick={() =>
                                                                    setModalEdit({ id: cate.id, cateName: cate.cateName })
                                                                }
                                                            >
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                            </Button>
                                                            <Button
                                                                variant="outline-danger"
                                                                onClick={() => setModalDelete(cate.id)}
                                                            >
                                                                <i className="fa-solid fa-trash"></i>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                show={!!modalEdit?.id}
                onHide={() => setModalEdit(undefined)}
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
                            <Form.Control
                                type="text"
                                placeholder="Enter category name"
                                name="cateName"
                                defaultValue={modalEdit?.cateName}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalEdit(undefined)}>
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

export default CategoryTab;
