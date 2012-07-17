// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    WinJS.strictProcessing();

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
                var outputValue = WinJS.Application.sessionState.greetingOutput;
                if (outputValue) {

                    document.getElementById("greetingOutput").innerText = outputValue;
                }
            }
            args.setPromise(WinJS.UI.processAll());
            var helloButton = document.getElementById("helloButton");
            helloButton.addEventListener("click", buttonClickHandler, false);

            var inputName = document.getElementById("inputName");
            inputName.addEventListener("change", inputNameHandler);

            var localSettings = Windows.Storage.ApplicationData.current.localSettings
            
            var username = localSettings.values["userName"];

            if (username) {
                document.getElementById("inputName").value = username.value;
            }

        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().

        //Save the session state
        var greetingOutput = document.getElementById("greetingOutput");
        WinJS.Application.sessionState.greetingOutput = greetingOutput.innerText;
    };


    function inputNameHandler(eventInfo) {
        var inputName = eventInfo.srcElement;
        var appData = Windows.Storage.ApplicationData.current;
        var localSettings = appData.localSettings;

        localSettings.values["userName"] = inputName.value;
    }
    function buttonClickHandler(eventArgs) {
        var name = document.getElementById("inputName").value;
        var greetingString = "Hello " + name + " Welcome to Windows 8";
        document.getElementById("greetingOutput").innerText = greetingString;
    }
    app.start();
})();
