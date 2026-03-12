// src/components/ui/BlueRittLogo.jsx

const BlueRittLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="BlueRitt Logo" 
        className="h-8 w-auto object-contain"
      />
    </div>
  );
};

export default BlueRittLogo;
