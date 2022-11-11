const ActivePage = window.location.href;

const activeNav = document.querySelectorAll('nav a').forEach(
    MyLinks => {
        if (MyLinks.href==ActivePage) {
            MyLinks.classList.add('Active');
        }
    }
)


function GetLocation() {
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
        console.log("in get location");
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("p").innerHTML = "Geolocation is not supported";
        
    }
};

function showPosition(position) {
    document.getElementById("userLatitude").value = position.coords.latitude;
    document.getElementById("userLongitude").value = position.coords.longitude;
};

function SearchGetLocation() {
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
        console.log("in get location");
        navigator.geolocation.getCurrentPosition(searchShowPosition);
    } else {
        document.getElementById("p").innerHTML = "Geolocation is not supported";
    }
};

function searchShowPosition(position) {
    document.getElementById("searchLatitude").value = position.coords.latitude;
    document.getElementById("searchLongitude").value = position.coords.longitude;

};

function updateTextInput(val) {
    document.getElementById('textInput').value=val; 
  };  

function dateValid (){
    console.log("hi");
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
    dd = '0' + dd;
    }

    if (mm < 10) {
    mm = '0' + mm;
    } 
        
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("UserDOB").max= today;
    console.log("hi");
};

function dateValidation (){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
    dd = '0' + dd;
    }

    if (mm < 10) {
    mm = '0' + mm;
    } 
        
    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    return today;
};

function noFiltersHide(noFiltersResult){
    console.log("hiiiiiiiiiiiiiiiiiiii");
    if(noFiltersResult){
        document.getElementById('dogsAgeRange').style.visibility='hidden';
        document.getElementById('textInput').style.visibility='hidden';
        document.getElementById('DistanceRange').style.visibility='hidden';
        document.getElementById('DogsVacci').style.visibility='hidden';
        document.getElementById('DogsNeut').style.visibility='hidden';
        document.getElementById('LabelDogsAgeRange').style.visibility='hidden';
        document.getElementById('LabelDistanceRange').style.visibility='hidden';
        document.getElementById('LabelDogsVacci').style.visibility='hidden';
        document.getElementById('LabelDogsNeut').style.visibility='hidden';
}
    else{
        document.getElementById('dogsAgeRange').style.visibility='visible';
        document.getElementById('textInput').style.visibility='visible';
        document.getElementById('DistanceRange').style.visibility='visible';
        document.getElementById('DogsVacci').style.visibility='visible';
        document.getElementById('DogsNeut').style.visibility='visible';
        document.getElementById('LabelDogsAgeRange').style.visibility='visible';
        document.getElementById('LabelDistanceRange').style.visibility='visible';
        document.getElementById('LabelDogsVacci').style.visibility='visible';
        document.getElementById('LabelDogsNeut').style.visibility='visible  ';
    }
};