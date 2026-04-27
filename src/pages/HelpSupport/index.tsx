import PageHeader from "../../components/common/PageHeader/PageHeader";
import { Headphones, Paperclip, Send, Bot, Loader2 } from "lucide-react";
import InputField from "../../components/common/input/InputField";
import SelectField from "../../components/common/select/SelectField";
import tiktokBanner from "../../assets/images/tiktoktrends.png";
import socialpulseLight from "../../assets/images/SocialPulse-light.png";
import { useUserDetails } from "../../hooks/useUserDetails";
import { useEffect, useState } from "react";
import { createSupportTicket } from "../../api/support";
import { useToast } from "../../components/common/Toast/ToastContext";

const HelpSupportPage: React.FC = () => {
  const { data: userDetails } = useUserDetails();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });

  const [attachment, setAttachment] = useState<File | null>(null);

  // Pre-fill user details when available
  useEffect(() => {
    if (userDetails) {
      setFormData(prev => ({
        ...prev,
        name: userDetails.profile.full_name || "",
        email: userDetails.email || ""
      }));
    }
  }, [userDetails]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name || e.target.id;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    } else {
      setAttachment(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    try {
      setIsSubmitting(true);
      await createSupportTicket({
        ...formData,
        attachment: attachment || undefined
      });

      toast.success("Your support request has been sent successfully!");
      
      // Reset form (except name/email if user is logged in)
      setFormData(prev => ({
        ...prev,
        subject: "",
        category: "",
        message: ""
      }));
      setAttachment(null);
    } catch (error: any) {
      console.error("Support submission error:", error);
      toast.error(error?.response?.data?.message || "Failed to send support request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="help-page-container relative overflow-hidden bg-brand-card-alt rounded-[32px] flex flex-col w-full min-h-[600px] animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Banner Background - Direct child of card for full-width edge-to-edge look */}
      <div className="absolute top-0 left-0 right-0 h-[500px] z-0 pointer-events-none overflow-hidden isolate">
        <img src={tiktokBanner} alt="" className="tiktok-banner-image hidden dark:block" />
        <img src={socialpulseLight} alt="" className="tiktok-banner-image block dark:hidden" />
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-brand-card-alt via-brand-card-alt/40 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col w-full flex-1">
        <section className="relative min-h-[400px] flex flex-col pt-16 pb-4 px-1 sm:px-4">
          <PageHeader
            title="Need Assistance? Reach Out Here"
            subtitle="Fill out the form below, and our support team will get back to you within 24 hours. For faster resolution, include details like error messages, account ID, or steps to reproduce the issue."
            titleClassName="!font-normal !text-[24px]"
            subtitleClassName="mt-1"
          />
        </section>

        {/* Form Card positioned deep onto the banner image */}
        <div className="px-1 sm:px-4 relative z-20 -mt-40 sm:-mt-52">
          <div className="help-form-card !mx-0">
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
              <InputField
                id="name"
                label="Name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              {/* Email */}
              <InputField
                id="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              {/* Subject */}
              <InputField
                id="subject"
                label="Subject/Topic"
                placeholder="What is this regarding?"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              {/* Category */}
              <SelectField
                id="category"
                label="Category / Type of issue"
                options={[
                  { label: "Technical Issue", value: "technical" },
                  { label: "Billing & Payment", value: "billing" },
                  { label: "Add-ons", value: "add-ons" },
                  { label: "Subscription Plans", value: "subscription-plans" },
                  { label: "Account Login", value: "account" },
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
                    disabled={isSubmitting}
                  />
                  <div className="help-file-inner">
                    <Paperclip size={18} className="text-slate-400 shrink-0" />
                    <span className="help-file-text truncate">
                      {attachment ? attachment.name : "No file chosen"}
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
                disabled={isSubmitting}
                className={`w-full sm:w-fit px-8 sm:px-12 mt-4 text-white py-3.5 sm:py-4 !rounded-full text-[13px] sm:text-[14px] font-semibold transition-transform hover:scale-[1.02] flex items-center justify-center gap-2.5 shadow-lg active:scale-95 border-none bg-brand-gradient ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
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
      </div>
    </div>
  );
};

export default HelpSupportPage;
