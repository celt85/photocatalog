(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/photobrowser/photobrowser.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            this._populateData();

           // var listView = element.querySelector("#picturesListView");

            var that = this;
            document.querySelector('#addPhotoCmd').addEventListener('click', function () { Application.loadPicture(document.querySelector('#photoContainer')) }, false);
            document.querySelector('#picturesListView').addEventListener('iteminvoked', that._itemSelected, false);
           // listView.addEventListener('iteminvoked', itemSelected, false);
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

                    var pictureUrl = window.URL.createObjectURL(file, { oneTimeOnly: true });
                    var item = { fileName: file.name, picture: pictureUrl };
                    data.push(item);
                });

                document.querySelector('#picturesListView').winControl.itemDataSource = new WinJS.Binding.List(data).dataSource;
            });
        },

        _itemSelected: function (e) {
            e.detail.itemPromise.then(function (item) {
                var img = document.querySelector('#heroPictureContainer');
                img.src = item.data.picture;
            });
        },

    });
})();
