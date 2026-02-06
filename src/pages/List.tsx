import { useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
type Movies = {
  id: number;
  title: string;
  poster?: string;
  duration: number;
  category: string;
};
function ListPage() {
  const [movies, setMovies] = useState<Movies[]>([]);

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/movies");
        setMovies(data);
      } catch (error) {

      }
    };
    getAllMovies();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      if (confirm("Xoa")) {
        await axios.delete(`http://localhost:3000/movies/${id}`);
        setMovies(movies.filter((movies) => movies.id !== id));
        toast.success("xoa thanh cong");
      }
    } catch (error) {
      toast.error("Call api loix");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Name
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Giá vé
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Hinh anh
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {movies.map((movies) => (
              <tr key={movies.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{movies.id}</td>
                <td className="px-4 py-2 border border-gray-300">{movies.title}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <img
                    src={movies.poster}
                      className="px-4 py-2 border border-gray-300"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">{movies.duration}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <button onClick={() => handleDelete(movies.id)} className="px-4 py-2 border border-gray-300" >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
