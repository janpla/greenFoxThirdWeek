let images = [];
let currentImage = 0;
let control = 1;
let folder = "./data/";
let descriptions = [];


//Happens at the start
$.ajax({
    url : folder,
    success: function (data) {
        $(data).find("a").attr("href", function (i, val) {
            if (val.match(/\.(jpe?g|png|gif)$/) ) {
                images.push({photo: val.split("/").pop(), title: "", description: ""});
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
        let helpNum = 0;
        descriptions.forEach(i => {
            images.forEach(j => {
                let iHelp = i.split(": ");
                if(j.photo.split(".")[0] === iHelp[0]) {
                    if(iHelp[1] === "") {
                        j.title = iHelp[0];
                    } else {
                        j.title = iHelp[1];
                    }
                    j.description = iHelp[2];
                    $("#thumbnails").append('<div class="thumbnail" id="thbn'+helpNum+'"></div>');
                    $("#thbn"+helpNum).css("background-image", 'url("./data/'+images[helpNum].photo+'")');
                    //console.log("#thbn"+helpNum);
                    //console.log('url("./data/'+images[helpNum].photo+'")');
                    helpNum += 1;
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
    //console.log(images[currentImage].title);
    $("#photoTitle").html(images[currentImage].title);
    //console.log(images[currentImage].description);
    $("#photoDescription").html(images[currentImage].description);
}
    
$("#rightAr").click(() => {
    currentImage += 1;
    reloadImg();
});
$("#leftAr").click(() => {
    currentImage -= 1;
    reloadImg();
});
/*
$(".thumbnail").click(() => {
    console.log("ok");
    console.log(this.id);
    currentImage = this.id.split("thbn")[1];
    reloadImg();
})
*/