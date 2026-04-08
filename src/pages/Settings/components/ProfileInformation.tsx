import React, { useState, useEffect } from "react";
import { User, Mail, Phone } from "lucide-react";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";
import InputField from "../../../components/common/input/InputField";
import SelectField from "../../../components/common/select/SelectField";
import { countries, CountryDisplay } from "../../../components/common/select/CountrySelect";
import { useAuth } from "../../../context/AuthContext";
import { updateUserProfile } from "../../../api/auth";
import { toast } from "react-toastify";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  contactNumber: string;
}

interface ProfileInformationProps {
  defaultOpen?: boolean;
}

const ProfileInformation: React.FC<ProfileInformationProps> = ({ defaultOpen = true }) => {
  const { currentUser, fetchUserDetails } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    contactNumber: "",
  });

  // Sync with current user data when it loads or changes
  useEffect(() => {
    if (currentUser.email) {
      setProfileData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        country: currentUser.country || "",
        contactNumber: currentUser.phone || "",
      });
    }
  }, [currentUser]);

  const handleChange = (field: keyof ProfileFormData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateUserProfile({
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        phone: profileData.contactNumber,
        country: profileData.country,
      });

      // Refresh user details globally
      await fetchUserDetails();

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <CollapsibleCard
      title="Profile Information"
      subtitle="Update your personal details"
      defaultOpen={defaultOpen}
      icon={<User size={24} className="text-brand-primary dark:text-white" />}
    >
      <div className="flex flex-col gap-6">
        {/* Top Row: First Name, Last Name, Email */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            id="firstName"
            label="First Name"
            placeholder="Enter first name"
            value={profileData.firstName}
            icon={User}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <InputField
            id="lastName"
            label="Last Name"
            placeholder="Enter last name"
            value={profileData.lastName}
            icon={User}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
          <InputField
            id="email"
            type="email"
            label="Email"
            placeholder="Enter email"
            value={profileData.email}
            readOnly={true}
            icon={Mail}
            onChange={() => { }} // Read-only but required by InputFieldProps
          />
        </div>

        {/* Bottom Row: Country & Contact Number */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SelectField
            id="country"
            label="Country"
            value={profileData.country}
            options={countries.map(c => ({ label: c.name, value: c.name }))}
            onChange={(val) => handleChange("country", val)}
            direction="down"
          />

          <InputField
            id="contactNumber"
            label="Contact Number"
            placeholder="xxx xxxx xxx"
            icon={Phone}
            prefix={countries.find((c: CountryDisplay) => c.name === profileData.country)?.dialCode}
            value={profileData.contactNumber}
            onChange={(e) => handleChange("contactNumber", e.target.value)}
          />

          <div className="hidden md:block">{/* Empty space for 3rd column */}</div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={`bg-brand-gradient text-white px-10 py-2 sm:py-2 rounded-full text-[14px] font-semibold transition-transform hover:scale-[1.02] shadow-lg active:scale-95 border-none ${isSaving ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </CollapsibleCard>
  );
};

export default ProfileInformation;
