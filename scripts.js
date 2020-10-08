var images = [];
var currentImage = 0;
var control = 1;
var help = "";

$.ajax({
    url : "./data",
    success: function (data) {
        $(data).find("a").attr("href", function (i, val) {
            if (val.match(/\.(jpe?g|png|gif)$/) ) {
                images.push(val);
                //console.log(images);
                if(control === 1) {
                    reloadImg();
                    control = 0;
                }
            }
        });
    }
});

function reloadImg(){
    if (currentImage < 0) {
        currentImage = images.length - 1;
    }
    if (currentImage > images.length - 1) {
        currentImage = 0;
    }
    console.log(images[currentImage]);
    //$("#picture").attr("src", images[currentImage]);
    $("#picDiv").css("background-image", "url("+images[currentImage]+")");
}
    
$("#rightAr").click(() => {
    currentImage += 1;
    reloadImg();
})
$("#leftAr").click(() => {
    currentImage -= 1;
    reloadImg();
})

