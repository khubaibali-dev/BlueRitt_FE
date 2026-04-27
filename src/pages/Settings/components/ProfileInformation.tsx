import React, { useState } from "react";
import { User } from "lucide-react";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";
import InputField from "../../../components/common/input/InputField";
import SelectField from "../../../components/common/select/SelectField";
import { countries } from "../../../utils/Country";
import { useAuth } from "../../../context/AuthContext";
import { updateUserProfile } from "../../../api/auth";
import { useToast } from "../../../components/common/Toast/ToastContext";

import { useFormik } from "formik";
import * as Yup from "yup";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  contactNumber: string;
}

interface ProfileInformationProps {
  defaultOpen?: boolean;
  scrollIntoViewOnOpen?: boolean;
}

// Maps each country ISO code → standard local subscriber digit count
// (the digits the user types, not including the dial code)
const PHONE_LENGTH_MAP: Record<string, number> = {
  af: 9, al: 9, dz: 9, ad: 6, ao: 9, ag: 7, ar: 10, am: 8,
  au: 9, at: 10, az: 9, bs: 7, bh: 8, bd: 10, bb: 7, by: 9,
  be: 9, bz: 7, bj: 8, bt: 8, bo: 8, ba: 8, bw: 8, br: 11,
  bn: 7, bg: 9, bf: 8, bi: 8, cv: 7, kh: 9, cm: 9, ca: 10,
  cf: 8, td: 8, cl: 9, cn: 11, co: 10, km: 7, cg: 9, cr: 8,
  hr: 9, cu: 8, cy: 8, cz: 9, dk: 8, dj: 8, dm: 7, do: 10,
  ec: 9, eg: 10, sv: 8, gq: 9, er: 7, ee: 8, sz: 8, et: 9,
  fj: 7, fi: 10, fr: 9, ga: 7, gm: 7, ge: 9, de: 10, gh: 9,
  gr: 10, gd: 7, gt: 8, gn: 9, gw: 9, gy: 7, ht: 8, hn: 8,
  hu: 9, is: 7, in: 10, id: 11, ir: 10, iq: 10, ie: 9, il: 9,
  it: 10, jm: 7, jp: 10, jo: 9, kz: 10, ke: 9, ki: 8, kp: 8,
  kr: 10, xk: 8, kw: 8, kg: 9, la: 9, lv: 8, lb: 8, ls: 8,
  lr: 8, ly: 9, li: 7, lt: 8, lu: 9, mg: 9, mw: 9, my: 10,
  mv: 7, ml: 8, mt: 8, mh: 7, mr: 8, mu: 8, mx: 10, fm: 7,
  md: 8, mc: 8, mn: 8, me: 8, ma: 9, mz: 9, mm: 9, na: 9,
  nr: 7, np: 10, nl: 9, nz: 9, ni: 8, ne: 8, ng: 10, mk: 8,
  no: 8, om: 8, pk: 10, pw: 7, ps: 9, pa: 8, pg: 8, py: 9,
  pe: 9, ph: 10, pl: 9, pt: 9, qa: 8, ro: 9, ru: 10, rw: 9,
  kn: 7, lc: 7, vc: 7, ws: 7, sm: 8, st: 7, sa: 9, sn: 9,
  rs: 9, sc: 7, sl: 8, sg: 8, sk: 9, si: 8, sb: 7, so: 8,
  za: 9, ss: 9, es: 9, lk: 9, sd: 9, sr: 7, se: 9, ch: 9,
  sy: 9, tw: 9, tj: 9, tz: 9, th: 9, tl: 8, tg: 8, to: 7,
  tt: 7, tn: 8, tr: 10, tm: 8, tv: 6, ug: 9, ua: 9, ae: 9,
  gb: 10, us: 10, uy: 8, uz: 9, vu: 7, va: 10, ve: 10, vn: 9,
  ye: 9, zm: 9, zw: 9,
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

const ProfileInformation: React.FC<ProfileInformationProps> = ({ defaultOpen = true, scrollIntoViewOnOpen = false }) => {
  const { currentUser, fetchUserDetails } = useAuth();
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const formik = useFormik<ProfileFormData>({
    initialValues: {
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      email: currentUser.email || "",
      country: currentUser.country || "",
      contactNumber: currentUser.phone || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSaving(true);
        await updateUserProfile({
          first_name: values.firstName,
          last_name: values.lastName,
          phone: values.contactNumber,
          country: values.country,
        });

        // Refresh user details globally
        await fetchUserDetails();

        toast.success("Profile updated successfully!");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to update profile. Please try again.");
      } finally {
        setIsSaving(false);
      }
    },
  });

  // Resolve selected country and its phone digit limit
  const selectedCountryData = countries.find((c) => c.name === formik.values.country);
  const phoneMaxLength = selectedCountryData
    ? (PHONE_LENGTH_MAP[selectedCountryData.code] ?? 15)
    : 15;

  // ── Name validation ──────────────────────────────────────────────────────────
  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const controlKeys = [
      "Backspace", "Delete", "Tab", "Enter",
      "ArrowLeft", "ArrowRight", "Home", "End",
    ];
    if (controlKeys.includes(e.key) || e.ctrlKey || e.metaKey) return;
    if (!/^[a-zA-Z\s'\-]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleNamePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    field: "firstName" | "lastName"
  ) => {
    e.preventDefault();
    const cleaned = e.clipboardData.getData("text").replace(/[^a-zA-Z\s'\-]/g, "");
    formik.setFieldValue(field, formik.values[field] + cleaned);
  };

  // ── Phone validation ─────────────────────────────────────────────────────────
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const controlKeys = [
      "Backspace", "Delete", "Tab", "Enter",
      "ArrowLeft", "ArrowRight", "Home", "End",
    ];
    if (controlKeys.includes(e.key) || e.ctrlKey || e.metaKey) return;
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, phoneMaxLength);
    formik.setFieldValue("contactNumber", digits);
  };

  return (
    <CollapsibleCard
      title="Profile Information"
      subtitle="Update your personal details"
      defaultOpen={defaultOpen}
      scrollIntoViewOnOpen={scrollIntoViewOnOpen}
      icon={<User size={24} className="text-brand-primary dark:text-white" />}
      showSaveButton={true}
      onSave={() => formik.handleSubmit()}
      isSaving={isSaving}
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        {/* Top Row: First Name, Last Name, Email */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            id="firstName"
            label="First Name"
            placeholder="Enter first name"
            required
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onKeyDown={handleNameKeyDown}
            onPaste={(e) => handleNamePaste(e, "firstName")}
            error={formik.touched.firstName ? formik.errors.firstName : undefined}
          />
          <InputField
            id="lastName"
            label="Last Name"
            required
            placeholder="Enter last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onKeyDown={handleNameKeyDown}
            onPaste={(e) => handleNamePaste(e, "lastName")}
            error={formik.touched.lastName ? formik.errors.lastName : undefined}
          />
          <InputField
            id="email"
            type="email"
            label="Email"
            placeholder="Enter email"
            value={formik.values.email}
            readOnly={true}
            onChange={() => { }}
          />
        </div>

        {/* Bottom Row: Country & Contact Number */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SelectField
            id="country"
            label="Country"
            required
            value={formik.values.country}
            options={countries.map((c) => ({
              label: (
                <div className="flex items-center gap-2">
                  <img
                    src={`https://flagcdn.com/w20/${c.code}.png`}
                    alt={c.name}
                    className="w-5 h-[14px] object-cover rounded-[2px]"
                  />
                  <span>{c.name}</span>
                </div>
              ),
              value: c.name,
            }))}
            onChange={(val) => {
              formik.setFieldValue("country", val);
              formik.setFieldValue("contactNumber", "");
            }}
            direction="down"
            disabled={true}
          />

          <InputField
            id="contactNumber"
            label="Contact Number"
            placeholder={"x".repeat(phoneMaxLength)}
            prefix={selectedCountryData?.dialCode}
            value={formik.values.contactNumber}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, phoneMaxLength);
              formik.setFieldValue("contactNumber", digits);
            }}
            onKeyDown={handlePhoneKeyDown}
            onPaste={handlePhonePaste}
          />

          <div className="hidden md:block">{/* Empty space for 3rd column */}</div>
        </div>
      </form>
    </CollapsibleCard>
  );
};

export default ProfileInformation;
