status = "";
objects = [];
function preload()
{
    img = loadImage("bedroom.jpg");
}
function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}
function draw()
{
    if (status != undefined)
    {
        image(img, 0, 0, 640, 420);
        for (i=0; i < objects.length; i++)
        {
            objectDetector.detect(img, gotResult);
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill('green');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke('green');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function back()
{
    window.location = 'index.html'
}
