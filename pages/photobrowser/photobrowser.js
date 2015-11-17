(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/photobrowser/photobrowser.html", {
        ready: function (element, options) {
            WinJS.Resources.processAll();

            this._populateData();

            var that = this;
            document.querySelector('#addPhotoCmd').addEventListener('click', function () { Application.loadPicture(document.querySelector('#photoContainer')) }, false);
            document.querySelector('#picturesListView').addEventListener('iteminvoked', that._itemSelected, false);
        },

        unload: function () {
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        },

        _populateData: function () {
            var picturesLibrary = Windows.Storage.KnownFolders.picturesLibrary;
            var data = new Array();

            var options = new Windows.Storage.Search.QueryOptions(Windows.Storage.Search.CommonFileQuery.orderByName, [".jpg", ".jpeg", ".png"]);
            options.folderDepth = Windows.Storage.Search.FolderDepth.shallow;

            if (picturesLibrary.areQueryOptionsSupported(options)) {
                var query = picturesLibrary.createFileQueryWithOptions(options);

                picturesLibrary.getFilesAsync().then(function (files) {
                    files.forEach(function (file) {

                        var pictureUrl = window.URL.createObjectURL(file, { oneTimeOnly: true });
                        var item = { fileName: file.name, picture: pictureUrl };
                        data.push(item);
                    });

                    document.querySelector('#picturesListView').winControl.itemDataSource = new WinJS.Binding.List(data).dataSource;
                });
            }
        },

        _itemSelected: function (e) {
            e.detail.itemPromise.then(function (item) {
                var img = document.querySelector('#heroPictureContainer');
                img.src = item.data.picture;
            });
        },

    });
})();
