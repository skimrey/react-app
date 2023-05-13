import React, { useState } from 'react'
import Button from './Button'
import BasicModal from './Modal'
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData';


const columns: GridColDef[] = [
  { field: 'id', headerName: "ID", width: 90, hide: true },
  { field: 'title', headerName: 'Contact Name', flex: 1 },
  { field: 'author', headerName: 'Email', flex: 1},
  { field: 'pages', headerName: 'Phone Number', flex: 1},
  { field: 'cover', headerName: 'Address', flex: 2}
]

function DataTable() {
  const [ open, setOpen ] = useState(false);
  const { contactData, getData } = useGetData();
  const [ selectionModel, setSelectionModel ] = useState<string[]>([])

  const handleOpen = () => {
    setOpen(true)
  }
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
  
  const handleClose = () => {
    setOpen(false)
  }

  const deleteData = () => {
    server_calls.delete(selectionModel[0]);
    getData();
    console.log(`Selection model: ${selectionModel}`)
    setTimeout( () => { window.location.reload() }, 500)
  }

  return (
    <>
        <BasicModal 
            id={selectionModel}
            open={open}
            onClose={handleClose}
        />
        
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
    </>
  )
}

export default DataTable