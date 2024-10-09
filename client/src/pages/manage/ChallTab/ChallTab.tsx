import React, { FormEventHandler, useEffect, useState } from 'react';
import ManageTabLayout from '../../../layouts/ManageTabLayout';
import axiosInstance from '../../../services/Axios';
import { Bounce, toast } from 'react-toastify';
import { Badge, Button, Card, Container, Form, InputGroup, Modal } from 'react-bootstrap';
import { AxiosError } from 'axios';
import { debounce } from 'lodash';

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
                const tagToSend = [
                    ...tagsForCreate.map((tag) => {
                        if (tag.id) {
                            return tag.id;
                        } else {
                            return { tagName: tag.tagName, category: tag.category };
                        }
                    }),
                ];
                formData.append('tags', JSON.stringify(tagToSend));
                if (descInput.value.trim()) {
                    formData.append('description', descInput.value.trim());
                }
                formData.append('source', hostInput.value.trim());
                formData.append('sourceUrl', urlInput.value.trim());
                formData.append('file', challFileInput.files[0]); //

                await axiosInstance.post('/chall', formData, {
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
                console.log(e);
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
    /////
    ///
    interface CreateTagsListDto {
        id?: string;
        tagName: string;
        category?: string;
    }

    const [createTagModal, setCreateTagModal] = React.useState<boolean>(false);
    const [tagsForCreate, setTagsForCreate] = useState<CreateTagsListDto[]>([]);
    const [tagNameForFind, setTagNameForFind] = useState<string>('');

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
            if (createTagModal && tagNameForFind) {
                try {
                    const response = await axiosInstance.get(`/tag?name=${tagNameForFind}`);
                    setTagList([...response.data.tags]);
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
            }
        };
        fetchTags();
    }, [reloadAction, createTagModal, tagNameForFind]);

    useEffect(() => {
        const fetchChalls = async () => {
            try {
                const response = await axiosInstance.get('/chall');
                setListChall([...response.data.challenges]);
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

    const addTagToCreate = async (item: CreateTagsListDto) => {
        if (item.id) {
            // exist one
            if (item.tagName) {
                setTagsForCreate((ls) => {
                    let flag = false;
                    ls.forEach((tag) => {
                        if (tag.tagName === item.tagName && tag.id === item.id) {
                            flag = true;
                            return;
                        }
                    });
                    if (flag) {
                        return ls;
                    }
                    return [...ls, item];
                });
            } else {
                toast.error('Unexpecting error', {
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
            // new
            if (item.tagName && item.category) {
                setTagsForCreate((ls) => {
                    let flag = false;
                    ls.forEach((tag) => {
                        if (tag.tagName === item.tagName && tag.category === item.category) {
                            flag = true;
                            return;
                        }
                    });
                    if (flag) {
                        return ls;
                    }
                    return [...ls, item];
                });
            } else {
                toast.error('Unexpecting error', {
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
    };

    const removeSelectedTagHandler = async (item: CreateTagsListDto) => {
        if (item.id) {
            // exist one
            if (item.tagName) {
                setTagsForCreate((ls) => {
                    const newLs = ls.filter((tag) => tag.tagName !== item.tagName || tag.id !== item.id);
                    return newLs;
                });
            } else {
                toast.error('Unexpecting error', {
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
            // new
            if (item.tagName && item.category) {
                setTagsForCreate((ls) => {
                    const newLs = ls.filter((tag) => tag.tagName !== item.tagName || tag.category !== item.category);
                    return newLs;
                });
            } else {
                toast.error('Unexpecting error', {
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
    };

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
                        <Form.Group className="mb-3" controlId="cateName">
                            <Form.Label>Tags</Form.Label>
                            <div className="me-2">
                                {tagsForCreate.map((tag, i) => {
                                    return (
                                        <Badge
                                            className="me-1"
                                            key={`badge-${i}`}
                                            bg={tag.id ? 'success' : 'info'}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {tag.tagName}
                                            <i className="fa-solid fa-x ms-2" onClick={() => removeSelectedTagHandler(tag)}></i>
                                        </Badge>
                                    );
                                })}
                            </div>
                            <Card className="mt-2">
                                <Button onClick={() => setCreateTagModal(true)}>Selecte tags</Button>
                            </Card>
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
            {/* Tags modified create modal */}
            <Modal
                show={createTagModal}
                onHide={() => {
                    setTagNameForFind('');
                    setCreateTagModal(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Select tags</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {tagsForCreate.map((tag, i) => {
                            return (
                                <Badge
                                    className="me-1"
                                    key={`mTag-${i}`}
                                    bg={tag.id ? 'success' : 'info'}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => removeSelectedTagHandler(tag)}
                                >
                                    {tag.tagName}
                                    <i className="fa-solid fa-x ms-2" onClick={() => removeSelectedTagHandler(tag)}></i>
                                </Badge>
                            );
                        })}
                        {!tagsForCreate || tagsForCreate.length < 1 ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h3 className="mt-3" style={{ color: '#DEDEDE' }}>
                                    No tag
                                </h3>
                            </div>
                        ) : null}
                    </div>
                    <br style={{ border: 'solid' }} />
                    <h5>Select existed tag</h5>
                    <Container fluid>
                        <Form>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Tag name</Form.Label>
                                <Form.Control
                                    autoCorrect="none"
                                    type="text"
                                    placeholder="Enter tag name"
                                    onChange={debounce((e) => {
                                        setTagNameForFind(e.target.value);
                                    }, 500)}
                                />
                                {tagNameForFind ? (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            width: '89%',
                                            padding: '10px',
                                            maxHeight: '50vh',
                                            overflowY: 'scroll',
                                            backgroundColor: 'white',
                                            boxShadow: '-2px 16px 54px -14px rgba(0,0,0,0.29)',
                                        }}
                                    >
                                        {tagList.map((tag, i) => {
                                            return (
                                                <div
                                                    key={`tagforselect-${i}`}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        cursor: 'pointer',
                                                        backgroundColor: 'white',
                                                        padding: '0.5rem',
                                                        borderRadius: '0.2rem',
                                                    }}
                                                    onClick={() => addTagToCreate({ id: tag.id, tagName: tag.tagName })}
                                                >
                                                    <span>{tag.tagName}</span>
                                                    <span>Category: {tag.category.cateName}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : null}
                            </Form.Group>
                            <Button type="submit" className="mt-2">
                                Add
                            </Button>
                        </Form>
                    </Container>
                    <br style={{ border: 'solid' }} />
                    <h5>Or create new tag</h5>
                    <Container fluid>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                // alert(e.target.c_tag_name.value);
                                alert(e.target.c_tag_cate.value);
                                if (e.target.c_tag_cate.value?.trim() && e.target.c_tag_name.value?.trim()) {
                                    addTagToCreate({
                                        tagName: e.target.c_tag_name.value.trim(),
                                        category: e.target.c_tag_cate.value.trim(),
                                    });
                                }
                            }}
                        >
                            <Form.Group className="mb-3" controlId="formGroupTagName">
                                <Form.Label>Tag name</Form.Label>
                                <Form.Control type="text" placeholder="Enter tag name" name="c_tag_name" />
                            </Form.Group>
                            <Form.Select aria-label="Default select example" name="c_tag_cate">
                                <option value={''}>No Category</option>
                                {listCate.map((cate, i) => {
                                    return (
                                        <option key={`select-cate-tag-${i}`} value={cate.id}>
                                            {cate.cateName}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                            <Button type="submit" className="mt-2">
                                Create
                            </Button>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button
                        variant="secondary"
                        onClick={() => () => {
                            setTagNameForFind('');
                            setCreateTagModal(false);
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => () => {
                            setTagNameForFind('');
                            setCreateTagModal(false);
                        }}
                    >
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </ManageTabLayout>
    );
};

export default ChallTab;
