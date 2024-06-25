import { FC, useState } from "react";
import { TbRectangle } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { FaChevronDown, FaMousePointer } from "react-icons/fa";
import Button from "./Button";
import { Tool } from "../data";

interface ToolBarProps {
  activeTool: string;
  onChange: (tool: Tool) => void;
}

const Toolbar: FC<ToolBarProps> = ({ activeTool, onChange }) => {
  const options = [
    {
      id: "RECTANGLE",
      icon: <TbRectangle className="dropdown-item__icon" />,
      title: "Прямоугольник",
    },
    {
      id: "CIRCLE",
      icon: <FaRegCircle className="dropdown-item__icon" />,
      title: "Круг",
    },
    {
      id: "PENCIL",
      icon: <LuPencil className="dropdown-item__icon" />,
      title: "Карандаш",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionId: string) => {
    const selectedOption = options.find((option) => option.id === optionId);
    if (selectedOption) {
      onChange(selectedOption.id as Tool);
    }
    setIsOpen(false);
  };

  const handlePointerClick = () => {
    onChange(Tool.POINTER);
    setIsOpen(false);
  };

  return (
    <menu className="toolbar">
      <button onClick={handlePointerClick} className="toolbar-button">
        <FaMousePointer style={{ fontSize: "24px" }} />
      </button>
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropdown-toggle">
          <div style={{ display: "flex", alignItems: "center" }}>
            {options.find((option) => option.id === activeTool)?.icon || (
              <TbRectangle style={{ fontSize: "24px" }} />
            )}
            <FaChevronDown style={{ fontSize: "12px", marginLeft: "10px" }} />
          </div>
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            {options.map((option) => (
              <Button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                active={option.id === activeTool}
              >
                {option.icon}
                <p className="dropdown-item__title">{option.title}</p>
              </Button>
            ))}
          </div>
        )}
      </div>
    </menu>
  );
};

export default Toolbar;
