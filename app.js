const game = document.getElementById("boardGame");
const stopButton = document.getElementById('stopButton');
const restartButton = document.getElementById('restartButton');
const continueButton = document.getElementById('continueButton');
const scoreBox = document.getElementById('current');
const over = document.getElementById('over');
const record = document.getElementById('highScore')

let size = {
    x: 20,
    y: 20
};

let snake = {
  body: [ [5, 6] ],
  nextDirection:''
};


let {body} = snake;



let buttonPress = false;
let direction = "Right"
let apple;
let intervalId;
let newHead;
let score = 0
let hscore = 0





function gameBoard(boardSize){
  
   
  apple = [Math.floor(Math.random()* size.x), Math.floor(Math.random() * size.y)]

 
  

  for(let i = 0; i < boardSize.y; i++){
    let newRow = document.createElement('div');

    newRow.classList.add("container");

    for(let j = 0; j < boardSize.x; j++){
      let newCell = document.createElement('div')

      newCell.classList.add("cells")
      // newCell.innerText = `${j}:${i}`
      
      newRow.append(newCell)
      
    }
    game.append(newRow);
  }

  render()
};





function snakeState(){

  clearInterval(intervalId)

  
  
  

  
    intervalId =  setInterval(() => {

    
  
    
   let lastElem = body[body.length-1];
   
   
   if(buttonPress){

    switch(direction){
      case("Up"): {
        newHead = [lastElem[0], lastElem[1] - 1]
        break;
      }
      case("Down"): {
        newHead = [lastElem[0], lastElem[1] + 1]
        break;
      }
      case("Right"): {
        newHead = [lastElem[0] + 1, lastElem[1]]
        break;
      }
      case("Left"): {
        newHead= [lastElem[0] - 1, lastElem[1]]
        break;
      }
      default: {
        newHead = newHead
      }
    }
   } else {
      newHead = [lastElem[0] + 1, lastElem[1]]
   };

   let check = borderCheck()

  if(check){

    let inBody = ([x,y]) => newHead[0] === x && newHead[1] === y;
    
    if(body.filter(inBody).length > 0){
      gameOver()
    };

    appleLocation()
    body.push(newHead)
   
    body.shift()
   
    render()

  } else {
    gameOver()

  }
  
  
  }, 120)
}; 

function appleLocation(){
 
  let lastElem = body[body.length - 1]
  
  
  if(newHead[0] === apple[0] && newHead[1] === apple[1]){
    
    score >= hscore ? hscore++ : hscore
    
    
    score++
    scoreBox.textContent = `Score: ${score}`;
    record.textContent = `Best: ${hscore}`;

    apple = [Math.floor(Math.random() * size.x), Math.floor(Math.random() * size.y)]

    

    switch(direction){
    case("Up"): {
        newHead = [lastElem[0], lastElem[1] - 1]
        break;
      }
      case("Down"): {
        newHead = [lastElem[0], lastElem[1] + 1]
        break;
      }
      case("Right"): {
        newHead = [lastElem[0] + 1, lastElem[1]]
        break;
      }
      case("Left"): {
        newHead= [lastElem[0] - 1, lastElem[1]]
        break;
      }
    }

    let check = borderCheck()
    
    check ? body.push(newHead) : gameOver()
    
    let correctLocation = appleCheck()

    while(correctLocation === false){
      console.log("Generating new apple..")
      apple = [Math.floor(Math.random() * size.x), Math.floor(Math.random() * size.y)];
      correctLocation = appleCheck();
      
    }
    
  }
  

  render()
};



function borderCheck(){
  let conditions = [
    newHead[0] < size.x,
    newHead[0] >= 0,
    newHead[1] < size.y,
    newHead[1] >=0
    ];

    if(conditions.every(c => c === true)){
      return true
    } else {
      return false
    }
 };



  window.addEventListener("keydown", (event) => {
    
    buttonPress = true;

    switch(event.key){
      case ("ArrowUp"): {
        direction !== "Down" ? direction = "Up" : direction
      
         break;
      }
      case("ArrowRight"): {
          direction !== "Left" ? direction = "Right" : direction
         break;
      }
      case("ArrowLeft"): {
        direction !== "Right" ? direction = "Left" : direction
         break;
      }
      case("ArrowDown"): {
        direction !== "Up" ? direction = "Down" : direction
        break;
      }
      default: {
      
              
      }
    }     
  });

function gameOver(){
  clearInterval(intervalId)
  over.hidden = false
  continueButton.disabled = true
  stopButton.setAttribute("disabled", "true")
};

function render(){
  let cells = Array.from(document.querySelectorAll('.container'));
  document.querySelectorAll("#head, #snake, #apple").forEach(cell => cell.removeAttribute('id'))

  body.forEach(([x,y]) => {
    cells[y].children[x].id = 'snake'
  });
  cells[body[body.length - 1][1]].children[body[body.length - 1][0]] = 'head'
  cells[apple[1]].children[apple[0]].id = 'apple'

}


function gameReset(){

  
  
  over.hidden = 'true'

  let gameCells = Array.from(document.querySelectorAll('.container'));

  body.forEach(([x,y]) => {
      gameCells[y].children[x].removeAttribute('id')
    })
  
  direction = "Right"

  score = 0;
  scoreBox.textContent = `Score: ${score}`

  body = [[5, 6]];

  snakeState()
   
};

function appleCheck(){
  let check = body.every(([x,y]) => {
    return apple[0] !== x && apple[1] !== y
    })

    return check
};

function gameInit(){
   
  gameBoard(size);
  snakeState()
  
};

gameInit();

stopButton.addEventListener('click', () => {
  clearInterval(intervalId)
  continueButton.disabled = false
  stopButton.setAttribute("disabled", "true")
});
restartButton.addEventListener('click', () => {
  gameReset()
  stopButton.removeAttribute('disabled')
  


});
continueButton.addEventListener('click', () => {
  snakeState();
  continueButton.disabled = "true"
  stopButton.removeAttribute("disabled")
})










