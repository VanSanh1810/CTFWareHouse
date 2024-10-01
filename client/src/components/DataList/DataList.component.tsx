import React from 'react';
import { Button } from 'react-bootstrap';

type Props = {
    listHeader: string[];
    listKey: string[];
    datas: Record<string, string>[];
    editHandler: (id: string) => void;
    deleteHandler: (id: string) => void;
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
                                            {props.listHeader.map((head, i) => (
                                                <th key={`head-${i}`}>{head}</th>
                                            ))}
                                            <th className="text-end">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.datas.map((row, rowIndex) => (
                                            <tr className="align-middle" key={rowIndex}>
                                                {props.listKey.map((header, colIndex) => (
                                                    <td key={`${colIndex}-${rowIndex}`}>{row[header]}</td>
                                                ))}
                                                <td className="text-end">
                                                    <div className="drodown">
                                                        <Button
                                                            variant="outline-info"
                                                            className="me-1"
                                                            onClick={() => props.editHandler(row['id'])}
                                                        >
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Button>
                                                        <Button
                                                            variant="outline-danger"
                                                            onClick={() => props.deleteHandler(row['id'])}
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
    );
};

export default DataList;
