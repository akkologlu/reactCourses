import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Courses from './Courses';
import Loading from './Loading';
function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true)
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/courses");
      setCourses(response.data);
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
    }

  }

  const removeOneCourse = (id) => {
    const updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
  }

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div className="App">
      {
        loading ? (
          <Loading />
        ) : (
          <>
            {courses.length === 0 ? (
              <div className='refreshDiv'>
                <h2>You deleted all courses!</h2>
                <button onClick={fetchCourses} className='cardDeleteBtn'>Refresh</button>
              </div>
            ) : (<Courses courses={courses} removeOneCourse={removeOneCourse} />)}
          </>
        )
      }

    </div>
  );
}

export default App;
