import React from 'react';
import { Dropdown } from 'react-bootstrap';

type Props = {
    listHeader: string[];
    listKey: string[];
    datas: Record<string, unknown>[];
};

const DataList = (props: Props) => {
    return (
        <div className="data-list">
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-3 mb-lg-5">
                        <div className="overflow-hidden card table-nowrap table-card">
                            <div className="table-responsive">
                                <table className="table mb-0">
                                    <thead className="small text-uppercase bg-body text-muted">
                                        <tr>
                                            {props.listHeader.map((head) => (
                                                <th>{head}</th>
                                            ))}
                                            {/* <th>Name</th>
                                            <th>Email</th>
                                            <th>Country</th>
                                            <th>Payment method</th>
                                            <th>Created Date</th> */}
                                            <th className="text-end">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.datas.map((row, rowIndex) => (
                                            <tr className="align-middle" key={rowIndex}>
                                                {props.listKey.map((header, colIndex) => (
                                                    <td key={colIndex}>{row[header]}</td>
                                                ))}
                                                <td className="text-end">
                                                    <div className="drodown">
                                                        <Dropdown drop="start">
                                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                {/* <i className="fa fa-bars" aria-hidden="true"></i> */}
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        {/* <a
                                                            data-bs-toggle="dropdown"
                                                            href="#"
                                                            className="btn p-1"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="fa fa-bars" aria-hidden="true"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a href="#!" className="dropdown-item">
                                                                View Details
                                                            </a>
                                                            <a href="#!" className="dropdown-item">
                                                                Delete user
                                                            </a>
                                                        </div> */}
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
    );
};

export default DataList;
