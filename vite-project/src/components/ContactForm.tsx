import React from 'react'
import Input from './Input'
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { server_calls } from '../api/server';
import { useDispatch, useStore } from 'react-redux';
import { chooseName, chooseEmail, chooseAddress, choosePhone } from '../redux/slices/RootSlice';

interface ContactFormProps {
  id?: string[]
}

const ContactForm = (props:ContactFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = (data: any, event: any) => {
    console.log(`ID: ${typeof props.id}`);
    console.log(props.id)
    console.log(data)
    if (props.id && props.id.length > 0) {
      server_calls.update(props.id, data)
      console.log(`Updated: ${ data.make } ${ props.id }`)
      setTimeout(() => {window.location.reload()}, 1000);
      event.target.reset()
    } else {
      // Use dispatch to update our state in our store
      dispatch(chooseName(data.make));
      dispatch(chooseEmail(data.model));
      dispatch(choosePhone(data.serial));
      dispatch(chooseAddress(data.year));

      server_calls.create(store.getState())
      setTimeout( () => {window.location.reload()}, 1000);
    }
    
  }

  
  return (

    // TODO - add handle function
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="make">
            make
          </label>
          <Input {...register('make')} name='make' placeholder="Make"></Input>
        </div>
        <div>
          <label htmlFor="model">
            model
          </label>
          <Input {...register('model')} name='model' placeholder="model"></Input>
        </div>
        <div>
          <label htmlFor="year">
          year
          </label>
          <Input {...register('year')} name='year' placeholder="Year"></Input>
        </div>
        <div>
          <label htmlFor="serial">
            serial
          </label>
          <Input {...register('serial')} name='serial' placeholder="Serial"></Input>
        </div>
        <div className="flex p-1">
          <Button className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white">
          <input type="submit" value="Submit" />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm