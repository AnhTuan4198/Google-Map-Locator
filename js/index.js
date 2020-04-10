window.onload=()=>{
 //displayStore();
}

var map;
var Marker=[];
var infoWindow;
let searchBtn = document.getElementById("search-btn");
let zipcode = document.getElementById("zip-code-input");

function initMap() {
  var lostAngles = {
        lat: 34.063380,
        lng: -118.358080
    };
    var iconBase =
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/";

     
  map = new google.maps.Map(document.getElementById("map"), {
    center: lostAngles,
    zoom: 11,
    mapTypeId: "roadmap",
    styles: [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#1d2c4d",
          },
        ],
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#8ec3b9",
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1a3646",
          },
        ],
      },
      {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#4b6878",
          },
        ],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#64779e",
          },
        ],
      },
      {
        featureType: "administrative.province",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#4b6878",
          },
        ],
      },
      {
        featureType: "landscape.man_made",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#334e87",
          },
        ],
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [
          {
            color: "#023e58",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#283d6a",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#6f9ba5",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1d2c4d",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#023e58",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#3C7680",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#304a7d",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#98a5be",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1d2c4d",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#2c6675",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#255763",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#b0d5ce",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#023e58",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#98a5be",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1d2c4d",
          },
        ],
      },
      {
        featureType: "transit.line",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#283d6a",
          },
        ],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
          {
            color: "#3a4762",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#0e1626",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#4e6d70",
          },
        ],
      },
    ],
  });
  infoWindow = new google.maps.InfoWindow();
  //make a marker on map 
  search();
}

function displayStore(foundStores) {
  var storeHtml = "";
  foundStores.forEach((store, index) => {
    //check the ZIP code
    storeHtml += `<div class='store-container'>
                <div class='store-info-container'>
                    <div class='store-address'>
                        <p> ${store.addressLines[0]}</p>
                        <p> ${store.addressLines[1]}</p>
                    </div>
                    <div class='store-phone-number'>
                        ${store.phoneNumber}
                    </div>
                </div>
                <div class="store-number-container">
                    <div class="store-number">${index}</div>
                </div>
      </div>`;
  });
  let list = document.getElementById("stores-list");
  list.innerHTML = storeHtml;
  setOnClickStore();
}
function showMarker(foundStores){
  console.log(foundStores);
  var bounds = new google.maps.LatLngBounds();
  foundStores.forEach((store, index) => {
    // asign each store ass aobject include latitude and longitude
    var storeLocation = new google.maps.LatLng(
      store.coordinates.latitude,
      store.coordinates.longitude
    );
    //console.log(store.addressLines[0]);
    bounds.extend(storeLocation);
    var storeInfo = {
      name: store.name,
      address: store.addressLines,
      phoneNumber: store.phoneNumber,
      openStatusText: store.openStatusText,
    };
    //console.log(storeInfo)
    createMarker(storeLocation, storeInfo, index);
  });
  map.fitBounds(bounds);
}

function createMarker(position,storeInfo,index){
  var icons = {
    url:
      "https://cdn4.iconfinder.com/data/icons/longico/224/longico-07-512.png",
    scaledSize: new google.maps.Size(50, 50), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0),
  };
  //create params for destination (store)
  let param=storeInfo.address.join(" ").split(' ').join('+').replace(",","2%C");
  // final replace the comma by the string "2%C" follow the require of Goodle
 
  //console.log(param)
  var html = `<div class='marker-info'>
                <div class='store-marker-name-container'>
                  <h4>${storeInfo.name}</h4>
                  <p>${storeInfo.openStatusText}</p>
                </div>
                <div class='store-marker-address'>
                  <div class='icon'>
                    <i class="fas fa-map-marked-alt"></i>
                  </div>
                  <a href="https://www.google.com/maps/dir/?api=1&origin=Hẻm+32+Trần+Nhật+Duật%2C+Phường+5%2C+Tp.+Đà+Lạt%2C+Lâm+Đồng%2c+Việt+Nam&destination=${param} style="text-decoration:none"><p>${storeInfo.address[0]}</p> </a>
                </div>
                <div class='store-market-phoneNumber'>
                  <div class='icon'>
                    <i class="fas fa-phone"></i>
                  </div>
                  <p>${storeInfo.phoneNumber}</p>
                </div>
              </div>`;
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            label:index.toString(),
            icon:icons
          });
          let store
          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
          });
          Marker.push(marker);
}



function search(){
  let foundStore=[];
  if(zipcode.value){
    stores.forEach((store) => {
      let zipCode = store.address.postalCode.substring(0, 5);
      if (zipCode == zipcode.value) {
        foundStore.push(store);
      }
    });
  }else{
    foundStore=stores;
    console.log(foundStore);
  }
  clear();
  displayStore(foundStore);
  showMarker(foundStore);
 // clear();
}

function clear(){
  infoWindow.close();
  for(let i=0; i<Marker.length;i++){
    Marker[i].setMap(null);
  }
  Marker.length=0;
}
//console.log(stores);

function setOnClickStore(){
  var storeElements = document.querySelectorAll('.store-container');
  storeElements.forEach((store,index)=>{
    store.addEventListener('click',function(){
      google.maps.event.trigger(Marker[index], 'click')
    })
  })
}