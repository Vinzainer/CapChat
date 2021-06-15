var script = document.createElement('script');
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var timeleft = 30;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
  }
  document.getElementById("progressBar").value = 30 - timeleft;
  timeleft -= 1;

  if(timeleft == 0){
    document.location.reload();
  }
}, 1000);

function generate(){
  var imageIndex = [];
  const displayedImage = document.querySelector('.displayed-img');
  const thumbBar = document.querySelector('.thumb-bar');

  const btn = document.querySelector('button');
  const overlay = document.querySelector('.overlay');

  /* Looping through images */

  var place = Math.floor(Math.random() * 8) + 1;
  var singulier;
  for(let i = 1; i <= 8; i++){
    if(i == place){
      singulier = Math.floor(Math.random() * 14) + 1;
      const newImage = document.createElement('img');
      name = "http://localhost:8080/images/singuliers/chat_" + singulier + ".jpg"
      newImage.setAttribute('src', name);
      newImage.setAttribute('class', "singulier");
      newImage.setAttribute('onclick', "check(this)");
      thumbBar.appendChild(newImage);
    }
    else{
      var n = Math.floor(Math.random() * 13) + 1;

      while(imageIndex.includes(n)){
        n = Math.floor(Math.random() * 13) + 1;
      }
      console.log(n)
      imageIndex.push(n);
      const newImage = document.createElement('img');
      name = "http://localhost:8080/images/neutres/chat neutre " + n + ".jpg"
      newImage.setAttribute('src', name);
      newImage.setAttribute('class', "neutre");
      newImage.setAttribute('onclick', "check(this)");
      thumbBar.appendChild(newImage);
    }
  }

  const indice = document.createElement('p');
  indice.setAttribute('id', "indice");
  thumbBar.appendChild(indice);
  $('#indice').load("http://localhost:8080/images/singuliers/indice_" + singulier + ".txt");
}

function check(img){
  if(img.className == "singulier"){
    alert("Réussi !");
    clearInterval(downloadTimer);
  }
  else{
    timeleft -= 5;
    alert("Raté !");
  }
}
