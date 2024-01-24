
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
    var visitorsChart = new Chart($visitorsChart, {
    data: {
        labels: Object.keys(dates),
        datasets: [{
        type: 'line',
        data: act,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        pointBorderColor: '#007bff',
        pointBackgroundColor: '#007bff',
        fill: false
        // pointHoverBackgroundColor: '#007bff',
        // pointHoverBorderColor    : '#007bff'
        },
        {
        type: 'line',
        data: fail,
        backgroundColor: 'tansparent',
        borderColor: '#ced4da',
        pointBorderColor: '#ced4da',
        pointBackgroundColor: '#ced4da',
        fill: false
        // pointHoverBackgroundColor: '#ced4da',
        // pointHoverBorderColor    : '#ced4da'
        },
        {
        type: 'line',
        data: suc,
        backgroundColor: 'tansparent',
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
                                return '<span style="color: green;">YAXŞI</span>'
                            }else if(offer.potency == "ORTA"){
                                return '<span style="color: rgb(255, 157, 0);">ORTA</span>'
                            }else if(offer.potency == 'PİS'){
                                return '<span style="color: rgb(189, 0, 0);">PİS</span>'
                            }else{
                                return '<span style="color: black;" >Təyin Edilməyib</span>'
                            }
                        })()
                    }
                    </td>
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
$('#offerdate').daterangepicker({
    locale: {
        format: 'DD/MM/YYYY'
            }
  })

$('#offerdate').on('change', function() {
    table = $('#example1').DataTable( {
        paging: false
    } );
     
    table.destroy();
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