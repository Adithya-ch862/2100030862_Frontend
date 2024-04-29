import React ,{useEffect,useState} from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';

function App(){
  const [data,setData]=useState([]);
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [salary,setSalary]=useState(0)
  const [id,setId]=useState(0)
  const [isupdate,setIsUpdate]=useState(false)

  useEffect(()=>{
    setData(EmployeeData)
  },[]);

  const handleEdit =(id) =>{
    const dt=data.filter(item=>item.id===id);
    if( dt!==undefined){
setIsUpdate(true)
setId(id);
setFirstName(dt[0].firstName);
setLastName(dt[0].lastName);
setSalary(dt[0].salary);
    }
  }

  const handleDelete=(id) =>{
    if(id>0){
      if(window.confirm("Are you sure to delete this item?")){
        const dt=data.filter(item => item.id !==id);
        setData(dt);
      }
    }
  }

  const handleSave =(e) =>{

    let error='';
    if(firstName===''){
      error +='FirstName is required,';
    }
    if(lastName===''){
      error +='lastName is required,';
    }
    if(salary <=0){
      error +='Salary is required';
    }
    
    e.preventDefault();
    const dt=[...data];
    const newObject={
      id: EmployeeData.length+ 1,
      FirstName: firstName,
      LastName: lastName,
      Salary: salary
    }
    dt.push(newObject);
    setData(dt);
     
  
}
  const handleUpdate =() =>{
    const index =data.map((item)=>{
      return item.id
    }).indexOf(id);

    const dt=[...data];
    dt[index].firstName=firstName;
    dt[index].lastName=firstName;
    dt[index].salary=salary;

    setData(dt);
    handleClear();
    
  }

  const handleClear =() =>{
    setId(0);
setFirstName('');
setLastName('');
setSalary('');
setIsUpdate(false);

    
  }


  return (
    <div className="App">
      <div style={{display:'flex',justifyContent:'center', marginTop:"10px",marginBottom:"10px"}}>
        <div>
                <label>FirstName:
                  <input type='text' placeholder='Enter First Name' onChange={(e)=>setFirstName(e.target.value) } value={firstName}/>
                </label>
        </div>
        <div>
                <label>LastName:
                  <input type='text' placeholder='Enter Last Name' onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
                </label>
        </div>
        <div>
                <label>Salary:
                  <input type='text' placeholder='Enter the Amount of Salary' onChange={(e)=>setSalary(e.target.value)} value={salary}/>
                </label>
        </div>
        <div>
          {
            !isupdate ?
            <button className='btn btn-primary' onClick={(e)=> handleSave(e)}> Save</button>
            :
            <button className='btn btn-primary' onClick={()=> handleUpdate()}> Update</button>
            
          }
     <button className='btn btn-danger' onClick={()=> handleClear()}>Clear</button>
        </div>
      </div>
<table className='table table-hover'>
  <thead>
    <tr>
      <td>Sr.No</td>
      <td>id</td>
      <td>FirstName</td>
      <td>LastName</td>
      <td>Salary</td>
      <td>Actions</td>
    </tr>
  </thead>
  <tbody>{ 
         data.map((item,index)=>{
          return(
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.id}</td>
              <td>{item.FirstName}</td>
              <td>{item.LastName}</td>
              <td>{item.Salary}</td>
              <td>
                <button className='btn btn-primary' onClick={()=> handleEdit(item.id)}>Edit</button>&nbsp;
                <button className='btn btn-danger' onClick={()=> handleDelete(item.id)}>Delete</button>

              </td>
            </tr>
          )
         })
    }
    </tbody>
</table>
</div>
  );
}
export default App;