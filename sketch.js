//variaveis da Bola
let xBOLA = 290;
let yBOLA = 200;
let diamentro = 20;
let raio = diamentro / 2 ;

//Velocidade da Bola
let velocidadexBOLA = 4;
let velocidadeyBOLA = 4;

//variaveis raquete
let xRAQUETE = 5;
let yRAQUETE = 150;
let raquetecomprimento = 10;
let raqueteAltura = 90

let colidiu = false;

//Placar
let meuspontos = 0
let pontosoponente = 0

//variaveis raquete oponente
let xRAQUETEoponente = 585;
let yRAQUETEoponente = 150;
let velocidadeyoponente
let chanceDeErrar = 0;


//sons do jogo
let raquetada;
let ponto; 
let trilha;

function preload(){
  trilha = loadSound('trilha.mp3')
  ponto = loadSound('ponto.mp3')
  raquetada = loadSound('raquetada.mp3')
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0);
  Bola();
  MovimentarBola();
  verificaçaoBorda();
  Raquete(xRAQUETE, yRAQUETE);
  movimentarMinhaRaquete();
  verificaçaoMinhaRaquete();
  Raquete(xRAQUETEoponente, yRAQUETEoponente);
  movimentarRaquetedoOponente();
  VerifiquaColisaoRaquete(xRAQUETE, yRAQUETE);
  Placar();
  marcaPonto();
  VerifiquaColisaoRaquete(xRAQUETEoponente, yRAQUETEoponente);
  
 }

function Bola(){
  circle(xBOLA, yBOLA, diamentro);
}

function MovimentarBola(){
xBOLA += velocidadexBOLA;
  yBOLA += velocidadeyBOLA;
}

function verificaçaoBorda(){
  
 if (xBOLA + raio > width || xBOLA - raio < 0) 
 {velocidadexBOLA *= -1;}
    
    if (yBOLA + raio > height || yBOLA - raio < 0) 
      {velocidadeyBOLA*= -1;}
}

function Raquete(x,y){
  rect(x, y, raquetecomprimento, raqueteAltura)
}

function movimentarMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRAQUETE -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRAQUETE += 10;
  }
}
function verificaçaoMinhaRaquete(){
  if(xBOLA - raio < xRAQUETE + raquetecomprimento && yBOLA - raio < yRAQUETE + raqueteAltura && yBOLA + raio > yRAQUETE){
    velocidadexBOLA *= -1;
  }
}

function VerifiquaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raquetecomprimento, raqueteAltura, xBOLA, yBOLA, raio);
  if(colidiu){
    velocidadexBOLA *= -1;
    raquetada.play();
  }
}


function movimentarRaquetedoOponente(){
  velocidadeyoponente = yBOLA -yRAQUETEoponente -
    raquetecomprimento / 2 - 30;
  yRAQUETEoponente +=velocidadeyoponente
  raquetada.play()
}

function Placar(){
  stroke(255)
  textAlign(CENTER)
  textSize(16)
  fill(color(255,0,0))
  rect(150, 10, 40, 20)
  fill(255)
  text(meuspontos,170, 26)
  fill(color(255,0,0))
  rect(450, 10, 40, 20)
  fill(255)
  text(pontosoponente, 470, 26)
}

function marcaPonto(){
  if(xBOLA > 590){
    meuspontos += 1;
    ponto.play()
  }
  if(xBOLA < 10){
    pontosoponente += 1;
  }
}

