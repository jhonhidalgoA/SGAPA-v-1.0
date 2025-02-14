let datosEstudiantes1 = [
    ["1", "Agudelo Pérez Ana María", "", false, false, false, "2024-02-06"],
    ["2", "Alvarez Ríos Camilo Andrés", "", false, false, false, "2024-02-06"],
    ["3", "Arango Vargas Felipe", "", false, false, false, "2024-02-06"],
    ["4", "Benítez Gómez Luisa Fernanda", "", false, false, false, "2024-02-06"],
    ["5", "Cárdenas López Esteban Daniel", "", false, false, false, "2024-02-06"],
    ["6", "Castro Jiménez Juan Sebastián", "", false, false, false, "2024-02-06"],
    ["7", "Díaz Marín Valentina Sofía", "", false, false, false, "2024-02-06"],
    ["8", "Echeverry Torres Natalia", "", false, false, false, "2024-02-06"],
    ["9", "Fernández Zapata Mateo", "", false, false, false, "2024-02-06"],
    ["10", "García Vélez Isabella", "", false, false, false, "2024-02-06"],
    ["11", "Giraldo Restrepo Emiliano", "", false, false, false, "2024-02-06"],
    ["12", "Gómez Castaño Laura Gabriela", "", false, false, false, "2024-02-06"],
    ["13", "Gutiérrez Salazar Samuel David", "", false, false, false, "2024-02-06"],
    ["14", "Hernández Mejía Emiliana Victoria", "", false, false, false, "2024-02-06"],
    ["15", "López Valencia Martín Eduardo", "", false, false, false, "2024-02-06"]

];

let configAsistencia = {
    data: datosEstudiantes1,
    colHeaders: ["No", "Nombres y Apellidos", "Total de Horas", "Inasistencia", "Retardo", "Fuga", "Fecha", "Ver"],
    contextMenu: true,
    columns: [
        { type: 'numeric', readOnly: true },
        { type: 'text', readOnly: true },
        { type: 'numeric' },
        { type: 'checkbox' },
        { type: 'checkbox' },
        { type: 'checkbox' },
        { type: 'date', dateFormat: 'YYYY-MM-DD', correctFormat: true },
        {

            type: 'text',
            renderer: function (instance, td, row, col, prop, value, cellProperties) {
                td.innerHTML = `<button onclick="alert('Acción en fila ${row + 1}')" class="accion__boton">Ver Todo...</button>`;  // Agregar botón
                td.style.textAlign = 'center';
                td.style.verticalAlign = 'middle'; 
                return td;
            },
            
        }

    ],
    width: "80%",
    stretchH: 'all',
    colWidths: [15, 60, 20, 20, 20, 20, 20, 30],
    rowHeights: 32,
    cells: function (row, col) {
        const cellProperties = {};
        return cellProperties;
    },
    cells: function (row, col) {
        const cellProperties = {};
        if (col === 3 || col === 4 || col === 5) {
            cellProperties.renderer = function (instance, td, row, col, prop, value, cellProperties) {
                td.style.textAlign = 'center';  // Centrar el checkbox
                Handsontable.renderers.CheckboxRenderer.apply(this, arguments);  // Mantener la funcionalidad del checkbox
            };
        }
        return cellProperties;
    },

    licenseKey: "non-commercial-and-evaluation"
};



let tblExcel1 = new Handsontable(document.getElementById('resultadoAsistencia'), configAsistencia);