import React from "react";
import { useNavigate } from "react-router-dom";
import { ToolItem, BLUERITT_TOOLS, ACTIVE_TOOLS } from "../../utils/ToolFusionOptions";

const ToolFusionPage: React.FC = () => {
  const navigate = useNavigate();

  const ToolCard = ({ tool }: { tool: ToolItem }) => {
    const handleAction = () => {
      if (tool.isExternal) {
        window.open(tool.link, "_blank");
      } else if (tool.link) {
        navigate(tool.link);
      }
    };

    return (
      <div className="tool-card group ">
        <div className="tool-card-content ">
          {tool.image ? (
            <div className="tool-image-container">
              <img
                src={tool.image}
                alt={tool.name}
                className={`tool-image ${tool.id === 'trustpilot' ? 'trustpilot-logo' : ''}`}
              />
            </div>
          ) : tool.icon ? (
            <div className="tool-icon-container">
              <tool.icon size={20} className="tool-icon" />
            </div>
          ) : null}
          <div className="tool-text-container">
            <h4 className="tool-name">{tool.name}</h4>
            <p className="tool-description">
              {tool.description}
            </p>
          </div>
        </div>
        <button className="tool-action-btn" onClick={handleAction}>
          {tool.actionText}
          {tool.isExternal}
        </button>
      </div>
    );
  };

  return (
    <div className="tool-fusion-container">
      <div className="tool-fusion-wrapper">
        {/* Header Section */}
        <div className="tool-fusion-header">
          <h1 className="tool-fusion-title ">
            ToolFusion
          </h1>
          <p className="tool-fusion-subtitle">
            A curated suite of tools to support product research, compliance, and growth.
          </p>
        </div>

        {/* Blueritt Tools Section */}
        <div className="tool-section">
          <div className="tool-section-header">
            <h3 className="dashboard-card-title">Blueritt Tools</h3>
            <span className="tool-section-count">{BLUERITT_TOOLS.length} tools currently in use</span>
          </div>
          <div className="tool-list">
            {BLUERITT_TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* Active Tools Section */}
        <div className="tool-section">
          <div className="tool-section-header">
            <h3 className="tool-section-title">Active Tools</h3>
            <span className="tool-section-count">{ACTIVE_TOOLS.length} tools currently in use</span>
          </div>
          <div className="tool-list">
            {ACTIVE_TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolFusionPage;
