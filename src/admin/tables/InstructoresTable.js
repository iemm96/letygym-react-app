import React, {useState,useEffect} from "react";
import MUIDataTable from "mui-datatables";
import {fetchRecords} from "../../actions/fetchRecords";
import {Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {muiTableOptions} from "../../constants/muiTableOptions";
import ModalInstructor from "../modals/ModalInstructor";

const InstructoresTable = props => {
    const [records,setRecords] = useState([]);
    const [selectedRecordId,setSelectedRecordId] = useState(null);
    const [modalControl,setModalControl] = useState(false);

    useEffect(() => {
        async function getRecords() {
            try {
                const result = await fetchRecords('instructores');
                if(result) {
                    setRecords(result);
                }
            }catch (e) {
                console.log(e);
            }
        }

        getRecords();
    },[]);

    const prepareEditModal = id => {
        setSelectedRecordId(id);
        setModalControl(true);
    };

    const updateRecords = () => {

    };

    const columns = [{
        name: "nombreCompleto",
        label: "Nombre",
        options: {
            filter: false,
            sort: true,
        }
    },{
        name: "telefono",
        label: "Teléfono",
        options: {
            filter: false,
            sort: false,
        }
    },{
        name: "celular",
        label: "Celular",
        options: {
            filter: false,
            sort: false,
        }
    },{
        name: "Acciones",
        options: {
            filter: true,
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <div>
                        <Button type="Button" onClick={() => prepareEditModal(value.id)} className="mr-2 btnAction"><FontAwesomeIcon icon={faEdit}/></Button>
                    </div>
                );
            }
        }
    },];
    return(
        <div>
            <ModalInstructor
                modalControl={modalControl}
                recordId={selectedRecordId}
                updateRecords={updateRecords}
            />
            <MUIDataTable
                columns={columns}
                data={records}
                options={muiTableOptions}
            />
        </div>


    )
};

export default InstructoresTable;