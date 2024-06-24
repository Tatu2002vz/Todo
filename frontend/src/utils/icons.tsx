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
    FaDeleteLeft
}

export default icons