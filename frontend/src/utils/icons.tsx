import { IconType } from "react-icons";
import { IoMdMenu } from "react-icons/io";
import { MdUpcoming } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { ImStarEmpty } from "react-icons/im";
import { ImStarFull } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { FaCloudSun } from "react-icons/fa";
import { FaCloudMoon } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import { FaDeleteLeft } from "react-icons/fa6";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { TfiPencilAlt } from "react-icons/tfi";
import { MdDeleteForever } from "react-icons/md";
interface Icon {
    [key: string] : IconType
}

const icons : Icon = {
    IoMdMenu,
    MdUpcoming,
    IoIosSearch,
    CiLogout,
    ImStarEmpty,
    ImStarFull,
    IoMdClose,
    CiLogin,
    FaCloudSun,
    FaCloudMoon,
    IoArrowBackSharp,
    ImCheckboxUnchecked,
    ImCheckboxChecked,
    FaDeleteLeft,
    TbAlertOctagonFilled,
    FaCheckCircle,
    FaHome,
    BsThreeDots,
    TfiPencilAlt,
    MdDeleteForever
}

export default icons