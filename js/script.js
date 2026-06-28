const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if(file){
        preview.src = URL.createObjectURL(file);
    }

});

function analyze(){

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = preview.width;
    canvas.height = preview.height;

    ctx.drawImage(preview,0,0,canvas.width,canvas.height);

    const img = ctx.getImageData(0,0,canvas.width,canvas.height);

    let r=0,g=0,b=0;

    for(let i=0;i<img.data.length;i+=4){

        r += img.data[i];
        g += img.data[i+1];
        b += img.data[i+2];

    }

    let total = img.data.length/4;

    r = r/total;
    g = g/total;
    b = b/total;

    console.log(r,g,b);

    let result = document.getElementById("result");

    if(r>180 && g>180){

        result.innerHTML=
        "🟡<br><br>ค่า pH 5-6 <br><br>แผลปกติ";

    }

    else if(r>120 && b>120){

        result.innerHTML=
        "🟣<br><br>ค่า pH 6-7 <br><br>ควรเฝ้าระวัง";

    }

    else if(b>150){

        result.innerHTML=
        "🔵<br><br>ค่า pH มากกว่า 7 <br><br>เสี่ยงติดเชื้อ";

    }

    else{

        result.innerHTML=
        "ไม่สามารถวิเคราะห์ได้";

    }

}