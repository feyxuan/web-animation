window.onload = function() {
    console.log("document.onload", Date.now());

    var myBtn = document.querySelector("#myBtn");
    myBtn.addEventListener("click", openForm, false);

    var close = document.querySelector("#close");
    close.addEventListener("click", closeMe, false);

    var myForm = document.querySelector("#myForm");

    function openForm() {
        //Unhide form
        myForm.style.display = "block";
    }

    function closeMe() {
        //Hide form
        myForm.style.display = "none";
    }
}

    /*
    Rain Test Using .PNG rain drops and requestAnimationFrame
    You can copy and use this code freely in any kind of apps as a hobbist or professional
    You are not allowed to redistribute or host this code and it's corresponding article anywhere else
    Copyright © by Siavash Mortazavi
    */

    var context = null;
    var particleArray = [];
    var particleTimer = null;
    var maxParticleCount = 300;
    var animTimerId;

    $(document).ready(function () { initRainCanvas(200); });

    function initRainCanvas(interval) {
        context = $(".rainCanvas").get(0).getContext("2d");
        particleTimer = setInterval(addParticle, interval);
        animTimerId = window.requestAnimationFrame(animate);
    }

    function animate() {
        update();
        paint();
        animTimerId = window.requestAnimationFrame(animate);
    }

    function addParticle() {
        particleArray[particleArray.length] = new Particle();
        if (particleArray.length == maxParticleCount)
            clearInterval(particleTimer);
    }

    function Particle() {
        this.x = Math.round(Math.random() * context.canvas.width);
        this.y = -10;
        this.drift = 4;
        this.speed = Math.round(Math.random() / 5) + 15;

        var rand = Math.random();
        this.rainDrop = rand < 0.33 ? $("#raindrop1").get(0) : rand < 0.66 ? $("#raindrop2").get(0) : $("#raindrop3").get(0);
    }

    function update() {
        for (var i = 0; i < particleArray.length; i++) {
            if (particleArray[i].y < context.canvas.height) {
                particleArray[i].y += particleArray[i].speed;
                if (particleArray[i].y > context.canvas.height)
                    particleArray[i].y = -1;

                particleArray[i].x += particleArray[i].drift;
                if (particleArray[i].x > context.canvas.width)
                    particleArray[i].x = 0;
            }
        }
    }

    function paint() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        for (var i = 0; i < particleArray.length; i++) {
            context.drawImage(particleArray[i].rainDrop, particleArray[i].x, particleArray[i].y);
        }
    }
