status = "";
objects = [];
function preload()
{
    img = loadImage("fan.jpg");
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
    image(img, 0, 0, 640, 420);
    if (status != "")
    {
        for (i=0; i < objects.length; i++)
        {
            r = random(255);
            g = random(255);
            b = random(255); 
            objectDetector.detect(img, gotResult);
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
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
function Back()
{
    window.location = 'index.html'
}