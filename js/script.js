const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {
        preview.src = URL.createObjectURL(file);
    }

});

function analyze() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = preview.width;
    canvas.height = preview.height;

    ctx.drawImage(preview, 0, 0, canvas.width, canvas.height);

    // อ่านเฉพาะบริเวณตรงกลางของภาพ
    const x = canvas.width * 0.3;
    const y = canvas.height * 0.3;
    const w = canvas.width * 0.4;
    const h = canvas.height * 0.4;

    const img = ctx.getImageData(x, y, w, h);

    let r = 0, g = 0, b = 0;

    for (let i = 0; i < img.data.length; i += 4) {

        r += img.data[i];
        g += img.data[i + 1];
        b += img.data[i + 2];

    }

    let total = img.data.length / 4;

    r = r / total;
    g = g / total;
    b = b / total;

    console.log(r, g, b);

    let result = document.getElementById("result");

    const hsv = rgbToHsv(r, g, b);
    console.log(hsv);
    result.innerHTML += `<br><br>Hue: ${hsv.h.toFixed(1)}`;

    if (hsv.h >= 190 && hsv.h <= 220) {
        result.innerHTML =
            "🔵<br><br>ค่า pH 12<br><br>เสี่ยงติดเชื้อ";
    }
    else if (hsv.h >= 165 && hsv.h < 190) {
        result.innerHTML =
            "🟦<br><br>ค่า pH 10<br><br>มีความเป็นด่าง";
    }
    else if (hsv.h >= 130 && hsv.h < 165) {
        result.innerHTML =
            "🟢<br><br>ค่า pH 8<br><br>ควรเฝ้าระวัง";
    }
    else if (hsv.h >= 90 && hsv.h < 130) {
        result.innerHTML =
            "🟢<br><br>ค่า pH 7<br><br>แผลปกติ";
    }
    else if (hsv.h >= 65 && hsv.h < 90) {
        result.innerHTML =
            "🟢<br><br>ค่า pH 6<br><br>แผลปกติ";
    }
    else if (hsv.h >= 45 && hsv.h < 65) {
        result.innerHTML =
            "🟡<br><br>ค่า pH 4<br><br>มีความเป็นกรดเล็กน้อย";
    }
    else if (hsv.h >= 20 && hsv.h < 45) {
        result.innerHTML =
            "🟠<br><br>ค่า pH 2<br><br>มีความเป็นกรด";
    }
    else {
        result.innerHTML =
            "ไม่สามารถวิเคราะห์ได้";
    }

    // แสดงค่า Hue ทุกกรณี
    result.innerHTML += `<br><br>Hue: ${hsv.h.toFixed(1)}`;

    // <-- ปิด function analyze()

    function rgbToHsv(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let h, s, v = max;

        let d = max - min;
        s = max === 0 ? 0 : d / max;

        if (max === min) {
            h = 0;
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return {
            h: h * 360,
            s: s * 100,
            v: v * 100
        };
    }
}