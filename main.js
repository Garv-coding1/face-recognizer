Webcam.set({
    height:300,
    width:300,
    image_format:'png',
    png_quality:90
});

Webcam.attach("#camera");

function capture() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_img' src='"+data_uri+"'>";
    });

}

console.log("ml5 version = "+ ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/n60OTK43j/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function identify(){
    img = document.getElementById("captured_img");
    classifier.classify(img, getResult);
}

function getResult(error , results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("identified_object").innerHTML = results[0].label;
        document.getElementById("accuracy_number").innerHTML = results[0].confidence.toFixed(3)*100  + "%";
        var synth = window.speechSynthesis;
    speech_data = results[0].label;
    var utter_this = new SpeechSynthesisUtterance(speech_data);
    synth.speak(utter_this);
    }
}