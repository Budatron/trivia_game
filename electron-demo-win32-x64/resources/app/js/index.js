const database = require('./js/database');

window.onload = function() {

  // Populate the table
  populateTable();

  // Add the add button click event
  document.getElementById('add').addEventListener('click', () => {
    var da = new Date();
    // Retrieve the input fields
    var preg = document.getElementById('preg');
    var r1 = document.getElementById('r1');
    var r2 = document.getElementById('r2');
    var r3 = document.getElementById('r3');
    var r4 = document.getElementById('r4');
    var v1 = document.getElementById('v1');
    var v2 = document.getElementById('v2');
    var v3 = document.getElementById('v3');
    var v4 = document.getElementById('v4');

    // Save the person in the database
    database.addData(da, preg.value, r1.value, r2.value, r3.value, r4.value, 
      v1.value, v2.value, v3.value, v4.value);

    // Reset the input fields
    preg.value = '';
    r1.value = '';
    r2.value = '';
    r3.value = '';
    r4.value = '';
    v1.value = '';
    v2.value = '';
    v3.value = '';
    v4.value = '';

    // Repopulate the table
    populateTable();
  });
};

// Populates the persons table
function populateTable() {

  // Retrieve the persons
  database.getData(function(datos) {

    datos.sort(function(a, b){
        return a.da-b.da;
    });
    // Generate the table body
    var tableBody = '';
    for (i = 0; i < datos.length; i++) {
      tableBody += '<tr>';
      tableBody += '  <td>' + datos[i].preg + '</td>';
      tableBody += '  <td>' + datos[i].r1 + '</td>';
      tableBody += '  <td>' + datos[i].r2 + '</td>';
      tableBody += '  <td>' + datos[i].r3 + '</td>';
      tableBody += '  <td>' + datos[i].r4 + '</td>';
      tableBody += '  <td>' + datos[i].v1 + '</td>';
      tableBody += '  <td>' + datos[i].v2 + '</td>';
      tableBody += '  <td>' + datos[i].v3 + '</td>';
      tableBody += '  <td>' + datos[i].v4 + '</td>';
      tableBody += '  <td><input type="button" value="Delete" onclick="deleteData(\'' + datos[i]._id + '\')"></td>';
      tableBody += '</tr>';
    }

    // Fill the table content
    document.getElementById('tablebody').innerHTML = tableBody;
  });
}

// Deletes a person
function deleteData(id) {

  // Delete the person from the database
  database.deleteData(id);

  // Repopulate the table
  populateTable();
}
