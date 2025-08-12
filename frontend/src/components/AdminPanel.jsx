import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL; // ✅ Use env var for backend

  // Fetch all enquiries
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/enquiry/all`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      setEnquiries(data);
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
      setMessage('Failed to load enquiries.');
    } finally {
      setLoading(false);
    }
  };

  // Send all enquiries to Gmail via backend endpoint
  const sendAllToGmail = async () => {
    try {
      const res = await fetch(`${API_URL}/enquiry/send-email`, {
        method: 'POST',
      });

      const data = await res.json();
      setMessage(data.msg || 'Email process completed.');
      alert(data.msg || 'Email process completed.');
    } catch (err) {
      console.error('Failed to send email:', err);
      setMessage('Failed to send emails.');
      alert('Failed to send emails.');
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  if (loading) return <p className="p-5 text-lg font-semibold">Loading enquiries...</p>;

  return (
    <div className="p-5">
      {/* Header Section */}
      <div className="flex items-center w-[90vw] justify-between mb-4">
        <h2 className="text-2xl font-bold">All Enquiries</h2>
        <button
          onClick={sendAllToGmail}
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600"
        >
          Send All to Gmail
        </button>
      </div>

      {/* Show feedback message */}
      {message && <p className="mb-3 font-semibold text-blue-600">{message}</p>}

      {/* Table */}
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Mobile</th>
            <th className="border px-4 py-2">Purpose</th>
            <th className="border px-4 py-2">Services</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.length > 0 ? (
            enquiries.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.mobile}</td>
                <td className="border px-4 py-2">{item.purpose}</td>
                <td className="border px-4 py-2">
                  {Array.isArray(item.services) ? item.services.join(', ') : ''}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border px-4 py-2 text-gray-500">
                No enquiries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
