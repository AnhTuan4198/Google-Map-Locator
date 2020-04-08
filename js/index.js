function initMap() {
  var lostAngles = {
        lat: 34.063380,
        lng: -118.358080
    };
  map = new google.maps.Map(document.getElementById("map"), {
    center: lostAngles,
    zoom: 11,
    mapTypeId: "roadmap",
  });
  //make a marker on map 
  var marker= new google.maps.Marker({
    position:lostAngles,
    map: map,
    title:"Hello Los Angles"
  })

  
}
