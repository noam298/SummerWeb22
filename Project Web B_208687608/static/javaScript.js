const ActivePage = window.location.pathname;

const activeNav = document.querySelectorAll('nav a').forEach(
    MyLinks => {
        if (MyLinks.href.includes(`${ActivePage}`)) {
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
    var x = document.getElementById('p');
    var y = document.getElementById("BTN");
    x.innerHTML = "Latitude: " + position.coords.latitude 
    + "longtitide: " + position.coords.longitude;
}

function updateTextInput(val) {
    document.getElementById('textInput').value=val; 
  }  

