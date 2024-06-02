import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const Todomain = () => {

      var m = "helloworld";

      const navigate = useNavigate();

      const handleLogout = (event) =>{
        event.preventDefault();
        navigate('/');
      }
        const location = useLocation();
        const email = location.state.m[0].email;
        const [editMode, setEditMode] = useState(false);
        const [list, setList] = useState([]);
        const [Task, setTask] = useState('');
        const [Date, setDate] = useState('');
        const [userId, setUserId] = useState('');
        const [search, setSearch] = useState('');
        // const [searchMode, setSearchMode] = useState('');

      const handleInput1 = (event) => {
        setSearch(prev => ({...prev, [event.target.name] : [event.target.value]}));
      }

      const handleSubmit1 = (event) => {
        event.preventDefault();
        m = search.search[0];
        console.log(search.search[0]);
      }

        const showTodos = async () => {
          try {
            const { data } = await axios.get(`http://localhost:9000/show/todos/${email}`);
            setList(data);
          } catch (error) {
            console.log(error);
          }
        }
      
        // add todo
        const addtodo = async (e) => {
          e.preventDefault();
          try {
            const add = await axios.post('http://localhost:9000/create/list', { email:email, Task, Date});
            if (add.status === 200) {
              setTask('');
              setDate('');
              showTodos();
            }
      
          } catch (error) {
            console.log(error);
          }
        }
      
        // delete single todo
        const deleteTodo = async (id) => {
          try {
            const todoDelete = await axios.delete(`http://localhost:9000/delete/todo/${id}`);
            if (todoDelete.status === 200) {
              showTodos();
            }
      
          } catch (error) {
            console.log(error);
          }
        }
      
      
        // populate single todo in the form
        const showSingleTodo = async (id) => {
          setEditMode(true);
      
          try {
            const { data } = await axios.get(`http://localhost:9000/todo/${id}`);
            setTask(data.Task);
            setDate(data.Date);
            setUserId(data.id);
      
          } catch (error) {
            console.log(error);
          }
        }
      
        //edit todo
        const editTodo = async (e) => {
          e.preventDefault()
      
          try {
            const edit = await axios.put(`http://localhost:9000/update/todo/${userId}`, { email:email, Task, Date });
            // console.log(edit)
      
            if (edit.status === 200) {
              setEditMode(false);
              setTask('');
              setDate('');
              showTodos();
            }
          } catch (error) {
            console.log(error)
          }
      
        }
        
        useEffect(() => {
            showTodos();
        }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="#">To-Do List</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              </ul>
              <form class="d-flex" onSubmit={handleSubmit1}>
              <input class="form-control me-2" type="search" 
              onChange={handleInput1} name='search' placeholder="Search" aria-label="Search"/>
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
              <form className="d-flex">
                <button className="btn btn-outline-success" onClick={handleLogout} type="submit">Logout</button>
              </form>
            </div>
          </div>
        </nav>


    
    <div className="container">
        <div className="form" style={{ paddingBottom: "50px", paddingTop: "50px" }}>
          <form onSubmit={editMode ? editTodo : addtodo}>
            <div className="form-wrapper" style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1, marginRight: "10px" }}>
                <input onChange={(e) => setTask(e.target.value)} value={Task} className="form-control" type="text" placeholder="Enter Task" name="Task"></input>
              </div>
              <div style={{ flex: 1 }}>
                <input onChange={(e) => setDate(e.target.value)} value={Date} className="form-control" type="date" placeholder="Date" name="Date"></input>
              </div>
              {
                editMode ?
                  <button type='submit' style={{ width: "200px", marginLeft: "10px" }} className='btn btn-primary'>Edit</button>
                  :
                  <button type='submit' style={{ width: "200px", marginLeft: "10px" }} className='btn btn-success'>+ Add</button>
              }

            </div>
          </form>
        </div>

        <table className="table">
          <thead>
          <span><strong>All Tasks :  </strong></span>
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col">Task</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
            <tbody>
            {
              (list && list.length > 0) ? list.map(d => (
                    <tr key={d.id} >
                    {/* <th scope="row">{d.id}</th> */}
                    <td>{d.Task}</td>
                    <td>{d.Date}</td>
                    <td>
                      <i onClick={() => showSingleTodo(d.id)} className="fa-solid fa-pen-to-square" style={{ color: "green", cursor: "pointer", marginRight: "25px" }} ></i>
                      <i onClick={() => deleteTodo(d.id)} style={{ color: "red", cursor: "pointer" }} className="fa-solid fa-trash-can"></i>
                      <>{console.log(d.Date)}</>
                    </td>
                  </tr>
              )) : <span></span>
            }
          </tbody>
          <span><strong>Filtered tasks will be shown here : </strong></span>
          <tbody>
            {
              (list && list.length > 0) ? list.map(d => (
                    ((d.Date).toString()===(search.search[0])?.toString()) ?
                    (
                      <tr key={d.id} >
                        {/* <th scope="row">{d.id}</th> */}
                        <td>{d.Task}</td>
                        <td>{d.Date}</td>
                        <td>
                          <i onClick={() => showSingleTodo(d.id)} className="fa-solid fa-pen-to-square" style={{ color: "green", cursor: "pointer", marginRight: "25px" }} ></i>
                          <i onClick={() => deleteTodo(d.id)} style={{ color: "red", cursor: "pointer" }} className="fa-solid fa-trash-can"></i>
                        </td>
                      </tr>
                    ) : null
              )) : <span></span>
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Todomain
