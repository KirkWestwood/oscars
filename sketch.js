var table;
var font;
var yearoffset = 25;    // how far the year labels need to be pushed back
var movies = [];
var margin = 100;       // left and top edge
var lineheight = 800;   // height of budget bars
var gridspace = 130;    // space between budget bars
var startyear = 2008;
var hovered = false;
var r = 5;              // scale of radius correlating to how many awards films have won


var scalegap;
var currentscale;
var scale1 = ["< 1 mil", "100 mil", "150 mil", "20 mil", "250 mil"];
// var scale1 = [0,50,100,150,200,250];
var scale2 = [0.99, 5, 10, 15, 20, 25, 30];


const GRIDMID = 480; // midpoint of vertical line grid

function preload() {
  table = loadTable("budgets.csv", "csv", "header");
  font = loadFont("fonts/apercu_mono.otf");
}

function mouseMoved(){
  for (var m = 0; m < movies.length; m++){
    if (abs(movies[m].x - mouseX) < 15 && abs(movies[m].y - mouseY < 15)){
      movies[m].hovered = true; 
    } else {
      movies[m].hovered = false;
    }
  }
}



function setup() {
  createCanvas(1900,1000);
  rectMode(CENTER);
  textFont(font);
  currentscale = scale1;
  scalegap = lineheight / (currentscale.length-1);
  
  for (var r = 0; r < table.getRowCount(); r++){
    var movie = {};
    movie.date = parseInt(table.getRow(r).get("date"));
    movie.budget = parseFloat(table.getRow(r).get("budget"));
    movie.title = table.getRow(r).get("title");
    movie.awards = parseInt(table.getRow(r).get("awards"));
    movie.best = table.getRow(r).get("best");
    movie.id = r;
    movie.x = margin + gridspace * abs(startyear - movie.date);
    movie.y = map(movie.budget, 0, 250, GRIDMID + lineheight/2, GRIDMID - lineheight/2);
    movie.hovered = false;
    movies.push(movie);
  }

}

function draw() {
  background(0);
  stroke('#33323D');
  strokeWeight(2);
  noFill();

  // GRID

  for (var g = 0; g < 11; g++){
        // DRAW GRID LINES
        push();
        stroke('#33323D');
        strokeWeight(2);
        noFill();
        line(margin + gridspace * g, GRIDMID + lineheight/2, margin + gridspace * g, GRIDMID - lineheight/2);
        pop();
  }
  
  for (var t = startyear; t < 2019; t++){
        push();
        fill(255);
        noStroke();
        textSize(20);
        text(t, margin - yearoffset + gridspace * abs(startyear-t), 60);  
  }




  for (var m = 0; m < movies.length; m++){ 
      // DRAW MOVIE DATA CIRCLES
    if (movies[m].date >= startyear){
      if (movies[m].best != "TRUE"){
        fill(60, 60, 70, 170); 
        noStroke();
        ellipse(margin + gridspace * abs(startyear - movies[m].date), 
                  map(movies[m].budget, 0, 250, GRIDMID + lineheight/2, GRIDMID - lineheight/2),
                  r * movies[m].awards, r * movies[m].awards);
        }
      }
    }
 
   for (var m = 0; m < movies.length; m++){ 
       // DRAW MOVIE DATA CIRCLES / BEST PICTURE WINNERS
    if (movies[m].date >= startyear){
      if (movies[m].best == "TRUE"){
        if (movies[m].hovered === true){
        strokeWeight(3);
        stroke('#ffffff'); 
        } else {
        strokeWeight(1.5);
        stroke('#FAAB19');
        }
        noFill();
        ellipse(margin + gridspace * abs(startyear - movies[m].date), 
              map(movies[m].budget, 0, 250, GRIDMID + lineheight/2, GRIDMID - lineheight/2),
              r * movies[m].awards, r * movies[m].awards);
        }
    }
  }
      
      // for (var t = 0; t < 11; t++){      
      // fill(255);
      // noStroke();
      // textSize(20);
      // text("TEE", margin + gridspace * t, 100);  
      // }


}

// // SUCKY ATTEMPT TO HIGHLIGHT NONWINNERS 
//   for (var m = 0; m < movies.length; m++){ 
//       // DRAW MOVIE DATA CIRCLES
//     if (movies[m].date >= startyear){
//       if (movies[m].best != "TRUE"){
//         if (movies[m].hovered === false){
//         fill(60, 60, 70, 170); 
//         noStroke();
//         ellipse(margin + gridspace * abs(startyear - movies[m].date), 
//                   map(movies[m].budget, 0, 250, GRIDMID + lineheight/2, GRIDMID - lineheight/2),
//                   r * movies[m].awards, r * movies[m].awards);
//         }
//       }
//     }
//   }      
//   for (var m = 0; m < movies.length; m++){ 
//       // DRAW MOVIE DATA CIRCLES
//     if (movies[m].date >= startyear){
//       if (movies[m].best != "TRUE"){
//         if (movies[m].hovered === true){
//         fill(70, 70, 77, 200);   
//         noStroke();
//         ellipse(margin + gridspace * abs(startyear - movies[m].date), 
//                   map(movies[m].budget, 0, 250, GRIDMID + lineheight/2, GRIDMID - lineheight/2),
//                   r * movies[m].awards, r * movies[m].awards);
//         }
//       }
//     }
//   }  
// // END OF SUCKY ATTEMPT TO HIGHLIGHT NONWINNERS

// LITTLE ENDPOINTS
        // var endpoint = 7; (put this at top)
        // ellipse(margin + gridspace * g, GRIDMID - lineheight/2 - endpoint/2, endpoint, endpoint);
        // ellipse(margin + gridspace * g, GRIDMID + lineheight/2 + endpoint/2, endpoint, endpoint);
