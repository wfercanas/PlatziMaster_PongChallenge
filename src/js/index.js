//----------------------------------------------Game
class match {
    constructor() {
        this.btnStart = document.getElementById('btnStart')
        this.btnNextLevel = document.getElementById('btnNextLevel')
        this.btnRetry = document.getElementById('btnRetry')
        this.player1Score = document.getElementById('Score1')
        this.player2Score = document.getElementById('Score2')
        this.displayLevel = document.getElementById('level')
        this.screen = document.getElementById('screen')
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

    toggleScreen(){
        if(this.screen.classList.contains('flex')){
            this.screen.classList.remove('flex')
            this.screen.classList.add('hide')
        } else {
            this.screen.classList.remove('hide')
            this.screen.classList.add('flex')
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
            this.screen.innerHTML = '[Player1]: wins'
            clearInterval(this.gameOn)
            if (this.currentLevel == this.totalLevels){
                this.gameWon()
            } else {
                this.toggleBtnNextLevel()
            }
        } else if (this.player2Points == 4){
            this.screen.innerHTML = '[Player2]: wins'
            clearInterval(this.gameOn)
            this.gameOver()
        } else if (this.player1Points ==  3){
            if(this.player2Points == 3){
                this.screen.innerHTML = 'Last point wins'
            } else {
                this.screen.innerHTML = '[Player1]: game point'
            }
        } else if (this.player2Points == 3) {
            this.screen.innerHTML = '[Player2]: game point'
        }

        if (this.player1Points == 3 || this.player2Points == 3){
            if(this.screen.classList.contains('hide')) this.toggleScreen()
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
            this.toggleBtnRetry()
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
        if(ball.posY > player2.position && ball.angle < 180 && player2.position <= 73.5) player2.position += 0.01
        if(ball.posY < player2.position && ball.angle < 180) player2.position -= 0.01
        player2.element.style.top = `${player2.position}vh`
    }
}

//-----------------------------------------------Ball
class baller {
    constructor(){
        this.element = document.getElementById('ball')
        this.posX = 48
        this.posY = 40
        this.angle = 360*Math.random()
        this.speed = 0.10
        this.barsWidth = 1
        this.barsHeight = 11
        this.ballHeight = 2
    }

    resetPosition(){
        ball.posX = 48
        ball.posY = 40
        ball.element.style.top = `${ball.posY}vh`
        ball.element.style.left = `${ball.posX}vw`
    }

    moveBall(){
        if(ball.posX <= this.barsWidth && (ball.posY+this.ballHeight) >= player1.position && ball.posY<= (player1.position + this.barsHeight)) {
            ball.kickBall('player1')
        }

        if(ball.posX >= (100-(this.barsWidth+this.ballHeight)) && (ball.posY+this.ballHeight) >= player2.position && ball.posY <= (player2.position + this.barsHeight)){
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
        
    }

    changeBallDirection(){
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
    }

    kickBall(kicker) {
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
    window.ball = new baller()
    window.game = new match()
    agregarEventos()
}

function nextLevel(){
    game.currentLevel++
    ball.speed += 0.01
    game.toggleBtnNextLevel()
    game.toggleScreen()
    game.resetScore()
    game.printLevel()
    game.gameOn = setInterval(() => ball.moveBall(), 1)
}

function retryGame(){
    game.currentLevel = 1
    ball.speed = 0.1
    game.toggleBtnRetry()
    game.toggleScreen()
    game.resetScore()
    game.printLevel()
    game.gameOn = setInterval(() => ball.moveBall(), 1)
}

