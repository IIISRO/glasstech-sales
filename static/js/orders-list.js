$(function () {
    'use strict'
  
    var ticksStyle = {
      fontColor: '#495057',
      fontStyle: 'bold'
    }
  
    var mode = 'index'
    var intersect = true
  
    var $salesChart = $('#sales-chart')
    // eslint-disable-next-line no-unused-vars
    var salesChart = new Chart($salesChart, {
      type: 'bar',
      data: {
        labels: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
        datasets: [
          {
            backgroundColor: '#007bff',
            borderColor: '#007bff',
            data: thisYearAvgs
          },
          {
            backgroundColor: '#ced4da',
            borderColor: '#ced4da',
            data: lastYearAvgs
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          mode: mode,
          intersect: intersect
        },
        hover: {
          mode: mode,
          intersect: intersect
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            // display: false,
            gridLines: {
              display: true,
              lineWidth: '4px',
              color: 'rgba(0, 0, 0, .2)',
              zeroLineColor: 'transparent'
            },
            ticks: $.extend({
              beginAtZero: true,
  
              // Include a dollar sign in the ticks
              callback: function (value) {
                if (value >= 1000) {
                  value /= 1000
                  value += 'k'
                }
  
                return '₼' + value
              }
            }, ticksStyle)
          }],
          xAxes: [{
            display: true,
            gridLines: {
              display: false
            },
            ticks: ticksStyle
          }]
        }
      }
    })
  
   
  })



$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams){
            // Remove a specific parameter, for example, 'search'
            urlParams.delete('date');
            const newUrl = `${window.location.pathname}`;

            // Use the new URL
            window.history.replaceState({}, document.title, newUrl);

        
        }
getOfferFetch()

});

function getOfferFetch(){
    var api_url = `${getOfferApiURL}${location.search}`
    async function Products(api_url=api_url) {
        loader.show()
        const response = await fetch(api_url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
        });
        
        return response.json(); // parses JSON response into native JavaScript objects
    }
    
    
    Products(api_url)
    .then((data) => {

        if (data){
            $("#offerCount").text(data.length)
            for(let order of data){
               
                document.getElementById('ordersListBody').innerHTML += 
                `  
                <tr>
                    <td><a href="/sales/detail/order/${order.number}">${order.number}</a></td>
                    <td><a href="/customers/profile/${order.customer.id}">${order.customer.name}</a></td>
                    <td>${order.customer_history}</td>
                    <td>
                    ${
                        (function status() {
                           if(order.status == 'Tamamlandı'){
                            return `<span style="color: green;">${order.status}</span>`
                           }else return order.status
                        })()
                    }
                    </td>
                    <td>${order.total}AZN</td>
                    <td>${order.date}</td>

                </tr>
                `
            }
          

            $(function () {
                $("#example1").DataTable({
                  "responsive": true, "lengthChange": false, "autoWidth": false,
                  "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
                $.fn.dataTable.ext.errMode = 'none';
              });
            loader.hide()
        }
    })
}

//Date range picker
$('#ordersdate').daterangepicker({
  locale: {
      format: 'DD/MM/YYYY'
          }
})

$('#ordersdate').on('change', function() {
    table = $('#example1').DataTable( {
        paging: false
    } );
     
    table.destroy();
    var url = new URL(window.location.href);
    var search_params = url.searchParams;
    search_params.set('date', $(this).val());
    url.search = search_params.toString();
    var new_url = url.toString();
    let stateObj = { id: "100" };
    window.history.replaceState(stateObj,"date", new_url);
    document.getElementById("ordersListBody").innerHTML = ''
    getOfferFetch()
});     