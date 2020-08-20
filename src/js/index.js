//----------------------------------------------Game
class match {
    constructor() {
        this.btnStart = document.getElementById('btnStart')
        this.btnNextLevel = document.getElementById('btnNextLevel')
        this.btnRetry = document.getElementById('btnRetry')
        this.player1Score = document.getElementById('Score1')
        this.player2Score = document.getElementById('Score2')
        this.displayLevel = document.getElementById('level')
        this.totalLevels = 10
        this.currentLevel = 1
        this.player1Points = 0
        this.player2Points = 0
        this.toggleBtnStart()
        this.printLevel()
        this.gameOn = setInterval(() => ball.moveBall(), 1)
    }

    toggleBtnStart(){
        if(this.btnStart.classList.contains('hide')){
            this.btnStart.classList.remove('hide')
        } else {
            this.btnStart.classList.add('hide')
        }
    }

    toggleBtnNextLevel(){
        if(this.btnNextLevel.classList.contains('hide')){
            this.btnNextLevel.classList.remove('hide')
        } else {
            this.btnNextLevel.classList.add('hide')
        }
    }

    toggleBtnRetry(){
        if(this.btnRetry.classList.contains('hide')){
            this.btnRetry.classList.remove('hide')
        } else {
            this.btnRetry.classList.add('hide')
        }
    }

    resetScore(){
        this.player1Points = 0
        this.player1Score.innerHTML = `${this.player1Points}`
        this.player2Points = 0
        this.player2Score.innerHTML = `${this.player2Points}`
    }

    resetGame(){
        this.resetScore()
        this.currentLevel = 1

    }

    printLevel() {
        this.displayLevel.innerHTML = `Level: ${this.currentLevel}/${this.totalLevels}`
    }

    goal(player){
        if (player == 'player1') {
            this.player1Points++
            this.player1Score.innerHTML = `${this.player1Points}`
        } else {
            this.player2Points++
            this.player2Score.innerHTML = `${this.player2Points}`
        }

        if (this.player1Points == 4){
            console.log('Player1 wins')
            clearInterval(this.gameOn)
            if (this.currentLevel == this.totalLevels){
                this.gameWon()
                this.toggleBtnRetry()
            } else {
                this.toggleBtnNextLevel()
            }
        } else if (this.player2Points == 4){
            console.log('Player2 wins')
            clearInterval(this.gameOn)
            this.gameOver()
        } else if (this.player1Points ==  3){
            if(this.player2Points == 3){
                console.log('Last point wins')
            } else {
                console.log('Player1: game point')
            }
        } else if (this.player2Points == 3) {
            console.log('Player2: game point')
        }
    }

    gameOver(){
        swal('Game Over','You can always try again', 'error')
        .then(() => {
            this.toggleBtnRetry()
        })
    }

    gameWon(){
        swal('Victory!', 'Well played', 'success')
        .then(() => {
          this.inicializar();
        })
    }
}


//----------------------------------------------Player1
let player1 = {
    element: document.getElementById('player1Bar'),
    position: 35,

    resetPosition: function(){
      player1.element.style.top = '35vh'  
    },
    
    movePlayer1: function(event){
        switch(event.keyCode){
            case 83:
                player1.position += 3
                break
            case 87:
                player1.position -= 3
                break
        }
        if(player1.position < 0) player1.position = 0
        if(player1.position > 73.5) player1.position = 73.5
        player1.element.style.top = `${player1.position}vh`
    }
}

//-----------------------------------------------Player2

let player2 = {
    element: document.getElementById('player2Bar'),
    position: 35,

    ciclePlayer2: function() {
        setInterval(() => player2.movePlayer2(),1)
    },

    movePlayer2: function() {
        if(ball.posY > player2.position && ball.angle < 180 && player2.position <= 73.5) player2.position += 0.08
        if(ball.posY < player2.position && ball.angle < 180) player2.position -= 0.08
        player2.element.style.top = `${player2.position}vh`
    }
}

//-----------------------------------------------Ball
let ball = {
    element: document.getElementById('ball'),
    posX: 48,
    posY: 40,
    angle: 360*Math.random(),
    speed: 0.15,

    resetPosition: function(){
        ball.posX = 48
        ball.posY = 40
        ball.element.style.top = `${ball.posY}vh`
        ball.element.style.left = `${ball.posX}vw`
    },
    
    moveBall: function (){
        if(ball.posX <= 1 && ball.posY >= player1.position && ball.posY<= (player1.position + 11)) {
            ball.kickBall('player1')
        }

        if(ball.posX >= 97 && ball.posY >= player2.position && ball.posY <= (player2.position + 11)){
            ball.kickBall('player2')
        }

        if(ball.posX<=0 || ball.posX >= 98){
            if(ball.posX <= 0) {
                game.goal('player2')
                ball.angle = 100 + 60*Math.random()
            }
            if(ball.posX >= 98) {
                game.goal('player1')
                ball.angle = 270 - 60*Math.random()
            }
            ball.resetPosition()
        }

        if(ball.posY <= 0 || ball.posY >= 82.6){
            ball.changeBallDirection()
        } else {
            ball.posX += ball.speed * Math.sin(ball.angle * Math.PI/180)
            ball.element.style.left = `${ball.posX}vw`
            ball.posY -= ball.speed * Math.cos(ball.angle * Math.PI/180)
            ball.element.style.top = `${ball.posY}vh`
        }
        
    },

    changeBallDirection: function(){
        if (ball.posY <= 0 && ball.angle >= 270) {
            ball.angle -= 2*(ball.angle - 270)
            ball.posY++
        } else if (ball.posY <= 0 && ball.angle <= 90){
            ball.angle += 180 - 2*ball.angle
            ball.posY++
        } else if (ball.posY >= 82.6 && ball.angle <= 180){
            ball.angle -= 2 * (ball.angle - 90)
            ball.posY--
        } else {
            ball.angle += 2 * (270 - ball.angle)
            ball.posY--
        }
    },

    kickBall: function(kicker) {
        (kicker == 'player1') ? ball.angle = 25 + Math.random()*130 : ball.angle = 335 - Math.random()*130
    }

}

//Agregar eventos
function agregarEventos() {
    document.addEventListener('load', player1.resetPosition()) 
    document.addEventListener('load', ball.resetPosition()) 
    document.addEventListener('load', player2.ciclePlayer2())
    document.addEventListener('keydown', player1.movePlayer1)
}

function newGame() {
    agregarEventos()
    window.game = new match()
}

function nextLevel(){
    game.toggleBtnNextLevel()
    game.currentLevel++
    game.resetScore()
    game.printLevel()
    game.gameOn = setInterval(() => ball.moveBall(), 1)
}

function retryGame(){
    game.toggleBtnRetry()
    game.currentLevel = 1
    game.resetScore()
    game.printLevel()
    game.gameOn = setInterval(() => ball.moveBall(), 1)
}

