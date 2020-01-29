import React from "react";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import ActionsFormatter from "../actions/ActionsFormatter";

const { SearchBar } = Search;

let visitantesTable = [{
    id: 1,
    nombre: "María Cárdenas Jímenez",
    numero_visitas: "10",
}];

class VistantesTable extends React.Component {
    state = { visitantes: visitantesTable };

    actionsFormatter = (cell, row) => <ActionsFormatter id={row.id} />;

    render() {
        const options = {
            custom: true,
            paginationSize: 4,
            pageStartIndex: 1,
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            totalSize: this.state.visitantes.length
        };
        const columns = [{
            dataField: 'nombre',
            text: 'Nombre',
            sort: true,
        },
        {
            dataField: 'numero_visitas',
            text: 'Número de visitas',
            sort: true,
        }, {
            dataField: 'actions',
            text: 'Acciones',
            isDummyField: true,
            csvExport: false,
            formatter: this.actionsFormatter,
        },];
        const contentTable = ({ paginationProps, paginationTableProps }) => (
            <div>
                <ToolkitProvider
                    keyField="id"
                    columns={ columns }
                    data={ this.state.visitantes }
                    search
                >
                    {
                        toolkitprops => (
                            <div>
                                <SearchBar { ...toolkitprops.searchProps } />
                                <BootstrapTable
                                    hover
                                    { ...toolkitprops.baseProps }
                                    { ...paginationTableProps }
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
                <PaginationListStandalone { ...paginationProps } />
            </div>
        );

        return (
            <div>
                <PaginationProvider
                    pagination={
                        paginationFactory(options)
                    }
                >
                    { contentTable }
                </PaginationProvider>
            </div >
        );
    }
}

export default VistantesTable;

