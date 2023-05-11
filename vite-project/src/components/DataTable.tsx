import React, { useState } from 'react'
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData';
import Button from '@mui/material/Button';
import BasicModal from './Modal'

const columns: GridColDef[] = [
  
  { field: 'name', headerName: 'Contact Name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1},
  { field: 'phone_number', headerName: 'Phone Number', flex: 1},
  { field: 'address', headerName: 'Address', flex: 2}
]

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function DataTable() {
  const [ open, setOpen ] = useState(false);
  const { contactData, getData } = useGetData();
  const [ selectionModel, setSelectionModel ] = useState<string[]>([])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteData = () => {
    server_calls.delete(selectionModel[0]);
    getData();
    console.log(`Selection model: ${selectionModel}`)
    setTimeout( () => { window.location.reload() }, 500)
  }

  const findData = () => {
    console.log(server_calls.get())
  }

  return (
    <>

        
        <h2 className="p-3 bg-slate-300 my-2 rounded">My Contacts</h2>
        <div className='flex flex-row'>
        <BasicModal 
            id={selectionModel}
            open={open}
            onClose={handleClose}
        />

            <Button onClick={handleOpen} className="p-3 bg-slate-300 m-3 rounded hover:bg-black hover:text-white" > Update</Button>
            <Button onClick={deleteData} className="p-3 bg-slate-300 m-3 rounded hover:bg-black hover:text-white" >Delete</Button>
        </div>
        
        <div className={ open ? "hidden" : "container mx-10 my-5 flex flex-col"}
          style={{ height: 400, width: '100%' }}
          >
            
          
            <DataGrid rows={contactData} columns={columns} rowsPerPageOptions={[5]}
            checkboxSelection={true} 
            onSelectionModelChange={ (item:any) => {
              setSelectionModel(item)
            }}
            />
        </div>
        <button onClick={findData}>get data</button>
    </>
  )
}

export default DataTable

