import H2 from "../typography/H2"
import { Button } from "../ui/button"
import { OctagonMinus } from "lucide-react"
import { useNavigate } from "react-router-dom"

type Props = {}

const UnAuthorised = ({}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-170px)] grid place-content-center">
    <div className="grid place-content-center gap-3">
      <H2 className="flex gap-2 items-center"><OctagonMinus /> You are not authorised to view this page</H2>
      <div className="flex justify-center items-center gap-2">
        <Button className="w-fit" onClick={() => navigate("/")}>Home</Button>
        <Button variant={'destructive'} className="w-fit">Logout</Button>
      </div>
    </div>
  </div>
  )
}

export default UnAuthorised