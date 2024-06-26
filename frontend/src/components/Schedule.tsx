import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface props {
  Icon: IconType;
  name: string;
  quantity: number;
  link: string;
}
const Schedule = ({ Icon, name, quantity, link }: props) => {
  return (
    <NavLink
      to={link}
      className="flex p-4 items-center hover:bg-slate-400/20 rounded-full"
      style={({isActive, isPending, isTransitioning}) => {
        return {
          background: isActive ? "rgba(148, 163,184, 0.3)" : "",
        };
      }}
    >
      <Icon size={20} />
      <p className="ml-4 grow">{name}</p>
      <p className="w-5 h-5 bg-red text-white flex justify-center items-center rounded-full">
        {quantity}
      </p>
    </NavLink>
  );
};

export default Schedule;
