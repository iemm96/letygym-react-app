import React, {useEffect, useState} from "react";
import {Button, Col } from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Row } from "reactstrap";
import ModalMembresia from "../modals/ModalMembresia";
import {fetchRecords} from "../../actions/fetchRecords";
import MUIDataTable from "mui-datatables";
import {muiTableOptions} from "../../constants/muiTableOptions";

const MembresiasTable = () => {
    const [records,setRecords] = useState([]);
    const [modalControl,setModalControl] = useState(false);
    const [selectedRecordId,setSelectedRecordId] = useState(null);
    const [tituloModal,setTituloModal] = useState('');

    useEffect(() => {
        getRecords();
    },[]);

    const getRecords = async () => {
        try {
            const result = await fetchRecords('membresias');
            if(result) {
                setRecords(result);
            }
        }catch (e) {
            console.log(e);
        }
    };

    const columns = [{
        name: "membresia",
        label: "Nombre",
        options: {
            filter: false,
            sort: false,
        }
    },{
        name: "duracion",
        label: "Duración",
        options: {
            filter: false,
            sort: false,
        }
    },{
        name: "precio",
        label: "Precio",
        options: {
            filter: false,
            sort: false,
        }
    },{
        name: "id",
        label: "Acciones",
        options: {
            filter: true,
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta) => {
                return (
                    <div>
                        <Button type="Button" onClick={() => {
                            setSelectedRecordId(value);
                            setModalControl(!modalControl);
                            setTituloModal(tableMeta.rowData[1]);
                        }} className="mr-2 btnAction"><FontAwesomeIcon icon={faEdit}/></Button>
                    </div>
                );
            }
        }
    }];

    return(
        <div>
            {modalControl ? <ModalMembresia
                toggleModal={() => {setModalControl(!modalControl)}}
                modalRecord={modalControl}
                selectedRecordId={selectedRecordId}
                tituloModal={tituloModal}
                updateRecords={() => getRecords()}
            /> : ''}
            <Row className="mt-5 mt-lg-0">
                <Col>
                    <MUIDataTable
                        title={"Membresías"}
                        data={records}
                        columns={columns}
                        options={muiTableOptions}
                    />
                </Col>
            </Row>
        </div>

    )
};

export default MembresiasTable;
