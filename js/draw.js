$(document).ready(function() {
  var chart = new fabric.Canvas('c', {
    containerClass: 'container well drop-zone'
   // width: '100%'//,
    //border: '2px solid #000000'
  });

  chart.isDrawingMode = true;
  //chart.freeDrawingBrush.color="#000000";
  //chart.freeDrawingBrush.width=30;


  // Setup the dnd listeners.
  var dropZone = document.getElementsByClassName('drop-zone')[0];

  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = (evt.dataTransfer|| evt.target).files; // FileList object.

    // files is a FileList of File objects. List some properties.


    for (var i = 0, f; f = files[i]; i++) {
      var reader = new FileReader();
      reader.onload = function(evt) {
        fabric.Image.fromURL(evt.target.result, function(oImg) {
          oImg.width = chart.width;
          oImg.height = chart.height;
          chart.add(oImg);
        });
      };
      reader.readAsDataURL(f);
    }
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);

  fileInput = document.getElementById('file-input');
  fileInput.addEventListener('change', handleFileSelect, false);

  openFile = document.getElementById('open-file');
  openFile.addEventListener('click', function(e) {
    if (fileInput) {
      fileInput.click();
    }
    e.preventDefault();
  }, false);
});
