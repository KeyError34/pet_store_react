

import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconMarker from '../../assets/icons/marker.svg'
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

function MapComponent() {
  const markers = {
    geocod: [52.511167, 13.404702],
    popUp: 'IT Career Hub'
  }
  const customIcon = new Icon({
    iconUrl: iconMarker,
    iconSize:[38,38]
  })
  return (
    <>
      <MapContainer center={[52.511167, 13.404702]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markers.geocod} icon={customIcon}>
          <Popup>{markers.popUp}</Popup>
        </Marker>
      </MapContainer>
    </>
  );
}
export default MapComponent;
