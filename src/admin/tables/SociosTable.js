import React from "react";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import ActionsFormatter from "../actions/ActionsFormatter";

const { SearchBar } = Search;

let socios = [{
    id: 1,
    nombre: "María Cárdenas Jímenez",
    membresia: "Semanal",
    status: "Activa",
}];

class SociosTable extends React.Component {

    state = {socios: socios};

     actionsFormatter = (cell, row) => <ActionsFormatter id={row.id} />;


     render() {
         const columns = [{
             dataField: 'nombre',
             text: 'Nombre',
             sort: true,
         },
             {
                 dataField: 'membresia',
                 text: 'Membresía',
                 sort: true,
             },
             {
                 dataField: 'status',
                 text: 'Status',
                 sort: true,
             },{
                 dataField: 'actions',
                 text: 'Acciones',
                 isDummyField: true,
                 csvExport: false,
                 formatter: this.actionsFormatter,
             },];

         const options = {
             custom: true,
             paginationSize: 4,
             pageStartIndex: 1,
             firstPageText: 'Inicio',
             prePageText: 'Atrás',
             nextPageText: 'Siguiente',
             lastPageText: 'Final',
             nextPageTitle: 'Primer página',
             prePageTitle: 'Página anterior',
             firstPageTitle: 'Página siguiente',
             lastPageTitle: 'Última página',
             showTotal: true,
             totalSize: socios.length
         };


         const contentTable = ({ paginationProps, paginationTableProps }) => (
             <div>
                 <ToolkitProvider
                     keyField="id"
                     columns={ columns }
                     data={ this.state.socios }
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

         return(
             <PaginationProvider
                 pagination={paginationFactory(options)}>

                 {contentTable}

             </PaginationProvider>
         );
     }

}

export default SociosTable;