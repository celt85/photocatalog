// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
	"use strict";

	var _photoContainer;
	var that;

	WinJS.UI.Pages.define("/pages/camera/camera.html", {
		// This function is called whenever a user navigates to this page. It
		// populates the page elements with the app's data.
		ready: function (element, options) {
			// TODO: Initialize the page here.
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
			var folder = Windows.Storage.KnownFolders.picturesLibrary;

			folder.createFileAsync("photo.jpg", Windows.Storage.CreationCollisionOption.generateUniqueName)
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
