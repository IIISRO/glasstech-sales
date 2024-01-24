
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
                if(revision['is_active'] === true){
                    let newerServiceID = 1
                    let packageTotalPrice = 0
                    for(let package of revision['packages']){
                        let serviceStartLine = document.getElementById('serviceStartLine')
                        for(let service of package['services']){
                            let newerService = 
                            `
                            <!-- service -->
                            <tr style="height: 36.3pt;">
                                <td width="64"
                                    style="width: 48.1pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt; height: 36.3pt;">
                                    <p class="MsoNormal" align="center"
                                        style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif; text-align: center;">
                                        <span lang="AZ-LATIN" style="font-size: 10pt; font-family: Arial, sans-serif;">${newerServiceID}</span><span
                                            lang="EN-US" style="font-size: 10pt; font-family: Arial, sans-serif;">
                                            <o:p></o:p>
                                        </span></p>
                                </td>
                                <td width="377" valign="top"
                                    style="width: 283.1pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 36.3pt;">
                                    <p class="MsoNormal"
                                        style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif;">
                                        <b><span lang="AZ-LATIN" style="font-size: 13pt; font-family: Arial, sans-serif;">${service.product.name}<o:p></o:p></span></b></p>
                                    <p class="MsoNormal"
                                        style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif;">
                                        <b><span lang="AZ-LATIN"
                                                style="font-size: 10pt; font-family: Arial, sans-serif; color: black;">&nbsp;</span></b></p>
                                    ${service.detail}
                                    <p class="MsoListParagraph"
                                        style="margin: 0cm 0cm 0cm 36pt; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif;">
                                        <span lang="AZ-LATIN" style="font-size: 10pt; font-family: Arial, sans-serif;">&nbsp;</span></p>
                                </td>
                                <td width="70"
                                    style="width: 52.5pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 36.3pt;">
                                    <p class="MsoNormal" align="center"
                                        style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif; text-align: center;">
                                        <span lang="AZ-LATIN" style="font-size: 10pt; font-family: Arial, sans-serif;">${service.product.unit}</span><span
                                            lang="AZ-LATIN" style="font-size: 10pt; font-family: Arial, sans-serif;">
                                            <o:p></o:p>
                                        </span></p>
                                </td>
                                <td width="65"
                                    style="width: 48.85pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 36.3pt;">
                                    <p class="MsoNormal" align="center"
                                        style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif; text-align: center;">
                                        <span lang="AZ-LATIN" style="font-size: 10pt; font-family: Arial, sans-serif;">${service.quantity}<o:p></o:p></span>
                                    </p>
                                </td>
                                <td width="57"
                                    style="width: 42.5pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 36.3pt;">
                                    <p class="MsoNormal" align="center"
                                        style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif; text-align: center;">
                                        <span lang="AZ-LATIN" style="font-size: 10pt; font-family: Arial, sans-serif;">${service.price}<o:p></o:p></span>
                                    </p>
                                </td>
                                <td width="75"
                                    style="width: 56.5pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 36.3pt;">
                                    <p class="MsoNormal" align="center"
                                        style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif; text-align: center;">
                                        <span lang="AZ-LATIN" style="font-size: 10pt; font-family: Arial, sans-serif;">    
                                         ${
                                            (function SERVICETOTAL() {
                                                let serviceTotalPrice = parseInt(service.quantity*service.price)
                                                packageTotalPrice += serviceTotalPrice
                                                return serviceTotalPrice
                                            })()
                                        }<o:p></o:p></span>
                                    </p>
                                </td>
                            </tr>
                            `
                            
                            serviceStartLine.insertAdjacentHTML('beforeBegin',newerService)
                            newerServiceID++;
                        }
                        if(package.delv>1){
                            packageTotalPrice += package.delv
                            let delvBody = 
                            `
                            <tr style="height: 13.15pt;">
                                <td width="633" colspan="5" valign="top"
                                    style="width: 475.05pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(242, 242, 242); padding: 0cm 5.4pt; height: 13.15pt;">
                                    <p class="MsoNormal" align="right"
                                        style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif; text-align: right;">
                                        <span lang="AZ-LATIN"
                                            style="font-size: 10pt; font-family: Arial, sans-serif; color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            Çatdırılma
                                            <o:p></o:p></span></p>
                                </td>
                                <td width="75" valign="top"
                                    style="width: 56.5pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(242, 242, 242); padding: 0cm 5.4pt; height: 13.15pt;">
                                    <p class="MsoNormal"
                                        style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif;"><span
                                            lang="AZ-LATIN"
                                            style="display: flex; justify-content: center; font-size: 10pt; font-family: Arial, sans-serif; color: black;"><span>${package.delv}</span>AZN</span></p>
                                </td>
                            </tr>
                        
                            `
                            document.getElementById('orderTotalPriceBody').insertAdjacentHTML('beforeBegin', delvBody)
                        }
                        if(package.tax){
                            let taxBody =
                            `
                            <tr style="height: 13.15pt;">
                            <td width="633" colspan="5" valign="top"
                                style="width: 475.05pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(242, 242, 242); padding: 0cm 5.4pt; height: 13.15pt;">
                                <p class="MsoNormal" align="right"
                                    style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif; text-align: right;">
                                    <span lang="AZ-LATIN"
                                        style="font-size: 10pt; font-family: Arial, sans-serif; color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                       ƏDV 18%<o:p></o:p></span></p>
                            </td>
                            <td width="75" valign="top"
                                style="width: 56.5pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(242, 242, 242); padding: 0cm 5.4pt; height: 13.15pt;">
                                <p class="MsoNormal"
                                    style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif;"><span
                                        lang="AZ-LATIN"
                                        style="display: flex; justify-content: center; font-size: 10pt; font-family: Arial, sans-serif; color: black;"><span> 
                                         ${
                                            (function TAXCHCK() {
                                            if(package.discount>1){
                                                var total = packageTotalPrice - package.discount
                                            }else{
                                                var total = packageTotalPrice
                                            }
            
                                            return parseInt(total*18/100)
                                            })()
                                        }</span>AZN</span></p>
                            </td>
                        </tr>
                        <tr style="height: 13.15pt;">
                            <td width="633" colspan="5" valign="top"
                                style="width: 475.05pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(242, 242, 242); padding: 0cm 5.4pt; height: 13.15pt;">
                                <p class="MsoNormal" align="right"
                                    style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif; text-align: right;">
                                    <span lang="AZ-LATIN"
                                        style="font-size: 10pt; font-family: Arial, sans-serif; color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        Yekun (ƏDV Daxil Qiymət)
                                        <o:p></o:p></span></p>
                            </td>
                            <td width="75" valign="top"
                                style="width: 56.5pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(242, 242, 242); padding: 0cm 5.4pt; height: 13.15pt;">
                                <p class="MsoNormal"
                                    style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif;"><span
                                        lang="AZ-LATIN"
                                        style="display: flex; justify-content: center; font-size: 10pt; font-family: Arial, sans-serif; color: black;"><span>
                                        ${
                                            (function TAXCaCHCK() {
                                            if(package.discount>1){
                                                var total = packageTotalPrice - package.discount
                                            }else{
                                                var total = packageTotalPrice
                                            }
            
                                            return total + parseInt(total*18/100)
                                            })()
                                        }</span>AZN</span></p>
                            </td>
                        </tr>
                            `
                            document.getElementById('orderTotalPriceBody').insertAdjacentHTML('afterEnd', taxBody)

                        }

                        if(package.discount>1){
                            let discountBody = 
                            `
                            <tr style="height: 13.15pt;">
                            <td width="633" colspan="5" valign="top"
                                style="width: 475.05pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(242, 242, 242); padding: 0cm 5.4pt; height: 13.15pt;">
                                <p class="MsoNormal" align="right"
                                    style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif; text-align: right;">
                                    <span lang="AZ-LATIN"
                                        style="font-size: 10pt; font-family: Arial, sans-serif; color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        Endirim
                                        <o:p></o:p></span></p>
                            </td>
                            <td width="75" valign="top"
                                style="width: 56.5pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(242, 242, 242); padding: 0cm 5.4pt; height: 13.15pt;">
                                <p class="MsoNormal"
                                    style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif;"><span
                                        lang="AZ-LATIN"
                                        style="display: flex; justify-content: center; font-size: 10pt; font-family: Arial, sans-serif; color: black;"><span>${package.discount}</span>AZN</span></p>
                            </td>
                        </tr>
                        <tr style="height: 13.15pt;">
                            <td width="633" colspan="5" valign="top"
                                style="width: 475.05pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; background: rgb(242, 242, 242); padding: 0cm 5.4pt; height: 13.15pt;">
                                <p class="MsoNormal" align="right"
                                    style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif; text-align: right;">
                                    <span lang="AZ-LATIN"
                                        style="font-size: 10pt; font-family: Arial, sans-serif; color: black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        Endirimli qiymət (ƏDV Xaric)
                                        <o:p></o:p></span></p>
                            </td>
                            <td width="75" valign="top"
                                style="width: 56.5pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; background: rgb(242, 242, 242); padding: 0cm 5.4pt; height: 13.15pt;">
                                <p class="MsoNormal"
                                    style="margin: 0cm; line-height: normal; font-size: 11pt; font-family: Calibri, sans-serif;"><span
                                        lang="AZ-LATIN"
                                        style="display: flex; justify-content: center; font-size: 10pt; font-family: Arial, sans-serif; color: black;"><span>${packageTotalPrice-package.discount}</span>AZN</span></p>
                            </td>
                        </tr>
                            `
                            document.getElementById('orderTotalPriceBody').insertAdjacentHTML('afterEnd', discountBody)
                        }
                        $('#orderTotalPrice').text(packageTotalPrice)
                      
                    }
                    break;
                }
            }
            loader.hide()
        }
    })
}

getOfferFetch()

