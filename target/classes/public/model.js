 // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/zpi7sWDPY/";

    let model, webcam, labelContainer, maxPredictions;
    let squatReps = 0;
            let LungeReps = 0;
            let pushUpReps = 0;


    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html elementl
        let noPlayer = "No Player";
        let standing = "Standing";


        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
//                console.log(prediction[i].className)
//                console.log(prediction[i].probability.toFixed(2));
                let prob = prediction[i].probability.toFixed(2) * 100;
                if(prob >= 90){
                if(prediction[i].className === noPlayer){
                    document.getElementById("messageLabel").innerHTML = "There is  " + prediction[i].className;
                }else
                if(prediction[i].className === standing ){
                 document.getElementById("messageLabel").innerHTML = "Why are you " +" " + prediction[i].className + "?";
                }
                else{
                if(prediction[i].className === "Squats"){
                    squatReps++;
                    document.getElementById("messageLabel").innerHTML = "Keep killing those " + prediction[i].className;
                    document.getElementById("scoreBoard").innerHTML = "Score : " + squatReps;
                }else
                if(prediction[i].className === "Lunges"){
                    LungeReps++;
                    document.getElementById("messageLabel").innerHTML = "Keep killing those " + prediction[i].className;
                    document.getElementById("scoreBoard").innerHTML = "Score : " + LungeReps;
                }else if(prediction[i].className === "Push Ups"){
                    pushUpReps++;
                    document.getElementById("messageLabel").innerHTML = "Keep killing those " + prediction[i].className;
                     document.getElementById("scoreBoard").innerHTML = "Score : " + pushUpReps;


                }
//                document.getElementById("messageLabel").innerHTML = "Keep killing those " + prediction[i].className;
                }
                }






            labelContainer.childNodes[i].innerHTML = classPrediction;
        }

    }

    function getTotalScore(){
               let score = LungeReps + pushUpReps + squatReps;
               return score;
             }
             function showScore(){
                document.getElementById("totalScoreBoard").innerHTML = getTotalScore();
             }