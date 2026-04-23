// src/pages/Settings/components/ChangePassword.tsx
import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";
import InputField from "../../../components/common/input/InputField";

import { updatePassword } from "../../../api/auth";
import { useToast } from "../../../components/common/Toast/ToastContext";

import { useFormik } from "formik";
import * as Yup from "yup";

interface ChangePasswordProps {
  defaultOpen?: boolean;
  scrollIntoViewOnOpen?: boolean;
}

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const ChangePassword: React.FC<ChangePasswordProps> = ({ defaultOpen = false, scrollIntoViewOnOpen = false }) => {
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSaving(true);
        await updatePassword({
          current_password: values.currentPassword,
          new_password: values.newPassword,
          confirm_password: values.confirmPassword,
        });

        toast.success("Password updated successfully!");

        // Clear form on success
        formik.resetForm();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to update password. Please check your current password.");
      } finally {
        setIsSaving(false);
      }
    },
  });

  return (
    <CollapsibleCard
      title="Change Password"
      subtitle="Update your security credentials"
      defaultOpen={defaultOpen}
      scrollIntoViewOnOpen={scrollIntoViewOnOpen}
      icon={<Lock size={24} className="text-white" />}
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            id="currentPassword"
            required
            label="Current Password"
            autoComplete="current-password"
            type={showPasswords.current ? "text" : "password"}
            placeholder="••••••••"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            error={formik.touched.currentPassword ? formik.errors.currentPassword : undefined}
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
            required
            label="New Password"
            autoComplete="new-password"
            type={showPasswords.new ? "text" : "password"}
            placeholder="••••••••"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={formik.touched.newPassword ? formik.errors.newPassword : undefined}
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
            required
            label="Confirm New Password"
            autoComplete="new-password"
            type={showPasswords.confirm ? "text" : "password"}
            placeholder="••••••••"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword ? formik.errors.confirmPassword : undefined}
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
            type="submit"
            disabled={isSaving}
            className={`bg-brand-gradient text-white px-10 py-2 rounded-full text-[14px] font-semibold transition-transform hover:scale-[1.02] shadow-lg active:scale-95 border-none ${isSaving ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {isSaving ? "Updating..." : "Save"}
          </button>
        </div>
      </form>
    </CollapsibleCard>
  );
};

export default ChangePassword;
