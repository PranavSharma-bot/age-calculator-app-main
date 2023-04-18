btn.addEventListener("click",()=>mainFunc());

document.querySelectorAll("input").forEach(el=>(el.addEventListener("keypress",(e)=>{
    if(e.key == "Enter"){
        mainFunc()
    }
})))

function rstStyle(){
    document.querySelectorAll(".title").forEach(e=>{e.style.color="hsl(0, 1%, 44%)"});
    document.querySelectorAll("input").forEach(e=>{e.style.borderColor="hsl(0, 0%, 86%)"});
    document.querySelectorAll(".error-message").forEach(e=>{e.style.display = "none"});
}

function errStyle(el, m="This field is required"){
    el.nextElementSibling.textContent = m;
    el.previousElementSibling.style.color = "hsl(0,100%,67%)";
    el.style.borderColor = "hsl(0,100%,67%)";
    el.blur();
    el.nextElementSibling.style.display="block";
    
}

function maxDay(y,m){
    const months31=[1,3,5,7,8,10,12];
    let mxd=28
    if(months31.includes(m)){
        mxd=31
    }
    else if(m!=2){
        mxd=30
    }
    else if(y%4==0){
        mxd=29
    };
    return mxd
}

function findAge(d,m,y){
    let cd=new Date;
    let shownD;
    let shownM;
    let shownY;
    //current month
    let mxdCM=maxDay(y,cd.getMonth()+1)
    //input month
    let mxdIM=maxDay(y,m)

    shownY=cd.getFullYear()-y;
    if((cd.getMonth()+1)<m){
        shownY--;
        shownM=12-(m-(cd.getMonth()+1)+1);
    }
    else{
        shownM=((cd.getMonth()+1)-m-1)
    };

    if((mxdIM-d+cd.getDate())>mxdCM){
        shownM++;
        shownD=(mxdIM-d+cd.getDate())-mxdCM-1;
    }
    else{
        shownD=mxdIM-d+cd.getDate()-1
    };
    
    animNums(years,shownY)
    animNums(months,shownM)
    animNums(days,shownD)


};

function animNums(el,newNum){

    if(isNaN(Number(el.textContent))){
        el.textContent="0"
    }
 
    let intrvl;
    let animate=true
    if(Math.abs(Number(el.textContent)-newNum)<25){
        intrvl=170
    }
    else if(Math.abs(Number(el.textContent)-newNum)<65){
        intrvl=60
    }
    else if(Math.abs(Number(el.textContent)-newNum)<140){
        intrvl=40
    }
    else{
        animate=false
    }

    if(Number(el.textContent)<newNum){
        if(animate){
            let timeStop=intrvl*(newNum-Number(el.textContent))
            let tst=setInterval(() => {
                el.textContent= Number(el.textContent)+1 
            }, intrvl);
            setTimeout(() => {
                clearInterval(tst)
            }, timeStop);
        }
        else{
            el.textContent=newNum
        }
        
    }
    if(Number(el.textContent)>newNum){
        if(animate){
            let timeStop=intrvl*(Number(el.textContent)-newNum)
            let tst=setInterval(() => {
                el.textContent= Number(el.textContent)-1 
            }, intrvl);
                setTimeout(() => {
                clearInterval(tst)
            }, timeStop);
        }
        else{
            el.textContent=newNum
        }
        
    }
}

function mainFunc(){
    rstStyle();

    let date=new Date
    let allCorrect=true
    let inputs=document.querySelectorAll("input");
    let nday=parseInt(day.value);
    let nmonth=parseInt(month.value);
    let nyear=parseInt(year.value);

    for(input of inputs){
        if(input.value.trim()==""){
            errStyle(input)
            allCorrect=false
        }
        else if(isNaN(input.value)||input.value.includes(".")){
            errStyle(input,"Must be a valid date")
            allCorrect=false

        }
        else if(input.matches("#year")){
            if(nyear>date.getFullYear()){
                errStyle(year,"Must be in the past")
                allCorrect=false
            }
        }
        else if(input.matches("#month")){
            if(nmonth>12||nmonth<1){
                errStyle(month,"Must be a valid month")
                allCorrect=false

            };
        }
        else if(input.matches("#day")){
            
            if(nday>maxDay(nyear,nmonth)||nday<1){
                errStyle(day,"Must be a valid date");
                errStyle(month,"");
                errStyle(year,"");
                allCorrect=false
            };
        };
    };
    if(allCorrect){
        findAge(nday,nmonth,nyear);
    };
        
};