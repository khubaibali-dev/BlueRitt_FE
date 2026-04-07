import React, { useState } from "react";
import { Headphones, Paperclip, Send, Bot } from "lucide-react";
import InputField from "../../components/common/input/InputField";
import SelectField from "../../components/common/select/SelectField";

const HelpSupportPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });

  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name || e.target.id;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Support Request Submitted", formData, fileName);
    // Add API logic here
  };

  return (
    <div className="help-page-container">
      {/* Header Section */}
      <div className="help-header-section">
        <h1 className="help-title">Need Assistance? Reach Out Here</h1>
        <p className="help-subtitle mt-1">
          Fill out the form below, and our support team will get back to you within 24 hours. For faster resolution,
          include details like error messages, account ID, or steps to reproduce the issue.
        </p>
      </div>

      {/* Form Card */}
      <div className="help-form-card">
        {/* Form Header */}
        <div className="help-form-header">
          <div className="tool-icon-container ">
            <Headphones size={24} className="text-brand-primary dark:text-white" />
          </div>
          <div>
            <h2 className="help-card-title">Contact Support</h2>
            <p className="help-card-subtitle">
              Fill out the form below, and our support team will get back to you within 24 hours.
            </p>
          </div>
        </div>

        {/* The Form */}
        <form onSubmit={handleSubmit} className="help-form-body">
          {/* Row 1: Name */}
          <div className="help-input-row">
            <InputField
              id="firstName"
              label="First Name"
              placeholder="Ahmed"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <InputField
              id="lastName"
              label="Last Name"
              placeholder="Ali"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <InputField
            id="email"
            type="email"
            label="Email"
            placeholder="Ahmad"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Subject */}
          <InputField
            id="subject"
            label="Subject/Topic"
            placeholder="reverce94@yopmail.com"
            value={formData.subject}
            onChange={handleChange}
          />

          {/* Category */}
          <SelectField
            id="category"
            label="Category / Type of issue"
            options={[
              { label: "Billing", value: "billing" },
              { label: "Technical Issue", value: "technical" },
              { label: "Account Management", value: "account" },
              { label: "Other", value: "other" },
            ]}
            value={formData.category}
            onChange={(val) => setFormData((prev) => ({ ...prev, category: val }))}
            placeholder="Please choose an option"
            required
          />

          {/* Attachments */}
          <div className="help-input-group">
            <label className="help-label">Attachments (Optional)</label>
            <label className="help-file-wrapper" htmlFor="attachments">
              <input
                type="file"
                id="attachments"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="help-file-inner">
                <Paperclip size={18} className="text-slate-400 shrink-0" />
                <span className="help-file-text truncate">
                  {fileName ? fileName : "No file chosen"}
                </span>
              </div>
            </label>
          </div>

          {/* Description */}
          <div className="help-input-group mb-8">
            <label className="help-label" htmlFor="message">Description / Message</label>
            <textarea
              id="message"
              name="message"
              className="help-textarea"
              placeholder="Type your message here..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-fit px-8 sm:px-12 mt-4 text-white py-3.5 sm:py-4 !rounded-full text-[13px] sm:text-[14px] font-semibold transition-transform hover:scale-[1.02] flex items-center justify-center gap-2.5 shadow-lg active:scale-95 border-none bg-brand-gradient"
          >
            <Send size={16} />
            Send Message
          </button>
        </form>
      </div>

      {/* Floating Chatbot */}
      <div className="chatbot-floating-wrapper">
        <div className="chatbot-tooltip">
          Chatbot AI
        </div>
        <button className="chatbot-btn">
          <Bot size={28} className="text-white" />
          <span className="chatbot-status-dot border-[#0F172A] dark:border-[#0F172A]" />
        </button>
      </div>
    </div>
  );
};

export default HelpSupportPage;
