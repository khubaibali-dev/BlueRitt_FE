import { CircleCheck } from "lucide-react";
import { useAccountSummary } from "../../../hooks/useAccountSummary";
import SubscriptionSnapshotSkeleton from "../../../components/common/Skeletons/SubscriptionSnapshotSkeleton";

const SubscriptionSnapshot = () => {
  const { data: summary, isLoading, isError } = useAccountSummary();

  if (isLoading) {
    return <SubscriptionSnapshotSkeleton />;
  }

  if (isError || !summary) {
    return (
      <div className="snapshot-card">
        <p className="text-red-400">Failed to load subscription data</p>
      </div>
    );
  }

  // Logic from provided API response
  const {
    plan = "Trial",
    balance = 0,
    dueDate = "N/A",
    billingCycle = "Monthly",
    activeSubscription = false,
    package_price = 0,
    lastPaymentDate = "N/A"
  } = summary;

  // Format date correctly
  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr === "N/A") return "N/A";

    // If it's already in "DD MMM YYYY" format, just return it
    if (/^\d{1,2} [A-Z][a-z]{2} \d{4}$/.test(dateStr)) {
      return dateStr;
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const status = activeSubscription ? "Active" : "Inactive";
  const billing = billingCycle;

  const snapshotItems = [
    { label: "Next Payment", value: formatDate(dueDate) },
    { label: "Add-on Balance", value: `$${balance.toFixed(2)}` },
    { label: "Start Date", value: formatDate(lastPaymentDate) },
    { label: "End Date", value: plan === "Trial" ? "N/A" : formatDate(dueDate) },
  ];

  return (
    <div className="snapshot-card">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="snapshot-plan-label">Current Plan</p>
          <h4 className="snapshot-plan-name">{plan === "Trial" ? "Advance" : plan}</h4>
          <p className="snapshot-price">
            ${package_price}
            <span className="text-sm opacity-50 ml-1">{billing}</span>
          </p>
        </div>
        <span className={`snapshot-status-badge ${activeSubscription ? "active" : ""}`}>
          <CircleCheck size={14} className="mr-1" /> {status}
        </span>
      </div>

      <div className="snapshot-grid">
        {snapshotItems.map((item, i) => (
          <div key={i} className="snapshot-item">
            <p className="text-[14px] text-[#FFFFFFB2] mb-1">{item.label}</p>
            <p className="text-[16px] font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionSnapshot;
