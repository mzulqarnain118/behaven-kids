import React from 'react';
import './HumanBodayDiagram.css'; 

// Define the props type
interface HumanBodyDiagramProps {
  onBodyPartClick: (bodyPart: string) => void;
}

// Define the component
const HumanBodyDiagram: React.FC<HumanBodyDiagramProps> = ({ onBodyPartClick }) => {
  // Event handler for clicking a body part
  const handleBodyPartClick = (event: React.MouseEvent<SVGElement>) => {
    const bodyPart = event.currentTarget.id;
    alert(bodyPart);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 200"
      className="human-body-diagram"
    >
      <g id="head" onClick={handleBodyPartClick}>
        <circle cx="50" cy="20" r="10" fill="pink" />
      </g>
      <g id="body" onClick={handleBodyPartClick}>
        <rect x="40" y="30" width="20" height="40" fill="blue" />
      </g>
      <g id="left-arm" onClick={handleBodyPartClick}>
        <rect x="20" y="30" width="10" height="30" fill="green" />
      </g>
      <g id="right-arm" onClick={handleBodyPartClick}>
        <rect x="70" y="30" width="10" height="30" fill="green" />
      </g>
      <g id="left-leg" onClick={handleBodyPartClick}>
      {/* <image xlinkHref={Arm} x="30" y="70" width="20" height="40" transform="rotate(45 40 90)" /> */}
      </g>
      <g id="right-leg" onClick={handleBodyPartClick}>
        <rect x="50" y="70" width="10" height="30" fill="red" />
      </g>
    </svg>
  );
};

export default HumanBodyDiagram;