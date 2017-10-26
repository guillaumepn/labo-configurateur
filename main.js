var container = document.querySelector('.lunette-container');
var listImages = document.querySelectorAll('ul li img');
var imageToSend, blocContainer;

function rejectImage(e) {

  if (e.target.classList.contains('lunette-container')) {

    var temp = imageToSend.cloneNode(true);
    if (container.children.length > 0) {
      while (typeof(container.children[0]) !== 'undefined') {
        // if (typeof(container.children[0]) !== 'undefined') {
          container.children[0].remove();
        // }
      }
    }
    container.appendChild(temp);
  } else {
    imageToSend = undefined;
  }
  enleverImageSouris();
}

function bougerSouris(e) {
  // console.log(e);
  blocContainer.style.top = e.clientY + 'px';
  blocContainer.style.left = e.clientX + 'px';
}

function ajoutImageSouris() {
  blocContainer = document.createElement('div');
  blocContainer.classList.add('mouse-bloc-container');
  if (imageToSend) {
    blocContainer.appendChild(imageToSend.cloneNode(true));
    document.body.appendChild(blocContainer);
    window.addEventListener('mousemove', bougerSouris);
  }
}

function enleverImageSouris() {
  blocContainer.remove();
  window.removeEventListener('mousemove', bougerSouris);
}

listImages.forEach(function(image) {
  image.addEventListener('mousedown', function(e) {
    e.preventDefault();

    var target = e.target || e.srcElement;

    if (typeof(target) == 'object') {
      imageToSend = target;
    }
    ajoutImageSouris();
    window.removeEventListener('mouseup', rejectImage);
    window.addEventListener('mouseup', rejectImage);
  });
});
