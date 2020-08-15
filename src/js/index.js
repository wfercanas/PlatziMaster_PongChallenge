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
    // positionX: ,
    // positionY:
    // angle: ,
    // speed: ,
}


// const player2 = document.getElementById('player2Bar')
// const score1 = document.getElementById('player1Score')
// const score2 = document.getElementById('player2Score')

//Agregar eventos
function agregarEventos() {
    document.addEventListener('keydown', player1.movePlayer)
    document.addEventListener('keydown', moveBall)
}




//Movimiento del balón
let ballPosX = 0
let ballPosY = 0

function moveBall(event){
    console.log(event)
    //down: 40, up: 38
    switch(event.keyCode){
        case 40:
            ballPosY += 10
            break
        case 38:
            ballPosY -= 10
            break
    }
    ball.style.top = `${ballPosY}px`
}

agregarEventos()
document.addEventListener('load', player1.resetPosition()) 