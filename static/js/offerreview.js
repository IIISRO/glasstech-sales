
var params = new URL(document.location).searchParams;

function getOfferFetch(){
    var api_url = getOfferApiURL

  
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
            for (let revision of data['revisions']){
                if(params.get("rev")){
                  if(revision.number ===  params.get('rev')){
                    startLoad(revision)
                    break;
                  }
                }else{
                  if(revision['is_active'] === true){
                      
                      startLoad(revision)
  
                      break;
                  }
                }
                function startLoad(revision){
                  let offerPackagesStartLine = document.getElementById('offer_packages_start_line')
                  let newerPackageID = 1
                  for(let package of revision['packages']){
                      let newerPackage =
                      `
                      <!-- package -->
                      <table class="packages" data-id = ${package.id} data-package_id="${newerPackageID}" id="package-${newerPackageID}" style="margin-bottom: 30px; width: 100%;" cellspacing="0" cellpadding="0" >
              
                        <tbody>
                          <!-- header -->
                          <tr style="height: 39.6pt;">
                              <!-- version -->
                              <td width="36" style=" text-align: center; width: 27.3pt; border: 1pt solid windowtext; background: rgb(231, 230, 230); padding: 0cm 5.4pt; height: 39.6pt;">
                                  ${
                                      (function versioncheck() {
                                          if (revision['packages'].length>1){
  
                                              
                                              return `
                                              <b id="package-${newerPackageID}-version" style="color: red;">VER${newerPackageID}</b>
                                              
                                              `
                                          }
                                          return `<b id="package-${newerPackageID}-version" style="color: red;"></b>`
                                      })()
                                  }                           
                              </td>
                              <!-- header titles -->
                              <td width="332" style=" text-align: center; width: 249.15pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; background: rgb(231, 230, 230); padding: 0cm 5.4pt; height: 39.6pt;">
                                <b>İşin  adı</b>
                              </td>
                              <td width="76" style="text-align: center; width: 2cm; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; background: rgb(231, 230, 230); padding: 0cm 5.4pt; height: 39.6pt;">
                                <b>Vahidi</b>
                              </td>
                              <td width="66" style="text-align: center; width: 49.6pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; background: rgb(231, 230, 230); padding: 0cm 5.4pt; height: 39.6pt;">
                                <b>Miqdarı</b>
                              </td>
                              <td width="76"  style=" text-align: center; width: 2cm; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; background: rgb(231, 230, 230); padding: 0cm 5.4pt; height: 39.6pt;">
                                <b>Vahidin qiyməti Azn</b>
                              </td>
                              <td width="85" style="text-align: center; width: 63.8pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; background: rgb(231, 230, 230); padding: 0cm 5.4pt; height: 39.6pt;">
                                <b>Məbləğ AZN</b>
                              </td>
                          </tr>
                        </tbody>
  
                        
                        
                        <tbody id='package-${newerPackageID}-services_start_line'>
                        </tbody>
                          
                        ${
                          (function delvcheck() {
                                if(package.delv > 0){
                                    return `
                                  <tbody>
                                    <!-- delv -->
                                    <tr style="height: 26.05pt;">
                                      <td width="585" colspan="5" style="width: 439.1pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
                                            <p style="margin: 0cm; font-size: 12pt; text-align: right;"><b>Çatdırılma</b></p>
                                        </td>
                                        <td width="86" colspan="2" style="width: 64.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
                                        <span style="display: flex; align-items: center; justify-content:center; ">
                                         <p style="margin: 0cm; font-size: 12pt; text-align: center; font-weight: bold;"><span id="package-${newerPackageID}-delvamount">${package.delv}</span> AZN</p>
                                         </span>  
                                        </td>
                                    </tr>
                                    
                                  </tbody>
                                    `
                                }else{
    
                                  return ''
                                }
                            })()
                            }
                        <tbody>
                            <!-- summa -->
                          <tr style="height: 26.05pt;">
                            <td width="85" colspan="2" style="width: 39.1pt; border-right:0pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
          
                            </td>
                            <td width="500" colspan="3" style="width: 400pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 0pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
                                <p style="margin: 0cm; font-size: 12pt; text-align: right;"><b>Ümumi (ƏDV Xaric)</b></p>
                            </td>
                            <td width="86" colspan="2" style="width: 64.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
                              <p style="margin: 0cm; font-size: 12pt; text-align: center; font-weight: bold;"><span id="package-${newerPackageID}-totalprice">0</span> AZN</p>
                            </td>
                          </tr>
                        </tbody>
                            
                        ${
                          (function discountcheck() {
                              if(package.discount > 0){
                                  return `
                                  <tbody id="package-${newerPackageID}-discount" >
                                      <!-- endirim -->
                                      <tr style="height: 26.05pt;">
                                          <td width="585" colspan="5" style="width: 439.1pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
                                              <p style="margin: 0cm; font-size: 12pt; text-align: right;"><b>Endirim</b></p>
                                          </td>
                                          <td width="86" colspan="2" style="width: 64.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
                                          <span style="display: flex; align-items: center; justify-content:center; ">
                                          <b id="package-${newerPackageID}-discountfield" style="padding:0px; width:50px; background: rgb(229, 229, 229); border:0px; margin: 0cm; font-size: 12pt; text-align: center; font-weight: bold;">${package.discount}</b><b>AZN</b>
                                          </span>  
                                          </td>
                                      </tr>
                                      <tr style="height: 26.05pt;">
                                          <td width="585" colspan="5" style="width: 439.1pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
                                          <p style="margin: 0cm; font-size: 12pt; text-align: right;"><b>Endirimli qiymət (ƏDV Xaric)</b></p>
                                          </td>
                                          <td width="86" colspan="2" style="width: 64.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
                                          <p style="margin: 0cm; font-size: 12pt; text-align: center; font-weight: bold;"><span id="package-${newerPackageID}-totalpricewdiscount"></span> AZN</p>
                                          </td>
                                      </tr>
                                  </tbody>
                                  `
                              }else{
  
                                  return ''
                              }
                          })()
                          }
                          ${
                              (function taxcheck() {
                                  if(package.tax > 0){
                                      return `
                                      <tbody id="package-${newerPackageID}-tax" >
                                      <!-- edv -->
                                      <tr style="height: 26.05pt;">
                                        <td width="585" colspan="5" style="width: 439.1pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
                                          <p style="margin: 0cm; font-size: 12pt; text-align: right;"><b>ƏDV 18%</b></p>
                                        </td>
                                        <td width="86" colspan="2" style="width: 64.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
                                          <p style="margin: 0cm; font-size: 12pt; text-align: center; font-weight: bold;"><span id="package-${newerPackageID}-taxprice">0</span> AZN</p>
                                        </td>
                                      </tr>
                                      <tr style="height: 26.05pt;">
                                        <td width="585" colspan="5" style="width: 439.1pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
                                        <p style="margin: 0cm; font-size: 12pt; text-align: right;"><b>Yekun (ƏDV Daxil Qiymət)</b></p>
                                        </td>
                                        <td width="86" colspan="2" style="width: 64.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
                                          <p style="margin: 0cm; font-size: 12pt; text-align: center; font-weight: bold;"><span id="package-${newerPackageID}-totalpricewtax">0</span> AZN</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                      `
                                  }else{
  
                                      return ''
                                  }
                              })()
                          }
                        
                        
                      </table>
                      
                      `
                      offerPackagesStartLine.insertAdjacentHTML('beforeBegin', newerPackage)
                      loadServices(package['services'], newerPackageID)
                      calcPackageTotalPrice(newerPackageID)
                      newerPackageID++;
                    
                  }
                  function loadServices(services,packageID){
                      let newerServiceStartLine = document.getElementById(`package-${packageID}-services_start_line`)
                      let newerServiceID = 1
                      for(let service of services){
                          let newerService =
                            `
                            <tbody data-id=${service.id} data-package_id="${packageID}" data-service_id="${newerServiceID}" class="services" id="package-${packageID}-service-${newerServiceID}">
                                <!-- service -->
                                <tr style="height: 138.95pt;">
                                <!-- service num -->
                                <td width="36" style="text-align: center; width: 27.3pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt; height: 138.95pt;">
                
                                  <p id="package-${packageID}-service-${newerServiceID}-index" style="margin: 10px 0px 10px 0px;">${newerServiceID}</p>
  
                          
                                </td>
                    
                                <!-- service -->
                                <td width="332" style="width: 500.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
                                    
                                    <b>${service.product.name}</b>
                    
                                    <p class="MsoNormal" style="margin: 0cm 0cm 0cm 2.1pt; font-size: 12pt">
                                        <b><span lang="AZ-LATIN" style="font-family: Arial, sans-serif;">&nbsp;</span></b>
                                    </p>
                    
                                    <!-- serivce detail -->
                                    ${service['detail']}
                    
                                </td>
                    
                                <!-- service unit -->
                                <td width="80" style="text-align: center; width: 103.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
                                    <p id="package-${packageID}-service-${newerServiceID}-unit">${service.product.unit}</p>
                                </td>
                    
                                <!-- service quantity -->
                                <td width="80" style="text-align: center; width: 103.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
                                <p id="package-${newerPackageID}-service-${newerServiceID}-quantity">${service['quantity']}</p>  
                                
                                </td>
                    
                                <!-- service price -->
                                <td width="80"  style="text-align: center; width: 103.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
                                <p id="package-${newerPackageID}-service-${newerServiceID}-price">${service['price']}</p>  
                                </td>
                    
                                <!-- service total price -->
                                <td width="80" style="text-align: center; width: 123.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
                                    <b class="servicetotalprice" id="package-${packageID}-service-${newerServiceID}-totalprice" >0</b>
                                </td>
                                </tr>
                            </tbody>
                            `
                          newerServiceStartLine.insertAdjacentHTML('beforebegin', newerService)
                          
                          let calcPackageID = packageID
                          let calcServiceID = newerServiceID
                        
                          
                          let servicePrice = parseFloat(document.getElementById(`package-${calcPackageID}-service-${calcServiceID}-price`).innerText)
                          let serviceQuantity = parseFloat(document.getElementById(`package-${calcPackageID}-service-${calcServiceID}-quantity`).innerText)
                          
                          if((servicePrice*serviceQuantity)>=1){
                            document.getElementById(`package-${calcPackageID}-service-${calcServiceID}-totalprice`).innerText = parseInt(servicePrice*serviceQuantity)
                          }
                          
                          newerServiceID++;
                          
                      }       
                  }
  
                  if(!revision.is_active){
                    offerDetailBTN = 
                    `
                    <a href='${offerDetailURL}' style="margin-top: 10px;" class="mb-2 btn btn-primary">Təklif Detalları</a>
                    `
                    document.getElementById('editanddetailbtn').insertAdjacentHTML('afterEnd',offerDetailBTN)
                    document.getElementById('editanddetailbtn').remove()
                    document.getElementById('docxBtn').remove()

                    
                  }
                  // revision  datas
                  $('#offer_creator').text(revision.offer_creator.full_name)
                  $('#offer_approver').text(revision.offer_approver.full_name)
                  $('#offer_note').html(revision['note'])
                  $('#offer_pay_delv_cond').html(revision['pay_delv_cond'])
                  $('#offer_delv_time').text(revision.delv_time)
                  $('#rev_num').text(revision.number)
                  $('#rev_date').text(revision.date)
                }
              
            }
           

          
        }

        loader.hide()
    });

}
getOfferFetch()








function calcPackageTotalPrice(calcPackageID){
 
  let packageServicesPrices = document.getElementById(`package-${calcPackageID}`).getElementsByClassName('servicetotalprice')
  let packageTotalPrice = 0
  for(let servicesTotalPrices of packageServicesPrices){
    if(!isNaN(parseInt(servicesTotalPrices.innerText))){
      packageTotalPrice += parseInt(servicesTotalPrices.innerText)
    }
  }
  if(packageTotalPrice>0){
    document.getElementById(`package-${calcPackageID}-totalprice`).innerText = packageTotalPrice
  }else{
    document.getElementById(`package-${calcPackageID}-totalprice`).innerText = 0
  }
  if(document.getElementById(`package-${calcPackageID}-delvamount`) && parseInt(document.getElementById(`package-${calcPackageID}-delvamount`).innerText)){
    document.getElementById(`package-${calcPackageID}-totalprice`).innerText = parseInt(document.getElementById(`package-${calcPackageID}-totalprice`).innerText) + parseInt(document.getElementById(`package-${calcPackageID}-delvamount`).innerText)
  }
  if(document.getElementById(`package-${calcPackageID}-discount`) != null){
    calcDiscountTotalPrice(null,calcPackageID)
  }
  if(document.getElementById(`package-${calcPackageID}-tax`) != null){
    calcTaxTotalPrice(calcPackageID)
  }
}

function calcDiscountTotalPrice(event,packageID){
  if(event != null){
    var calcPackageID =  event.target.dataset.package_id
  }else{
    var calcPackageID =  packageID
  }
  let discountPrice = parseInt(document.getElementById(`package-${calcPackageID}-discountfield`).innerText)
  let packageTotalPrice = parseInt(document.getElementById(`package-${calcPackageID}-totalprice`).innerText)
  if((packageTotalPrice-discountPrice) >= 1){
    document.getElementById(`package-${calcPackageID}-totalpricewdiscount`).innerText = packageTotalPrice-discountPrice
  }else{
    document.getElementById(`package-${calcPackageID}-totalpricewdiscount`).innerText = packageTotalPrice
  }
  if(document.getElementById(`package-${calcPackageID}-tax`) != null){
    calcTaxTotalPrice(calcPackageID)
  }
}

function calcTaxTotalPrice(packageID){
  let packageTotalPriceWDiscount = document.getElementById(`package-${packageID}-totalpricewdiscount`)
  if(packageTotalPriceWDiscount != null){
    if(parseInt(packageTotalPriceWDiscount.innerText) >= 1){
      let packageTaxPrice = document.getElementById(`package-${packageID}-taxprice`)
      let packageTotalPriceWTAX = document.getElementById(`package-${packageID}-totalpricewtax`)
      let taxPrice = parseInt(parseInt(packageTotalPriceWDiscount.innerText)*18/100)
      packageTaxPrice.innerText = taxPrice
      packageTotalPriceWTAX.innerText = parseInt(packageTotalPriceWDiscount.innerText)+taxPrice
    }
  }else{
    let packageTotalPrice = document.getElementById(`package-${packageID}-totalprice`)
    if(parseInt(packageTotalPrice.innerText) >= 1){
      let packageTaxPrice = document.getElementById(`package-${packageID}-taxprice`)
      let packageTotalPriceWTAX = document.getElementById(`package-${packageID}-totalpricewtax`)
      let taxPrice = parseInt(parseInt(packageTotalPrice.innerText)*18/100)
      packageTaxPrice.innerText = taxPrice
      packageTotalPriceWTAX.innerText = parseInt(packageTotalPrice.innerText)+taxPrice
    }
  }
}










