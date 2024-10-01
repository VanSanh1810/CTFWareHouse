import React, { FormEventHandler, useEffect } from 'react';
import { CreateTagDto } from '../../../types/Dtos/create-tag.dto';
import axiosInstance from '../../../services/Axios';
import { Bounce, toast } from 'react-toastify';
import ManageTabLayout from '../../../layouts/ManageTabLayout';
import { Button, Form, Modal } from 'react-bootstrap';
import { AxiosError } from 'axios';

const TagTab = () => {
    interface TagListDto {
        id: string;
        tagName: string;
        category: {
            id: string;
            cateName: string;
        };
    }
    const [tagList, setTagList] = React.useState<TagListDto[]>([]);

    const [modalCreate, setModalCreate] = React.useState<boolean>(false);

    interface ModalEditDto {
        id: string;
        tagName: string;
        category: string;
    }
    const [modalEdit, setModalEdit] = React.useState<ModalEditDto | undefined>();
    const [modalDelete, setModalDelete] = React.useState<string>('');

    const [reloadAction, setReloadAction] = React.useState<boolean>(false);

    interface ListCateDto {
        id: string;
        cateName: string;
    }
    const [listCate, setListCate] = React.useState<ListCateDto[]>([]);

    //////////////////////
    const createTagHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const tagNameInput = form.querySelector('input[name="tagName"]') as HTMLInputElement;
        const _category = form.querySelector('select[name="category"]') as HTMLInputElement;

        // alert(tagNameInput.value + _category.value);

        if (tagNameInput && tagNameInput.value.trim() && _category.value) {
            try {
                const createTagDto: CreateTagDto = { tagName: tagNameInput.value.trim(), category: _category.value };
                await axiosInstance.post('/tag', createTagDto);
                toast.success('Tag created !', {
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

    const editTagHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const tagNameInput = form.querySelector('input[name="tagName"]') as HTMLInputElement;
        const _category = form.querySelector('select[name="category"]') as HTMLInputElement;

        if (tagNameInput && tagNameInput.value.trim() && _category.value) {
            try {
                const createTagDto: CreateTagDto = { tagName: tagNameInput.value.trim(), category: _category.value };
                await axiosInstance.patch(`/tag/${modalEdit?.id}`, createTagDto);
                toast.success('Tag updated !', {
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

    const deleteTagHandler = async () => {
        if (modalDelete) {
            try {
                await axiosInstance.delete(`/tag/${modalDelete}`);
                toast.success(`Tag deleted !`, {
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

    ////////////////////////////////////
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

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axiosInstance.get('/tag');
                setTagList([...response.data]);
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
        fetchTags();
    }, [reloadAction]);

    return (
        <ManageTabLayout title="Tag" createNewFunc={() => setModalCreate(true)}>
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
                                                <th>Tag</th>
                                                <th>Category</th>
                                                <th className="text-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tagList.map((tag, rowIndex) => (
                                                <tr className="align-middle" key={rowIndex}>
                                                    <td>{tag.id}</td>
                                                    <td>{tag.tagName}</td>
                                                    <td>{tag.category.cateName}</td>
                                                    <td className="text-end">
                                                        <div className="drodown">
                                                            <Button
                                                                variant="outline-info"
                                                                className="me-1"
                                                                onClick={() =>
                                                                    setModalEdit({
                                                                        id: tag.id,
                                                                        tagName: tag.tagName,
                                                                        category: tag.category.id,
                                                                    })
                                                                }
                                                            >
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                            </Button>
                                                            <Button
                                                                variant="outline-danger"
                                                                onClick={() => setModalDelete(tag.id)}
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
            {/* Create modal */}
            <Modal
                show={modalCreate}
                onHide={() => setModalCreate(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Create new Tag</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={createTagHandler}>
                        <Form.Group className="mb-3" controlId="tagName">
                            <Form.Label>Tag name</Form.Label>
                            <Form.Control type="text" placeholder="Enter tag name" name="tagName" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cateName">
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example" className="mb-3" name="category">
                                <option value={''}>Open this select menu</option>
                                {listCate.map((cate, i) => {
                                    return (
                                        <option key={`select-${i}`} value={cate.id}>
                                            {cate.cateName}
                                        </option>
                                    );
                                })}
                            </Form.Select>
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
            {/* Update modal */}
            <Modal
                show={!!modalEdit?.id}
                onHide={() => setModalEdit(undefined)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Edit Tag</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editTagHandler}>
                        <Form.Group className="mb-3" controlId="tagName">
                            <Form.Label>Tag name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter tag name"
                                name="tagName"
                                defaultValue={modalEdit?.tagName}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cateName">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                className="mb-3"
                                name="category"
                                defaultValue={modalEdit?.category}
                            >
                                <option value={''}>Open this select menu</option>
                                {listCate.map((cate, i) => {
                                    return (
                                        <option key={`select-${i}`} value={cate.id}>
                                            {cate.cateName}
                                        </option>
                                    );
                                })}
                            </Form.Select>
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
            {/* Delete modal */}
            <Modal
                show={!!modalDelete}
                onHide={() => setModalDelete('')}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Delete Tag</Modal.Title>
                </Modal.Header>
                <Modal.Body>You sure you want to delete this tag ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteTagHandler}>
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

export default TagTab;
