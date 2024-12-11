import { Button, Input } from '@material-tailwind/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import {useForm} from 'react-hook-form'
import { data, useNavigate } from 'react-router-dom'
import { instance } from '../../Utils/axios'
const Create = () => {
  const queryClient = useQueryClient()
  const nav = useNavigate()
  const handlePost = async (data) => {
    try{
      const response = await instance.post('/films', data)
      console.log(response.data);
      
    }catch(error){
      console.log(error.message);
      
    }
  }
  const mutation = useMutation({
    mutationFn: handlePost,
    onSuccess: (data) => {
      console.log("Successfully posted:", data);
      nav('/films')
      queryClient.invalidateQueries(["getFilms"])
    },
    onError:(error) => {
      console.log("Error occured", error.message);
      
    }
  })
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    mutation.mutate(data)
  }

  console.log(watch("example"))

  return (
    <form
      className="w-1/4 mx-auto py-20 flex flex-col gap-4 justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="text"
        {...register("title", { required: "Title is required" })}
        label="Title"
      />
      {errors.title && <span className="text-red-500">{errors.title.message}</span>}

      <Input
        type="text"
        {...register("image", { required: "Image URL is required" })}
        label="Image"
      />
      {errors.imgURL && <span className="text-red-500">{errors.imgURL.message}</span>}

      <Input
        type="text"
        {...register("desc", { required: "Description is required" })}
        label="Description"
      />
      {errors.desc && <span className="text-red-500">{errors.desc.message}</span>}

      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  )
  
}

export default Create
