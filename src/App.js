import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Family from "./components/Families";

function App() {
  const [families, setFamilies] = useState([]);
  const [species, setSpecies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState();

  useEffect(() => {
    if (!selectedFamily) {
      axios
        .get("http://localhost:3000/api/families")
        .then((result) => setFamilies(result.data));

      axios
        .get(`http://localhost:3000/api/species`)
        .then((result) => setSpecies(result.data));
    }

    selectedFamily &&
      axios
        .get(`http://localhost:3000/api/families/${selectedFamily}/species`)
        .then((result) => {
          console.log(result.data);
          setSpecies(result.data);
        })
        .catch((err) => {
          setSpecies([]);
          console.log(err);
        });
  }, [selectedFamily]);

  // console.log(selectedFamily);
  console.log(species);

  return (
    <div className="App">
      <div className="app_families_container">
        {families &&
          families.map((family) => (
            <Family
              {...family}
              setSelectedFamily={setSelectedFamily}
              key={family.id_family}
            />
          ))}
      </div>
      <div className="app_species_container">
        {species && species.length ? (
          species.map((specie) => (
            <div
              className="app_species_container_specie"
              key={specie.id_specie}
            >
              <h1>{specie.specie_name} </h1>
              <h2>{specie.scientific_name} </h2>
            </div>
          ))
        ) : (
          <h1>Aucunes espèces pour cette famille.</h1>
        )}
      </div>
    </div>
  );
}

export default App;
