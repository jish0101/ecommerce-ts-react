import { Outlet } from "react-router-dom"

type Props = {}

const SettingsWrapper = ({}: Props) => {
  return (
    <div>SettingsWrapper
        <Outlet />
    </div>
  )
}

export default SettingsWrapper