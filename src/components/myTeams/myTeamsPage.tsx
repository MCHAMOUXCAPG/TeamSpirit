import React, { useContext } from "react";

import { AuthContext } from "../../context/auth";

const MyTeamsPage = () => {
  const context = useContext(AuthContext);
  return (
    <div>
      {context.myTeams.map((team) => {
        return <p>{team.Name}</p>;
      })}
    </div>
  );
};

export default MyTeamsPage;
