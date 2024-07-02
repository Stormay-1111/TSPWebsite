var activeImg = false;
const loader = document.getElementById("loader")
loader.style.display = "none";
let probabilityp0 = document.getElementById("probabilityp0");
let probabilityp1 = document.getElementById("probabilityp1");
let conclusionp = document.getElementById("conclusionp");

$('#results').hide();

$("input").change(function(e) {

  if (activeImg == false) {
      for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
    
          var file = e.originalEvent.srcElement.files[i];
    
          var img = document.createElement("img");
          var reader = new FileReader();
          reader.onloadend = function() {
               img.src = reader.result;
          }
          reader.readAsDataURL(file);
          $("input").after(img);

          img.style.width = "500px";
          img.style.height = "500px";
          img.style.margin = "auto";
          img.style.padding = "30";
          img.id = "image";

          activeImg = true;
      }
  }
});

  
async function getResults() {

  if (activeImg == true) {

    loader.style.display = "block";
  
    const image = document.getElementById('image');
    let model = new cvstfjs.ClassificationModel();
    await model.loadModelAsync('model.json');
    const result = await model.executeAsync(image);
  
    loader.style.display = "none";
  
    console.log(result)
  
    probabilityp0.innerHTML = "Melanocytic Nevus probability: " + result[0][0];
    probabilityp1.innerHTML = "Non-Melanocytic Nevus probability: " + result[0][1];
    if (result[0][0]>result[0][1]) {
      conclusionp.innerHTML = "Further information: Your submitted image is probably a melanocytic nevus. The lesion is likely to be formed primarily of melanocytes, i.e. melanin producing cells.";
    }
    else {
      conclusionp.innerHTML = "Further information: Your submitted image is probably a non-melanocytic nevus. The lesion is likely formed of cells not involved in mass production of melanin."
    }
    
    $('#results').show();
  }

  }

  function resultsButton() {
    getResults();
    console.log(typeof(image))
  }

  document.getElementById("resultsButton").onclick = resultsButton;

  function resetButton() {
    $('#results').hide();
    $(image).remove();
    activeImg = false;
    loader.style.display = "none";
  }

  document.getElementById("reset").onclick = resetButton;
