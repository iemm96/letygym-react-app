export const muiTableOptions = {
    filter:false,
    print:false,
    textLabels: {
        body: {
            noMatch: "No se encontraron registros",
            toolTip: "Ordenar",
            columnHeaderTooltip: column => `Ordenamiento para ${column.label}`
        },
        pagination: {
            next: "Siguiente página",
            previous: "Página anterior",
            rowsPerPage: "Registros por página:",
            displayRows: "de",
        },
        toolbar: {
            search: "Buscar",
            downloadCsv: "Descargar CSV",
            print: "Imprimir",
            viewColumns: "Ver columnas...",
            filterTable: "Filtrar por...",
        },
        filter: {
            all: "Todos",
            title: "FILTROS",
            reset: "REINICIAR",
        },
        viewColumns: {
            title: "Ver columnas",
            titleAria: "Mostrar/Ocultar columnas",
        },
        selectedRows: {
            text: "Registro(s) seleccionado(s)",
            delete: "Eliminar",
            deleteAria: "Eliminar los registros seleccionados",
        },
    }
};
