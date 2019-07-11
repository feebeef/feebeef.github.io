//https://jsonstorage.net/api/items/a5587458-5fd9-4fb0-a858-2c86c729bea3
    //console.log(Object.keys(oof.sales).length);

var rq = new XMLHttpRequest();



rq.open('GET','https://jsonstorage.net/api/items/a5587458-5fd9-4fb0-a858-2c86c729bea3' );

var sales, burger_by_species, burger_sales, species_sales;

rq.onload = function() {
   var oof = JSON.parse(rq.responseText);
    sales = oof.sales;
    burger_by_species = oof.burger_by_species;
    burger_sales = oof.burger_sales;
    species_sales = oof.species_sales;
    
    //Grubs and their sales
    console.log( sales);
    
    //Gallery of Speices and their total orders
    console.log(sales[0].datetime);
    console.log( new Date(sales[10].datetime));
     console.log(sales.length);
    createTable();
}
function createTable(){
    var table = document.getElementById("myTable");
    for(i = 0; i < sales.length; i++){
    // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(i+1);
        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        // Add some text to the new cells:
        cell1.innerHTML = i+1;
        cell2.innerHTML = sales[i].species;
         cell3.innerHTML = sales[i].burger;
        var d = new Date(sales[i].datetime);
        cell4.innerHTML =  "<a href = ''>" + d.getMonth() + " / " + d.getUTCDate() + " / " + d.getFullYear() + "</a>";
        var min = d.getMinutes()%60
        if(min<10) min = "0"+min
        cell5.innerHTML =d.getHours()+":" + min;
    }
}


rq.send();
