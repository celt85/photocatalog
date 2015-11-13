(function () {
	WinJS.Namespace.define("Application", {
		loadPicture: function () {
			var photoCOntainer = document.querySelector('#photoContainer');

			var filePicker = Windows.Storage.Pickers.FileOpenPicker();

			filePicker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
			filePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
			filePicker.fileTypeFilter.replaceAll([".jpg", ".jpeg"]);

			filePicker.pickSingleFileAsync().then(function (file) {
			    if (file) {
			        var imageUrl = URL.createObjectURL(file, { oneTimeOnly: true });
			        photoContainer.src = imageUrl;
			    } else {
			        photoContainer.innerHTML = "Sorry, file not loaded";
			    }
			});
		}
	});
})();