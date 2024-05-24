import { useEffect, useState } from 'react';
import { getCourses } from './api/api';
import { Course } from '../pages/types/types';
import Image from 'next/image';

const HomePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getCourses();
      setCourses(data);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 h-screen items-center flex flex-wrap justify-center">
      <h5 className="text-2xl">
        <b className="text-red-700">
          <span>Bem-vindo</span>
        </b>
        <span className="font-Verdana text-gray-700"> a</span>
        <b className="text-gray-700"> Plataforma LMS </b>
        <span className="font-Verdana text-gray-700"> da</span>
        <span className="text-gray-600"> ead</span>
        <span className="font-Verdana text-gray-700"> skill</span>
        <span className="font-Verdana text-gray-700"> creative learning!</span>
      </h5>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-4">
        {currentCourses.map((course) => (
          <div key={course.id} className="card cursor-pointer overflow-hidden rounded h-64 w-80 bg-zinc-100 p-4 shadow flex flex-col group relative">
            <div className="card-content flex flex-col justify-center items-center group-hover:opacity-75">
              <h2 className="card-title text-base font-medium">{course.fullname}</h2>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/images/curso-point.png" 
                  height={80} 
                  width={80}
                  alt="image-course"
                  />
               </div>
            </div>
            <p className="card-summary mt-auto text-gray-800 truncate">
              {course.summary.replace(/<[^>]*>/g, '') || "Em Processo..."}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 pb-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded-2xl disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={endIndex >= courses.length}
          className="px-4 py-2 mx-1 bg-green-400 text-gray-700 rounded-2xl disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default HomePage;
