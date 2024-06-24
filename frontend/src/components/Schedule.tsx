import { IconType } from "react-icons"

interface props {

    Icon: IconType
    name: string,
    quantity: number
}
const Schedule = ({Icon, name, quantity} : props) => {
  return (
    <div className="flex p-4">
      <Icon size={20}/>
      <p className="ml-4 grow">{name}</p>
      <p className="w-5 h-5 bg-slate-400 flex justify-center items-center">{quantity}</p>
    </div>
  )
}

export default Schedule
