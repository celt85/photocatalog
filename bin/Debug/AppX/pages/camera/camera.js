// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
	"use strict";

	var _photoContainer;
	var that;

	WinJS.UI.Pages.define("/pages/camera/camera.html", {
		ready: function (element, options) {
		    WinJS.Resources.processAll();

		    _photoContainer = element.querySelector("#photoContainer");

			element.querySelector("#takePicture").onclick = this._takePicture;

			that = this;
		},

		unload: function () {
			// TODO: Respond to navigations away from this page.
		},

		updateLayout: function (element) {
			/// <param name="element" domElement="true" />

			// TODO: Respond to changes in layout.
		},

		_savePicture: function (fileToSave) {
			var directory = Windows.Storage.KnownFolders.picturesLibrary;
			var fileName = "photo.jpg";

		    directory.createFileAsync(fileName, Windows.Storage.CreationCollisionOption.generateUniqueName)
				.then(function (file) {
					fileToSave.copyAndReplaceAsync(file);
				});
		},

		_takePicture: function () {
			var camera = new Windows.Media.Capture.CameraCaptureUI();

			var p = camera.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo);
			p.done(function (capturedItem) {
				if (capturedItem) {
					var imageUrl = URL.createObjectURL(capturedItem, { oneTimeOnly: true });
					//_photoContainer.src = imageUrl;
					that._savePicture(capturedItem);
				}
			});
		}
	});
})();
