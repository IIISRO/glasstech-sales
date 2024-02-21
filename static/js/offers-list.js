var visitorsChart;
var pieChartVar;
var barChartVar;
function chart(dates, suc, act, fail)
{    'use strict'
  
    var ticksStyle = {
      fontColor: '#495057',
      fontStyle: 'bold'
    }
  
    var mode = 'index'
    var intersect = true
    var $visitorsChart = $('#visitors-chart')
    // eslint-disable-next-line no-unused-vars
    visitorsChart = new Chart($visitorsChart, {
    
    data: {
        labels: Object.keys(dates),
        datasets: [{
        label: "Aktiv",
        type: 'line',
        data: act,
        // backgroundColor: '007bff',
        borderColor: '#007bff',
        pointBorderColor: '#007bff',
        pointBackgroundColor: '#007bff',
        fill: true,
        // pointHoverBackgroundColor: '#007bff',
        // pointHoverBorderColor    : '#007bff'
        },
        {
        label: "Uğursuz",
        type: 'line',
        data: fail,
        // backgroundColor: 'tansparent',
        borderColor: '#ced4da',
        pointBorderColor: '#ced4da',
        pointBackgroundColor: '#ced4da',
        fill: false
        // pointHoverBackgroundColor: '#ced4da',
        // pointHoverBorderColor    : '#ced4da'
        },
        {
        label: "Uğurlu",
        type: 'line',
        data: suc,
        // backgroundColor: 'tansparent',
        borderColor: '#008000',
        pointBorderColor: '#008000',
        pointBackgroundColor: '#008000',
        fill: false
        // pointHoverBackgroundColor: '#ced4da',
        // pointHoverBorderColor    : '#ced4da'
        }]
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
            // suggestedMax: 200
            }, ticksStyle)
        }],
        xAxes: [{
            display: true,
            gridLines: {
            display: false
            },
            ticks: ticksStyle
        }],
   
        }
    }
    })

};


function  pieChart(h,m,l,u){
    var totalCustomerReferancedData = {
        labels: [
            'Yaxşı',
            'Orta',
            'Pis',
            'Təyin Edilməyib',
        ],
        datasets: [
          {
            data: [h,m,l,u],
            backgroundColor : ['#28a745', '#fd7e14', '#dc3545', '#6c757d'],
          }
        ]
      }
    //-------------
    //- PIE CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
    var pieData        = totalCustomerReferancedData;
    var pieOptions     = {
        maintainAspectRatio : false,
        responsive : true,
    }
    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    pieChartVar = new Chart(pieChartCanvas, {
        type: 'pie',
        data: pieData,
        options: pieOptions,
       
    })
}

function barChart(hv, mv, lv, uv){

    var potencyValData = {
        labels  : ['Dərəcələr'],
        datasets: [
          {
            label               : 'Yaxşı',
            backgroundColor: "#28a745", 
            borderColor         : 'rgba(60,141,188,0.8)',
            pointRadius          : false,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(60,141,188,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data                : [hv]
          },
          {
            label               : 'Orta',
            backgroundColor: "#fd7e14",
            borderColor         : 'rgba(60,141,188,0.8)',
            pointRadius          : false,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(60,141,188,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data                : [mv]
          },
          {
            label               : 'Pis',
            backgroundColor: "#dc3545",
            borderColor         : 'rgba(60,141,188,0.8)',
            pointRadius          : false,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(60,141,188,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data                : [lv]
          },
          {
            label               : 'Təyin edilməyən',
            backgroundColor: "#6c757d", 
            borderColor         : 'rgba(60,141,188,0.8)',
            pointRadius          : false,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(60,141,188,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data                : [uv]
          },
        ]
      }
    


    //-------------
    //- BAR CHART -
    //-------------
    var barChartCanvas = $('#barChart').get(0).getContext('2d')
    var barChartData = $.extend(false, {}, potencyValData)
    var temp0 = potencyValData.datasets
    barChartData.datasets = temp0
  
    var barChartOptions = {
        responsive              : true,
        maintainAspectRatio     : false,
        datasetFill             : false,
        plugins:{
            datalabels:{
                color:'rgb(185, 185, 185)',
                font:{weight: 'bold'},
                anchor:'end',
                align: 'top'
            }
       }
        
    }

    barChartVar =  new Chart(barChartCanvas, {
        type: 'bar',
        data: barChartData,
        options: barChartOptions,
        plugins:[ChartDataLabels]

    })
}


 


$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams){
            // Remove a specific parameter, for example, 'search'
            urlParams.delete('date');
            const newUrl = `${window.location.pathname}`;

            // Use the new URL
            window.history.replaceState({}, document.title, newUrl);

        
        }
    getOfferFetch();

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
            let potencyHigh = 0;
            let potencyMid = 0;
            let potencyLow = 0;
            let potencyHighVal = 0;
            let potencyMidVal = 0;
            let potencyLowVal = 0;
            let potencyUNDFVal = 0;

            $("#offerCount").text(data.length)
            let dates =  {}
            for(let offer of data){
                let date = offer.date.substring(3,10)
                if (!dates.hasOwnProperty(date)){
                    dates[date] = {
                        'Aktiv':0,
                        'Uğurlu':0,
                        'Uğursuz':0
                    }
                }
                if (offer.status == 'Aktiv'){
                    dates[date]['Aktiv']+=1
                }else if (offer.status == 'Uğurlu'){
                    dates[date]['Uğurlu']+=1
                }else if (offer.status == 'Uğursuz'){
                    dates[date]['Uğursuz']+=1
                }
                document.getElementById('offersListBody').innerHTML += 
                `  
                <tr>
                    <td><a href="/sales/detail/offer/${offer.number}">${offer.number}</a></td>
                    <td><a href="/customers/profile/${offer.customer.id}">${offer.customer.name}</a></td>
                    <td>${offer.status}</td>
                    <td>
                    ${
                        (function potency(){
                            if(offer.potency == "YAXŞI"){
                                potencyHigh++;
                                potencyHighVal+=offer.price;
                                return '<span style="color: green;"><span style="display: none;">1</span>YAXŞI</span>'
                            }else if(offer.potency == "ORTA"){
                                potencyMid++;
                                potencyMidVal+=offer.price;
                                return '<span style="color: rgb(255, 157, 0);"><span style="display: none;">2</span>ORTA</span>'
                            }else if(offer.potency == 'PİS'){
                                potencyLow++;
                                potencyLowVal+=offer.price;
                                return '<span style="color: rgb(189, 0, 0);"><span style="display: none;">3</span>PİS</span>'
                            }else{
                                potencyUNDFVal+=offer.price;
                                return '<span style="color: black;" >Təyin Edilməyib</span>'
                            }
                        })()
                    }
                    </td>
                    <td>${offer.price}</td>
                    <td>${offer.date}</td>
                </tr>
                `
            }
            let suc = []
            let act = []
            let fail = []
            for(let date in dates){
                suc.push(dates[date].Uğurlu)
                act.push(dates[date].Aktiv)
                fail.push(dates[date].Uğursuz)
            }

            chart(dates, suc, act, fail)
            pieChart(potencyHigh, potencyMid, potencyLow , data.length - (potencyHigh+potencyMid+potencyLow))
            $('#totalProfit').html(`<b>${(potencyHighVal+potencyMidVal+potencyLowVal+potencyUNDFVal).toFixed(1)}AZN</b>`)
            barChart((potencyHighVal).toFixed(1), (potencyMidVal).toFixed(1), (potencyLowVal).toFixed(1), (potencyUNDFVal).toFixed(1))
            $(function () {
                $("#offersTable").DataTable({
                    fixedColumns: {
                        start: 1,
                        end: 1
                    },
                    paging: false,
                    scrollCollapse: true,
                    scrollX: true,
                    scrollY: 500,
                    "responsive": true, "lengthChange": false, "autoWidth": false,
                    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#offersTable_wrapper .col-md-6:eq(0)');
                $.fn.dataTable.ext.errMode = 'none';
              });
            loader.hide()
        }
    })
}

//Date range picker
$('#offerdate').daterangepicker({
    locale: {
        format: 'DD/MM/YYYY'
            }
  })

$('#offerdate').on('change', function() {
    var offersTable = $('#offersTable').DataTable( {
        paging: false
    } );
    offersTable.destroy();

   
    visitorsChart.destroy();
    pieChartVar.destroy();
    barChartVar.destroy();



    $('#precentOffers').remove()
    var url = new URL(window.location.href);
    var search_params = url.searchParams;
    var new_params=[]
    search_params.set('date', $(this).val());
    url.search = search_params.toString();
    var new_url = url.toString();
    let stateObj = { id: "100" };
    window.history.replaceState(stateObj,"date", new_url);
    document.getElementById("offersListBody").innerHTML = ''
    getOfferFetch()
});     