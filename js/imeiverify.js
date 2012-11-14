/*
 * imei由15位数字组成， 
 * 前6位(TAC)是型号核准号码，代表手机类型。 
 * 接着2位(FAC)是最后装配号，代表产地。 
 * 后6位(SNR)是串号，代表生产顺序号。 
 * 最后1位 (SP)是检验码。  
 *  
 * 检验码计算： 
 * (1).将偶数位数字分别乘以2，分别计算个位数和十位数之和 
 * (2).将奇数位数字相加，再加上上一步算得的值 
 * (3).如果得出的数个位是0则校验位为0，否则为10减去个位数 
 *  
 */


function imeigen(imeiString) { 
    var imeiLength = imeiString.length;
    var resultInt = 0;
    for (var i = 0; i < imeiLength; i++) {
        var a = parseInt(imeiString[i]);
        i++;
        var temp = parseInt(imeiString[i]) * 2;
        var b = temp < 10 ? temp : temp - 9;
        resultInt += a + b;
    }

    resultInt %= 10;
    resultInt = resultInt == 0 ? 0 : 10 - resultInt;
    return imeiString + resultInt;
}

function imeiver(imeiString) {
    var before14 = imeiString.substring(0, 14);
    var verifiedIMEI = imeigen(before14);
    if (verifiedIMEI == imeiString) {
        return "你的IMEI码正确。";
    }
    else {
        return "IMEI码未通过验证，正确的IMEI码为" + verifiedIMEI + "。";
    }
}

function randomimei() {
    var random = Math.random();
    random.toString().substring(2, 3) == "0" && (random += 0.3);
    return imeigen(random.toString().slice(2, 16));
}

function getrandomimei(num) {
    var randomResult = document.createElement("div");
    
    for (var i = 0; i < num; i++) {
        var a = document.createElement("input");
        a.type = "text";
        a.id = "input" + i;
        a.className = "raninput";
        a.value = randomimei();
        a.readOnly = true;
        randomResult.appendChild(a);

        var b = document.createElement("input");
        b.type = "button";
        b.id = "btn" + i;
        b.className = "ranbtn";
        b.value = "复制";
        randomResult.appendChild(b);
        b.addEventListener("click", clickcopy, false);
        //var br = document.createElement("br");
        //randomResult.appendChild(br);
    }

    return randomResult;
}

function clickcopy() {
    var dataPackage = new Windows.ApplicationModel.DataTransfer.DataPackage();
    dataPackage.requestedOperation = Windows.ApplicationModel.DataTransfer.DataPackageOperation.copy;
    dataPackage.setText(this.previousElementSibling.value);
    Windows.ApplicationModel.DataTransfer.Clipboard.setContent(dataPackage);    
}