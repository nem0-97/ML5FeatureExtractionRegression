let mobilenet;
let regressor;
let video;
let guess;

function setup(){
  createCanvas(640,650);
  background(0);
  video=createCapture(VIDEO);
  video.hide();
  mobilenet=ml5.featureExtractor('MobileNet',()=> console.log('Model has been loaded.'));
  regressor=mobilenet.regression(video,()=> console.log('video has been loaded.'));
}

//called by button when adding images with 0 to 1 value to regressor
function addClassImg(label){
  regressor.addImage(label);
}

//called after images added to regressor and when training is started by user
//(regressor.train is called in HTML)
//loss is amount of error when training on images
function whileTraining(loss){
  if(!loss){
    console.log('training is complete.');
    regressor.predict(prediction);
  }
}

function prediction(err,result){
  if(err){
    console.log(err);
  }
  else{
    guess=result;
    //rerun predictions continously if no errors
    regressor.predict(prediction);
  }
}

function draw(){
  background(0);
  image(video,0,0);
  fill(255);
  textSize(32);
  if(guess){
    text(guess,10,height-60);
  }
}
