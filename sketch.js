var table;
var movies = [];
var margin = 100;
var lineheight = 800;
var endpoint = 7;
var gridspace = 130;
var startyear = 2008;
var r = 5;
var hovered = false;


var scalegap;
var currentscale;
var scale1 = ["< 1 mil", "100 mil", "150 mil", "20 mil", "250 mil"];
// var scale1 = [0,50,100,150,200,250];
var scale2 = [0.99, 5, 10, 15, 20, 25, 30];


const GRIDMID = 480; // midpoint of vertical line grid

function preload() {
  table = loadTable("budgets.csv", "csv", "header");
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
  createCanvas(1200,1000);
  rectMode(CENTER);
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
    console.log(movie.y);
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
        line(margin + gridspace * g, GRIDMID + lineheight/2, margin + gridspace * g, GRIDMID - lineheight/2);
        // ellipse(margin + gridspace * g, GRIDMID - lineheight/2 - endpoint/2, endpoint, endpoint);
        // ellipse(margin + gridspace * g, GRIDMID + lineheight/2 + endpoint/2, endpoint, endpoint);
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
      
  // for (var s = 0; s < currentscale.length + 1; s++){
  //     textSize(14);
  //     line(1100, GRIDMID + lineheight/2 - scalegap * s, 1120, GRIDMID + lineheight/2 - scalegap * s);    
  //     // text(currentscale[s], 1100, GRIDMID + lineheight/2 - scalegap * s, 150, 20);
  // } 


}