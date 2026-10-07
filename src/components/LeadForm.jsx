import { useState } from "react";

function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a valid 10-digit Indian phone number";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Lead submitted:", formData);

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-4">
        <p className="font-semibold text-green-800">
          Thanks, {formData.name}! 🎉
        </p>

        <p className="mt-1 text-sm text-green-700">
          Our sales team will contact you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900">
          Connect with Sales
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          Leave your details and our sales team will get in touch.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-xs font-medium text-gray-700"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {errors.name && (
            <p className="mt-1 text-xs text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-xs font-medium text-gray-700"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-1 block text-xs font-medium text-gray-700"
          >
            Phone Number
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit phone number"
            maxLength={10}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">
              {errors.phone}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default LeadForm;