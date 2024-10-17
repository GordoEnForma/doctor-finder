import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"
import type { User } from 'next-auth'

type NavWrapperProps = {
  user: {
    last_name?: string;
  } & User
}
export const NavWrapper = ({ user }: NavWrapperProps) => {
  return (
    <>
      <div className="lg:hidden ">
        <Navbar user={user} />
      </div>
      <div className="hidden lg:flex">
        <Sidebar user={user} />
      </div>
    </>
  )

}