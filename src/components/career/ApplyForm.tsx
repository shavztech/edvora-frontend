
"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  MapPin,
  Upload,
  BookOpen,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function ApplyForm() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "",
    subject: "",
    experience: "",
    city: "",
    workMode: "",
    about: "",
    resume: null as File | null,
    agree: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData({
        ...formData,
        resume: e.target.files[0],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section
      id="apply-form"
      className="relative py-4 lg:py-7 overflow-hidden"
    >
      {/* Background */}

      <div className="absolute -left-40 top-0 w-[450px] h-[450px] rounded-full bg-primary/10 blur-[150px]" />

      <div className="absolute -right-40 bottom-0 w-[450px] h-[450px] rounded-full bg-secondary/10 blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto mb-10">

          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-3">

            APPLY NOW

          </span>

          <h2 className="text-4xl md:text-5xl font-[950] text-navy leading-tight ">
  Become An<br />
  <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
    Edvora Educator
  </span>
</h2>

          <p className="mt-3 mb-2 text-lg text-slate-600">

            Fill in your details below. Our recruitment team will review
            your application and get back to you shortly.

          </p>

        </div>

        <div className="flex flex-col items-center gap-8 ">

          {/* FORM */}

          <div className="mx-auto max-w-4xl">

            <form
              onSubmit={handleSubmit}
              className="rounded-[36px] bg-white border border-slate-100 shadow-[0_20px_70px_rgba(59,111,182,.08)] p-8 md:p-10"

            >

              {/* Name */}

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label className="font-semibold text-slate-700">

                    Full Name

                  </label>

                  <div className="mt-2 relative">

                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                      size={20}
                    />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full rounded-2xl border border-slate-200 pl-12 pr-4 py-4 outline-none focus:border-primary"
                      required
                    />

                  </div>

                </div>

                <div>

                  <label className="font-semibold text-slate-700">

                    Email Address

                  </label>

                  <div className="mt-2 relative">

                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                      size={20}
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className="w-full rounded-2xl border border-slate-200 pl-12 pr-4 py-4 outline-none focus:border-primary"
                      required
                    />

                  </div>

                </div>

              </div>

            
              {/* Phone & Qualification */}

              <div className="grid md:grid-cols-2 gap-6 mt-6">

                <div>

                  <label className="font-semibold text-slate-700">
                    Phone Number
                  </label>

                  <div className="mt-2 relative">

                    <Phone
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                      size={20}
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="w-full rounded-2xl border border-slate-200 pl-12 pr-4 py-4 outline-none focus:border-primary"
                      required
                    />

                  </div>

                </div>

                <div>

                  <label className="font-semibold text-slate-700">
                    Qualification
                  </label>

                  <div className="mt-2 relative">

                    <GraduationCap
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                      size={20}
                    />

                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      placeholder="B.Ed / M.Ed / MSc..."
                      className="w-full rounded-2xl border border-slate-200 pl-12 pr-4 py-4 outline-none focus:border-primary"
                      required
                    />

                  </div>

                </div>

              </div>

              {/* Subject & Experience */}

              <div className="grid md:grid-cols-2 gap-6 mt-6">

                <div>

                  <label className="font-semibold text-slate-700">
                    Subject Applying For
                  </label>

                  <div className="mt-2 relative">

                    <BookOpen
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                      size={20}
                    />

                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 pl-12 pr-4 py-4 outline-none focus:border-primary"
                      required
                    >
                      <option value="">Select Subject</option>
                      <option>Mathematics</option>
                      <option>Science</option>
                      <option>English</option>
                      <option>Malayalam</option>
                      <option>Social Science</option>
                      <option>Computer Science</option>
                    </select>

                  </div>

                </div>

                <div>

                  <label className="font-semibold text-slate-700">
                    Experience
                  </label>

                  <div className="mt-2 relative">

                    <Briefcase
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                      size={20}
                    />

                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 pl-12 pr-4 py-4 outline-none focus:border-primary"
                      required
                    >
                      <option value="">Select Experience</option>
                      <option>Fresher</option>
                      <option>1-2 Years</option>
                      <option>3-5 Years</option>
                      <option>5-10 Years</option>
                      <option>10+ Years</option>
                    </select>

                  </div>

                </div>

              </div>

              {/* City & Work Mode */}

              <div className="grid md:grid-cols-2 gap-6 mt-6">

                <div>

                  <label className="font-semibold text-slate-700">
                    Current City
                  </label>

                  <div className="mt-2 relative">

                    <MapPin
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                      size={20}
                    />

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Your City"
                      className="w-full rounded-2xl border border-slate-200 pl-12 pr-4 py-4 outline-none focus:border-primary"
                      required
                    />

                  </div>

                </div>

                <div>

                  <label className="font-semibold text-slate-700">
                    Preferred Work Mode
                  </label>

                  <select
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-primary"
                    required
                  >
                    <option value="">Select</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                  </select>

                </div>

              </div>

              {/* About */}

              <div className="mt-6">

                <label className="font-semibold text-slate-700">
                  Tell Us About Yourself
                </label>

                <textarea
                  rows={5}
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Briefly introduce yourself..."
                  className="mt-2 w-full rounded-2xl border border-slate-200 p-5 outline-none resize-none focus:border-primary"
                />

              </div>

              {/* Resume */}

              <div className="mt-6">

                <label className="font-semibold text-slate-700">
                  Upload Resume
                </label>

                <label className="mt-2 flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 hover:bg-primary/10 transition-all">

                  <div className="text-center">

                    <Upload
                      className="mx-auto text-primary"
                      size={34}
                    />

                    <p className="mt-3 font-semibold text-primary">
                      {formData.resume
                        ? formData.resume.name
                        : "Click to Upload Resume"}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      PDF / DOC / DOCX
                    </p>

                  </div>

                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFile}
                  />

                </label>

              </div>
              

    
              {/* Terms & Conditions */}

              <div className="mt-8">

                <label className="flex items-start gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 accent-green-600"
                    required
                  />

                  <span className="text-slate-600 leading-relaxed">
                    I agree to the Edvora recruitment process and consent
                    to my information being used for hiring purposes.
                  </span>

                </label>

              </div>

              {/* Submit */}

              <div className="mt-10">

                <button
                  type="submit"
                   className="w-full rounded-2xl bg-primary py-4 text-lg font-bold text-white shadow-[0_15px_40px_rgba(59,111,182,.30)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(59,111,182,.40)] transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Send size={20} />
                  Submit Application
                </button>

              </div>

              {/* Success Message */}

              {submitted && (

                <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">

                      <CheckCircle2
                        className="text-white"
                        size={28}
                      />

                    </div>

                    <div>

                      <h3 className="text-xl font-bold text-green-700">
                        Application Submitted Successfully!
                      </h3>

                      <p className="text-green-600 mt-1">
                        Thank you for applying to Edvora. Our recruitment
                        team will review your application and contact you
                        soon.
                      </p>

                    </div>

                  </div>

                </div>

              )}

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}


