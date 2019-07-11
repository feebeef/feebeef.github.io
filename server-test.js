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
    //console.log(sales);
    
    //Gallery of Speices and their total orders
    console.log(sales[0].datetime);
    console.log( new Date(sales[10].datetime));
     console.log(sales.length);
    parseDateTime();
    createActivityChart();
    createTotalSalesChart();
    createBurgersperSpieces();
}
   var x_labels = [];
   var values = [];
   function createActivityChart(){
       for(i = 0; i<hours.length; i++){
           var char;
           var hr = hours[i].hour;
           if(hr<12){char = " am"}else if(hr>12){char = " pm"; hr -= 12}else char = " nn"
           x_labels.push(hr + char);
           values.push(hours[i].sales);
       }
    var ctx =document.getElementById('activity').getContext('2d');
      var myChart = new Chart(ctx, {
                type: 'line',

                data: {
                    labels: x_labels,
                    datasets: [{
                        label: 'Orders',
                        data: values,
                      backgroundColor: "rgba(89, 105, 255,0.5)",
                                    borderColor: "rgba(89, 105, 255,0.7)",
                                    borderWidth: 2
                        
                    }]
                },
                options: {
                    legend: {
                        display: true,
                        position: 'bottom',

                        labels: {
                            fontColor: '#71748d',
                            fontFamily: 'Circular Std Book',
                            fontSize: 14,
                        }
                    },
                    scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return value;
                    }
                }
            }]
        },
    }
      });
   }
   /*=================================================*/
   var years = []; var months = []; var days = []; var hours = [];
   function parseDateTime(){
       
       for(i = 0; i < sales.length; i++){
           var dt = new Date(sales[i].datetime);
           var y = dt.getFullYear(); var m = dt.getMonth();
           var d = dt.getDay(); var h = dt.getHours();
//           parseYear(y); parseMonth(m); 
//           parseDay(d); 
             parseHour(h);
       }
       console.log(years);console.log(months);console.log(days);console.log(hours);
           /*Parse*/
    function parseYear(y){ 
      let test = years.find(years => years['year'] == y);
      if(test == undefined)years.push({"year": y, "sales": 1})
      else test.sales += 1;
    }
    function parseMonth(m){
      let test = months.find(months => months['month'] == m);
      if(test == undefined)months.push({"month": m, "sales": 1})
      else test.sales += 1;
    }
    function parseDay(d){
      let test = days.find(days => days['day'] == d);
      if(test == undefined)days.push({"day": d, "sales": 1})
      else test.sales += 1;
    }
    function parseHour(h){
      let test = hours.find(hours => hours['hour'] == h);
      if(test == undefined){hours.push({"hour": h, "sales": 1})}
      else{test.sales += 1};
    }
       return hours;
   }
  /*=================================================*/

function createTotalSalesChart(){
       var d = [];
       var s = [];
       s = Object.keys(species_sales)
       for(i = 0; i<s.length; i++){
           d.push(species_sales[s[i]]);
       }
       var ctx = document.getElementById("total-sale").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                
                data: {
                    labels: s,
                    datasets: [{
                        backgroundColor: [
                            "#5969ff",
                            "#ff407b",
                            "#25d5f2",
                            "#7940ff",
                            "#af507b",
                            "#65c542",
                            "#b5c5f6",
                        ],
                        data:d
                    }]
                },
                options: {
                    legend: {
                        display: false

                    }
                }

            });
  }

function createBurgersperSpieces(){
    var ctx = document.getElementById("chartjs_balance_bar").getContext('2d');
    var d = [];
    var d2 = [];
    var d3 = [];
    var s = Object.keys(species_sales)
    d = Object.values(burger_by_species['Krabby Pattie'])
    d2 = Object.values(burger_by_species['Krusty Combo'])
    d3 = Object.values(burger_by_species['Krusty Deluxe'])
    
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(species_sales),
            datasets: [{
                label: 'Krabby Pattie',
                data: d,
                backgroundColor: "rgba(89, 105, 255,.8)",
                borderColor: "rgba(89, 105, 255,1)",
                borderWidth:2

            }, {
                label: 'Krusty Combo',
                data: d2,
                backgroundColor: "rgba(255, 64, 123,.8)",
                borderColor: "rgba(255, 64, 123,1)",
                borderWidth:2


            },  {
                label: 'Krusty Deluxe',
                data: d3,
                backgroundColor: "rgba(55, 64, 123,.8)",
                borderColor: "rgba(65, 64, 123,1)",
                borderWidth:2


            }]

        },
        options: {
            legend: {
                    display: true,

                    position: 'bottom',

                    labels: {
                        fontColor: '#71748d',
                        fontFamily:'Circular Std Book',
                        fontSize: 14,
                    }
            },

                scales: {
                    xAxes: [{
                ticks: {
                    fontSize: 8,
                     fontFamily:'Circular Std Book',
                     fontColor: '#71748d',
                }
            }],
            yAxes: [{
                ticks: {
                    fontSize: 8,
                     fontFamily:'Circular Std Book',
                     fontColor: '#71748d',
                }
            }]
                }
    }



});
}

function logout(){
    window.location.href = "http://www.w3schools.com";
}
  
rq.send();
