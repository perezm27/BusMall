'use strict';


//Random Generator source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random


//Global variables
var leftImgTag = document.getElementById('leftImg');
var centerImgTag = document.getElementById('centerImg');
var rightImgTag = document.getElementById('rightImg');

var imgSelectionTag = document.getElementById('imgSelection');
// var resultsSelectionTag = document.getElementById('results');

var clickCount = 0;
var maxNumOfClicks = 25;


var OurImages = function(name, imgSrc = 'default.jpg', numOfTimesClicked, numOftimeDisplayed){
  this.name = name;
  this.url = imgSrc;

  // ternary operator - shorthand if/else statement
  this.numOfTimesClicked = numOfTimesClicked ? numOfTimesClicked : 0;
  this.numOftimeDisplayed = numOftimeDisplayed || 0;

  OurImages.allImgsArr.push(this);
};

//Stores all our images & stores the previously shown images
OurImages.allImgsArr = [];
OurImages.previousImgShown =[];

//Instatiates our new img Objects
var createNewImgs = function() {
  new OurImages('Bag', './img/bag.jpg');
  new OurImages('Banana', './img/banana.jpg');
  new OurImages('Bathroom', './img/bathroom.jpg');
  new OurImages('Boots', './img/boots.jpg');
  new OurImages('Breakfast', './img/breakfast.jpg');
  new OurImages('Bubblegum', './img/bubblegum.jpg');
  new OurImages('Chair', './img/chair.jpg');
  new OurImages('Alien', './img/cthulhu.jpg');
  new OurImages('Dog-Duck', './img/dog-duck.jpg');
  new OurImages('Dragon', './img/dragon.jpg');
  new OurImages('Pen', './img/pen.jpg');
  new OurImages('Pet-sweep', './img/pet-sweep.jpg');
  new OurImages('Blanket', './img/tauntaun.jpg');
  new OurImages('Unicorn', './img/unicorn.jpg');
  new OurImages('USB', './img/usb.gif');
  new OurImages('Water-Can', './img/water-can.jpg');
  new OurImages('Wine-glass', './img/wine-glass.jpg');
  new OurImages('Scissors', './img/scissors.jpg');
  new OurImages('Shark', './img/shark.jpg');
  new OurImages('Sweep', './img/sweep.png');
};


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//new Random image selection
var selectNewRandomImg = function (currentImgsDisplayed) {
  var index, product;

  do {

    index = getRandomIntInclusive(0, OurImages.allImgsArr.length - 1);
    product = OurImages.allImgsArr[index];

  } while (OurImages.previousImgShown.includes(product) || currentImgsDisplayed.includes(product));

  return product;
};

//selects new img and places them into our currentImgDisplayed array
var renderNewImgs = function (){
  var currentImgsDisplayed = [];

  var leftImg = selectNewRandomImg(currentImgsDisplayed);
  currentImgsDisplayed.push(leftImg);

  var rightImg = selectNewRandomImg(currentImgsDisplayed);
  currentImgsDisplayed.push(rightImg);

  var centerImg = selectNewRandomImg(currentImgsDisplayed);
  currentImgsDisplayed.push(centerImg);

  leftImgTag.src = leftImg.url;
  rightImgTag.src = rightImg.url;
  centerImgTag.src = centerImg.url;

  //assigns our current images shown to our previous images shown
  OurImages.previousImgShown = currentImgsDisplayed;

};


//Handles images clicked & keeps track of how many times they've been clicked & shown
var handleClickedImg = function(event){
  clickCount++;
  var id = event.target.id;

  if (id === 'leftImg'){
    OurImages.previousImgShown[0].numOfTimesClicked++;
  }
  if (id === 'rightImg'){
    OurImages.previousImgShown[1].numOfTimesClicked++;
  }
  if (id === 'centerImg'){
    OurImages.previousImgShown[2].numOfTimesClicked++;
  }
  //increments number of time an image is shown
  for(var i = 0; i < OurImages.previousImgShown.length; i++){
    OurImages.previousImgShown[i].numOftimeDisplayed++;
  }


  if (clickCount < maxNumOfClicks){
    renderNewImgs();
  } else {
    imgSelectionTag.removeEventListener('click', handleClickedImg);
    createBusChart();
  }
};

//calls our functions
var init = function (){
  createNewImgs();
  renderNewImgs();
  imgSelectionTag.addEventListener('click', handleClickedImg);

};

init();


//Our Chart
function createBusChart () {
  var busChartCanvas = document.getElementById('myChart');
  var percents = [];
  var names = [];
  //Calculates our results to render on Chart
  for (var i = 0; i < OurImages.allImgsArr.length; i++){
    var p = Math.floor((OurImages.allImgsArr[i].numOfTimesClicked / OurImages.allImgsArr[i].numOftimeDisplayed) * 100);

    names.push(OurImages.allImgsArr[i].name);
    percents.push(p);
  }
  var chartData = {
    labels: names,
    datasets: [{
      label: '# Of Clicks',
      data: percents,
      backgroundColor: [
        'rgba(255, 99, 132, .4)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, .4)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, .4)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  var busChartObject = {
    type: 'pie',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };
  var busChart = new Chart(busChartCanvas, busChartObject);
}
