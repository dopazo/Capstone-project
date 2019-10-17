/**
 * Función para manejar algún cambio en el input de archivos. Recibe el evento del
 * cambio del input, pero lo que realmente hace es sacar los archivos del input (accediendo 
 * con el id al input), hacer un par de validaciones y después en caso que salga todo bien
 * llama a la función para parsear la data y mostrar el contenido.
 * 
 * @param {any} event: evento emitido al exitir un cambio en el input de archivos
 */
const handleCsvUpload = (event) => {
	$("#loading").toggleClass("hide");
	const previewDiv = document.getElementById("csv-preview");
  previewDiv.innerHTML = '';

	const { files }  = document.getElementById('csvUploader');
	if (!files || !files.length) return null
	// Acá se ven todas las validaciones del archivo y se muestra el mensaje de error en caso
	// que exista algún error.
	// Por ahora solamente se está verificando el tipo del archivo (que sea CSV), pero se pueden
	// agregar validaciones como el peso, el formato del archivo, etc. Sería cosa de ir agregando
	// las condiciones o manejándolas en de formas independientes

	// La validación de tipo de archivo (csv) no funciona correctamente en Windows
	// Al parecer el OS no logra matchear el tipo de archivo con algún nativo que
	// sea 'text/csv'
	// Al ocupar mac o Linux no hay problema. Simplemente descomentar esta sección
	// del código

	/* const { type } = files[0]
	if (type !== 'text/csv') {
		$("#error-alert").toggleClass("collapse");
		$("#loading").toggleClass("hide");
		previewDiv.classList.add("hide");
		setTimeout(() => $("#error-alert").toggleClass("collapse"), 2000)
		return null
	} */
	// En caso que haya salido todo bien y el archivo haya pasado las validaciones de arriba, se
	// llega hasta acá donde lo que 
	const reader = new FileReader();
	reader.addEventListener('load', function (e) {
			const rawData = e.target.result; 
			const parsedData = parseCsvContent(rawData)
			const tableElement = createTable(parsedData)
			previewDiv.appendChild(tableElement)
	});

	reader.readAsBinaryString(files[0]);
	$("#loading").toggleClass("hide");
  previewDiv.classList.remove("hide");
}

/**
 * Función para crear elemento del DOM de una <table> con los respectivos `tr`y `td`.
 * Lo que hace es recorrer la matriz (arreglo de arreglos) con filas y las columnas de
 * cada fila.
 * 
 * Al ir recorriendo las filas va creando los tr y después recorre cada fila para crear las
 * celdas y creando los td con el valor de esa celda. Retorna después un elemento del
 * tipo <table> que se tiene que insertar donde se requiera
 * 
 * @param {any} data: arreglo de objetos con la data de la tabla a crear
 * @return {element} elemento del DOM a insertar (<table> ya creado)
 */
const createTable = (data) => {
	const table = document.createElement('table');
	const tableBody = document.createElement('tbody');
	var counter = 0;
	data.forEach(function(rowData) {
		const row = document.createElement('tr');
		rowData.forEach(function(cellData) {
			const cell = document.createElement('td');
			cell.appendChild(document.createTextNode(cellData));
			row.appendChild(cell);
		});
		//coeficientes modelo regresión logística
		var coefs = [
                -0.0025, //Mat              row[3]
                0.0045,  //Leng             row[4]
                -0.003,  //Rank             row[5]
                -0.0025];//NEM(coef PsuOpc) row[6]
        
		const cell = document.createElement('td');
		if(counter < 1) {
			cell.appendChild(document.createTextNode('Porcentaje Deserción'));
			}
		else {
			//Calculo modelo regresión logistica: suma producto, exponencial y round
		    var sumProd = 0;
            for(var i=0; i< coefs.length; i++) {
                //TODO: seleccionar columnas por el nombre de la columna
                //TODO: Modificar nombres de columnas y sus valores de ser necesario
                sumProd += coefs[i]*row.cells.item(i+3).innerText//*row[i+3];
            }
		    percent = (Math.exp(sumProd)/(1+Math.exp(sumProd)))*100
		    percent = Math.round(percent * 100) / 100
      
			//creación nueva columna, con porcentaje de deserción
			const progressBar = document.createElement('div');
			const progressBarValue = document.createElement('div');
			const progressBarFill = document.createElement('div');
			progressBar.setAttribute('class', 'progress-bar');
			progressBarValue.setAttribute('class', 'progress-bar-value');
			if(percent <= 25) {
				progressBarFill.setAttribute('class', 'progress-bar-fill-low');
			}
			else if (percent > 25 && percent <= 75) {
				progressBarFill.setAttribute('class', 'progress-bar-fill-mid')
			}
			else {
				progressBarFill.setAttribute('class', 'progress-bar-fill-high')
			}
			progressBarValue.appendChild(document.createTextNode(percent + '%'));
			
			progressBarFill.style.width = `${percent}%`;
			progressBar.appendChild(progressBarValue);
			progressBar.appendChild(progressBarFill);

			cell.appendChild(progressBar);
			}
		row.appendChild(cell);
		
		// creación columna 'Ver Detalle'
		const cellDetail = document.createElement('td');
		if(counter < 1){
			cellDetail.appendChild(document.createTextNode('Detalle'));
		}
		else {
			const detail = document.createElement('button');
			detail.setAttribute('id', 'detailButton')
			detail.setAttribute('class', 'detail');
			detail.appendChild(document.createTextNode('Ver Detalle'));

			
			
			detail.onclick = function show() {
				
				var row = this.closest('tr');
				/* alert('Nombre: ' + row.cells.item(0).innerHTML + ' ' + row.cells.item(1).innerHTML); */
				var modal = document.getElementById('myModal');
				
				var span = document.getElementsByClassName('close')[0];

				var content = modal.querySelector('p');

				content.innerHTML = '<h1><b>Información</b></h1><br>' +
									'<ul> <li> Nombre: ' + row.cells.item(0).innerHTML + ' ' + row.cells.item(1).innerHTML +
									'</li><li> Edad: ' + row.cells.item(2).innerHTML +
									'</li><li> PSU Matemática: ' + row.cells.item(3).innerHTML +
									'</li><li> PSU Lenguaje: ' + row.cells.item(4).innerHTML +
									'</li><li> Puntaje Rankink: ' + row.cells.item(5).innerHTML +
									'</li><li> Puntaje NEM: ' + row.cells.item(6).innerHTML +
									'</li></ul><a class="mailButton" href="mailto:' + row.cells.item(7).innerHTML + '">Contactar</a>';
				content.style.textAlign = 'left';

				modal.style.display = 'block';

				span.onclick = function() {
					modal.style.display = 'none';
				}

				window.onclick = function(event) {
					if (event.target == modal) {
						modal.style.display = 'none';
					}
				}
			}

			cellDetail.appendChild(detail);
		}
		cellDetail.style.textAlign = 'center';
		row.appendChild(cellDetail);

		tableBody.appendChild(row);
		counter++;
	});
	tableBody.setAttribute('class', 'tableBody');
	table.appendChild(tableBody);
	return table;
}

/**
 * Función para parsear el contenido del CSV. Lo que hace es recibir un un string con
 * la data cruda, convertirla a una matriz de filaz y columnas (arreglo de arreglos)
 * 
 * @param {any} rawData: data "cruda" a parsear
 * @return {array} arreglo con la data parseada
 */
const parseCsvContent = (rawData) => {
	const newLinebrk = rawData.split("\n");
	return newLinebrk.map(row => row.split(','))
}

const createModal = () => {
	const modal = document.createElement('div');
	modal.setAttribute('id', 'myModal');
	modal.setAttribute('class', 'modal');

	const modalContent = document.createElement('div');
	modalContent.setAttribute('class', 'modalContent');

	const closeModal = document.createElement('span');
	closeModal.setAttribute('class', 'close');
	closeModal.appendChild(document.createTextNode('&times;'));

	const textContent = document.createElement('p');
	textContent.appendChild(document.createTextNode('hola'));

	modalContent.appendChild(closeModal);
	modalContent.appendChild(textContent);
	modal.appendChild(modalContent);
}
/**
 * Función main que contiene toda la lógica inicial de la aplicación. hace ciertos seteos
 * y por ahora lo que hace es bindear el input de subir archivos a una función para manejar
 * los cambios.
 * 
 * En caso de que se quieran manejar más inputs, agregar más eventos y todo 
 * 
 * @return {void}
 */
const main = () => {
	createModal();
	const input = document.getElementById('csvUploader');
	input.addEventListener('change', handleCsvUpload, false);

}

main();
