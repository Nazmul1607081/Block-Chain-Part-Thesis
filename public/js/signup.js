$(document).ready(function () {
    let imagesPreview = function (input, placeToInsertImagePreview) {
        if (input.files) {
            let filesAmount = input.files.length;
            for (i = 0; i < filesAmount; i++) {
                let reader = new FileReader();
                reader.onload = function (event) {
                    $($.parseHTML("<img width='300' height='300'>"))
                        .attr("src", event.target.result)
                        .appendTo(placeToInsertImagePreview);
                };
                reader.readAsDataURL(input.files[i]);
            }
        }
    };
    $("#input-files").on("change", function () {
        imagesPreview(this, "div.preview-images");
    });
});