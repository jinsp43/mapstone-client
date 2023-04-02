import { useEffect, useState } from "react";
import { GET_PROFILE } from "../../utils/apiCalls.mjs";
import "./GroupsList.scss";

const GroupsList = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getGroups = async () => {
      const authToken = sessionStorage.getItem("authToken");

      try {
        const { data } = await GET_PROFILE(authToken);
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getGroups();
  }, []);

  return (
    <section className="groups">
      <div className="groups__heading-wrapper">
        <h3 className="groups__heading">Groups</h3>
        <p className="groups__username">Your username: {userData.username}</p>
      </div>
    </section>
  );
};

export default GroupsList;
