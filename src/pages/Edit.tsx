import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

type Movie = {
  id: number;
  title: string;
  poster: string;
  duration: number;
  category: string;
};

function EditPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const { register, handleSubmit, reset } = useForm<Movie>();

  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/movies/${id}`
      );
      reset(data);
    };
    getMovie();
  }, [id, reset]);

  const onSubmit = async (data: Movie) => {
    await axios.put(`http://localhost:3000/movies/${id}`, data);
    nav("/list");
  };

  return (
    <div>
      <h1>Cập nhật phim</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("title")} placeholder="Tên phim" />
        <br />

        <input {...register("poster")} placeholder="Link ảnh" />
        <br />

        <input
          type="number"
          {...register("duration")}
          placeholder="Thời lượng"
        />
        <br />

        <input {...register("category")} placeholder="Thể loại" />
        <br />

        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
}

export default EditPage;