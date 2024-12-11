import React from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'
import { instance } from '../../Utils/axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { Button, Input } from '@material-tailwind/react'

const Update = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const {id} = useParams()
  const nav = useNavigate()
  const handleGetId = async () => {
    const responce = await instance.get(`/films/${id}`)
    return responce.data
  }
  const handlePut = async (data) => {
    const responce = await instance.put(`/films/${id}`, data)
    return responce;
  }
  const mutation = useMutation ({
    mutationFn: handlePut,
    onSuccess: () => {
      nav('/films')
      toast.dark('Successfully updated')
    }
  })
  const {isLoading, error, data} = useQuery({
    queryKey: ['getNewId'],
    queryFn: handleGetId,
  })
  const onSubmit = (data) =>{
    mutation.mutate(data)
  }

  if (isLoading)
    return (
      <div className="text-center flex items-center justify-center text-blue-500">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  return (
    
    <form
    className="w-1/4 mx-auto py-20 flex flex-col gap-4 justify-center items-center"
    onSubmit={handleSubmit(onSubmit)}
  >
    <Input
    defaultValue={data?.title}
      type="text"
      {...register("title", { required: "Title is required" })}
      label="Title"
    />

    <Input
      type="text"
      defaultValue={data?.imgURL}
      {...register("image", { required: "Image URL is required" })}
      label="Image"
    />
    <Input
    defaultValue={data?.desc}
      type="text"
      {...register("desc", { required: "Description is required" })}
      label="Description"
    />

    <Button type="submit" className="mt-4">
      Create
    </Button>
  </form>
  )
}

export default Update
