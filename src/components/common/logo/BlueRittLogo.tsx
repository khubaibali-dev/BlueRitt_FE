// src/components/common/logo/BlueRittLogo.tsx

const BlueRittLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="BlueRitt Logo" 
        className="h-6 w-auto object-contain"
      />
    </div>
  );
};

export default BlueRittLogo;
