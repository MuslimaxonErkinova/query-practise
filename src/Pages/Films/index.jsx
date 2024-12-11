import { Button } from "@material-tailwind/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { instance } from "../../Utils/axios";
import { toast } from "react-toastify";

const Films = () => {
  const queryClient = useQueryClient();

  const handleGet = async () => {
    const response = await instance.get("/films");
    return response.data;
  };

  const handleDelete = async (id) => {
    const response = await instance.delete(`/films/${id}`);
    return response;
  };

  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries(["getFilms"]);
    },
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["getFilms"],
    queryFn: handleGet,
  });

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
    <div className="py-10 flex justify-center items-center flex-wrap gap-4">
      {data?.map((film) => (
        <div
          key={film.id}
          className="border-red-300 p-2 border-2 flex flex-col text-center gap-2 py-2 w-1/5 items-center"
        >
          <h1 className="text-lg font-bold text-red-500">{film?.title}</h1>
          <img width={200} src={film.image} alt="" />
          <p className="text-gray-600">{film?.desc}</p>
          <div className="flex items-center justify-center gap-2">
            <Link to={`/films/${film?.id}`}>
              <Button>Update</Button>
            </Link>
            <Button
              onClick={() => {
                mutation.mutate(film.id);
                toast.dark("Successfully deleted");
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Films;
