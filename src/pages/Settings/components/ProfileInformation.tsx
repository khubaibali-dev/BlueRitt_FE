// src/pages/Settings/components/ProfileInformation.tsx
import React, { useState } from "react";
import { User } from "lucide-react";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";
import InputField from "../../../components/common/input/InputField";
import CountrySelect, { countries, Country } from "../../../components/common/select/CountrySelect";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  contactNumber: string;
}

const ProfileInformation: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileFormData>({
    firstName: "Ali",
    lastName: "Ahmad",
    email: "reverce94@yopmail.com",
    country: "Pakistan",
    contactNumber: "123 4567 890",
  });

  const handleChange = (field: keyof ProfileFormData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving Profile...", profileData);
  };

  return (
    <CollapsibleCard
      title="Profile Information"
      subtitle="Update your personal details"
      defaultOpen={true}
      icon={<User size={24} className="text-white" />}
    >
      <div className="flex flex-col gap-6">
        {/* Top Row: First Name, Last Name, Email */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            id="firstName"
            label="First Name"
            placeholder="Ali"
            value={profileData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <InputField
            id="lastName"
            label="Last Name"
            placeholder="Ahmad"
            value={profileData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
          <InputField
            id="email"
            type="email"
            label="Email"
            placeholder="reverce94@yopmail.com"
            value={profileData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        {/* Bottom Row: Country & Contact Number */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CountrySelect
            label="Country"
            value={profileData.country}
            onChange={(country) => handleChange("country", country.name)}
            direction="down"
          />

          <InputField
            id="contactNumber"
            label="Contact Number"
            placeholder="xxx xxxx xxx"
            prefix={countries.find((c: Country) => c.name === profileData.country)?.dialCode}
            value={profileData.contactNumber}
            onChange={(e) => handleChange("contactNumber", e.target.value)}
          />

          <div className="hidden md:block">{/* Empty space for 3rd column */}</div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleSave}
            className="bg-brand-gradient text-white px-10 py-2 sm:py-2 rounded-full text-[14px] font-semibold transition-transform hover:scale-[1.02] shadow-lg active:scale-95 border-none"
          >
            Save
          </button>
        </div>
      </div>
    </CollapsibleCard>
  );
};

export default ProfileInformation;
