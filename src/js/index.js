//----------------------------------------------Game
var game = {
    player1Score: document.getElementById('Score1'),
    player1Points: 0,
    player2Score: document.getElementById('Score2'),
    player2Points: 0,

    player1Goal: function(){
        game.player1Points++
        console.log(`Player1: ${game.player1Points}`)
        document.getElementById('Score1').innerHTML = `${game.player1Points}`
    },
    player2Goal: function(){
        game.player2Points++
        console.log(`Player2: ${game.player2Points}`)
        game.player2Score.innerHTML = `${game.player2Points}`
    }

}


//----------------------------------------------Player1
let player1 = {
    element: document.getElementById('player1Bar'),
    position: 35,

    resetPosition: function() {
        player1.element.style.top = `${player1.position}vh`
    },

    movePlayer: function(event){
        switch(event.keyCode){
            case 83:
                player1.position += 2
                break
            case 87:
                player1.position -= 2
                break
        }
        if(player1.position < 0) player1.position = 0
        if(player1.position > 73.5) player1.position = 73.5
        player1.element.style.top = `${player1.position}vh`
    }
}

//-----------------------------------------------Ball
let ball = {
    element: document.getElementById('ball'),
    posX: 48,
    posY: 40,
    angle: Math.floor(360*Math.random()),
    speed: 0.09,

    resetPosition: function(){
        ball.element.style.top = '82.6vh'
        ball.element.style.left = 'center'
    },

    cicleBall: function(){
        setInterval(() => ball.moveBall(), 1)
    },
    
    moveBall: function (){      
        if(ball.posX<=0 || ball.posX >= 98 || ball.posY <= 0 || ball.posY >= 82.6){
            if(ball.posX <= 0) game.player2Goal()
            if(ball.posX >= 98) game.player1Goal()
            ball.changeBallDirection()
        } else {
            ball.posX += ball.speed * Math.sin(ball.angle * Math.PI/180)
            ball.element.style.left = `${ball.posX}vw`
            ball.posY -= ball.speed * Math.cos(ball.angle * Math.PI/180)
            ball.element.style.top = `${ball.posY}vh`
        }
        
    },

    changeBallDirection: function(){
        if (ball.posX <= 0 && ball.angle <= 270){
            ball.angle -= 2 * (ball.angle - 180)
            ball.posX++
        } else if(ball.posX <= 0 && ball.angle > 270){
            ball.angle -= 360 - 2*(360-ball.angle)
            ball.posX++
        } else if (ball.posX >= 98 && ball.angle <= 90) {
            ball.angle += 180 + 2*(90-ball.angle)
            ball.posX--
        } else if (ball.posX >= 98 && ball.angle > 90) {
            ball.angle += 180 - 2*(ball.angle-90)
            ball.posX--
        } else if (ball.posY <= 0 && ball.angle >= 270) {
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

}

//Agregar eventos
function agregarEventos() {
    document.addEventListener('load', player1.resetPosition()) 
    document.addEventListener('load', ball.resetPosition()) 
    document.addEventListener('load', ball.cicleBall())
    document.addEventListener('keydown', player1.movePlayer)
}

agregarEventos()
