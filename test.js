setInterval(()=>{
    if (document.getElementById("winkel-c-rechtwinklig").checked) document.getElementById("td-winkel-c").style.display = 'none'
    else document.getElementById("td-winkel-c").style.display = ''
}, 100);



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

        switchIt.Switch();

        document.getElementById("erg-winkel-a").innerHTML   = "&alpha; = ";
        document.getElementById("erg-winkel-b").innerHTML   = "&beta; = ";
        document.getElementById("erg-winkel-c").innerHTML   = "&gamma; = ";
        document.getElementById("erg-seite-a").innerHTML    = "a = ";
        document.getElementById("erg-seite-b").innerHTML    = "b = ";
        document.getElementById("erg-seite-c").innerHTML    = "c = ";

        var S_a, S_b, S_c, W_a, W_b;

        S_a = testVaildSeite(parseFloat(document.getElementById("seite-a").value));
        S_b = testVaildSeite(parseFloat(document.getElementById("seite-b").value));
        S_c = testVaildSeite(parseFloat(document.getElementById("seite-c").value));
        W_a = testVaildWinkel(parseFloat(document.getElementById("winkel-a").value));
        W_b = testVaildWinkel(parseFloat(document.getElementById("winkel-b").value));
        if (document.getElementById("winkel-c-rechtwinklig").checked) W_c = 90
        else W_c = testVaildWinkel(parseFloat(document.getElementById("winkel-c").value));

        // if ((W_a + W_b + W_c) != 180) {
        //     console.log(W_a + W_b + W_c);
        //     console.error("Winkel nicht richtig");
        //     return "error";
        // }

        console.log(S_a,S_b,S_c,W_a,W_b,W_c);

        if (W_c == 90) {
            if (S_a && W_a) {
                SeiteAUndWinkelA(S_a, W_a);
            }
            else if (S_b && W_a) {
                SeiteBUndWinkelA(S_b, W_a);
            } 
            else if (S_c && W_a) {
                SeiteCUndWinkelA(S_c, W_a);
            }
            else if (S_a && W_b) {
                SeiteAUndWinkelB(S_a, W_b);
            }
            else if (S_b && W_b) {
                SeiteBUndWinkelB(S_b, W_b);
            }
            else if (S_c && W_b) {
                SeiteCUndWinkelB(S_c, W_b);
            }
            else if (S_a && S_b) {
                SeiteAUndSeiteB(S_a, S_b);
            }
            else if (S_b && S_c) {
                SeiteBUndSeiteC(S_b, S_c);
            }
            else if (S_a && S_c) {
                SeiteAUndSeiteC(S_a, S_c);
            }
        }
        else {
            // a² = b² + c² -2bc * cos(alpha)
            // cos(alpha) = a²-b²-c² / (-2*b*c)
            // if (a.toString() != 'NaN' && b.toString() != 'NaN' && c.toString() != 'NaN' ) {
            //     console.log("Correct");
            //     AlleSeiten(a, b, c);
            // }
            
            //
            //// Wenn Dreieck NICHT rechtwinklig ist
            //




            var Wa,Wb,Wc    = null;
            var a,b,c       = null;
            
            
            if (W_a != 0 && W_a < 360 && W_a > 0) Wa = W_a; // wenn Winkel a gültig
            if (W_b != 0 && W_b < 360 && W_b > 0) Wb = W_b; // wenn Winkel b gültig
            if (W_c != 0 && W_c < 360 && W_c > 0) Wc = W_c; // wenn Winkel c gültig
            
            if (S_a.toString() != 'null' && S_a > 0) a = S_a; // wenn Seite a gültig
            if (S_b.toString() != 'null' && S_b > 0) b = S_b; // wenn Seite b gültig
            if (S_c.toString() != 'null' && S_c > 0) c = S_c; // wenn Seite c gültig
            
                 if (Wa && a && b) WaSaSb(Wa,a,b) // Seite a, Seite b und Winkel a
            else if (Wa && a && c) WaSaSc(Wa,a,c) // Seite a, Seite c und Winkel a
            else if (Wa && b && c) WaSbSc(Wa,b,c) // Seite b, Seite c und Winkel a
            else if (Wb && a && b) WbSaSb(Wb,a,b) // Seite a, Seite b und Winkel b
            else if (Wb && a && c) WbSaSc(Wb,a,c) // Seite a, Seite c und Winkel b
            else if (Wb && b && c) WbSbSc(Wb,b,c) // Seite b, Seite c und Winkel b            

            else if (Wc && a && b) WcSaSb(Wc,a,b) // Seite a, Seite b und Winkel c
            else if (Wc && a && c) WcSaSc(Wc,a,c) // Seite a, Seite c und Winkel c
            else if (Wc && b && c) WcSbSc(Wc,b,c) // Seite b, Seite c und Winkel c

            else if (Wa && b && Wc) WaSbWc(Wa,b,Wc) // Winkel a, Seite b und Winkel c
            else if (a && Wb && Wc) SaWbWc(a,Wb,Wc) // Seite a, Winkel b und Winkel c
            else if (Wa && Wb && c) WaWbSc(Wa,Wb,c) // Winkel a, Winkel b und Seite c

            else if (a && b && c) SaSbSc(a,b,c) // Seite a, Seite b, Seite c

        }


    }
}

function SeiteAUndWinkelA(S_a, W_a) {
    // document.getElementById("erg-winkel-a").innerHTML = "&alpha; = 30°";
    document.getElementById("erg-seite-a").innerHTML      = `a = ${Math.round(S_a * 100) / 100}`;
    document.getElementById("erg-seite-b").innerHTML      = `b = ${Math.round((S_a / tri.Tan(W_a)) * 100) / 100}`;
    document.getElementById("erg-seite-c").innerHTML   = `c = ${Math.round((S_a / tri.Sin(W_a)) * 100) / 100}`;
    document.getElementById("erg-winkel-a").innerHTML       = `&alpha; = ${ Math.round(W_a * 100) / 100}°`;
    document.getElementById("erg-winkel-b").innerHTML       = `&beta; = ${Math.round((90 - W_a) * 100) / 100}°`;
    
    document.getElementById("erg-winkel-a-rechnung").innerHTML  = `&alpha; = ${W_a}°`;
    document.getElementById("erg-winkel-b-rechnung").innerHTML  = `&beta; = 180° - 90° - &alpha;<br/>&beta; = 180° - 90° - ${W_a}<br/>&beta; = ${Math.round((90 - W_a) * 100) / 100}°`;
    document.getElementById("erg-seite-a-rechnung").innerHTML = `a = a<br/>a = ${S_a}`; 
    document.getElementById("erg-seite-b-rechnung").innerHTML = `b = a / tan(&alpha;)<br/>b = ${S_a} / ${Math.round(tri.Tan(W_a) * 10000) / 10000}<br/>b = ${Math.round((S_a / tri.Tan(W_a)) * 100) / 100}`; 
    document.getElementById("erg-seite-c-rechnung").innerHTML = `c = a / sin(&alpha;)<br/>c = ${S_a} / ${Math.round(tri.Sin(W_a)* 10000) / 10000}<br/>c = ${Math.round((S_a / tri.Sin(W_a)) * 100) / 100}`; 
    DrawDreieck(S_a, S_a / tri.Tan(W_a));

    //   
}

function SeiteBUndWinkelA (S_b, W_a) {
    document.getElementById("erg-seite-a").innerHTML      = Math.round((S_b * tri.Tan(W_a)) * 100) / 100;
    document.getElementById("erg-seite-b").innerHTML      = Math.round(S_b * 100) / 100;
    document.getElementById("erg-seite-c").innerHTML   = Math.round((S_b / tri.Cos(W_a)) * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = Math.round(W_a * 100) / 100;
    document.getElementById("erg-winkel-b").innerHTML       = Math.round((90 - W_a) * 100) / 100;
    DrawDreieck(S_b * tri.Tan(W_a), S_b);
}

function SeiteCUndWinkelA (S_c, W_a) {
    document.getElementById("erg-seite-a").innerHTML      = Math.round((S_c * tri.Sin(W_a)) * 100) / 100;
    document.getElementById("erg-seite-b").innerHTML      = Math.round((S_c * tri.Cos(W_a)) * 100) / 100;
    document.getElementById("erg-seite-c").innerHTML   = Math.round(S_c * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = Math.round(W_a * 100) / 100;
    document.getElementById("erg-winkel-b").innerHTML       = Math.round((90 - W_a) * 100) / 100;    
    DrawDreieck(S_c * tri.Sin(W_a), S_c * tri.Cos(W_a));
}

function SeiteAUndWinkelB (S_a, W_b) {
    document.getElementById("erg-seite-a").innerHTML      = Math.round((S_a) * 100) / 100;
    document.getElementById("erg-seite-b").innerHTML      = Math.round((S_a * tri.Tan(W_b)) * 100) / 100;
    document.getElementById("erg-seite-c").innerHTML   = Math.round((S_a / tri.Cos(W_b)) * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = Math.round((90 - W_b) * 100) / 100;
    document.getElementById("erg-winkel-b").innerHTML       = Math.round((W_b) * 100) / 100;
    DrawDreieck(S_a, S_a * tri.Tan(W_b));  
}

function SeiteBUndWinkelB (S_b, W_b) {
    document.getElementById("erg-seite-a").innerHTML      = Math.round((S_b / tri.Tan(W_b)) * 100) / 100;
    document.getElementById("erg-seite-b").innerHTML      = Math.round((S_b) * 100) / 100;
    document.getElementById("erg-seite-c").innerHTML   = Math.round((S_b / tri.Sin(W_b)) * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = Math.round((90 - W_b) * 100) / 100;
    document.getElementById("erg-winkel-b").innerHTML       = Math.round((W_b) * 100) / 100;  
    DrawDreieck(S_b / tri.Tan(W_b), S_b);
}

function SeiteCUndWinkelB (S_c, W_b) {
    document.getElementById("erg-seite-a").innerHTML      = Math.round((S_c * tri.Cos(W_b)) * 100) / 100;
    document.getElementById("erg-seite-b").innerHTML      = Math.round((S_c * tri.Sin(W_b)) * 100) / 100;
    document.getElementById("erg-seite-c").innerHTML   = Math.round((S_c) * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = Math.round((90 - W_b) * 100) / 100;
    document.getElementById("erg-winkel-b").innerHTML       = Math.round((W_b) * 100) / 100;
    DrawDreieck(S_c * tri.Cos(W_b), S_c * tri.Sin(W_b));
}

function SeiteAUndSeiteB (S_a, S_b) {
    document.getElementById("erg-seite-a").innerHTML      = Math.round((S_a) * 100) / 100;
    document.getElementById("erg-seite-b").innerHTML      = Math.round((S_b) * 100) / 100;
    document.getElementById("erg-seite-c").innerHTML   = Math.round((Math.sqrt((S_a * S_a) + (S_b * S_b))) * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = Math.round(((180 / Math.PI) * tri.ATan(S_a, S_b)) * 100) / 100;
    document.getElementById("erg-winkel-b").innerHTML       = Math.round((90 - ((180 / Math.PI) * tri.ATan(S_a, S_b))) * 100) / 100;
    DrawDreieck(S_a, S_b);  
}

function SeiteAUndSeiteC (S_a, S_c) {
    document.getElementById("erg-seite-a").innerHTML      = Math.round((S_a) * 100) / 100;
    document.getElementById("erg-seite-b").innerHTML      = Math.round((Math.sqrt((S_c * S_c) - (S_a * S_a))) * 100) / 100;
    document.getElementById("erg-seite-c").innerHTML   = Math.round((S_c) * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = Math.round(((180 / Math.PI) * tri.ASin(S_a, S_c)) * 100) / 100;
    document.getElementById("erg-winkel-b").innerHTML       = Math.round((90 - ((180 / Math.PI) * tri.ASin(S_a, S_c))) * 100) / 100;
    DrawDreieck(S_a, Math.sqrt((S_c * S_c) - (S_a * S_a))); 
}

function SeiteBUndSeiteC (S_b, S_c) {
    document.getElementById("erg-seite-a").innerHTML      = Math.round((Math.sqrt((S_c * S_c) - (S_b * S_b))) * 100) / 100;
    document.getElementById("erg-seite-b").innerHTML      = Math.round((S_b) * 100) / 100;
    document.getElementById("erg-seite-c").innerHTML   = Math.round((S_c) * 100) / 100;
    document.getElementById("erg-winkel-a").innerHTML       = Math.round(((180 / Math.PI) * tri.ACos(S_b, S_c)) * 100) / 100;
    document.getElementById("erg-winkel-b").innerHTML       = Math.round((90 - ((180 / Math.PI) * tri.ACos(S_b, S_c))) * 100) / 100 + "°";
    DrawDreieck(Math.sqrt((S_c * S_c) - (S_b * S_b)), S_b);  
}



// Kosinussatz 

function AlleSeiten (a, b, c) {
    console.log(a,b,c); 
    

    // a² = b² + c² - 2 * b * c * cos alpha | - b²
    // a²-b² = c² - 2 * b * c * cos alpha | -c²
    // a²-b²-c² =  -2 * b * c * cos alpha | / (-2*b*c)
    // a²-b²-c² / (-2*b*c) = cos alpha |
    // 
    //cos a = a²-b²-c² / -2*b*c

    var cosAlpha = NaN;

    cosAlpha = Math.acos((a*a) - (b*b) - (c*c) / (-2*b*c))  * 180 / Math.PI;
    cosAlpha = ((20*20) - (20*20) - (20*20) / (-2*20*20));
    
    console.log(cosAlpha);

    console.log(a,b,c);

    document.getElementById("erg-seite-a").innerHTML    = Math.round(a * 10000) / 10000;
    document.getElementById("erg-seite-b").innerHTML    = Math.round(b * 10000) / 10000;
    document.getElementById("erg-seite-c").innerHTML    = Math.round(c * 10000) / 10000;
    document.getElementById("erg-winkel-a").innerHTML   = `${Math.round((Math.acos((a*a) - (b*b) - (c*c) / (-2*b*c)) * 180 / Math.PI) * 10000) / 10000}°`;
    document.getElementById("erg-winkel-b").innerHTML   = `${Math.round((Math.acos((b*b) - (a*a) - (c*c) / (-2*a*c)) * 180 / Math.PI) * 10000) / 10000}°`;
    document.getElementById("erg-winkel-c").innerHTML   = Math.round();

}


////
// Kosinussatz
////


function WaSaSb(Wa,a,b) {
    console.log("test");
    // Wa   Wb
    // -- = --  | * Sb 
    // Sa   Sb

    //     Wa   
    //Sb * -- = Wb 
    //     Sa   

    var Wb = Math.asin(b * ( tri.Sin(Wa) / a)) * 180 / Math.PI;
    var Wc = 180 - Wa - Wb;
    var Sc = tri.Sin(Wc) * (a / tri.Sin(Wa));

    document.getElementById("erg-winkel-a").innerHTML   += Wa + " (Eingabe)";
    document.getElementById("erg-winkel-b").innerHTML   += Wb;
    document.getElementById("erg-winkel-c").innerHTML   += Wc;
    document.getElementById("erg-seite-a").innerHTML    += a + " (Eingabe)";
    document.getElementById("erg-seite-b").innerHTML    += b + " (Eingabe)";
    document.getElementById("erg-seite-c").innerHTML    += Sc;
    var j1 = JSON.parse(`{"rechnungen": [{"colums": [{"typeof": "p","text": "(Eingabe)"}]},{"colums": [{"typeof": "p","text": "&alpha; = ${Wa.toString()}"}]}]}`);
    var j2 = JSON.parse(`{"rechnungen": [{"colums": [{"typeof": "bruch","bruch": {"top":"sin &alpha;", "bottom": "a"}},{"typeof":"p","text":"="},{"typeof": "bruch","bruch": {"top":"sin &beta;", "bottom": "b"}}]},{"colums": [{"typeof": "bruch","bruch": {"top":"sin${Wa}°","bottom":"${a}"}},{"typeof":"p","text":"="},{"typeof":"bruch","bruch":{"top":"sin &beta;","bottom":"${b}"}}]}]}`);
    document.getElementById("erg-winkel-a-rechnung").appendChild(CreateBruch(j1));
    // document.getElementById("erg-winkel-b-rechnung").innerHTML = `sin &alpha; / a = sin &beta; / b<br/>sin${Wa}° / ${a} = sin &beta; / ${b} | * ${b}<br/>${b} * (sin${Wa}° / ${a}) = sin &beta;<br/> ${ b * ( tri.Sin(Wa) / a)} = sin &beta; | shift sin<br/>${Math.asin( b * ( tri.Sin(Wa) / a)) * 180 / Math.PI} = &beta;`;
    document.getElementById("erg-winkel-b-rechnung").appendChild(CreateBruch(j2));
    document.getElementById("erg-winkel-c-rechnung").innerHTML = `180° - &alpha; - &beta; = &gamma;<br/>180° - ${Wa}° - ${Wb}° = ${Wc}°`;
    document.getElementById("erg-seite-a-rechnung").innerHTML  = `Eingabe: a = ${a}`;
    document.getElementById("erg-seite-b-rechnung").innerHTML  = `Eingabe: b = ${b}`;
    document.getElementById("erg-seite-c-rechnung").innerHTML  = "test";


    console.log(Wb,Wc,Sc);
}

function WaSaSc(Wa,a,c) {

}

function WaSbSc(Wa,b,c) {

}






// function WinkelCUndSeiteAUndSeiteB (W_c, S_a, S_b) {
//     document.getElementById("erg-seite-a").innerHTML      = Math.round((S_a) * 100) / 100;
//     document.getElementById("erg-seite-b").innerHTML      = Math.round((S_b) * 100) / 100;
//     document.getElementById("erg-seite-c").innerHTML   = Math.round(Math.sqrt(((S_a * S_a) + (S_b * S_b)) - 2 * S_a * S_b * tri.Cos(W_c)) * 100) / 100;
//     document.getElementById("erg-winkel-a").innerHTML       = Math.round((tri.ASin((S_a * tri.Sin(W_c)) / S_b)) * 100) / 100;
//     // console.log((180 / Math.PI) * (Math.asin(S_a * tri.Sin(W_c) / S_b)));
//     var S_c = Math.sqrt(((S_a * S_a) + (S_b * S_b)) - 2 * S_a * S_b * tri.Cos(W_c));
//     // console.log((180 / Math.PI) * tri.ACos(S_b, Math.sqrt(((S_a * S_a) + (S_b * S_b)) - 2 * S_a * S_b * tri.Cos(W_c))));
//     console.log((((S_b * S_b) + (S_c * S_c) - (S_a * S_a)) / (2 * S_b * S_c)));
//     console.log(Math.acosh(((S_b * S_b) + (S_c * S_c) - (S_a * S_a)) / (2 * S_b * S_c)));
//     // document.getElementById("erg-winkel-b").innerHTML       = Math.round((90 - ((180 / Math.PI) * tri.ACos(S_b, S_c))) * 100) / 100;  
// }

function testVaildWinkel (winkel) {
    if (winkel <= 0 || winkel >= 360 || winkel == null) {
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

    S_a = (a / b) * 600;
    S_b = (b / a) * 600;

    if (S_a > 600) {
        S_a = S_a / 2;
        S_b = S_b / 2;
    }
    if (S_a > 600) {
        S_a = S_a / 2;
        S_b = S_b / 2;
    }
    if (S_b > 300) {
        S_a = S_a / 2;
        S_b = S_b / 2;
    }
    if (S_b > 300) {
        S_a = S_a / 2;
        S_b = S_b / 2;
    }

    console.log(S_a);
    console.log(S_b);

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
  
    ctx.moveTo(0, S_a);
    ctx.lineTo(S_b, 0);
    ctx.lineTo(S_b, S_a);
    ctx.lineTo(0, S_a);
    ctx.stroke();
}

// TestSetErg();

function TestSetErg () {
    document.getElementById("erg-winkel-a").innerHTML = "&alpha; = 30°";
    document.getElementById("erg-winkel-a-rechnung").innerHTML = "&alpha; = 180° - 90° - &beta;<br/>&nbsp;&nbsp;&nbsp;= 180° - 90° - 60° <br/>&nbsp;&nbsp;&nbsp;= 30°";
    document.getElementById("erg-winkel-b").innerHTML = "&beta; = 60°";
}


var switchIt = {
    Switch: function() {
        var sideBar = document.getElementsByClassName("eingabe")[0];
        if (sideBar.style.marginLeft == 0 || sideBar.style.marginLeft == "0px") {
            sideBar.animate([
                {marginLeft: 0},
                {marginLeft: `calc(-${sideBar.clientWidth}px + 4%)`}
            ],
            {
                duration: 240
            });
            sideBar.style.marginLeft = `calc(-${sideBar.clientWidth}px + 4%)`;    
            sideBar.getElementsByTagName("button")[0].getElementsByTagName("span")[0].innerHTML = "last_page";
        }
        else {
            sideBar.animate([
                {marginLeft: `calc(-${sideBar.clientWidth}px + 4%)`},
                {marginLeft: "0"}
            ],
            {
                duration: 500,
                iterations: 1
            });
            sideBar.style.marginLeft = "0px";
            sideBar.getElementsByTagName("button")[0].getElementsByTagName("span")[0].innerHTML = "first_page";
        }

// setInterval(()=>{
//     var sideBar = document.getElementsByClassName("eingabe")[0];
//         if (sideBar.style.marginLeft == 0 || sideBar.style.marginLeft == "0px") {
//             sideBar.style.marginLeft = "0";
//             sideBar.getElementsByTagName("button")[0].getElementsByTagName("span")[0].innerHTML = "first_page";
//         }
//         else {
//             sideBar.style.marginLeft = `calc(-${sideBar.clientWidth}px + 4%)`;    
//             sideBar.getElementsByTagName("button")[0].getElementsByTagName("span")[0].innerHTML = "last_page";
//         }
// }, 1000);

        // console.log(sideBar.style.marginLeft);
        console.log(sideBar);
    }
}

//     switch:function () {
//     var element = document.getElementById("toggleShow");
//     // element.delete();
// }



function CreateBruch(eingabe) {
    var tb_rechnung = document.createElement("table");
    tb_rechnung.classList.add("rechnung");

    var eingabe_rechnungen = eingabe["rechnungen"];

    for (let i = 0; i < eingabe_rechnungen.length; i++) {
        var tr      = document.createElement("tr"),
            colums  = eingabe_rechnungen[i].colums;
        
        for (let i = 0; i < colums.length; i++) {
            var td      = document.createElement("td"),
                colum   = colums[i],
                type  = colum["typeof"];

            switch(type) {
                case "p":
                    var p = document.createElement("p");
                        p.innerHTML = colum["text"];
                        td.appendChild(p);
                    break;

                case "bruch":
                    var tb = document.createElement("table");
                    tb.classList.add("bruch");
                    var tr_r1 = document.createElement("tr");
                    var tr_r2 = document.createElement("tr");
                    tr_r1.classList.add("zähler");
                    tr_r2.classList.add("nenner");
                    
                    var td1 = document.createElement("td")
                        // td.appendChild("zähler");
                        // td.innerHTML = "test";
                    td1.innerHTML = colum["bruch"]["top"];
                
                    tr_r1.appendChild(td1);
                
                    var td2 = document.createElement("td")
                        // td1.appendChild("nenner");
                    td2.innerHTML = colum["bruch"]["bottom"];
                    tr_r2.appendChild(td2);
                
                    tb.appendChild(tr_r1);
                    tb.appendChild(tr_r2);

                    td.appendChild(tb);
                    break;
            }
            

            tr.appendChild(td);
        }

        
        tb_rechnung.appendChild(tr);
    }

    return tb_rechnung;
}




var parse = '{"rechnungen": [{"colums": [{"typeof": "bruch","bruch": {"top": "sin alpha","bottom": "a"}},{"typeof": "p","text": "="},{"typeof": "bruch","bruch": {"top": "sin beta","bottom": "b"}},{"typeof": "p","text": "= 124 * 244 / 21.34"}]}]}';
var json = JSON.parse(parse);
document.getElementsByClassName("item")[0].appendChild(CreateBruch(json));
console.log(json);


/*

{
    "rechnungen": [
        {
            "colums": [
                {
                    "typeof": "p" | "bruch" | "html" (blank),
                    
                    // if html or p
                    "text": "test",
    
                    "bruch": {
                        "top": "on Top",
                        "bottom": "on Bottom"
                    }
    
    
    
                }
            ]
        }
    ]
}

*/