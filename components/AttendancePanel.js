"use client"
import { useState, useEffect } from 'react';

export default function AttendancePanel({ classes = [], subjects = [], students = [], currentUser = { id: '2', role: 'admin' } }) {
  const [classId, setClassId] = useState(classes[0]?.id || '');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setList(students.filter(s => !classId || s.classId === classId));
  }, [classId, students]);

  const recordStatus = async (studentId, status) => {
    setLoading(true);
    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, classId, subjectId, date, status, recordedBy: currentUser.id })
      });
      if (res.status === 201) {
        setList(prev => prev.map(p => p.id === studentId ? { ...p, _attendance: status } : p));
      } else if (res.status === 409) {
        const body = await res.json();
        alert(body.error || 'Duplicate');
      } else {
        const body = await res.json();
        alert(body.error || 'Error saving');
      }
    } catch (e) {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-3 mb-4">
        <select className="border rounded p-2" value={classId} onChange={e=>setClassId(e.target.value)}>
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select className="border rounded p-2" value={subjectId} onChange={e=>setSubjectId(e.target.value)}>
          {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <input className="border rounded p-2" type="date" value={date} onChange={e=>setDate(e.target.value)} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Roll</th>
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map(st => (
              <tr key={st.id} className="hover:bg-gray-50">
                <td className="p-2 border">{st.roll}</td>
                <td className="p-2 border">{st.name}</td>
                <td className="p-2 border">
                  <div className="flex gap-2">
                    <button disabled={loading} onClick={()=>recordStatus(st.id,'Present')} className={`px-2 py-1 rounded ${st._attendance==='Present' ? 'bg-green-500 text-white' : 'bg-white border'}`}>Present</button>
                    <button disabled={loading} onClick={()=>recordStatus(st.id,'Absent')} className={`px-2 py-1 rounded ${st._attendance==='Absent' ? 'bg-red-500 text-white' : 'bg-white border'}`}>Absent</button>
                    <button disabled={loading} onClick={()=>recordStatus(st.id,'Late')} className={`px-2 py-1 rounded ${st._attendance==='Late' ? 'bg-yellow-400 text-black' : 'bg-white border'}`}>Late</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
