import React, { FormEventHandler, useEffect } from 'react';
import ManageTabLayout from '../../../layouts/ManageTabLayout';
import axiosInstance from '../../../services/Axios';
import { Bounce, toast } from 'react-toastify';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { AxiosError } from 'axios';

const ChallTab = () => {
    const [listChall, setListChall] = React.useState([]);
    interface CategoryListDto {
        id: string;
        cateName: string;
    }
    const [listCate, setListCate] = React.useState<CategoryListDto[]>([]);
    interface TagListDto {
        id: string;
        tagName: string;
        category: {
            id: string;
            cateName: string;
        };
    }
    const [tagList, setTagList] = React.useState<TagListDto[]>([]);

    const [reloadAction, setReloadAction] = React.useState<boolean>(false);
    //////////
    const [createModal, setCreateModal] = React.useState<boolean>(false);
    ///////////////

    const createChallHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const challNameInput = form.querySelector('input[name="challName"]') as HTMLInputElement;
        const descInput = form.querySelector('textarea[name="desc"]') as HTMLInputElement;
        const hostInput = form.querySelector('input[name="host"]') as HTMLInputElement;
        const urlInput = form.querySelector('input[name="url"]') as HTMLInputElement;
        const challFileInput = form.querySelector('input[name="challFile"]') as HTMLInputElement;
        const _category = form.querySelector('select[name="category"]') as HTMLInputElement;

        // console.log(challNameInput.value);
        // console.log(descInput.value);
        // console.log(hostInput.value);
        // console.log(urlInput.value);
        // console.log(challFileInput.files);

        if (
            challNameInput &&
            challNameInput.value.trim() &&
            hostInput &&
            hostInput.value.trim() &&
            urlInput &&
            urlInput.value.trim() &&
            challFileInput &&
            challFileInput.files?.length === 1 &&
            _category &&
            _category.value.trim()
        ) {
            try {
                const formData = new FormData();

                formData.append('challName', challNameInput.value);
                formData.append('category', _category.value.trim());
                // formData.append('tags', );
                if (descInput.value.trim()) {
                    formData.append('description', descInput.value.trim());
                }
                formData.append('source', hostInput.value.trim());
                formData.append('sourceUrl', urlInput.value.trim());
                formData.append('file', challFileInput.files[0]); //

                await axiosInstance.post('/category', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
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
                setCreateModal(false);
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

    ///////
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

    useEffect(() => {
        const fetchChalls = async () => {
            try {
                const response = await axiosInstance.get('/chall');
                setListChall([...response.data]);
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
        fetchChalls();
    }, [reloadAction]);

    return (
        <ManageTabLayout title="Chall" createNewFunc={() => setCreateModal(true)}>
            {/* <div className="data-list">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3 mb-lg-5">
                            <div className="overflow-hidden card table-nowrap table-card">
                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <thead className="small text-uppercase bg-body text-muted">
                                            <tr>
                                                <th>ID</th>
                                                <th>Challenge name</th>
                                                <th>Category</th>
                                                <th>Tags</th>
                                                <th className="text-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listChall.map((chall, rowIndex) => (
                                                <tr className="align-middle" key={rowIndex}>
                                                    <td>{chall.id}</td>
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
            </div> */}
            {/* Create modal */}
            <Modal
                show={createModal}
                onHide={() => setCreateModal(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Create new Chall</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={createChallHandler}>
                        <Form.Group className="mb-3" controlId="challName">
                            <Form.Label>Challenge name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter category name" name="challName" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cateName">
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example" className="mb-3" name="category">
                                <option value={''}>No Category</option>
                                {listCate.map((cate, i) => {
                                    return (
                                        <option key={`select-cate-${i}`} value={cate.id}>
                                            {cate.cateName}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="desc">
                            <Form.Label>Description (optional)</Form.Label>
                            <Form.Control
                                rows={2}
                                as="textarea"
                                type="textarea"
                                placeholder="Challenge description"
                                name="desc"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="hostandurl">
                            <Form.Label>Challenge host and url</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control required aria-label="host" placeholder="Host name" name="host" />
                                <Form.Control required aria-label="url" placeholder="Url" name="url" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="challFile">
                            <Form.Label>Challenge file</Form.Label>
                            <Form.Control
                                required
                                type="file"
                                accept=".rar, .tar, .bz, .bz2, .gz, .zip, .7z"
                                placeholder="Enter category name"
                                name="challFile"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setCreateModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </ManageTabLayout>
    );
};

export default ChallTab;
