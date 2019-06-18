'use strict';

//Global variables
var imgSelectionTag = document.getElementById('imgSelection');
var leftImgTag = document.getElementById('leftImg');
var centerImgTag = document.getElementById('centerImg');
var rightImgTag = document.getElementById('rightImg');

var totalNumOfClicks = 0;

//Stores imgs already on the page
var leftImgOnThePage = null;
var centerImgOnThePage = null;
var rightImgOnThePage = null;

var OurImages = function(name, imgSrc){
  this.name = name;
  this.numOfTimesClicked = 0;
  this.numOftimeDisplayed = 0;
  this.url = imgSrc;
  // this.imgID = '';

  OurImages.allImgsArr.push(this);

};

OurImages.allImgsArr = [];

var renderNewImgs = function (leftIndex, centerIndex, rightIndex){
  leftImgTag.src = OurImages.allImgsArr[leftIndex].url;
  centerImgTag.src = OurImages.allImgsArr[centerIndex].url;
  rightImgTag.src = OurImages.allImgsArr[rightIndex].url;

};

//new img selection
var selectNewRandomImg = function () {
  var leftIndex = Math.round(Math.random() * OurImages.allImgsArr.length);

  var centerIndex = Math.round(Math.random * OurImages.allImgsArr.length);

  do {
    var rightIndex = Math.round(Math.random() * OurImages.allImgsArr.length);
  } while (rightIndex === leftIndex);

  console.log(OurImages.allImages[leftIndex].name, OurImages.allImages[rightIndex].name);

  leftImgOnThePage = OurImages.allImgsArr[leftIndex];
  centerImgOnThePage = OurImages.allImgsArr[centerIndex];
  rightImgOnThePage = OurImages.allImgsArr[rightIndex];

  renderNewImgs(leftIndex, centerIndex,rightIndex);
};

var handleClickedImg = function(event){
  //TODO: change to 25
  if(totalNumOfClicks < 26 ){

    var imgClickedOn = event.target;
    var id = imgClickedOn.id;

    if (id === 'leftImg' || id === 'centerImg' || id === 'rightImg'){
      if (id === 'leftImg'){
        leftImgOnThePage.numOfTimesClicked++;
      }

      if (id === 'centerImg'){
        centerImgOnThePage.numOfTimesClicked++;
      }

      if(id ==='rightImg'){
        rightImgOnThePage.numOfTimesClicked++;
      }

      leftImgOnThePage.numOftimeDisplayed++;
      centerImgOnThePage.numOftimeDisplayed++;
      rightImgOnThePage.numOftimeDisplayed++;

      selectNewRandomImg();
    }
    console.log('event: ',event.target.id);
  }
  totalNumOfClicks++;

  //increment to 25
  if(totalNumOfClicks === 25){
    imgSelectionTag.removeEventListener('click', handleClickedImg);
  }
};

leftImgTag.addEventListener('click', handleClickedImg);
centerImgTag.addEventListener('click', handleClickedImg);
rightImgTag.addEventListener('click', handleClickedImg);

imgSelectionTag.addEventListener('click', handleClickedImg);

//Instatiates our new img Objects

new OurImages('Bag', './img/bag.jpg');
new OurImages('Banana', 'img/banana.jpg');
new OurImages('Bathroom', 'img/bathroom.jpg');
new OurImages('Boots', 'img/boots.jpg');
new OurImages('Breakfast', 'img/breakfast.jpg');
new OurImages('Bubblegum', 'img/bubblegum.jpg');
new OurImages('Chair', 'img/chair.jpg');
new OurImages('Alien', 'img/cthulhu.jpg');
new OurImages('Dog-Duck', 'img/dog-duck.jpg');
new OurImages('Dragon', 'img/dragon.jpg');
new OurImages('Pen', 'img/pen.jpg');
new OurImages('Pet-sweep', 'img/pet-sweep.jpg');
new OurImages('Blanket', 'img/tauntaun.jpg');
new OurImages('Unicorn', 'img/unicorn.jpg');
new OurImages('USB', 'img/usb.gif');
new OurImages('Water-Can', 'img/water-can.jpg');
new OurImages('Wine-glass', 'img/wine-glass.jpg');
new OurImages('Scissors', 'img/scissors.jpg');
new OurImages('Shark', 'img/shark.jpg');
new OurImages('Sweep', 'img/sweep.png');


selectNewRandomImg();


