var images = [];
var currentImage = 0;
var control = 1;
var folder = "./data/";
var descriptions = [];


//Happens at the start
$.ajax({
    url : folder,
    success: function (data) {
        $(data).find("a").attr("href", function (i, val) {
            if (val.match(/\.(jpe?g|png|gif)$/) ) {
                images.push({photo: val.split("/").pop(), title: "", description: ""});
                if(control === 1) {
                    //Happens only once at start
                    //reloadImg();
                    control = 0;
                }
            } else {
                //readDescriptions("./data/descriptions.txt", reloadImg);
            }
        });
        readDescriptions("./data/descriptions.txt");   
    }
});

function readDescriptions(file) {
    $.ajax({url: file, success: function(result){
        descriptions = result.replaceAll("\r","").split("\n");
        //console.log(descriptions);
        descriptions.forEach(i => {
            images.forEach(j => {
                var iHelp = i.split(": ");
                if(j.photo.split(".")[0] === iHelp[0]) {
                    if(iHelp[1] === "") {
                        j.title = iHelp[0];
                    } else {
                        j.title = iHelp[1];
                    }
                    j.description = iHelp[2];
                }
            });
        });
        reloadImg();
    }
    })
}

function reloadImg(){
    if (currentImage < 0) {
        currentImage = images.length - 1;
    }
    if (currentImage > images.length - 1) {
        currentImage = 0;
    }
    //console.log(images[currentImage]);
    //$("#picture").attr("src", images[currentImage]);
    $("#picDiv").css("background-image", "url(./data/"+images[currentImage].photo+")");
    console.log(images[currentImage].title);
    $("#photoTitle").html(images[currentImage].title);
    console.log(images[currentImage].description);
    $("#photoDescription").html(images[currentImage].description);
}
    
$("#rightAr").click(() => {
    currentImage += 1;
    reloadImg();
})
$("#leftAr").click(() => {
    currentImage -= 1;
    reloadImg();
})

