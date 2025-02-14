let datosEstudiantes = [
    ["1", "Agudelo Pérez Ana María", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["2", "Alvarez Ríos Camilo Andrés", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["3", "Arango Vargas Felipe", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["4", "Benítez Gómez Luisa Fernanda", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["5", "Cárdenas López Esteban Daniel", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["6", "Castro Jiménez Juan Sebastián", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["7", "Díaz Marín Valentina Sofía", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["8", "Echeverry Torres Natalia", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["9", "Fernández Zapata Mateo", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["10", "García Vélez Isabella", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["11", "Giraldo Restrepo Emiliano", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["12", "Gómez Castaño Laura Gabriela", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["13", "Gutiérrez Salazar Samuel David", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["14", "Hernández Mejía Emiliana Victoria", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["15", "López Valencia Martín Eduardo", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["16", "Marín Ospina Antonia", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["17", "Molina Álvarez Sebastián", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["18", "Montoya Ramírez Carolina", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["19", "Muñoz Ceballos Nicolás", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["20", "Orozco Jaramillo Manuela", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["21", "Pérez Cardona Santiago", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["22", "Ramírez Guzmán Juan José", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["23", "Restrepo Trujillo Mariana", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["24", "Ríos Barrera Matías", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["25", "Vargas Hoyos Tomás Emanuel", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
];

// Configuración de la tabla
let config = {
    data: datosEstudiantes,
    colHeaders: ["No", "Nombres y Apellidos", "1", "2", "3", "4", "5", "Eval",
        "1", "2", "3", "4", "5", "Taller",
        "1", "2", "3", "Ser", "Nota Final"],
    contextMenu: true,
    columns: [
        { type: 'numeric', readOnly: true },
        { type: 'text', readOnly: true, width: 90 },
        { type: 'numeric', validator: validarNota, allowInvalid: true },
        { type: 'numeric', validator: validarNota, allowInvalid: true },
        { type: 'numeric', validator: validarNota, allowInvalid: true },
        { type: 'numeric', validator: validarNota, allowInvalid: true },
        { type: 'numeric', validator: validarNota, allowInvalid: true },
        { type: 'numeric', readOnly: true },  // Promedio Eval
        { type: 'numeric', validator: validarNota, allowInvalid: true },
        { type: 'numeric', validator: validarNota, allowInvalid: true },
        { type: 'numeric', validator: validarNota, allowInvalid: true },
        { type: 'numeric', validator: validarNota, allowInvalid: true },
        { type: 'numeric', validator: validarNota, allowInvalid: true },
        { type: 'numeric', readOnly: true },  // Promedio Taller
        { type: 'numeric', validator: validarNota, allowInvalid: true },
        { type: 'numeric', validator: validarNota, allowInvalid: true },
        { type: 'numeric', validator: validarNota, allowInvalid: true },
        { type: 'numeric', readOnly: true },  // Promedio Ser
        { type: 'numeric', readOnly: true }   // Nota Final
    ],

    width: "95%",    
    stretchH: 'all',  

    colWidths: [40, 230, 40, null, null, null, null, 50, null, null, null, null, null, 50, null, null, null, 50, 80],

    columns: new Array(19).fill({ type: 'numeric', validator: validarNota, allowInvalid: true }),

    
    cells: function (row, col) {
        const cellProperties = {};
    
        // Aplicar estilo a las columnas de promedios
        if (col === 7 || col === 13 || col === 17 || col === 18) {
            cellProperties.className = 'columna-promedio';
        }
    
        if (col >= 2 && col <= 6) {
            cellProperties.className = 'columna-evaluaciones';
        }

        if (col >= 14 && col <= 16) {
            cellProperties.className = 'columna-evaluaciones';
        }
    
        return cellProperties;
    },
    
    afterChange: function (changes, source) {
        if (source === 'edit') {
            calcularPromedio();
        }
    },
    licenseKey: "non-commercial-and-evaluation"
};

let tblExcel = new Handsontable(document.getElementById('resultadoTabla'), config);

// Función para calcular el promedio
function calcularPromedio() {
    let data = tblExcel.getData();
    for (let i = 0; i < data.length; i++) {
        let sumaEval = 0;
        let cantidadEval = 0;
        let sumaTaller = 0;
        let cantidadTaller = 0;
        let sumaSer = 0;
        let cantidadSer = 0;

        // Calcular promedio de evaluaciones
        for (let j = 2; j <= 6; j++) {
            let nota = parseFloat(data[i][j]);
            if (!isNaN(nota)) {
                sumaEval += nota;
                cantidadEval++;
            }
        }

        // Calcular promedio de talleres
        for (let j = 8; j <= 12; j++) {
            let nota = parseFloat(data[i][j]);
            if (!isNaN(nota)) {
                sumaTaller += nota;
                cantidadTaller++;
            }
        }

        // Calcular promedio de Ser
        for (let j = 14; j <= 16; j++) {
            let nota = parseFloat(data[i][j]);
            if (!isNaN(nota)) {
                sumaSer += nota;
                cantidadSer++;
            }
        }

        // Promedio de evaluaciones
        let promedioEval = (cantidadEval > 0) ? (sumaEval / cantidadEval).toFixed(2) : null;
        tblExcel.setDataAtCell(i, 7, promedioEval, "autoupdate");

        // Promedio de talleres
        let promedioTaller = (cantidadTaller > 0) ? (sumaTaller / cantidadTaller).toFixed(2) : null;
        tblExcel.setDataAtCell(i, 13, promedioTaller, "autoupdate");

        // Promedio de Ser
        let promedioSer = (cantidadSer > 0) ? (sumaSer / cantidadSer).toFixed(2) : null;
        tblExcel.setDataAtCell(i, 17, promedioSer, "autoupdate");

        // Verificar si todos los promedios son válidos antes de calcular la Nota Final
        if (promedioEval && promedioTaller && promedioSer) {
            let notaFinal = ((parseFloat(promedioEval) * 0.4) + (parseFloat(promedioTaller) * 0.3) + (parseFloat(promedioSer) * 0.3));
            tblExcel.setDataAtCell(i, 18, notaFinal.toFixed(2), "autoupdate");
        } else {
            tblExcel.setDataAtCell(i, 18, "", "autoupdate");
        }
    }
}

// Función que valida notas entre 1 y 5
function validarNota(value, callback) {
    let mensajeError = document.getElementById("mensajeError");
    if (value === null || value === "") {
        callback(true);
    } else {
        let numero = parseFloat(value);
        if (numero >= 1 && numero <= 5) {
            callback(true);
            mensajeError.innerText = "";
        } else {
            callback(false);
            mensajeError.innerText = "Solo se admiten valores entre 1.0 y 5.0";
        }
    }
}




