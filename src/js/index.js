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
    angle: 290,
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
