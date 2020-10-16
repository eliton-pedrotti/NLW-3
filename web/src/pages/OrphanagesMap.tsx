  
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import mapMakerImg from "../images/map-marker.svg";
import "../styles/pages/orphanages-map.css";

import mapIcon from "../utils/mapIcon"
import api from "../services/api";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(res => {
      setOrphanages(res.data);
    });
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMakerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Parobé</strong>
          <span>Rio Grande do Sul</span>
        </footer>
      </aside>

      <Map
        center={[-29.6374752,-50.8487551]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

       {orphanages.map(orphanage => {
         return (
           <Marker
             icon={mapIcon}
             position={[orphanage.latitude, orphanage.longitude]}
             key={orphanage.id}
           >
             <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
               {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                 <FiArrowRight size={20} color="#fff" />
               </Link>
             </Popup>
           </Marker>
         )
       })}


      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size="32" color="#fff" />
      </Link>
    </div>
  );
};

export default OrphanagesMap;