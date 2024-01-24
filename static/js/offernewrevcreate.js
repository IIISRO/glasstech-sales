

$(window).on('load', function() {
  $('#askLoadOldRevModal').modal('show');
    CKEDITOR.replace('offer_note', {
      filebrowserImageUploadUrl: ckeditor_upload,
        filebrowserImageBrowseUrl: ckeditor_browse,
        removePlugins: 'exportpdf',
        toolbarCanCollapse: true
    });
    CKEDITOR.replace('offer_pay_delv_cond', {
      filebrowserImageUploadUrl: ckeditor_upload,
      filebrowserImageBrowseUrl: ckeditor_browse,
      removePlugins: 'exportpdf',
      toolbarCanCollapse: true
    });



});


function loadOldRevisions(event){
    event.target.remove()
    $('#modalCloseBtn').remove()
    $('#oldRevsionsSelectDiv').html(
        `
        <p>Revision nömrəsi seçin:</p>
        <select class='form-control' name="" id="selectREV">
        ${
            (function listProducts() {
              var options = []
              for(let revision of revisions){
                options.push(`<option class="form-control" value="${revision}">${revision}</option>`)
              }
              return options
            })()
        }
        </select>
        `
    )
    $('#modalNextBtnDiv').html('<button onclick="getOfferFetch()" id="modalNextBtn" type="button" class="btn btn-primary" data-dismiss="modal">Davam et</button>')
}

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
                if(revision['number'] === $('#selectREV').find(":selected").val()){
                    let offerPackagesStartLine = document.getElementById('offer_packages_start_line')
                    let newerPackageID = 1
                    let iterations = revision['packages'].length;
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
                                        (function versionrmvbtncheck() {
                                            if (revision['packages'].length>1){

                                                
                                                return `
                                                <button id="package-${newerPackageID}-removebtn" type="button" data-package_id='${newerPackageID}' onclick="removePackage(event)" style="margin-top: 10px; display: flex; justify-content: center; align-items: center;  height: 20px; width: 100%; font-weight: bold;" class="btn btn-danger">-</button>
                                                <b id="package-${newerPackageID}-version" style="color: red;">VER${newerPackageID}</b>
                                                
                                                `
                                            }
                                            return `<b id="package-${newerPackageID}-version" style="color: red;"></b>`
                                        })()
                                    }
                                  
                                    ${
                                        (function addbtncheck() {
                                            if (!--iterations){

                                                return `<button type="button" id="package-${newerPackageID}-addbtn" data-package_id="${newerPackageID}" onclick="addPackage(event)" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center;  height: 20px; width: 100%; font-weight: bold;" class="btn btn-success">+</button>`
                                            }
                                            return ''
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
                                      <tbody id="package-${newerPackageID}-delv" >
                                      <!-- delv -->
                                      <tr style="height: 26.05pt;">
                                        <td width="585" colspan="5" style="width: 439.1pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
                                              <p style="margin: 0cm; font-size: 12pt; text-align: right;"><b>Çatdırılma</b></p>
                                          </td>
                                          <td width="86" colspan="2" style="width: 64.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
                                          <span style="display: flex; align-items: center; justify-content:center; ">
                                          <input required onchange="calcDelvTotalPrice(event,null)" data-package_id = ${newerPackageID} class='form-control integerfield' placeholder='0' id="package-${newerPackageID}-delvfield" value='${package.delv}' style="padding:0px; width:50px; background: rgb(229, 229, 229); border:0px; margin: 0cm; font-size: 12pt; text-align: center; font-weight: bold;"><b>AZN</b>
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
                              ${
                                (function discountbtncheck() {
                                    if(package.discount > 0){
                                        return `<button id="package-${newerPackageID}-discountbtn" data-package_id="${newerPackageID}" onclick="packageDiscountField(event)" style="font-size: 12px;" type="button" class="btn-sm btn btn-warning">ENDİRİM</button>`
                                    }else{
    
                                        return `<button id="package-${newerPackageID}-discountbtn" data-package_id="${newerPackageID}" onclick="packageDiscountField(event)" style="font-size: 12px;" type="button" class="btn-sm btn btn-secondary">ENDİRİM</button>`
                                    }
                                })()
                                }
                                ${
                                    (function taxtbtncheck() {
                                        if(package.tax > 0){
                                            return `<button id="package-${newerPackageID}-taxbtn" data-package_id="${newerPackageID}" onclick="packageTaxField(event)" style="font-size: 12px;" type="button" class="btn-sm btn btn-warning">ƏDV</button>`
                                        }else{
        
                                            return `<button id="package-${newerPackageID}-taxbtn" data-package_id="${newerPackageID}" onclick="packageTaxField(event)" style="font-size: 12px;" type="button" class="btn-sm btn btn-secondary">ƏDV</button>`
                                        }
                                    })()
                                    }
                                    ${
                                      (function delvbtncheck() {
                                          if(package.delv > 0){
                                              return `<button id="package-1-delvbtn" data-package_id="1" onclick="packageDelvField(event)" style="font-size: 12px;" type="button" class="btn-sm btn btn-warning">Çatdırılma</button>`
                                          }else{
                                            return `<button id="package-1-delvbtn" data-package_id="1" onclick="packageDelvField(event)" style="font-size: 12px;" type="button" class="btn-sm btn btn-secondary">Çatdırılma</button>`
          
                                          }
                                      })()
                                      }
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
                                            <input value="${package.discount}" required onchange="calcDiscountTotalPrice(event,null)" data-package_id = ${newerPackageID} class='form-control integerfield' placeholder='0' id="package-${newerPackageID}-discountfield" style="padding:0px; width:50px; background: rgb(229, 229, 229); border:0px; margin: 0cm; font-size: 12pt; text-align: center; font-weight: bold;"><b>AZN</b>
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
                        let iterations = services.length;
                        for(let service of services){
                           let newerService =
                              `
                              <tbody data-id=${service.id} data-package_id="${packageID}" data-service_id="${newerServiceID}" class="services" id="package-${packageID}-service-${newerServiceID}">
                                  <!-- service -->
                                  <tr style="height: 138.95pt;">
                                  <!-- service num -->
                                  <td width="36" style="text-align: center; width: 27.3pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt; height: 138.95pt;">
                                      ${
                                        (function versionrmvbtncheck() {
                                            if (services.length>1){

                                                
                                                return `<button id="package-${packageID}-service-${newerServiceID}-removebtn" type="button" data-package_id='${packageID}' data-service_id="${newerServiceID}" onclick="removeService(event)"style="display: flex; justify-content: center; align-items: center;  height: 20px; width: 100%; font-weight: bold;" class="btn btn-danger">-</button>`
                                            }
                                            return ''
                                        })()
                                    }
                                    <p id="package-${packageID}-service-${newerServiceID}-index" style="margin: 10px 0px 10px 0px;">${newerServiceID}</p>

                                  
                                    ${
                                        (function addbtncheck() {
                                            if (!--iterations){

                                                return `<button type="button" id="package-${packageID}-service-${newerServiceID}-addbutton" data-package_id='${packageID}' data-service_id="${newerServiceID}" onclick="addService(event)" style="display: flex; justify-content: center; align-items: center;  height: 20px; width: 100%; font-weight: bold;" class="btn btn-success">+</button>`
                                            }
                                            return ''
                                        })()
                                    }
                                  </td>
                      
                                  <!-- service -->
                                  <td width="332" style="width: 500.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
                                      <select required class="form-control" style="background: rgb(245, 245, 245); border: 0;" onchange="findUnit(event)" data-package_id="${packageID}" data-service_id="${newerServiceID}" name="package-${packageID}-service-${newerServiceID}-product" id="package-${packageID}-service-${newerServiceID}-product">
                                      <option disabled  value="">------------</option>
                                      ${
                                        (function listProducts() {
                                          var options = []
                                          for(let product of productsList){
                                            if (parseInt(product.id) === service.product.id){
                                                options.push(`<option selected class="form-control" data-prodid="${product.id}" data-unit="${product.unit}" value="${product.id}">${product.name}</option>`)
                                            }else{
                                                options.push(`<option class="form-control" data-prodid="${product.id}" data-unit="${product.unit}" value="${product.id}">${product.name}</option>`)
                                            }
                                          }
                                          return options
                                        })()
                                      }
                                      </select>
                                      <button onclick="checkServiceUsedProd(event)" data-package_id="${packageID}" data-service_id="${newerServiceID}" class="btn-xs btn mt-1 btn-success" type="button" data-toggle="collapse" data-target="#package-${packageID}-service-${newerServiceID}-UsedServiceModal" aria-expanded="false" id='package-${packageID}-service-${newerServiceID}-UsedServiceModalBTN'  aria-controls="package-${packageID}-service-${newerServiceID}-UsedServiceModal">
                                      İstifadə olunan material
                                      </button>
                                      <div class="collapse" id="package-${packageID}-service-${newerServiceID}-UsedServiceModal">
                                        <div class="card usedmaterials  card-body">
                                            <label for="">Məhsul:</label>
                                            <select style="height: 30px;" class="form-control" id="package-${packageID}-service-${newerServiceID}-usedprod">
                                                <option value="" selected disabled>------</option>
                                                ${
                                                    (function prodList() {
                                                        let prodChoiceList = []
                                                        for(let prod of productsList){
                                                            prodChoiceList.push(`<option value="${prod.id}" >${prod.name}</option>`)
                                                        }
                                                        return prodChoiceList
                                                    })()
                                                }
                                            </select>
                                            <div class="row">
                                                <div class="col">
                                                    <label for="">Qiymət:</label>
                                                    <input style="height: 30px;" class="floatfield form-control" id="package-${packageID}-service-${newerServiceID}-usedprodprice" type="text">
                                                </div>
                                                <div class="col">
                                                    <label for="">Say:</label>
                                                    <input style="height: 30px;" class="floatfield form-control" id="package-${packageID}-service-${newerServiceID}-usedprodquantity" type="text">
                                                </div>
                                            </div>
                                        </div>
                                      </div>
                                      <p class="MsoNormal" style="margin: 0cm 0cm 0cm 2.1pt; font-size: 12pt">
                                          <b><span lang="AZ-LATIN" style="font-family: Arial, sans-serif;">&nbsp;</span></b>
                                      </p>
                                      <select data-package_id="${packageID}" data-service_id="${newerServiceID}" onchange="setTemplate(event)" class="form-control" name="" id="package-${packageID}-service-${newerServiceID}-templates">
                                        <option value="">Boş şablon</option>
                                      </select>
                                      <!-- serivce detail -->
                                      <textarea required name="package-${packageID}-service-${newerServiceID}-detail" id="package-${packageID}-service-${newerServiceID}-detail" cols="30" rows="10"></textarea>
                      
                                  </td>
                      
                                  <!-- service unit -->
                                  <td width="80" style="text-align: center; width: 103.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
                                      <p id="package-${packageID}-service-${newerServiceID}-unit">---</p>
                                  </td>
                      
                                  <!-- service quantity -->
                                  <td width="80" style="text-align: center; width: 103.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
                                      <input value="${service['quantity']}" required data-package_id="${packageID}" data-service_id="${newerServiceID}" onchange="calcServiceTotalPrice(event)" style="background: rgb(245, 245, 245); border: 0;" placeholder="0.0" class="floatfield form-control" type="text" name="package-${newerPackageID}-service-${newerServiceID}-quantity" id="package-${newerPackageID}-service-${newerServiceID}-quantity">
                                  </td>
                      
                                  <!-- service price -->
                                  <td width="80"  style="text-align: center; width: 103.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
                                  <input value="${service['price']}" required data-package_id="${packageID}" data-service_id="${newerServiceID}" onchange="calcServiceTotalPrice(event)" style="background: rgb(245, 245, 245); border: 0;" placeholder="0.0" class="floatfield form-control" type="text" name="package-${newerPackageID}-service-${newerServiceID}-price" id="package-${newerPackageID}-service-${newerServiceID}-price">
                                  </td>
                      
                                  <!-- service total price -->
                                  <td width="80" style="text-align: center; width: 123.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
                                      <b class="servicetotalprice" id="package-${packageID}-service-${newerServiceID}-totalprice" >0</b>
                                  </td>
                                  </tr>
                              </tbody>
                              `
                            newerServiceStartLine.insertAdjacentHTML('beforebegin', newerService)
                            var templateSelect = $(`#package-${packageID}-service-${newerServiceID}-templates`)
                            fetch(`/products/get-templates/${service.product.id}`,{
                              method:"GET",
                              headers: {
                                "Accept": "application/json",
                                'Content-Type': 'application/json'
                              },
                            })
                            .then((response)=>{
                              return response.json()
                            })
                            .then((data)=>{
                              $.each(data.templates, function (index, template) {
                                if(service.detail.replace(/\s/g, '') == template.description.replace(/\s/g, '')){
                                  templateSelect.append($('<option>', {
                                    value: template.description,
                                    text: `Şablon ${index + 1}`,
                                    selected: true
                                  }));
                                }else{
                                  templateSelect.append($('<option>', {
                                    value: template.description,
                                    text: `Şablon ${index + 1}`,
                                  }));
                                }
                              });
                          
                          })
                            // usedmaterials
                            if(service.used_products.length>=1){
                              $(`#package-${packageID}-service-${newerServiceID}-UsedServiceModal`).collapse()
                              $(`#package-${packageID}-service-${newerServiceID}-UsedServiceModalBTN`).removeClass('btn-success').addClass('btn-danger')
                              $(`#package-${packageID}-service-${newerServiceID}-usedprod`).prop('required',true);
                              $(`#package-${packageID}-service-${newerServiceID}-usedprodprice`).prop('required',true);
                              $(`#package-${packageID}-service-${newerServiceID}-usedprodquantity`).prop('required',true);
                              for(let usedprod of service.used_products){
                                $(`#package-${packageID}-service-${newerServiceID}-usedprod`).val(usedprod.product);
                                $(`#package-${packageID}-service-${newerServiceID}-usedprodprice`).val(usedprod.price);
                                $(`#package-${packageID}-service-${newerServiceID}-usedprodquantity`).val(usedprod.quantity);
                              }
                            }
                            let serviceUnit =  $(`#package-${packageID}-service-${newerServiceID}-unit`)
                            serviceUnit.text($(`#package-${packageID}-service-${newerServiceID}-product option:selected`).data('unit'))
                            let calcPackageID = packageID
                            let calcServiceID = newerServiceID
                          
                            
                            let servicePrice = parseFloat(document.getElementById(`package-${calcPackageID}-service-${calcServiceID}-price`).value)
                            let serviceQuantity = parseFloat(document.getElementById(`package-${calcPackageID}-service-${calcServiceID}-quantity`).value)
                            
                            if((servicePrice*serviceQuantity)>=1){
                              document.getElementById(`package-${calcPackageID}-service-${calcServiceID}-totalprice`).innerText = parseInt(servicePrice*serviceQuantity)
                            }
                            CKEDITOR.replace(`package-${packageID}-service-${newerServiceID}-detail`, {
                                filebrowserImageUploadUrl:  ckeditor_upload,
                                filebrowserImageBrowseUrl: ckeditor_browse,
                                removePlugins: 'exportpdf',
                                toolbarCanCollapse: true,
                            });
                            CKEDITOR.instances[`package-${packageID}-service-${newerServiceID}-detail`].setData(service['detail'])
                            newerServiceID++;
                            
                        }       
                    }

                    for(let option of document.getElementById('offer_creator')){
                        if(parseInt(option.value)===revision.offer_creator.id){
                            option.selected = true;
                        }
                    }
                    for(let option of document.getElementById('offer_approver')){
                        if(parseInt(option.value)===revision.offer_approver.id){
                            option.selected = true;
                        }
                    }

           
                    CKEDITOR.instances['offer_note'].setData(revision['note'])    

                    CKEDITOR.instances['offer_pay_delv_cond'].setData(revision['pay_delv_cond'])    
                    $('#offer_delv_time').val(revision.delv_time)


                    break;
                }
            }
           

          
        }
        checkFloatInput()

        loader.hide()
    });

}

function createNewRevisionPackage(){
  loader.show()
  let offerPackagesStartLine = document.getElementById('offer_packages_start_line')
  new_rev_package = 
  `
  <!-- package -->
  <table class="packages" data-package_id="1" id="package-1" style="margin-bottom: 30px; width: 100%;" cellspacing="0" cellpadding="0" >
  
    <tbody>
      <!-- header -->
      <tr style="height: 39.6pt;">
          <!-- version -->
          <td width="36" style=" text-align: center; width: 27.3pt; border: 1pt solid windowtext; background: rgb(231, 230, 230); padding: 0cm 5.4pt; height: 39.6pt;">
            <b id="package-1-version" style="color: red;"></b>
            <button type="button" id="package-1-addbtn" data-package_id="1" onclick="addPackage(event)" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center;  height: 20px; width: 100%; font-weight: bold;" class="btn btn-success">+</button>
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
  
  
    <tbody data-package_id="1" data-service_id="1" class="services" id="package-1-service-1">
      <!-- service -->
      <tr style="height: 138.95pt;">
        <!-- service num -->
        <td width="36" style="text-align: center; width: 27.3pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt; height: 138.95pt;">
          <p id="package-1-service-1-index" style="margin: 10px 0px 10px 0px;">1</p>
          <button type="button" id="package-1-service-1-addbutton" data-package_id='1' data-service_id="1" onclick="addService(event)" style="display: flex; justify-content: center; align-items: center;  height: 20px; width: 100%; font-weight: bold;" class="btn btn-success">+</button>
        </td>
  
        <!-- service -->
        <td width="332" style="width: 500.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
          <select required class="form-control" style="background: rgb(245, 245, 245); border: 0;" onchange="findUnit(event)" data-package_id="1" data-service_id="1" name="package-1-service-1-product" id="package-1-service-1-product">
          <option selected disabled  value="">------------</option>
            ${
              (function listProducts() {
                var options = []
                for(let product of productsList){
                 
                    options.push(`<option class="form-control" data-prodid="${product.id}" data-unit="${product.unit}" value="${product.id}">${product.name}</option>`)
                }
                return options
              })()
            }
          </select>
          <button onclick="checkServiceUsedProd(event)" data-package_id="1" data-service_id="1" class="btn-xs btn mt-1 btn-success" type="button" data-toggle="collapse" data-target="#package-1-service-1-UsedServiceModal" aria-expanded="false" id='package-1-service-1-UsedServiceModalBTN'  aria-controls="package-1-service-1-UsedServiceModal">
          İstifadə olunan material
          </button>
          <div class="collapse" id="package-1-service-1-UsedServiceModal">
            <div class="card usedmaterials  card-body">
                <label for="">Məhsul:</label>
                <select style="height: 30px;" class="form-control" id="package-1-service-1-usedprod">
                    <option value="" selected disabled>------</option>
                    ${
                        (function prodList() {
                            let prodChoiceList = []
                            for(let prod of productsList){
                                prodChoiceList.push(`<option value="${prod.id}" >${prod.name}</option>`)
                            }
                            return prodChoiceList
                        })()
                    }
                </select>
                <div class="row">
                    <div class="col">
                        <label for="">Qiymət:</label>
                        <input style="height: 30px;" class="floatfield form-control" id="package-1-service-1-usedprodprice" type="text">
                    </div>
                    <div class="col">
                        <label for="">Say:</label>
                        <input style="height: 30px;" class="floatfield form-control" id="package-1-service-1-usedprodquantity" type="text">
                    </div>
                </div>
            </div>
          </div>
          <p class="MsoNormal" style="margin: 0cm 0cm 0cm 2.1pt; font-size: 12pt">
              <b><span lang="AZ-LATIN" style="font-family: Arial, sans-serif;">&nbsp;</span></b>
          </p>
  
          <!-- serivce detail -->
            <select data-package_id="1" data-service_id="1" onchange="setTemplate(event)" class="form-control" name="" id="package-1-service-1-templates">
              <option value="">Boş şablon</option>
            </select>
            <textarea required name="package-1-service-1-detail" id="package-1-service-1-detail" cols="30" rows="10"></textarea>
  
        </td>
  
        <!-- service unit -->
        <td width="80" style="text-align: center; width: 103.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
          <p id="package-1-service-1-unit">---</p>
        </td>
  
        <!-- service quantity -->
        <td width="80" style="text-align: center; width: 103.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
          <input required data-package_id="1" data-service_id="1" onchange="calcServiceTotalPrice(event)" style="background: rgb(245, 245, 245); border: 0;" placeholder="0.0" class="floatfield form-control" type="text" name="package-1-service-1-quantity" id="package-1-service-1-quantity">
        </td>
  
        <!-- service price -->
        <td width="80"  style="text-align: center; width: 103.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
        <input required data-package_id="1" data-service_id="1" onchange="calcServiceTotalPrice(event)" style="background: rgb(245, 245, 245); border: 0;" placeholder="0.0" class="floatfield form-control" type="text" name="package-1-service-1-price" id="package-1-service-1-price">
        </td>
  
        <!-- service total price -->
        <td width="80" style="text-align: center; width: 123.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
          <b class="servicetotalprice" id="package-1-service-1-totalprice" >0</b>
        </td>
      </tr>
    </tbody>
      
    <tbody>
      <!-- summa -->
      <tr style="height: 26.05pt;">
        <td width="85" colspan="2" style="width: 39.1pt; border-right:0pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
          <button id="package-1-discountbtn" data-package_id="1" onclick="packageDiscountField(event)" style="font-size: 12px;" type="button" class="btn-sm btn btn-secondary">ENDİRİM</button>
          <button id="package-1-taxbtn" data-package_id="1" onclick="packageTaxField(event)" style="font-size: 12px;" type="button" class="btn-sm btn btn-secondary">ƏDV</button>
          <button id="package-1-delvbtn" data-package_id="1" onclick="packageDelvField(event)" style="font-size: 12px;" type="button" class="btn-sm btn btn-secondary">Çatdırılma</button>
          </td>
        <td width="500" colspan="3" style="width: 400pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 0pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
            <p style="margin: 0cm; font-size: 12pt; text-align: right;"><b>Ümumi (ƏDV Xaric)</b></p>
        </td>
        <td width="86" colspan="2" style="width: 64.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
          <p style="margin: 0cm; font-size: 12pt; text-align: center; font-weight: bold;"><span id="package-1-totalprice">0</span> AZN</p>
        </td>
      </tr>
    </tbody>
  
  </table>
  `
  offerPackagesStartLine.insertAdjacentHTML('beforeBegin', new_rev_package)
  CKEDITOR.replace('package-1-service-1-detail', {
    filebrowserImageUploadUrl: ckeditor_upload,
    filebrowserImageBrowseUrl: ckeditor_browse,
    removePlugins: 'exportpdf',
    toolbarCanCollapse: true
  });
  checkFloatInput()
  checkIntInput()
  loader.hide()
}

function addService(event){
  loader.show()

  let packageID = event.target.dataset.package_id
  let lastServiceID = event.target.dataset.service_id
  let newerServiceID = parseInt(lastServiceID)+1
  let lastService = document.getElementById(`package-${packageID}-service-${lastServiceID}`)

  event.target.remove()
  let newerService = 
  `
  <tbody data-package_id="${packageID}" data-service_id="${newerServiceID}" class="services" id="package-${packageID}-service-${newerServiceID}">
    <!-- service -->
    <tr style="height: 138.95pt;">
      <!-- service num -->
      <td width="36" style="text-align: center; width: 27.3pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt; height: 138.95pt;">
      <button id="package-${packageID}-service-${newerServiceID}-removebtn" type="button" data-package_id='${packageID}' data-service_id="${newerServiceID}" onclick="removeService(event)" style="display: flex; justify-content: center; align-items: center;  height: 20px; width: 100%; font-weight: bold;" class="btn btn-danger">-</button>
      <p id="package-${packageID}-service-${newerServiceID}-index" style="margin: 10px 0px 10px 0px;">${newerServiceID}</p>
      <button type="button" id="package-${packageID}-service-${newerServiceID}-addbutton" data-package_id='${packageID}' data-service_id="${newerServiceID}" onclick="addService(event)" style="display: flex; justify-content: center; align-items: center;  height: 20px; width: 100%; font-weight: bold;" class="btn btn-success">+</button>
      </td>

      <!-- service -->
      <td width="332" style="width: 500.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
        <select required class="form-control" style="background: rgb(245, 245, 245); border: 0;" onchange="findUnit(event)" data-package_id="${packageID}" data-service_id="${newerServiceID}" name="package-${packageID}-service-${newerServiceID}-product" id="package-${packageID}-service-${newerServiceID}-product">
          <option disabled selected value="">------------</option>
          ${
            (function listProducts() {
              var options = []
              for(let product of productsList){
                options.push(`<option class="form-control" data-prodid="${product.id}" data-unit="${product.unit}" value="${product.id}">${product.name}</option>`)
              }
              return options
            })()
          }
        </select>
        <button onclick="checkServiceUsedProd(event)" data-package_id="${packageID}" data-service_id="${newerServiceID}" class="btn-xs btn mt-1 btn-success" type="button" data-toggle="collapse" data-target="#package-${packageID}-service-${newerServiceID}-UsedServiceModal" aria-expanded="false" id='package-${packageID}-service-${newerServiceID}-UsedServiceModalBTN'  aria-controls="package-${packageID}-service-${newerServiceID}-UsedServiceModal">
        İstifadə olunan material
        </button>
        <div class="collapse" id="package-${packageID}-service-${newerServiceID}-UsedServiceModal">
          <div class="card usedmaterials  card-body">
              <label for="">Məhsul:</label>
              <select style="height: 30px;" class="form-control" id="package-${packageID}-service-${newerServiceID}-usedprod">
                  <option value="" selected disabled>------</option>
                  ${
                      (function prodList() {
                          let prodChoiceList = []
                          for(let prod of productsList){
                              prodChoiceList.push(`<option value="${prod.id}" >${prod.name}</option>`)
                          }
                          return prodChoiceList
                      })()
                  }
              </select>
              <div class="row">
                  <div class="col">
                      <label for="">Qiymət:</label>
                      <input style="height: 30px;" class="floatfield form-control" id="package-${packageID}-service-${newerServiceID}-usedprodprice" type="text">
                  </div>
                  <div class="col">
                      <label for="">Say:</label>
                      <input style="height: 30px;" class="floatfield form-control" id="package-${packageID}-service-${newerServiceID}-usedprodquantity" type="text">
                  </div>
              </div>
          </div>
        </div>
        <p class="MsoNormal" style="margin: 0cm 0cm 0cm 2.1pt; font-size: 12pt">
            <b><span lang="AZ-LATIN" style="font-family: Arial, sans-serif;">&nbsp;</span></b>
        </p>

        <!-- serivce detail -->
          <select data-package_id="${packageID}" data-service_id="${newerServiceID}" onchange="setTemplate(event)" class="form-control" name="" id="package-${packageID}-service-${newerServiceID}-templates">
            <option value="">Boş şablon</option>
            
          </select>
          <textarea required name="package-${packageID}-service-${newerServiceID}-detail" id="package-${packageID}-service-${newerServiceID}-detail" cols="30" rows="10"></textarea>

      </td>

      <!-- service unit -->
      <td width="80" style="text-align: center; width: 103.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
        <p id="package-${packageID}-service-${newerServiceID}-unit">---</p>
      </td>

      <!-- service quantity -->
      <td width="80" style="text-align: center; width: 103.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
        <input required data-package_id="${packageID}" data-service_id="${newerServiceID}" onchange="calcServiceTotalPrice(event)" style="background: rgb(245, 245, 245); border: 0;" placeholder="0.0" class="floatfield form-control" type="text" name="package-${packageID}-service-${newerServiceID}-quantity" id="package-${packageID}-service-${newerServiceID}-quantity">
      </td>

      <!-- service price -->
      <td width="80"  style="text-align: center; width: 103.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
        <input required data-package_id="${packageID}" data-service_id="${newerServiceID}" onchange="calcServiceTotalPrice(event,${null},${null})" style="background: rgb(245, 245, 245); border: 0;" placeholder="0.0" class="floatfield form-control" type="text" name="package-${packageID}-service-${newerServiceID}-price" id="package-${packageID}-service-${newerServiceID}-price">

      </td>

      <!-- service  total price -->
      <td width="80" style="text-align: center; width: 123.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
        <b class="servicetotalprice" id="package-${packageID}-service-${newerServiceID}-totalprice">0</b>

      </td>
    </tr>
  </tbody>
  `
  // add remove btn
  if (lastServiceID == 1){
    let removeBtn = `<button id="package-${packageID}-service-${lastServiceID}-removebtn" type="button" data-package_id='${packageID}' data-service_id="${lastServiceID}" onclick="removeService(event)"style="display: flex; justify-content: center; align-items: center;  height: 20px; width: 100%; font-weight: bold;" class="btn btn-danger">-</button>`
    document.getElementById(`package-${packageID}-service-${lastServiceID}-index`).insertAdjacentHTML('beforeBegin', removeBtn)
  }
  lastService.insertAdjacentHTML('afterEnd',newerService)

  
  

  CKEDITOR.replace(`package-${packageID}-service-${newerServiceID}-detail`, {
    filebrowserImageUploadUrl: `${ ckeditor_upload }`,
    filebrowserImageBrowseUrl: `${ ckeditor_browse }`,
    removePlugins: 'exportpdf',
    toolbarCanCollapse: true

  });

  checkFloatInput()
  return loader.hide()
}

function addPackage(event){ 
  loader.show()
  let lastPackageID = event.target.dataset.package_id
  let newerPackageID = parseInt(lastPackageID)+1
  let lastPackage = document.getElementById(`package-${lastPackageID}`)

  event.target.remove()

  let newerPackage = 
  `
  <table class="packages" data-package_id="${newerPackageID}" id="package-${newerPackageID}" style="margin-bottom: 30px; width: 100%;" cellspacing="0" cellpadding="0" >

    <tbody>
      <!-- header -->
      <tr style="height: 39.6pt;">
          <!-- version -->
          <td width="36" style=" text-align: center; width: 27.3pt; border: 1pt solid windowtext; background: rgb(231, 230, 230); padding: 0cm 5.4pt; height: 39.6pt;">
            <button id="package-${newerPackageID}-removebtn" type="button" data-package_id='${newerPackageID}' onclick="removePackage(event)" style="margin-top: 10px; display: flex; justify-content: center; align-items: center;  height: 20px; width: 100%; font-weight: bold;" class="btn btn-danger">-</button>
            <b id="package-${newerPackageID}-version" style="color: red;"></b>
            <button type="button" id="package-${newerPackageID}-addbtn" data-package_id="${newerPackageID}" onclick="addPackage(event)" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center;  height: 20px; width: 100%; font-weight: bold;" class="btn btn-success">+</button>
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


    <tbody data-package_id="${newerPackageID}" data-service_id="1" class="services" id="package-${newerPackageID}-service-1">
    <!-- service -->
    <tr style="height: 138.95pt;">
      <!-- service num -->
      <td width="36" style="text-align: center; width: 27.3pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt; height: 138.95pt;">
        <p id="package-${newerPackageID}-service-1-index" style="margin: 10px 0px 10px 0px;">1</p>
        <button type="button" id="package-${newerPackageID}-service-1-addbutton" data-package_id='${newerPackageID}' data-service_id="1" onclick="addService(event)" style="display: flex; justify-content: center; align-items: center;  height: 20px; width: 100%; font-weight: bold;" class="btn btn-success">+</button>
      </td>

      <!-- service -->
      <td width="332" style="width: 500.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
        <select required class="form-control" style="background: rgb(245, 245, 245); border: 0;" onchange="findUnit(event)" data-package_id="${newerPackageID}" data-service_id="1" name="package-${newerPackageID}-service-1-product" id="package-${newerPackageID}-service-1-product">
          <option disabled selected value="">------------</option>
          ${
            (function listProducts() {
              var options = []
              for(let product of productsList){
                options.push(`<option class="form-control" data-prodid="${product.id}" data-unit="${product.unit}" value="${product.id}">${product.name}</option>`)
              }
              return options
            })()
          }
        </select>
        <button onclick="checkServiceUsedProd(event)" data-package_id="${newerPackageID}" data-service_id="1" class="btn-xs btn mt-1 btn-success" type="button" data-toggle="collapse" data-target="#package-${newerPackageID}-service-1-UsedServiceModal" aria-expanded="false" id='package-${newerPackageID}-service-1-UsedServiceModalBTN'  aria-controls="package-${newerPackageID}-service-1-UsedServiceModal">
        İstifadə olunan material
        </button>
        <div class="collapse" id="package-${newerPackageID}-service-1-UsedServiceModal">
          <div class="card usedmaterials  card-body">
              <label for="">Məhsul:</label>
              <select style="height: 30px;" class="form-control" id="package-${newerPackageID}-service-1-usedprod">
                  <option value="" selected disabled>------</option>
                  ${
                      (function prodList() {
                          let prodChoiceList = []
                          for(let prod of productsList){
                              prodChoiceList.push(`<option value="${prod.id}" >${prod.name}</option>`)
                          }
                          return prodChoiceList
                      })()
                  }
              </select>
              <div class="row">
                  <div class="col">
                      <label for="">Qiymət:</label>
                      <input style="height: 30px;" class="floatfield form-control" id="package-${newerPackageID}-service-1-usedprodprice" type="text">
                  </div>
                  <div class="col">
                      <label for="">Say:</label>
                      <input style="height: 30px;" class="floatfield form-control" id="package-${newerPackageID}-service-1-usedprodquantity" type="text">
                  </div>
              </div>
          </div>
        </div>
        <p class="MsoNormal" style="margin: 0cm 0cm 0cm 2.1pt; font-size: 12pt">
            <b><span lang="AZ-LATIN" style="font-family: Arial, sans-serif;">&nbsp;</span></b>
        </p>

        <!-- serivce detail -->
          <select data-package_id="${newerPackageID}" data-service_id="1" onchange="setTemplate(event)" class="form-control" name="" id="package-${newerPackageID}-service-1-templates">
            <option value="">Boş şablon</option>
          </select>
          <textarea required name="package-${newerPackageID}-service-1-detail" id="package-${newerPackageID}-service-1-detail" cols="30" rows="10"></textarea>

      </td>

      <!-- service unit -->
      <td width="80" style="text-align: center; width: 103.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
        <p id="package-${newerPackageID}-service-1-unit">---</p>
      </td>

      <!-- service quantity -->
      <td width="80" style="text-align: center; width: 103.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
        <input required data-package_id="${newerPackageID}" data-service_id="1" onchange="calcServiceTotalPrice(event)" style="background: rgb(245, 245, 245); border: 0;" placeholder="0.0" class="floatfield form-control" type="text" name="package-${newerPackageID}-service-1-quantity" id="package-${newerPackageID}-service-1-quantity">
      </td>

      <!-- service price -->
      <td width="80"  style="text-align: center; width: 103.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
        <input required data-package_id="${newerPackageID}" data-service_id="1" onchange="calcServiceTotalPrice(event)" style="background: rgb(245, 245, 245); border: 0;" placeholder="0.0" class="floatfield form-control" type="text" name="package-${newerPackageID}-service-1-price" id="package-${newerPackageID}-service-1-price">

      </td>

      <!-- service  total price -->
      <td width="80" style="text-align: center; width: 103.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 138.95pt;">
        <b class="servicetotalprice" id="package-${newerPackageID}-service-1-totalprice">0</b>

      </td>
    </tr>
  </tbody>
        
        
  <tbody>
    <!-- summa -->
    <tr style="height: 26.05pt;">
      <td width="85" colspan="2" style="width: 39.1pt; border-right:0pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
        <button id="package-${newerPackageID}-discountbtn" data-package_id="${newerPackageID}" onclick="packageDiscountField(event)" style="font-size: 12px;" type="button" class="btn-sm btn btn-secondary">ENDİRİM</button>
        <button id="package-${newerPackageID}-taxbtn" data-package_id="${newerPackageID}" onclick="packageTaxField(event)" style="font-size: 12px;" type="button" class="btn-sm btn btn-secondary">ƏDV</button>
        <button id="package-${newerPackageID}-delvbtn" data-package_id="${newerPackageID}" onclick="packageDelvField(event)" style="font-size: 12px;" type="button" class="btn-sm btn btn-secondary">Çatdırılma</button>
      
      </td>
      <td width="500" colspan="3" style="width: 400pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 0pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
          <p style="margin: 0cm; font-size: 12pt; text-align: right;"><b>Ümumi (ƏDV Xaric)</b></p>
      </td>
      <td width="86" colspan="2" style="width: 64.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
        <p style="margin: 0cm; font-size: 12pt; text-align: center; font-weight: bold;"><span id="package-${newerPackageID}-totalprice">0</span> AZN</p>
      </td>
    </tr>
  </tbody>

  </table>
  `
  lastPackage.insertAdjacentHTML('afterEnd',newerPackage)
  
  // add remove btn
  if (lastPackageID == 1){
    let removeBtn = `<button id="package-${lastPackageID}-removebtn" type="button" data-package_id='${lastPackageID}' onclick="removePackage(event)" style="margin-top: 10px; display: flex; justify-content: center; align-items: center;  height: 20px; width: 100%; font-weight: bold;" class="btn btn-danger">-</button>
    `
    document.getElementById(`package-${lastPackageID}-version`).insertAdjacentHTML('beforeBegin', removeBtn)
    document.getElementById(`package-${lastPackageID}-version`).innerText = `VER${lastPackageID}`

  }
  if (newerPackageID > 1){
    // versiya kodu  elave etmek
    document.getElementById(`package-${newerPackageID}-version`).innerText = `VER${newerPackageID}`
  }

  CKEDITOR.replace(`package-${newerPackageID}-service-1-detail`, {
    filebrowserImageUploadUrl: `${ ckeditor_upload }`,
    filebrowserImageBrowseUrl: `${ ckeditor_browse }`,
    removePlugins: 'exportpdf',
    toolbarCanCollapse: true

  });
  checkFloatInput()

  return loader.hide()
  
}

function removeService(event){
  loader.show()

  let removedServicePackageID = event.target.dataset.package_id
  let removedserviceID = event.target.dataset.service_id
  let removedService = document.getElementById(`package-${removedServicePackageID}-service-${removedserviceID}`)
  CKEDITOR.instances[`package-${removedServicePackageID}-service-${removedserviceID}-detail`].destroy()


  removedService.remove()


  let services = document.getElementById(`package-${removedServicePackageID}`).getElementsByClassName(`services`)
  servicesReID(removedServicePackageID,services)
  calcPackageTotalPrice(removedServicePackageID)
  checkFloatInput()

  return loader.hide()

}

function removePackage(event){
  loader.show()

  let removedPackageID = event.target.dataset.package_id
  let removedPackage = document.getElementById(`package-${removedPackageID}`)
  let removedPackageServices = removedPackage.getElementsByClassName(`services`)
  // butun ck lari sil
  for(let service of removedPackageServices)
  {
    CKEDITOR.instances[`package-${removedPackageID}-service-${service.dataset.service_id}-detail`].destroy()
  }
  
  removedPackage.remove()

  packagesReID()
  checkFloatInput()
  
  return loader.hide()
}

function servicesReID(packageID, services){
  // butun ck lari sil
  for(let service of services)
  {
    CKEDITOR.instances[`package-${service.dataset.package_id}-service-${service.dataset.service_id}-detail`].destroy()
  }
  // idileri yeniden  duzeld
  let iterations = services.length;
  newerServiceID = 1
  for (let service of services) {
    // index
    let index = document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-index`)
    index.innerText = newerServiceID
    index.id = `package-${packageID}-service-${newerServiceID}-index`
    // product 
    let serviceProduct = document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-product`)
    serviceProduct.dataset.package_id = packageID
    serviceProduct.dataset.service_id = newerServiceID
    serviceProduct.name = `package-${packageID}-service-${newerServiceID}-product`
    serviceProduct.id = `package-${packageID}-service-${newerServiceID}-product`
    // detail
    let serviceDetail = document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-detail`)
    serviceDetail.name = `package-${packageID}-service-${newerServiceID}-detail`
    serviceDetail.id = `package-${packageID}-service-${newerServiceID}-detail`
    CKEDITOR.replace(`package-${packageID}-service-${newerServiceID}-detail`, {
      filebrowserImageUploadUrl: `${ ckeditor_upload }`,
      filebrowserImageBrowseUrl: `${ ckeditor_browse }`,
      removePlugins: 'exportpdf',
      toolbarCanCollapse: true

    });
    // templates
    let descTemplates = document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-templates`)
    descTemplates.dataset.package_id = packageID
    descTemplates.dataset.service_id = newerServiceID
    descTemplates.id = `package-${packageID}-service-${newerServiceID}-templates`
    // usermaterial
    let UsedServiceModalBTN = document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-UsedServiceModalBTN`)
    UsedServiceModalBTN.setAttribute("aria-controls", `package-${packageID}-service-${newerServiceID}-UsedServiceModal`);
    UsedServiceModalBTN.dataset.target = `#package-${packageID}-service-${newerServiceID}-UsedServiceModal`
    UsedServiceModalBTN.dataset.package_id = packageID
    UsedServiceModalBTN.dataset.service_id = newerServiceID
    UsedServiceModalBTN.id = `package-${packageID}-service-${newerServiceID}-UsedServiceModalBTN`
    document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-UsedServiceModal`).id = `package-${packageID}-service-${newerServiceID}-UsedServiceModal`
    document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-usedprod`).id = `package-${packageID}-service-${newerServiceID}-usedprod`
    document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-usedprodprice`).id = `package-${packageID}-service-${newerServiceID}-usedprodprice`
    document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-usedprodquantity`).id = `package-${packageID}-service-${newerServiceID}-usedprodquantity`

    // unit
    let serviceUnit = document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-unit`)
    serviceUnit.id = `package-${packageID}-service-${newerServiceID}-unit`
    // quantity
    let serviceQuantity = document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-quantity`)
    serviceQuantity.dataset.package_id = packageID
    serviceQuantity.dataset.service_id = newerServiceID
    serviceQuantity.name = `package-${packageID}-service-${newerServiceID}-quantity`
    serviceQuantity.id = `package-${packageID}-service-${newerServiceID}-quantity`
    // price
    let servicePrice = document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-price`)
    servicePrice.dataset.package_id = packageID
    servicePrice.dataset.service_id = newerServiceID
    servicePrice.name = `package-${packageID}-service-${newerServiceID}-price`
    servicePrice.id = `package-${packageID}-service-${newerServiceID}-price`
    
    // totalprice
    let serviceTotalPrice = document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-totalprice`)
    serviceTotalPrice.id = `package-${packageID}-service-${newerServiceID}-totalprice`

    // add button
    if (!--iterations){
      let serviceAddButton = document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-addbutton`)
      if (document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-addbutton`)!=null){
        serviceAddButton.dataset.package_id = packageID
        serviceAddButton.dataset.service_id = newerServiceID
        serviceAddButton.id = `package-${packageID}-service-${newerServiceID}-addbutton`
      }else{
        let newerServiceAddButton =
        `
        <button type="button" id="package-${packageID}-service-${newerServiceID}-addbutton" data-package_id='${packageID}' data-service_id="${newerServiceID}" onclick="addService(event)" style="display: flex; justify-content: center; align-items: center;  height: 20px; width: 100%; font-weight: bold;" class="btn btn-success">+</button>

        `
        index.insertAdjacentHTML('afterEnd', newerServiceAddButton)
      }
    }

    // remove button
    let serviceRemoveButton = document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-removebtn`)
    if(serviceRemoveButton!=null){
      serviceRemoveButton.dataset.package_id = packageID
      serviceRemoveButton.dataset.service_id = newerServiceID
      serviceRemoveButton.id = `package-${packageID}-service-${newerServiceID}-removebtn`
    }

    // service id dataset
    service.dataset.package_id = packageID
    service.dataset.service_id = newerServiceID
    service.id = `package-${packageID}-service-${newerServiceID}`
    
    newerServiceID++;
  }
  // son bir servis qalanda remove button sil
  if (services.length==1){
    let service = services[0]
    if(document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-removebtn`)!=null){
      document.getElementById(`package-${service.dataset.package_id}-service-${service.dataset.service_id}-removebtn`).remove()
    }
  }

}

function packagesReID(){
  let packages = document.getElementsByClassName('packages')
  let newerPackageID  = 1
  let iterations = packages.length; 

  for(let package of packages){
    let packageServices = package.getElementsByClassName(`services`)
    servicesReID(newerPackageID, packageServices);
    // version
    let version = document.getElementById(`package-${package.dataset.package_id}-version`)
    version.id = `package-${newerPackageID}-version`
    if (packages.length>1){
      version.innerText = `VER${newerPackageID}`
    }else{
      version.innerText = ''
    }
    // total price
    let totalPrice  = document.getElementById(`package-${package.dataset.package_id}-totalprice`)
    totalPrice.id =`package-${newerPackageID}-totalprice`

    // discount tax buttons
    let discountBtn = document.getElementById(`package-${package.dataset.package_id}-discountbtn`)
    let taxBtn = document.getElementById(`package-${package.dataset.package_id}-taxbtn`)
    let delvBtn = document.getElementById(`package-${package.dataset.package_id}-delvbtn`)
    discountBtn.dataset.package_id = newerPackageID
    taxBtn.dataset.package_id = newerPackageID
    delvBtn.dataset.package_id = newerPackageID
    discountBtn.id = `package-${newerPackageID}-discountbtn`
    taxBtn.id = `package-${newerPackageID}-taxbtn`
    delvBtn.id = `package-${newerPackageID}-delvbtn`

    // discount line
    let discountBody = document.getElementById(`package-${package.dataset.package_id}-discount`)
    if(discountBody != null){
      document.getElementById(`package-${package.dataset.package_id}-discountfield`).dataset.package_id = newerPackageID
      document.getElementById(`package-${package.dataset.package_id}-discountfield`).id = `package-${newerPackageID}-discountfield`
      document.getElementById(`package-${package.dataset.package_id}-totalpricewdiscount`).id = `package-${newerPackageID}-totalpricewdiscount`
      discountBody.id = `package-${newerPackageID}-discount`
    }
    // tax line
    let taxBody = document.getElementById(`package-${package.dataset.package_id}-tax`)
    if(taxBody != null){
      document.getElementById(`package-${package.dataset.package_id}-taxprice`).id =  `package-${newerPackageID}-taxprice`
      document.getElementById(`package-${package.dataset.package_id}-totalpricewtax`).id =  `package-${newerPackageID}-totalpricewtax`
      taxBody.id = `package-${newerPackageID}-tax`
    }
     // delv line
     let delvBody = document.getElementById(`package-${package.dataset.package_id}-delv`)
     if(delvBody != null){
       document.getElementById(`package-${package.dataset.package_id}-delvfield`).dataset.package_id = newerPackageID
       document.getElementById(`package-${package.dataset.package_id}-delvfield`).id =  `package-${newerPackageID}-delvfield`
       delvBody.id = `package-${newerPackageID}-delv`
     }
    // addbutton
    if (!--iterations){
      let packageAddBtn = document.getElementById(`package-${package.dataset.package_id}-addbtn`)
      if (packageAddBtn!=null){
        packageAddBtn.dataset.package_id = newerPackageID
        packageAddBtn.id = `package-${newerPackageID}-addbtn`
      }else{
        let newerPackageAddButton =
        `
        <button type="button" id="package-${newerPackageID}-addbtn" data-package_id="${newerPackageID}" onclick="addPackage(event)" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center;  height: 20px; width: 100%; font-weight: bold;" class="btn btn-success">+</button>
        `
        version.insertAdjacentHTML('afterEnd', newerPackageAddButton)
      }
    }
    // remove button
    let packageRemoveButton = document.getElementById(`package-${package.dataset.package_id}-removebtn`)
    if(packageRemoveButton != null){
      packageRemoveButton.dataset.package_id = newerPackageID
      packageRemoveButton.id = `package-${newerPackageID}-removebtn`
    }
    package.id = `package-${newerPackageID}`
    package.dataset.package_id  = newerPackageID

    newerPackageID++;
  }

  if (packages.length==1){
    let package = packages[0]
    if(document.getElementById(`package-${package.dataset.package_id}-removebtn`)!=null){
      document.getElementById(`package-${package.dataset.package_id}-removebtn`).remove()
    }
  }
  
}

function findUnit(event){
  let packageID = event.target.dataset.package_id
  let serviceID = event.target.dataset.service_id
  let serviceUnit =  $(`#package-${packageID}-service-${serviceID}-unit`)
  serviceUnit.text($(`#${event.target.id} option:selected`).data('unit'))
  // templatesleri getirmek
  let id = $(`#${event.target.id} option:selected`).data('prodid')
  loader.show()
  fetch(`/products/get-templates/${id}`,{
    method:"GET",
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json'
    },
  })
  .then((response)=>{
    return response.json()
  })
  .then((data)=>{
    var templateSelect = $(`#package-${packageID}-service-${serviceID}-templates`)
    templateSelect.empty();
    
    templateSelect.append($('<option>', {
      value: '',
      text: `Boş şablon`,
    }));
    $.each(data.templates, function (index, template) {
      templateSelect.append($('<option>', {
        value: template.description,
        text: `Şablon ${index + 1}`,
      }));
    });
    loader.hide()
  });
}

function setTemplate(event){
  if(event.target.value){
    CKEDITOR.instances[`package-${event.target.dataset.package_id}-service-${event.target.dataset.service_id}-detail`].setData(event.target.value)

  }else{
    CKEDITOR.instances[`package-${event.target.dataset.package_id}-service-${event.target.dataset.service_id}-detail`].setData('')

  }
}

function checkFloatInput(){
  $('.floatfield').on('input',function(event){
    let price = event.target.value
    price = price.replace(/[^0-9.]/g, '');
    event.target.value = price
    if(event.target.value.substring(0, 1)== 0 && event.target.value.substring(1, 2)!= '.' && event.target.value.length == 2){
      event.target.value = 0
    }
  })
}

function checkIntInput(){
  $('.integerfield').on('input',function(event){
    let price = event.target.value
    price = price.replace(/[^0-9]/g, '');
    event.target.value = price
    if(event.target.value.substring(0, 2)=='00'){
      event.target.value = 0
    }
  })
}

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
  if(document.getElementById(`package-${calcPackageID}-delvfield`) && parseInt(document.getElementById(`package-${calcPackageID}-delvfield`).value)){
    document.getElementById(`package-${calcPackageID}-totalprice`).innerText = parseInt(document.getElementById(`package-${calcPackageID}-totalprice`).innerText) + parseInt(document.getElementById(`package-${calcPackageID}-delvfield`).value)
  }
  if(document.getElementById(`package-${calcPackageID}-discount`) != null){
    calcDiscountTotalPrice(null,calcPackageID)
  }
  if(document.getElementById(`package-${calcPackageID}-tax`) != null){
    calcTaxTotalPrice(calcPackageID)
  }
}

function checkServiceUsedProd(event){
  let button = event.target
  let serviceID = event.target.dataset.service_id
  let packageID = event.target.dataset.package_id

  if(button.classList.contains('btn-success')){
      setTimeout(function(){
          $(`#package-${packageID}-service-${serviceID}-usedprod`).prop('required',true);
          $(`#package-${packageID}-service-${serviceID}-usedprodprice`).prop('required',true);
          $(`#package-${packageID}-service-${serviceID}-usedprodquantity`).prop('required',true);
          button.classList.remove('btn-success')
          button.classList.add('btn-danger')
      }, 500);
  }else{
      setTimeout(function(){
          $(`#package-${packageID}-service-${serviceID}-usedprod`).prop('required',false);
          $(`#package-${packageID}-service-${serviceID}-usedprodprice`).prop('required',false);
          $(`#package-${packageID}-service-${serviceID}-usedprodquantity`).prop('required',false);
          button.classList.remove('btn-danger')
          button.classList.add('btn-success')
      }, 500);
  }
}

function calcDiscountTotalPrice(event,packageID){
  if(event != null){
    var calcPackageID =  event.target.dataset.package_id
  }else{
    var calcPackageID =  packageID
  }
  let discountPrice = parseInt(document.getElementById(`package-${calcPackageID}-discountfield`).value)
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

function calcServiceTotalPrice(event){

  let calcPackageID = event.target.dataset.package_id
  let calcServiceID = event.target.dataset.service_id

  
  let servicePrice = parseFloat(document.getElementById(`package-${calcPackageID}-service-${calcServiceID}-price`).value)
  let serviceQuantity = parseFloat(document.getElementById(`package-${calcPackageID}-service-${calcServiceID}-quantity`).value)
  
  if((servicePrice*serviceQuantity)>=1){
    document.getElementById(`package-${calcPackageID}-service-${calcServiceID}-totalprice`).innerText = parseInt(servicePrice*serviceQuantity)
  }
  calcPackageTotalPrice(calcPackageID)
}

function calcTaxTotalPrice(packageID){
  let packageTotalPriceWDiscount = document.getElementById(`package-${packageID}-totalpricewdiscount`)
  if(packageTotalPriceWDiscount != null){
    let packageTaxPrice = document.getElementById(`package-${packageID}-taxprice`)
    let packageTotalPriceWTAX = document.getElementById(`package-${packageID}-totalpricewtax`)
    if(parseInt(packageTotalPriceWDiscount.innerText) >= 1){
      let taxPrice = parseInt(parseInt(packageTotalPriceWDiscount.innerText)*18/100)
      packageTaxPrice.innerText = taxPrice
      packageTotalPriceWTAX.innerText = parseInt(packageTotalPriceWDiscount.innerText)+taxPrice
    } else{
      packageTaxPrice.innerText = 0
      packageTotalPriceWTAX.innerText = 0
    }
  }else{
    let packageTotalPrice = document.getElementById(`package-${packageID}-totalprice`)
    let packageTaxPrice = document.getElementById(`package-${packageID}-taxprice`)
    let packageTotalPriceWTAX = document.getElementById(`package-${packageID}-totalpricewtax`)
    if(parseInt(packageTotalPrice.innerText) >= 1){
      let taxPrice = parseInt(parseInt(packageTotalPrice.innerText)*18/100)
      packageTaxPrice.innerText = taxPrice
      packageTotalPriceWTAX.innerText = parseInt(packageTotalPrice.innerText)+taxPrice
    }
    else{
      packageTaxPrice.innerText = 0
      packageTotalPriceWTAX.innerText = 0
    }
  }
}

function calcDelvTotalPrice(event,packageID){
  if(event != null){
    var calcPackageID =  event.target.dataset.package_id
  }else{
    var calcPackageID =  packageID
  }
  calcPackageTotalPrice(calcPackageID)
}

function packageDiscountField(event){
  loader.show()
  if(event.target.classList.contains('btn-secondary')){
    let discount = 
    `
    <tbody id="package-${event.target.dataset.package_id}-discount" >
    <!-- endirim -->
    <tr style="height: 26.05pt;">
      <td width="585" colspan="5" style="width: 439.1pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
            <p style="margin: 0cm; font-size: 12pt; text-align: right;"><b>Endirim</b></p>
        </td>
        <td width="86" colspan="2" style="width: 64.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
        <span style="display: flex; align-items: center; justify-content:center; ">
         <input required onchange="calcDiscountTotalPrice(event,null)" data-package_id = ${event.target.dataset.package_id} class='form-control integerfield' placeholder='0' id="package-${event.target.dataset.package_id}-discountfield" style="padding:0px; width:50px; background: rgb(229, 229, 229); border:0px; margin: 0cm; font-size: 12pt; text-align: center; font-weight: bold;"><b>AZN</b>
        </span>  
        </td>
    </tr>
    <tr style="height: 26.05pt;">
      <td width="585" colspan="5" style="width: 439.1pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
        <p style="margin: 0cm; font-size: 12pt; text-align: right;"><b>Endirimli qiymət (ƏDV Xaric)</b></p>
      </td>
      <td width="86" colspan="2" style="width: 64.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
        <p style="margin: 0cm; font-size: 12pt; text-align: center; font-weight: bold;"><span id="package-${event.target.dataset.package_id}-totalpricewdiscount">${document.getElementById(`package-${event.target.dataset.package_id}-totalprice`).innerText}</span> AZN</p>
      </td>
    </tr>
  </tbody>
    `
    if(document.getElementById(`package-${event.target.dataset.package_id}-tax`)==null){
      event.target.parentElement.parentElement.parentElement.insertAdjacentHTML('afterEnd', discount)
    }else{
      document.getElementById(`package-${event.target.dataset.package_id}-tax`).insertAdjacentHTML('beforeBegin', discount)
    }
    event.target.classList.remove('btn-secondary')
    event.target.classList += (' btn-warning')
  }else{
    document.getElementById(`package-${event.target.dataset.package_id}-discount`).remove()
    event.target.classList.remove('btn-warning')
    event.target.classList += (' btn-secondary')
    if(document.getElementById(`package-${event.target.dataset.package_id}-tax`) != null){
      calcTaxTotalPrice(event.target.dataset.package_id)
    }
    

  }
  checkIntInput()
  loader.hide()
}

function packageTaxField(event){
  if(event.target.classList.contains('btn-secondary')){
    let tax = 
    `
    <tbody id="package-${event.target.dataset.package_id}-tax" >
      <!-- edv -->
      <tr style="height: 26.05pt;">
        <td width="585" colspan="5" style="width: 439.1pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
          <p style="margin: 0cm; font-size: 12pt; text-align: right;"><b>ƏDV 18%</b></p>
        </td>
        <td width="86" colspan="2" style="width: 64.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
          <p style="margin: 0cm; font-size: 12pt; text-align: center; font-weight: bold;"><span id="package-${event.target.dataset.package_id}-taxprice">0</span> AZN</p>
        </td>
      </tr>
      <tr style="height: 26.05pt;">
        <td width="585" colspan="5" style="width: 439.1pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
        <p style="margin: 0cm; font-size: 12pt; text-align: right;"><b>Yekun (ƏDV Daxil Qiymət)</b></p>
        </td>
        <td width="86" colspan="2" style="width: 64.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
          <p style="margin: 0cm; font-size: 12pt; text-align: center; font-weight: bold;"><span id="package-${event.target.dataset.package_id}-totalpricewtax">0</span> AZN</p>
        </td>
      </tr>
    </tbody>
    `
    if(document.getElementById(`package-${event.target.dataset.package_id}-discount`)==null){
      event.target.parentElement.parentElement.parentElement.insertAdjacentHTML('afterEnd', tax)
    }else{
      document.getElementById(`package-${event.target.dataset.package_id}-discount`).insertAdjacentHTML('afterEnd', tax)
    }
    event.target.classList.remove('btn-secondary')
    event.target.classList += (' btn-warning')
    calcTaxTotalPrice(event.target.dataset.package_id)
  }else{
    document.getElementById(`package-${event.target.dataset.package_id}-tax`).remove()
    event.target.classList.remove('btn-warning')
    event.target.classList += (' btn-secondary')
  }
}

function packageDelvField(event){
  loader.show()
  if(event.target.classList.contains('btn-secondary')){
    let delv = 
    `
    <tbody id="package-${event.target.dataset.package_id}-delv" >
      <!-- delv -->
      <tr style="height: 26.05pt;">
        <td width="585" colspan="5" style="width: 439.1pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
              <p style="margin: 0cm; font-size: 12pt; text-align: right;"><b>Çatdırılma</b></p>
          </td>
          <td width="86" colspan="2" style="width: 64.15pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(229, 229, 229); padding: 0cm 5.4pt; height: 26.05pt;">
          <span style="display: flex; align-items: center; justify-content:center; ">
          <input required onchange="calcDelvTotalPrice(event,null)" data-package_id = ${event.target.dataset.package_id} class='form-control integerfield' placeholder='0' id="package-${event.target.dataset.package_id}-delvfield" style="padding:0px; width:50px; background: rgb(229, 229, 229); border:0px; margin: 0cm; font-size: 12pt; text-align: center; font-weight: bold;"><b>AZN</b>
          </span>  
          </td>
      </tr>
    
    </tbody>
    `
    if(document.getElementById(`package-${event.target.dataset.package_id}-delv`)==null){
      event.target.parentElement.parentElement.parentElement.insertAdjacentHTML('beforeBegin', delv)
    }else{
      document.getElementById(`package-${event.target.dataset.package_id}-delv`).insertAdjacentHTML('afterEnd', delv)
    }
    event.target.classList.remove('btn-secondary')
    event.target.classList += (' btn-warning')
  }else{
    document.getElementById(`package-${event.target.dataset.package_id}-delv`).remove()
    event.target.classList.remove('btn-warning')
    event.target.classList += (' btn-secondary')
  }
  calcDelvTotalPrice(null, event.target.dataset.package_id)
  checkIntInput()
  loader.hide()
}



var createNewRevForm = document.getElementById('createNewRevForm')
createNewRevForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loader.show()

  var packages = []
  for(let package of $('.packages')){
    let packageID = package.dataset.package_id
    let newerPackage = {}

    if (document.getElementById(`package-${packageID}-tax`) != null ){
      newerPackage['tax'] = parseInt(document.getElementById(`package-${packageID}-taxprice`).innerText)
    }else{
      newerPackage['tax'] = null
    }
    if (document.getElementById(`package-${packageID}-discount`) != null ){
      newerPackage['discount'] = document.getElementById(`package-${packageID}-discountfield`).value
    }else{
      newerPackage['discount'] = null
    }
    if (document.getElementById(`package-${packageID}-delv`) != null ){
      newerPackage['delv'] = document.getElementById(`package-${packageID}-delvfield`).value
    }else{
      newerPackage['delv'] = null
    }

    let newerServices = []
    for(let service of package.getElementsByClassName('services')){
      let serivceID = service.dataset.service_id
      let newerService = {}

      newerService['product'] = parseInt(document.getElementById(`package-${packageID}-service-${serivceID}-product`).value)
      newerService['detail'] = CKEDITOR.instances[`package-${packageID}-service-${serivceID}-detail`].getData()
      newerService['quantity'] = parseFloat(document.getElementById(`package-${packageID}-service-${serivceID}-quantity`).value)
      newerService['price'] = parseFloat(document.getElementById(`package-${packageID}-service-${serivceID}-price`).value)
      if($(`#package-${packageID}-service-${serivceID}-UsedServiceModalBTN`).hasClass('btn-danger')){
        let newUsedMaterial = {
            'product_id':parseInt($(`#package-${packageID}-service-${serivceID}-usedprod`).val()),
            'price': parseFloat($(`#package-${packageID}-service-${serivceID}-usedprodprice`).val()),
            'quantity': parseFloat($(`#package-${packageID}-service-${serivceID}-usedprodquantity`).val())
          }
          newerService['used_materials'] = newUsedMaterial
      }else{
        newerService['used_materials'] = null
      }
      newerServices.push(newerService)
    }
    newerPackage['services'] = newerServices

    packages.push(newerPackage)
  }
  var offer = {
    'number': new_revision_number,
    'offer_creator': parseInt($('#offer_creator').val()),
    'offer_approver': parseInt($('#offer_approver').val()),
    'note': CKEDITOR.instances.offer_note.getData(),
    'offer_pay_delv_cond': CKEDITOR.instances.offer_pay_delv_cond.getData(),
    'offer_delv_time': $('#offer_delv_time').val(),
  }
  offer['packages'] = packages
  fetch(createNewRevURL,{
      method:"POST",
      headers: {
          "X-CSRFToken": getCookie('csrftoken'),
          "Accept": "application/json",
          'Content-Type': 'application/json'
        },
      body:JSON.stringify(offer)
  })
  .then((response)=>{
      return response.json()
  })
  .then((data)=>{
      window.location.href = redirectURL

  })
});



