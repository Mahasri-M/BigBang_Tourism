import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

const Adminaccount = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const nameid = localStorage.getItem("nameid");

    axios
      .get(`https://localhost:7046/api/User/${nameid}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Account Details</h3>
      <table
        style={{
          borderCollapse: "collapse",
          fontSize: 20,
          width: "80%",
          margin: "auto",
        }}
      >
        <thead>
          <tr style={{ border: "1px solid black", height: "60px", verticalAlign: "middle" }}>
            <th colSpan="2" style={{ borderBottom: "1px solid black", textAlign: "center" }}>
              <Avatar style={{ padding: "6px", display: "inline-block", verticalAlign: "middle" }}>
                <PersonIcon />
              </Avatar>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>Name:</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{user.userName}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>Email:</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{user.userEmail}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>Phone Number:</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{user.phone_Number}</td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default Adminaccount;
