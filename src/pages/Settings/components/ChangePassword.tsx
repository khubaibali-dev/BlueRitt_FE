// src/pages/Settings/components/ChangePassword.tsx
import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";
import InputField from "../../../components/common/input/InputField";

const ChangePassword: React.FC = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    console.log("Updating password...", passwords);
    // Add logic for password update API call
  };

  return (
    <CollapsibleCard
      title="Change Password"
      subtitle="Update your security credentials"
      defaultOpen={false}
      icon={<Lock size={24} className="text-white" />}
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            id="currentPassword"
            label="Current Password"
            type={showPasswords.current ? "text" : "password"}
            placeholder="••••••••"
            value={passwords.currentPassword}
            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
            rightElement={
              <button
                type="button"
                onClick={() => toggleVisibility("current")}
                className="text-brand-textSecondary hover:text-white transition-colors p-1"
                aria-label={showPasswords.current ? "Hide password" : "Show password"}
              >
                {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
          <InputField
            id="newPassword"
            label="New Password"
            type={showPasswords.new ? "text" : "password"}
            placeholder="••••••••"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
            rightElement={
              <button
                type="button"
                onClick={() => toggleVisibility("new")}
                className="text-brand-textSecondary hover:text-white transition-colors p-1"
                aria-label={showPasswords.new ? "Hide password" : "Show password"}
              >
                {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
          <InputField
            id="confirmPassword"
            label="Confirm New Password"
            type={showPasswords.confirm ? "text" : "password"}
            placeholder="••••••••"
            value={passwords.confirmPassword}
            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
            rightElement={
              <button
                type="button"
                onClick={() => toggleVisibility("confirm")}
                className="text-brand-textSecondary hover:text-white transition-colors p-1"
                aria-label={showPasswords.confirm ? "Hide password" : "Show password"}
              >
                {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
        </div>

        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={handleSave}
            className="bg-brand-gradient text-white px-10 py-2 rounded-full text-[14px] font-semibold transition-transform hover:scale-[1.02] shadow-lg active:scale-95 border-none"
          >
            Save
          </button>
        </div>
      </div>
    </CollapsibleCard>
  );
};

export default ChangePassword;
