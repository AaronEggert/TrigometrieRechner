
var tri = {
    Sin: function (deg) {
        return Math.sin(deg * (Math.PI / 180));
    },
    Cos: function (deg) {
        return  Math.cos(deg * (Math.PI / 180));
    },
    Tan: function (deg) {
        return Math.tan(deg * (Math.PI / 180));
    },
    ASin: function (opp, adj) {
        return Math.asin(opp / adj);
    },
    ACos: function (opp, adj) {
        return Math.acos(opp / adj);
    },
    ATan: function (opp, adj) {
        return Math.atan(opp / adj);
    }
}

var calc = {
    Start: function () {
        var K_a, K_b, H_c, W_a, W_b;

        K_a = testVaildSeite(parseFloat(document.getElementById("kathete-a").value));
        K_b = testVaildSeite(parseFloat(document.getElementById("kathete-b").value));
        H_c = testVaildSeite(parseFloat(document.getElementById("hypotenuse-c").value));
        W_a = testVaildWinkel(parseFloat(document.getElementById("winkel-a").value));
        W_b = testVaildWinkel(parseFloat(document.getElementById("winkel-b").value));
        W_c = testVaildWinkelC(parseFloat(document.getElementById("winkel-c").value));

        // console.log(W_c);

        if (W_c == 90) {
            if (K_a && W_a) {
                KatheteAUndWinkelA(K_a, W_a);
            }
            else if (K_b && W_a) {
                KatheteBUndWinkelA(K_b, W_a);
            } 
            else if (H_c && W_a) {
                HypotenuseCUndWinkelA(H_c, W_a);
            }
            else if (K_a && W_b) {
                KatheteAUndWinkelB(K_a, W_b);
            }
            else if (K_b && W_b) {
                KatheteBUndWinkelB(K_b, W_b);
            }
            else if (H_c && W_b) {
                HypotenuseCUndWinkelB(H_c, W_b);
            }
            else if (K_a && K_b) {
                KatheteAUndKatheteB(K_a, K_b);
            }
            else if (K_b && H_c) {
                KatheteBUndHypotenuseC(K_b, H_c);
            }
            else if (K_a && H_c) {
                KatheteAUndHypotenuseC(K_a, H_c);
            }
        }
        else {
            // if (W_c && K_a && K_b) {
            //     WinkelCUndKatheteAUndKatheteB(W_c, K_a, K_b);
            // }
        }


    }
}

function KatheteAUndWinkelA(K_a, W_a) {
    // document.getElementById("erg-winkel-a").innerHTML = "&alpha; = 30°";
    document.getElementById("erg-kathete-a").innerHTML      = Math.round(K_a * 100) / 100;
    document.getElementById("erg-kathete-b").innerHTML      = Math.round((K_a / tri.Tan(W_a)) * 100) / 100;
    document.getElementById("erg-hypotenuse-c").innerHTML   = Math.round((K_a / tri.Sin(W_a)) * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = `&alpha; = ${ Math.round(W_a * 100) / 100}°`;
    document.getElementById("erg-winkel-b").innerHTML       = `&beta; = ${Math.round((90 - W_a) * 100) / 100}°`;
    
    document.getElementById("erg-winkel-a-rechnung").innerHTML  = `&alpha; = ${W_a}°`;
    document.getElementById("erg-winkel-b-rechnung").innerHTML  = `&beta; = 180° - 90° - &alpha;<br/>&beta; = 180° - 90° - ${W_a}<br/>&beta; = ${Math.round((90 - W_a) * 100) / 100}°`;
    document.getElementById("erg-kathete-a-rechnung").innerHTML = `a = a<br/>a = ${K_a}`; 
    document.getElementById("erg-kathete-b-rechnung").innerHTML = `b = a / tan(&alpha;)<br/>b = ${K_a} / ${Math.round(tri.Tan(W_a) * 10000) / 10000}<br/>b = ${Math.round((K_a / tri.Tan(W_a)) * 100) / 100}`; 
    document.getElementById("erg-hypotenuse-c-rechnung").innerHTML = `c = a / sin(&alpha;)<br/>c = ${K_a} / ${Math.round(tri.Sin(W_a)* 10000) / 10000}<br/>c = ${Math.round((K_a / tri.Sin(W_a)) * 100) / 100}`; 
    DrawDreieck(K_a, K_a / tri.Tan(W_a));

    //   
}

function KatheteBUndWinkelA (K_b, W_a) {
    document.getElementById("erg-kathete-a").innerHTML      = Math.round((K_b * tri.Tan(W_a)) * 100) / 100;
    document.getElementById("erg-kathete-b").innerHTML      = Math.round(K_b * 100) / 100;
    document.getElementById("erg-hypotenuse-c").innerHTML   = Math.round((K_b / tri.Cos(W_a)) * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = Math.round(W_a * 100) / 100;
    document.getElementById("erg-winkel-b").innerHTML       = Math.round((90 - W_a) * 100) / 100;
    DrawDreieck(K_b * tri.Tan(W_a), K_b);
}

function HypotenuseCUndWinkelA (H_c, W_a) {
    document.getElementById("erg-kathete-a").innerHTML      = Math.round((H_c * tri.Sin(W_a)) * 100) / 100;
    document.getElementById("erg-kathete-b").innerHTML      = Math.round((H_c * tri.Cos(W_a)) * 100) / 100;
    document.getElementById("erg-hypotenuse-c").innerHTML   = Math.round(H_c * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = Math.round(W_a * 100) / 100;
    document.getElementById("erg-winkel-b").innerHTML       = Math.round((90 - W_a) * 100) / 100;    
    DrawDreieck(H_c * tri.Sin(W_a), H_c * tri.Cos(W_a));
}

function KatheteAUndWinkelB (K_a, W_b) {
    document.getElementById("erg-kathete-a").innerHTML      = Math.round((K_a) * 100) / 100;
    document.getElementById("erg-kathete-b").innerHTML      = Math.round((K_a * tri.Tan(W_b)) * 100) / 100;
    document.getElementById("erg-hypotenuse-c").innerHTML   = Math.round((K_a / tri.Cos(W_b)) * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = Math.round((90 - W_b) * 100) / 100;
    document.getElementById("erg-winkel-b").innerHTML       = Math.round((W_b) * 100) / 100;
    DrawDreieck(K_a, K_a * tri.Tan(W_b));  
}

function KatheteBUndWinkelB (K_b, W_b) {
    document.getElementById("erg-kathete-a").innerHTML      = Math.round((K_b / tri.Tan(W_b)) * 100) / 100;
    document.getElementById("erg-kathete-b").innerHTML      = Math.round((K_b) * 100) / 100;
    document.getElementById("erg-hypotenuse-c").innerHTML   = Math.round((K_b / tri.Sin(W_b)) * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = Math.round((90 - W_b) * 100) / 100;
    document.getElementById("erg-winkel-b").innerHTML       = Math.round((W_b) * 100) / 100;  
    DrawDreieck(K_b / tri.Tan(W_b), K_b);
}

function HypotenuseCUndWinkelB (H_c, W_b) {
    document.getElementById("erg-kathete-a").innerHTML      = Math.round((H_c * tri.Cos(W_b)) * 100) / 100;
    document.getElementById("erg-kathete-b").innerHTML      = Math.round((H_c * tri.Sin(W_b)) * 100) / 100;
    document.getElementById("erg-hypotenuse-c").innerHTML   = Math.round((H_c) * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = Math.round((90 - W_b) * 100) / 100;
    document.getElementById("erg-winkel-b").innerHTML       = Math.round((W_b) * 100) / 100;
    DrawDreieck(H_c * tri.Cos(W_b), H_c * tri.Sin(W_b));
}

function KatheteAUndKatheteB (K_a, K_b) {
    document.getElementById("erg-kathete-a").innerHTML      = Math.round((K_a) * 100) / 100;
    document.getElementById("erg-kathete-b").innerHTML      = Math.round((K_b) * 100) / 100;
    document.getElementById("erg-hypotenuse-c").innerHTML   = Math.round((Math.sqrt((K_a * K_a) + (K_b * K_b))) * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = Math.round(((180 / Math.PI) * tri.ATan(K_a, K_b)) * 100) / 100;
    document.getElementById("erg-winkel-b").innerHTML       = Math.round((90 - ((180 / Math.PI) * tri.ATan(K_a, K_b))) * 100) / 100;
    DrawDreieck(K_a, K_b);  
}

function KatheteAUndHypotenuseC (K_a, H_c) {
    document.getElementById("erg-kathete-a").innerHTML      = Math.round((K_a) * 100) / 100;
    document.getElementById("erg-kathete-b").innerHTML      = Math.round((Math.sqrt((H_c * H_c) - (K_a * K_a))) * 100) / 100;
    document.getElementById("erg-hypotenuse-c").innerHTML   = Math.round((H_c) * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = Math.round(((180 / Math.PI) * tri.ASin(K_a, H_c)) * 100) / 100;
    document.getElementById("erg-winkel-b").innerHTML       = Math.round((90 - ((180 / Math.PI) * tri.ASin(K_a, H_c))) * 100) / 100;
    DrawDreieck(K_a, Math.sqrt((H_c * H_c) - (K_a * K_a))); 
}

function KatheteBUndHypotenuseC (K_b, H_c) {
    document.getElementById("erg-kathete-a").innerHTML      = Math.round((Math.sqrt((H_c * H_c) - (K_b * K_b))) * 100) / 100;
    document.getElementById("erg-kathete-b").innerHTML      = Math.round((K_b) * 100) / 100;
    document.getElementById("erg-hypotenuse-c").innerHTML   = Math.round((H_c) * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = Math.round(((180 / Math.PI) * tri.ACos(K_b, H_c)) * 100) / 100;
    document.getElementById("erg-winkel-b").innerHTML       = Math.round((90 - ((180 / Math.PI) * tri.ACos(K_b, H_c))) * 100) / 100 + "°";
    DrawDreieck(Math.sqrt((H_c * H_c) - (K_b * K_b)), K_b);  
}


// function WinkelCUndKatheteAUndKatheteB (W_c, K_a, K_b) {
//     document.getElementById("erg-kathete-a").innerHTML      = Math.round((K_a) * 100) / 100;
//     document.getElementById("erg-kathete-b").innerHTML      = Math.round((K_b) * 100) / 100;
//     document.getElementById("erg-hypotenuse-c").innerHTML   = Math.round(Math.sqrt(((K_a * K_a) + (K_b * K_b)) - 2 * K_a * K_b * tri.Cos(W_c)) * 100) / 100;
//     document.getElementById("erg-winkel-a").innerHTML       = Math.round((tri.ASin((K_a * tri.Sin(W_c)) / K_b)) * 100) / 100;
//     // console.log((180 / Math.PI) * (Math.asin(K_a * tri.Sin(W_c) / K_b)));
//     var H_c = Math.sqrt(((K_a * K_a) + (K_b * K_b)) - 2 * K_a * K_b * tri.Cos(W_c));
//     // console.log((180 / Math.PI) * tri.ACos(K_b, Math.sqrt(((K_a * K_a) + (K_b * K_b)) - 2 * K_a * K_b * tri.Cos(W_c))));
//     console.log((((K_b * K_b) + (H_c * H_c) - (K_a * K_a)) / (2 * K_b * H_c)));
//     console.log(Math.acosh(((K_b * K_b) + (H_c * H_c) - (K_a * K_a)) / (2 * K_b * H_c)));
//     // document.getElementById("erg-winkel-b").innerHTML       = Math.round((90 - ((180 / Math.PI) * tri.ACos(K_b, H_c))) * 100) / 100;  
// }

function testVaildWinkel (winkel) {
    if (winkel < 0 || winkel >= 90) {
        return null;
    }
    else {
        return winkel;
    }
}

function testVaildWinkelC (winkel) {
    if (winkel < 0 || winkel >= 180) {
        return null;
    }
    else {
        return winkel;
    }
}

function testVaildSeite (seite) { 
    if (seite <= 0 || seite == null) {
        return null;
    }
    else {
        return seite;
    }
}



function DrawDreieck (a, b) {
    
    console.log();

    K_a = (a / b) * 600;
    K_b = (b / a) * 600;

    if (K_a > 600) {
        K_a = K_a / 2;
        K_b = K_b / 2;
    }
    if (K_a > 600) {
        K_a = K_a / 2;
        K_b = K_b / 2;
    }
    if (K_b > 300) {
        K_a = K_a / 2;
        K_b = K_b / 2;
    }
    if (K_b > 300) {
        K_a = K_a / 2;
        K_b = K_b / 2;
    }

    console.log(K_a);
    console.log(K_b);

    var canvas = document.createElement("canvas");
    
    var handler = document.getElementById("dreieckHandler");
    
    handler.width = 600;
    handler.height = 600;
    
    canvas.width = handler.width;
    canvas.height = handler.height;
    canvas.id = "test";
    handler.appendChild(canvas);
    
    var c = document.getElementById("test");
    var ctx = c.getContext("2d");
  
    ctx.moveTo(0, K_a);
    ctx.lineTo(K_b, 0);
    ctx.lineTo(K_b, K_a);
    ctx.lineTo(0, K_a);
    ctx.stroke();
}

// TestSetErg();

function TestSetErg () {
    document.getElementById("erg-winkel-a").innerHTML = "&alpha; = 30°";
    document.getElementById("erg-winkel-a-rechnung").innerHTML = "&alpha; = 180° - 90° - &beta;<br/>&nbsp;&nbsp;&nbsp;= 180° - 90° - 60° <br/>&nbsp;&nbsp;&nbsp;= 30°";
    document.getElementById("erg-winkel-b").innerHTML = "&beta; = 60°";
}


