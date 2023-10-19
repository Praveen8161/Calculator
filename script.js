//getting main elments
let container = document.querySelector(".container");
let ansDis = document.querySelector(".ans-display");
let btnGrp = document.querySelector(".btn-grp");
ansDis.innerText = 0;

//buttons of Array
let btnSet = ["AC","%","DEL","/",7,8,9,
"*",4,5,6,"-",1,2,3,"+","+/-",
0,".","="];

//initializing the buttons
function btnCreate(btnSet){
    for(var i=0; i<btnSet.length; i++){
        let btn = document.createElement("button");
        btn.setAttribute("value",`${btnSet[i]}`);
        btn.classList.add("btn");
        btn.innerText = `${btnSet[i]}`;
        btnGrp.appendChild(btn);
    }
}

btnCreate(btnSet);

let numPattern = [1,2,3,4,5,6,7,8,9,0];
let calcChar = ["/","*","-","+"];

btnGrp.addEventListener("click", (e) => {

        let value = e.target.value;

        let tempText;
        let startInd;
        let result;

        if(ansDis.textContent == "0") {

            ansDis.textContent = "";

        }else if(value === "AC") {

            ansDis.textContent = "0";

        }

        if(numPattern.includes(+value)) {

            ansDis.textContent += value;

        }else if(value === "DEL"){

            ansDis.textContent = ansDis.textContent.slice(0,-1);
            ansDis.textContent.length === 0 ? ansDis.textContent = "0":"";

        }else if(calcChar.includes(value) && !calcChar.includes(ansDis.textContent.slice(-1))){

            ansDis.textContent += value;


        }else if(value === "%"){

            tempText = ansDis.textContent.split("");
            for (var i = tempText.length-1 ; i>=0 ; i--){
                if(calcChar.includes(tempText[i])){
                    startInd = tempText.indexOf(tempText[i])+1;
                    break;
                }
            }

            if(startInd){
                result = parseInt(tempText.slice(startInd).join("")) / 100;
               
                ansDis.textContent = (tempText.slice(0,startInd).join("") + result);

            }else{
                result = parseInt(tempText.slice(0).join("")) / 100;
                ansDis.textContent = result;
            }

        }else if(value === "."){

            tempText = ansDis.textContent.split("");
            for (var i = tempText.length-1 ; i>=0 ; i--){
                if(calcChar.includes(tempText[i])){
                    startInd = tempText.lastIndexOf(tempText[i])+1;
                    break;
                }else{
                    startInd = 0;
                }
            }
            result = tempText.slice(startInd).join("");
            if(!result.includes(".")){
                ansDis.textContent += value;
            }

        }else if(value === "+/-"){

            let calcCharPresent = "false";

            for (var i of ansDis.textContent.slice(1)){
                if(calcChar.includes(i)){
                    calcCharPresent = "true";
                    alert("Infix only works with Single Number W/O any charactor like addition and Substraction");
                    break;
                }
            }

            if(calcCharPresent === "false"){
                if(parseInt(ansDis.textContent)<0){
                    ansDis.textContent = Math.abs(ansDis.textContent);
                }else{
                    ansDis.textContent = ("-" + ansDis.textContent);
                }
            }
        }
        if(value === "="){
            ansDis.textContent = eval(ansDis.textContent);
        }
});