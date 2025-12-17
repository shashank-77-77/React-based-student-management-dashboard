/ src/hooks/useStudents.js
import { useState, useEffect } from 'react';
import { fetchStudents, addStudent } from '../services/students';

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
//update
    loadStudents();
  }, []);

  const createStudent = async (studentData) => {
    try {
      const newStudent = await addStudent(studentData);
      setStudents([...students, newStudent]);
      return newStudent;
    } catch (err) {
      throw err;
    }
  };

  return { students, loading, error, createStudent };
}
