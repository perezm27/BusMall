'use strict';
/*
A simple Web Application that keeps tracks of the users favorite items
and displays that data using chart.js

Random Generator source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/

//Global variables
var leftImgTag = document.getElementById('leftImg');
var centerImgTag = document.getElementById('centerImg');
var rightImgTag = document.getElementById('rightImg');
var imgSelectionTag = document.getElementById('imgSelection');
var clickCount = 0;
var maxNumOfClicks = 25;
var percents = [];
var names = [];
//holds localStorage items
var x, y;

//checkStorage
var checkStorage = function(){
  if(localStorage === null){
    init();

  } else if (localStorage !== null){
    x = JSON.parse(localStorage.getItem('Nameofimgs'));
    y = JSON.parse(localStorage.getItem('Percentageofitemsclicked')) ;
    generateBusChartData();
  }
};

//Img Constructor begings
var OurImages = function(name, imgSrc, numOfTimesClicked, numOftimeDisplayed){
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

//Calculates random Img
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//new Random image selection
var selectNewRandomImg = function (currentImgsDisplayed) {
  var index, images;

  do {

    index = getRandomIntInclusive(0, OurImages.allImgsArr.length - 1);
    images = OurImages.allImgsArr[index];

  } while (OurImages.previousImgShown.includes(images) || currentImgsDisplayed.includes(images));

  return images;
};

//selects imgs shown and places them into our currentImgDisplayed array
var renderNewImgs = function (){
  var currentImgsDisplayed = [];

  var leftImg = selectNewRandomImg(currentImgsDisplayed);
  currentImgsDisplayed.push(leftImg);

  var rightImg = selectNewRandomImg(currentImgsDisplayed);
  currentImgsDisplayed.push(rightImg);

  var centerImg = selectNewRandomImg(currentImgsDisplayed);
  currentImgsDisplayed.push(centerImg);

  //Captures img URL
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

  //Handles how the imgs are displayed
  if (id === 'leftImg'){
    OurImages.previousImgShown[0].numOfTimesClicked++;
  }
  if (id === 'rightImg'){
    OurImages.previousImgShown[1].numOfTimesClicked++;
  }
  if (id === 'centerImg'){
    OurImages.previousImgShown[2].numOfTimesClicked++;
  }
  //increments number of times an image is shown
  for(var i = 0; i < OurImages.previousImgShown.length; i++){
    OurImages.previousImgShown[i].numOftimeDisplayed++;
  }

  //Renders new imgs based on clickCount
  if (clickCount < maxNumOfClicks){
    renderNewImgs();
  } else {
    //Disables event handler & generates our BusChart
    imgSelectionTag.removeEventListener('click', handleClickedImg);
    generateBusChartData();

    //saves our data to localStorage
    localStorage.setItem('Percentageofitemsclicked', JSON.stringify(percents));
    localStorage.setItem('Nameofimgs', JSON.stringify(names));
    checkStorage();
  }
};

//calls our functions
var init = function (){
  //if localStorage exists pop globals if does not exits treate as empty
  checkStorage();
  createNewImgs();
  renderNewImgs();
  imgSelectionTag.addEventListener('click', handleClickedImg);
};

init();

//Our Chart
function generateBusChartData () {
  var busChartCanvas = document.getElementById('myChart');

  //Calculates our data to render on Chart
  for (var i = 0; i < OurImages.allImgsArr.length; i++){
    var p = Math.floor((OurImages.allImgsArr[i].numOfTimesClicked / OurImages.allImgsArr[i].numOftimeDisplayed) * 100);

    names.push(OurImages.allImgsArr[i].name);
    percents.push(p);

  }
  var chartData = {
    labels: x,
    datasets: [{
      label: '# Of Clicks',
      data: y,
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
    type: 'doughnut',
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
