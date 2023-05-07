

function escapeHTML(str) {
  const replacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  return str.replace(/[&<>"']/g, function (char) {
    return replacements[char];
  });
}
let res;
const inputField = document.getElementById("name");
const paintArea = document.getElementById("introduction");
const sendButton = document.getElementById("send-button");



sendButton.onclick = async () => {
  startAnimation();
  const name = inputField.value;
  const input = paintArea.value;
  console.log(inputField.value);
  console.log(paintArea.value);
  const formData = new FormData();
  // Append name and introduction to the FormData object
  formData.append("name", name);
  formData.append("text", input);
  console.log("送信します");
  console.log(formData);
  console.log("");
  const response = await fetch("/generate", {
    method: "POST",
    body: formData,
  });
  alert("updated!")
  console.log(response);
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  let genImgs = jsonResponse.generated_images.map((elem) => elem[0].url);
  
  let data = {
    "imgFiles": genImgs, 
    "imgCaptions": {
    jp: jsonResponse.captions,
    jp_altText: [
        'Desc 1',
        'Desc 2',
        'Desc 3',
        'Desc 4'
      ]
    }
  };
  console.log("data");
  console.log(data);
  
  endAnimation();
  showImages(data);
};

function showImages(data) {
  const imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = '';

  if (!data.imgCaptions) {
    data.imgCaptions = {
      jp: [
        'Caption 1',
        'Caption 2',
        'Caption 3',
        'Caption 4'
      ],
      jp_altText: [
        'Desc 1',
        'Desc 2',
        'Desc 3',
        'Desc 4'
      ]
    };
  }
  if (!data.imgFiles) {
    data.imgFiles = [
      'static_2/errimg/img1.png',
      'static_2/errimg/img2.png',
      'static_2/errimg/img3.png',
      'static_2/errimg/img4.png',
    ];
  }

  for (let i = 0; i < data.imgFiles.length; i++) {
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('image-wrapper');
    
    const img = document.createElement('img');
    img.src = data.imgFiles[i];
    img.alt = `Image ${i + 1}: ${data.imgCaptions.jp_altText[i]}`;

    const caption = document.createElement('p');
    caption.innerText = data.imgCaptions.jp[i];

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(caption);

    imageContainer.appendChild(imgWrapper);
  }
}

function createStarEffect(element) {
  var star = document.createElement("div");
  star.classList.add("star");
  star.style.left = element.offsetLeft + "px";
  star.style.top = element.offsetTop + "px";
  document.body.appendChild(star);
  setTimeout(function () {
    document.body.removeChild(star);
  }, 1000);
}

function addStarEffectToCheckboxes() {
  var checkboxes = document.querySelectorAll("#modediv2 input[type='checkbox']");
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        createStarEffect(checkbox);
      }
    });
  });
}
function startAnimation() {
  const sun = document.querySelector('.sun');
  sun.style.display = 'block';

  let index = 0;
  const rays = document.querySelectorAll('.ray');

  function highlightNextRay() {
    rays[index].classList.remove('highlight');
    index = (index + 1) % rays.length;
    rays[index].classList.add('highlight');
  }

  setInterval(highlightNextRay, 1000 / rays.length);

  setTimeout(() => {
    sun.style.display = 'none';
  }, 5 * 60 * 1000);
}
function endAnimation() {
  const sun = document.querySelector('.sun');
  sun.style.display = 'none';
}
function addSlideInAnimation() {
  var elements = document.querySelectorAll("h2, h3, p, input, button, label");
  elements.forEach(function (element, index) {
    setTimeout(function () {
      element.classList.add("slideInFromLeft");
    }, index * 100);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  addStarEffectToCheckboxes();
  addSlideInAnimation();
});
