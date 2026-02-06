import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface MovieForm {
  title: string;
  poster: string;
  category: string;
  duration: number;
}

const validate = z.object({
  title: z.string().min(3, "Tên phim ít nhất 3 ký tự"),
  poster: z.string().min(3, "Đường dẫn poster ít nhất 3 ký tự"),
  duration: z.number().min(50, "Thời lượng phim nhiều hơn 50 phút"),
  category: z.string().min(1, "Vui lòng chọn 1 danh mục"),
});

function AddPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovieForm>({
    resolver: zodResolver(validate),
    defaultValues: {
      title: "",
      poster: "",
      category: "",
      duration: 0,
    },
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/movies/${id}`
        );
        reset({
          title: data.title,
          poster: data.poster,
          category: data.category,
          duration: data.duration,
        });
      } catch {
        toast.error("Không tải được dữ liệu phim!");
      }
    })();
  }, [id, reset]);

  const onSubmit = async (formData: MovieForm) => {
    try {
      if (id) {
        await axios.put(
          `http://localhost:3000/movies/${id}`,
          formData
        );
        toast.success("Cập nhật phim thành công");
      } else {
        await axios.post(
          "http://localhost:3000/movies",
          formData
        );
        toast.success("Thêm mới phim thành công");
      }
      navigate("/list");
    } catch {
      toast.error("Đã xảy ra lỗi!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        {id ? "Cập nhật phim" : "Thêm mới phim"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-xl mx-auto bg-white p-6 shadow rounded-lg"
      >
        <div>
          <label className="block font-medium mb-1">Tên phim</label>
          <input
            {...register("title")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">
              {errors.title.message}
            </span>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Link ảnh</label>
          <input
            {...register("poster")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.poster && (
            <span className="text-red-500 text-sm">
              {errors.poster.message}
            </span>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Thời lượng (phút)</label>
          <input
            type="number"
            {...register("duration", { valueAsNumber: true })}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.duration && (
            <span className="text-red-500 text-sm">
              {errors.duration.message}
            </span>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Thể loại</label>
          <select
            {...register("category")}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">-- Chọn thể loại --</option>
            <option value="Hành động">Hành động</option>
            <option value="Tình cảm">Tình cảm</option>
            <option value="Kinh dị">Kinh dị</option>
            <option value="Hài">Hài</option>
            <option value="Hoạt hình">Hoạt hình</option>
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {id ? "Lưu thay đổi" : "Thêm phim"}
        </button>
      </form>
    </div>
  );
}

export default AddPage;