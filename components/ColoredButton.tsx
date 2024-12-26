import { JSX } from "preact";

interface ButtonProps {
    label: string;
    onClick: () => void;
    color: "green" | "blue" | "red"; // Define colors for Add, Edit, Delete
    icon: JSX.Element; // Pass an SVG element as a prop
}

export default function ColoredButton({ label, onClick, color, icon }: ButtonProps) {
    const baseStyles =
        "flex items-center space-x-2 text-white px-4 py-2 rounded hover:shadow-md";
    const colorStyles = {
        green: "bg-green-500 hover:bg-green-600",
        blue: "bg-blue-500 hover:bg-blue-600",
        red: "bg-red-500 hover:bg-red-600",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${colorStyles[color]}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}
