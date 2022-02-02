import React from "react";
import "./family.css";

const Family = ({ setSelectedFamily, id_family, family_name }) => {
  return (
    <div className="family">
      <button
        onClick={() => setSelectedFamily(id_family)}
        className="family_button"
      >
        {family_name}
      </button>
    </div>
  );
};

export default Family;
