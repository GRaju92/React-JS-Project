import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [updated, setUpdated]=useState({id:"",name:""})

  useEffect(() => {
    loadData();
  }, []);
  // get user from API
  const loadData = async () => {
    const response = await Axios.get("http://localhost:3003/users");
    // console.log(response.data);
    setUsers(response.data);
  };
  // Add User
  const AddUser = () => {
    Axios.post("http://localhost:3003/users", {
      id,
      name,
    })
      .then(() => {
        setId("");
        setName("");
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      loadData();
    }, 500);
  };
  //delete user
  const deleteUser = (id) => {
    //console.log(id);
    Axios.delete(`http://localhost:3003/users/${id}`);
    setTimeout(() => {
      loadData();
    }, 500)
  };

  //Update user
  const updateUser=()=>{
    Axios.put(`http://localhost:3003/users/${updated.id}`, {
      id:updated.id, name:updated.name
    }).then((response)=>{

    }).catch((e)=>{

    })
    setTimeout(() => {
      loadData();
    }, 500)
  };

  return (
    <div className="App">
      <input
        placeholder="Enter Id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick= {AddUser}>Add</button>
      {users.map((e) => (
        <div key={e.id} className="box">
          <div className="box-1">
            {e.id} {e.name}
            <button onClick={()=>{deleteUser(e.id)}}>Delete</button>
            <div>
              <div className="box-2">
              <input type="text" placeholder="Enter Updated ID" onChange={e=> setUpdated({...updated,id: e.target.value})}/>
              <input type="text" placeholder="Enter Updated Name" onChange={e=> setUpdated({...updated,name: e.target.value})}/>
              <button onClick={updateUser}>Update</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
