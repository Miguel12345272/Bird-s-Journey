const Bird = document.getElementById('Flappybird')
const Cano1 = document.getElementById('Cano1')
const Cano2 = document.getElementById('Cano2')
const container = document.getElementById('Container')
const Time = document.getElementById("Time")

let bottomValue = 150
let RightValue = 10
const gravity = 5
const birdgravity = 40
const gravity2 = 5
let atual = Date.now()

let canAudio = false

let lose = false

let timePipe = 0

let lose2 = false

let collidepipe = false

let record = localStorage.getItem("recordTime") || 0

let i = 0;
let tempo = 0

function Jump() {
    if (!lose2) {
        bottomValue += (birdgravity - (timePipe / 5))
        Bird.style.bottom = bottomValue + "px"

        let tracks = [
            'wing.wav',
            'swoosh.wav'
        ] 

        let aleatorio = tracks[Math.floor(Math.random() * tracks.length)]

        let audio = new Audio(aleatorio)

        audio.play().catch(error => console.log(error))

        if (bottomValue > 300) {
            localStorage.setItem('Record', Time.innerHTML)
    
            location.reload()
        }
    }
}

function Die(audio) {
    if (audio == 1) {
        if (!canAudio) {
            canAudio = true

            let Audio2 = 'hit.wav'

            let audio = new Audio(Audio2)

            audio.play()

            lose2 = true

            collidepipe = true

            setTimeout(() => {
                if (parseInt(Bird.style.bottom) <= 0) {
                    if (collidepipe) {
                        bottomValue = 0
                        lose = true  
                    }        
                }
            })
        }
    } else if (audio == 2) {
        if (!canAudio) {
            canAudio = true

            let Audio2 = 'die.wav'

            let audio = new Audio(Audio2)

            audio.play()
  
            lose2 = true   
        }
    }

    let time = setTimeout(() => {
        location.href = location.href
    }, 1000)
}

let collideandgravity  = setInterval(() => {
    bottomValue -= gravity
    Bird.style.bottom = bottomValue + 'px'

    let birdrect = Bird.getBoundingClientRect()
    let rect1 = Cano1.getBoundingClientRect()
    let rect2 = Cano2.getBoundingClientRect()

    let collisionCano1 = (
        birdrect.right > rect1.left && 
        birdrect.left < rect1.right && 
        birdrect.bottom > rect1.top && 
        birdrect.top < rect1.bottom
    )

    let collisionCano2 = (
        birdrect.right > rect2.left && 
        birdrect.left < rect2.right && 
        birdrect.bottom > rect2.top && 
        birdrect.top < rect2.bottom
    );

    if (collisionCano1 || collisionCano2) {
        localStorage.setItem('Record', Time.innerHTML)
        Die(1)
    }

    if (bottomValue <= 0) {
        Die(2)
    }
}, 30)

let canos = setInterval(() => {
    RightValue += gravity2

    timePipe += 0.05

    Cano1.style.right = RightValue + 'px'
    Cano2.style.right = RightValue + 'px'
    if (RightValue >= 700) {
        RightValue = -50    

        random = Math.floor(Math.random() * 325)

        if (random <= 90) {
            let atual = random + 155

            RightValue += gravity2
            Cano1.style.right = RightValue + 'px'
            Cano2.style.right = RightValue + 'px'

            Cano1.style.bottom = (atual - (405 - timePipe)) + "px"
            Cano2.style.bottom = atual + "px"
        } else if (random >= 90 && random <= 250) {
            RightValue += gravity2
            Cano1.style.right = RightValue + 'px'
            Cano2.style.right = RightValue + 'px'

            Cano1.style.bottom = (random - (405 - timePipe)) + "px"
            Cano2.style.bottom = random + "px"
        } else if (random > 250) {
            let atual2 = random - 125

            RightValue += gravity2
            Cano1.style.right = RightValue + 'px'
            Cano2.style.right = RightValue + 'px'

            Cano1.style.bottom = (atual2 - (405 - (timePipe / 2.5))) + "px"
            Cano2.style.bottom = atual2 + "px"
        }
    }
}, 30)

setInterval(() => {
    const images = [
        'yellowbird-upflap.png',
        'yellowbird-midflap.png',
        'yellowbird-downflap.png'
    ]

    i = (i + 1) % images.length;
    Bird.src = images[i]
}, 100)

setInterval(() => {
    let time = Date.now() - atual

    Time.textContent = (time / 1000).toFixed(0)

    document.getElementById('record').textContent = `Record Time: ${(record / 1000).toFixed(0)}`

    if (time > record) {
        localStorage.setItem('recordTime', time)
    }
}, 1000) 

window.addEventListener('touchstart', Jump)

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        Jump()
    }
})