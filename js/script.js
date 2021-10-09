/// <reference path="../typings/globals/jquery/index.d.ts" />

let row=document.getElementById("row")
let inputgetmov=document.getElementById("getMovInput")
let searchInput=document.getElementById("searchInput")
let movies=[]
let uname=document.getElementById("Uname")
let alertname= document.getElementById("alertname")
let email=document.getElementById("email")
let alertemail=document.getElementById("alertemail")
let password=document.getElementById("password")
let alertpass=document.getElementById("alertpass")
let rePass=document.getElementById("rePass")
let alertrepass= document.getElementById("alertrepass")
let age =document.getElementById("age")
let alertage=document.getElementById("alertage")
let phone=document.getElementById("phone")
let alertphone=document.getElementById("alertphone")
let btnsub=document.getElementById("btnsub")

//  nav
// button-menu
$("#btnMenu").click(function openn(){
    $(this).css("display","none")

    $("#btnClose").css("display","block")

    $("nav").animate({
        left:`0px`,
    })

    $("#link a").animate({
      opacity:1,
      paddingTop:"5px",
   },1500)
})

// slide-nav
let w=$("#innerNav").outerWidth()
console.log(w)

$("nav").animate({
    left:`-${w}px`,
})


// btn-close
$("#btnClose").click(function(){
    $("#link a").animate({
        opacity:0,
        paddingTop:"500px",
    },500)

    $("nav").animate({
        left:`-${w}px`,
    },900)
    $("#btnClose").css("display","none")

    $("#btnMenu").css("display","block")
})

// links
var l=document.getElementsByClassName("link-n")
    for(i=0;i<l.length;i++){
        l[i].addEventListener("click",function(){
           let trem=$(this).attr("target")
             console.log(trem)
            getData(trem)
        })
    }

getData("now_playing")

//get Movies
async function getData(trem){
    let x=await fetch(`https://api.themoviedb.org/3/movie/${trem}?api_key=754403bb48fb22e1be8bac2888231a71&language=en-US&page=1`)
let movie=await x.json()
movies=movie.results
console.log(movies)

display()
}

// getData()
 
//display
function display(){
var str=""
for( i=0;i<movies.length;i++){
    str +=` <div class="col-md-4 mb-3 col-sm-6">
    <div class="position-relative" id="coverFilm">
     <img src=https://image.tmdb.org/t/p/w500/${movies[i].poster_path} alt="" class="img-fluid">
    <div id="layer-img">   
        <h2 id="titleFilm" class="text-center">${movies[i].title}</h2>
        <p id="brief">${movies[i].overview}</p>
        <p id="rate">rate: ${movies[i].vote_average}</p>
        <p id="date">${movies[i].release_date}</p>
    </div>
</div>
    </div>`
    row.innerHTML=str;   
}
}


//trending
async function trending(){
    let x=await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=754403bb48fb22e1be8bac2888231a71")
let movie=await x.json()
movies=movie.results
console.log(movies)
display()
}
$("#trend").click(trending)

// get movies by word
$("#getMovInput").keyup(function(){
    let word=inputgetmov.value
    
    getMoviesByWord(word)
    
    console.log(word)
})

async function getMoviesByWord(word){
    let x=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=754403bb48fb22e1be8bac2888231a71&language=en-US&query=${word}&include_adult=false`)
let movie=await x.json()
movies=movie.results
console.log(movies)
display()
}

///search  Movies
$("#searchInput").keyup(searchMovie)
function searchMovie(){
    var str=""
    for( i=0;i<movies.length;i++){
        let lowcaseMov=(movies[i].title).toLowerCase()
        if(lowcaseMov.includes(searchInput.value))
        {
            str +=` <div class="col-md-4 mb-3 col-sm-6">
        <div class="position-relative" id="coverFilm">
         <img src=https://image.tmdb.org/t/p/w500/${movies[i].poster_path} alt="" class="img-fluid">
        <div id="layer-img">   
            <h2 id="titleFilm" class="text-center">${movies[i].title}</h2>
            <p id="brief">${movies[i].overview}</p>
            <p id="rate">rate: ${movies[i].vote_average}</p>
            <p id="date">${movies[i].release_date}</p>
        </div>
    </div>
        </div>`
        row.innerHTML=str; 
        }
    }
    }


// validation
$("#btnsub").attr("disabled",true)

function reg(){

    if(validName() == true && validPass() == true && validRepass()==true && validEmail()==true && validPhone()==true && validAge()==true){
        $("#btnsub").attr("disabled",false)
    }
    else{
        $("#btnsub").attr("disabled",true)
    }
 }
$("#Uname,#password,#rePass,#email,#phone,#age").keyup(function(){
    reg()
})

$("#Uname").keyup(validName)
    function validName(){
        let regName=/^[a-zA-Z][a-zA-Z0-9]{2,20}$/;
         let matchName=regName.test(uname.value)
         if(matchName==true){
             uname.classList.remove("is-invalid");
             uname.classList.add("is-valid");
             alertname.classList.add("d-none")
             return true;
         }
         else{
             uname.classList.add("is-invalid");
             uname.classList.remove("is-valid");
             alertname.classList.remove("d-none")
             return false;
         }
         }
$("#email").keyup(validEmail)
function validEmail(){
    let regEmail=/^[a-z][a-zA-z0-9\-\.\_]+@([a-zA-z0-9-]+\.)+[a-zA-z0-9-]{2,4}$/
    let matchEmail=regEmail.test(email.value)
        if(matchEmail==true)
        {
            email.classList.remove("is-invalid");
            email.classList.add("is-valid");
            alertemail.classList.add("d-none")
            return true;
        }
        else{
            email.classList.add("is-invalid");
            email.classList.remove("is-valid");
            alertemail.classList.remove("d-none")
            return false;
        }
    }

$("#password").keyup(validPass)
function validPass(){
    let regPass=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
    let matchPass=regPass.test(password.value)
    if(matchPass==true){
     password.classList.remove("is-invalid");
     password.classList.add("is-valid");
     alertpass.classList.add("d-none")
     return true;
 
 }
 else{
     password.classList.add("is-invalid");
     password.classList.remove("is-valid");
     alertpass.classList.remove("d-none")
     return false;
 }
 }

 $("#rePass").keyup(validRepass)
 function validRepass(){
     if(rePass.value==password.value && rePass.value !="")
     {
        rePass.classList.remove("is-invalid");
        rePass.classList.add("is-valid");
        alertrepass.classList.add("d-none")
        return true;

     }
     else{
        rePass.classList.add("is-invalid");
        rePass.classList.remove("is-valid");
        alertrepass.classList.remove("d-none")
        return false;
     }
 }


$("#age").keyup(validAge)
function validAge(){
    let regAge= /^([1-8][0-9]{1}$|90)$/
    let matchAge=regAge.test(age.value)
        if(matchAge==true){

        age.classList.remove("is-invalid");
        age.classList.add("is-valid");
        alertage.classList.add("d-none")
        return true;

     }
     else{
        age.classList.add("is-invalid");
        age.classList.remove("is-valid");
        alertage.classList.remove("d-none")
        return false;
     }   
}

$("#phone").keyup(validPhone)
function validPhone(){
    let regPhone=/^(01)[01245][0-9]{8}$/
    let matchPhone=regPhone.test(phone.value)
    if(matchPhone==true){
        phone.classList.remove("is-invalid");
        phone.classList.add("is-valid");
        alertphone.classList.add("d-none")
        return true;

     }
     else{
        phone.classList.add("is-invalid");
        phone.classList.remove("is-valid");
        alertphone.classList.remove("d-none")
        return false;

    }
}

// $("#con").click(function(){
//     let contactOff=$("#contact").offset().top
//    console.log(contactOff)
//     $("home,body").animate({
//         scrollTop:contactOff
//     },2000)
// })
 