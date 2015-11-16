(function () {
    "use strict";

    var viewData;

    WinJS.UI.Pages.define("/pages/photobrowser/photobrowser.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

        	document.querySelector('#addPhotoCmd').addEventListener('click', function() {Application.loadPicture(document.querySelector('#photoContainer'))}, false);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        },

        _populateData: function () {
            var dir = Windows.Storage.KnownFolders.picturesLibrary;
            var data = new Array();

            dir.getFilesAsync().then(function (files) {
                files.forEach(function (file) {
                    var item = { fileName: file.name, picture: file.path };
                    data.push(item);
                });

                viewData = new WinJS.Binding.List(data);
            });
        },

        viewData: {
            get: function () {
                this._populateData();

                return viewData;
            }
        }
    });
})();
