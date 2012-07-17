// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var articlesList;
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
            }
            articlesList = new WinJS.Binding.List();
            var publicMembers = { ItemList: articlesList };
            WinJS.Namespace.define("C9Data", publicMembers);
            args.setPromise(WinJS.UI.processAll().then(downloadC9BlogFeed));
            // WinJS.UI.processAll().then(downloadC9BlogFeed);
            
        }
       
        
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };
    function downloadC9BlogFeed() {
        WinJS.xhr({ url: "http://channel9.msdn.com/coding4fun/articles/RSS" }).then(function (rss) {
            var items = rss.responseXML.querySelectorAll("item");

            for (var n = 0; n < items.length; n++) {
                var article = {};
                article.title = items[n].querySelector("title").textContent;
                var thumbs = items[n].querySelectorAll("thumbnail");
                if (thumbs.length > 1) {
                    article.thumbnail = thumbs[1].attributes.getNamedItem("url").textContent;
                    article.content = items[n].textContent;
                    articlesList.push(article);
                }
            }
        });
    }
    app.start();
})();
