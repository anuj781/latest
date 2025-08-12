import React, { useState } from 'react';

const Form = () => {
  const [details, setDetails] = useState({
    name: '',
    mobile: '',
    purpose: '',
  });

  const [checkedServices, setCheckedServices] = useState({
    socialMedia: false,
    website: false,
    digitalMarketing: false,
    consultancy: false,
  });

  const allSelected = Object.values(checkedServices).every(Boolean);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  // Handle text inputs
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
    setResponseMsg('');
  };

  // Handle checkbox changes
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCheckedServices((prev) => ({ ...prev, [name]: checked }));
    setResponseMsg('');
  };

  // Select/Deselect all checkboxes
  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setCheckedServices({
      socialMedia: checked,
      website: checked,
      digitalMarketing: checked,
      consultancy: checked,
    });
    setResponseMsg('');
  };

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedServices = Object.entries(checkedServices)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    if (!details.name || !details.mobile || !details.purpose) {
      alert("Please fill in all required fields.");
      return;
    }

    // Mobile validation
    if (!/^\d{10}$/.test(details.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    const finalData = { ...details, services: selectedServices };

    try {
      setLoading(true);
      setResponseMsg('');

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/enquiry/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResponseMsg('Enquiry submitted successfully!');
        setDetails({ name: '', mobile: '', purpose: '' });
        setCheckedServices({
          socialMedia: false,
          website: false,
          digitalMarketing: false,
          consultancy: false,
        });
      } else {
        setResponseMsg(data.msg || 'Something went wrong!');
      }
    } catch (err) {
      console.error(err);
      setResponseMsg('Server error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-amber-300 h-fit w-[600px] mt-5 flex flex-col p-5 justify-evenly gap-3"
      >
        <label>
          Name:
          <input
            value={details.name}
            onChange={handleChanges}
            name="name"
            type="text"
            className="bg-white rounded-md border-2 border-black w-full"
            required
          />
        </label>

        <label>
          Mobile No:
          <input
            value={details.mobile}
            onChange={handleChanges}
            name="mobile"
            type="tel"
            className="bg-white rounded-md border-2 border-black w-full"
            required
          />
        </label>

        <label>
          Purpose of Enquiry:
          <textarea
            value={details.purpose}
            onChange={handleChanges}
            name="purpose"
            className="bg-white rounded-md border-2 border-black w-full"
            required
          />
        </label>

        {/* Service checkboxes */}
        {['socialMedia', 'website', 'digitalMarketing', 'consultancy'].map((service) => (
          <div key={service}>
            <input
              type="checkbox"
              className="mr-2"
              name={service}
              checked={checkedServices[service]}
              onChange={handleChange}
            />
            <label className="capitalize">{service.replace(/([A-Z])/g, ' $1')}</label>
          </div>
        ))}

        {/* Select All */}
        <div>
          <input
            type="checkbox"
            className="mr-2"
            checked={allSelected}
            onChange={handleSelectAll}
          />
          <label>All Above</label>
        </div>

        <button
          type="submit"
          className="border-2 border-black mt-3 px-4 py-2 bg-white rounded-md cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {responseMsg && (
          <p
            className={`mt-2 font-semibold text-center ${
              responseMsg.includes('successfully') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {responseMsg}
          </p>
        )}
      </form>
    </div>
  );
};

export default Form;
