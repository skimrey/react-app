import React from 'react'
import Input from './Input'
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { server_calls } from '../api/server';
import { useDispatch, useStore } from 'react-redux';
import { chooseName, chooseEmail, chooseAddress, choosePhone } from '../redux/slices/RootSlice'; 

interface ContactFormProps {
  id?: string,
  data?: {}
}

const ContactForm = (props:ContactFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store =  useStore();

  const onSubmit = (data: any, event: any ) => {
    console.log(`ID: ${props.id}`);
    if (props.id) {
      server_calls.update(props.id!, data)
      console.log(`Updated: ${data} ${props.id}`)
      setTimeout(() => {window.location.reload(), 1000});
      event.target.reset()
    } else {
      // use dispatch to update our state in our store
      dispatch(chooseName(data.name));
      dispatch(chooseEmail(data.email));
      dispatch(choosePhone(data.phone_number));
      dispatch(chooseAddress(data.address));

      server_calls.create(store.getState())
      setTimeout(() => {window.location.reload(), 1000});
    }
  }
  
  return (

    // TODO - add handle function
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">
            contact name
          </label>
          <Input {...register('name')} name='name' placeholder="Name"></Input>
        </div>
        <div>
          <label htmlFor="email">
            email
          </label>
          <Input {...register('email')} name='email' placeholder="Email"></Input>
        </div>
        <div>
          <label htmlFor="phone_number">
            contact name
          </label>
          <Input {...register('phone_number')} name='phone_number' placeholder="Phone Number"></Input>
        </div>
        <div>
          <label htmlFor="address">
            address
          </label>
          <Input {...register('address')} name='address' placeholder="Address"></Input>
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