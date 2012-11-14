// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());

            // Retrieve the button and register our event handler. 
            var imeiVerifyBtn = document.getElementById("imeiverify");
            imeiVerifyBtn.addEventListener("click", buttonClickHandler, false);

            var imeiGenBtn = document.getElementById("imeigen");
            imeiGenBtn.addEventListener("click", IMEIGenHandler, false);
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().

        var stateObject = new Object();

        // TODO: Populate the state object with app data

        // Save the state object to the session object
        app.sessionState.stateObject = stateObject;
    };

    function buttonClickHandler(eventInfo) {
        var imeiInput = document.getElementById("imeiinput").value;
        if (/^\d{15}$/.test(imeiInput)) {
            document.getElementById("verifyinfo").className = "";
            document.getElementById("verifyinfo").innerText = imeiver(imeiInput)
        }
        else {
            document.getElementById("verifyinfo").className = "red";
            document.getElementById("verifyinfo").innerText = "请输入正确的15位IMEI码";
        }
    }

    function IMEIGenHandler(eventInfo) {
        var imeiResult = document.getElementById("imeiresult");
        imeiResult.innerHTML = "";
        imeiResult.appendChild(getrandomimei(10));
    }

    app.start();
})();
