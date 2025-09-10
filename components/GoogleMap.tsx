import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

interface MapContainerProps {
  currentLocation: [number, number]; // [lng, lat]
  destination: [number, number];     // [lng, lat]
  speed: number;
  status: string;
  updatedAt: string;
}

export default function MapContainer({
  currentLocation,
  destination,
  speed,
  status,
  updatedAt,
}: MapContainerProps) {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no"/>
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js"></script>
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css" rel="stylesheet"/>
    <style>
      html, body { margin: 0; padding: 0; height: 100%; width: 100%; font-family: sans-serif; }
      #map { position: absolute; top: 0; bottom: 0; width: 100%; height: 100%; }
      .marker { background-image: url('https://img.icons8.com/color/48/truck.png'); background-size: cover; width:48px; height:48px; border-radius:50%; cursor:pointer; }
      .info-box {
        position: absolute;
        bottom: 20px;
        left: 20px;
        background: rgba(255,255,255,0.9);
        padding: 10px 15px;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        font-size: 14px;
        line-height: 1.4;
      }
      .info-box b { color: #333; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <div class="info-box">
      <div><b>Container:</b> ABC123</div>
      <div><b>Speed:</b> ${speed} km/h</div>
      <div><b>Status:</b> ${status}</div>
      <div><b>Updated:</b> ${new Date(updatedAt).toLocaleString()}</div>
    </div>
    <script>
      mapboxgl.accessToken = 'pk.eyJ1Ijoibmhhbm5oYW9uZ28xOTk3IiwiYSI6ImNtZmM1cTNpdDAwbTEybXB3c3JvaWRsdnkifQ.BFwoGqAgyLIR1_-CM-OqDQ';

      const current = [${currentLocation[0]}, ${currentLocation[1]}];
      const destination = [${destination[0]}, ${destination[1]}];

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [(current[0]+destination[0])/2, (current[1]+destination[1])/2],
        zoom: 12
      });

      const el = document.createElement('div');
      el.className = 'marker';
      const marker = new mapboxgl.Marker(el).setLngLat(current).addTo(map);

      fetch('https://api.mapbox.com/directions/v5/mapbox/driving/' + current.join(',') + ';' + destination.join(',') + '?geometries=geojson&access_token=' + mapboxgl.accessToken)
        .then(res => res.json())
        .then(data => {
          if(!data.routes || data.routes.length === 0){ alert('Không tìm thấy tuyến đường hợp lệ!'); return; }

          const routeCoords = data.routes[0].geometry.coordinates;

          map.addSource('route', {
            type: 'geojson',
            data: { type:'Feature', geometry:{type:'LineString', coordinates: routeCoords} }
          });

          map.addLayer({
            id:'route',
            type:'line',
            source:'route',
            layout:{'line-join':'round','line-cap':'round'},
            paint:{'line-color':'#ff0000','line-width':4}
          });

          // Animate marker
          let index = 0;
          function animateMarker(){
            if(index<routeCoords.length){
              marker.setLngLat(routeCoords[index]);
              index++;
              requestAnimationFrame(animateMarker);
            }
          }
          animateMarker();

          // Fit bounds
          const bounds = routeCoords.reduce((b, c)=>b.extend(c), new mapboxgl.LngLatBounds(routeCoords[0], routeCoords[0]));
          map.fitBounds(bounds, {padding:50});
        });
    </script>
  </body>
  </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        source={{ html }}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container:{flex:1} });
