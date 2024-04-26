document.getElementById('imageInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = new Image();
        img.onload = function() {
            var canvas = document.getElementById('imageCanvas');
            var ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var luminosity = calculateLuminosity(imageData.data);
            alert('Luminosidad promedio: ' + luminosity.toFixed(2));
        };
        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
});

function calculateLuminosity(imageData) {
    var luminositySum = 0;
    for (var i = 0; i < imageData.length; i += 4) {
        var r = imageData[i];
        var g = imageData[i + 1];
        var b = imageData[i + 2];
        var luminosity = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        luminositySum += luminosity;
    }
    return luminositySum / (imageData.length / 4);
}
