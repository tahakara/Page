
//  Lorem ipsum Song 
var audio = document.createElement("AUDIO")
var cooldown1 = false;



document.body.appendChild(audio);
audio.src = "https://tahakara.dev/assets/lorem.mp3";
audio.volume = 0.47;


function fade() {
    var i = 0;
    var image = document.getElementsByClassName("sence")[0];
    image.style.opacity = 0;
    
    var k = window.setInterval(function() {
      
        if (i >= 200) {
            clearInterval(k);
        } else {
            image.style.opacity = i / 100;
            i++;
        }
    }, 200);
};





document.body.addEventListener("click", function () {
 
    // image transition .sence opaccity 0  to 1     transition: visibility 0s linear 300ms, opacity 6000ms; 
    if (cooldown1 == false) {    
        fade()
        audio.play()
        cooldown1 = true;
	    setTimeout(() => {
	    	cooldown1 = false
            console.log("Cooldown has ended")
	    }, 46000);
    }
    else if (cooldown1 != false || cooldown1 == true){
        console.log("Cooldown is true")
    }
    else {
        console.log("Erorr")
    };
}
)



