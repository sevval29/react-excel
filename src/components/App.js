import React,{useState} from "react"
import * as XLSX from "xlsx"


export default function App() {

const[items,setItems]=useState([])

  const readExcel=(file)=>{
const promise=new Promise((resolve,reject)=>{

  const fileReader=new FileReader();
  fileReader.readAsArrayBuffer(file)

fileReader.onload=(e)=>{
  const bufferArray=e.target.result;

const wb=XLSX.read(bufferArray,{type:"buffer"});
const wsname=wb.SheetNames[0];
const ws=wb.Sheets[wsname];
const data=XLSX.utils.sheet_to_json(ws);
resolve(data);

};
fileReader.onerror=(error)=>{
  reject(error);
};

});

promise.then((d)=>{
 
  setItems(d)
})

  };
  
  
  return (
    <div> 
    <input type="file" accept="xlsx , xls" multiple={false} onChange={(e)=> {
      const file=e.target.files[0]

      readExcel(file)
    }}
     
    />
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Movie</th>
          <th scope="col">Category</th>
          <th scope="col">Director</th>
         <th scope="col">Rating</th>
        
        </tr>
      </thead>
      <tbody>
        {
items.map((d)=>(
  <tr key={d.Movie}>
    <td>{d.Movie}</td>
    <td>{d.Category}</td>
    <td>{ d.Director }</td>
    <td>{ d.Rating}</td>
    </tr>

))

        }
      </tbody>

    </table>

    </div>
    
    
  );
}

