'use client';

import { useCallback, useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {

    const router = useRouter();

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isOpen, setIsOpen] = useState(false);

    const rentModal = useRentModal();

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
  
      rentModal.onOpen();
    }, [loginModal, rentModal, currentUser]);

    return (

        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    // onClick={onRent}
                    
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer">
                    ¡Reserva ahora!
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md:py.2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm">
                    <div className="
                                flex flex-col cursor-pointer">
                            {currentUser ? (
                        <>
                        <MenuItem 
                          label="Mis viajes" 
                          onClick={() => router.push('/viajes')}
                        />
                        <MenuItem 
                          label="Mis favoritos" 
                          onClick={() => router.push('/favoritos')}
                        />
                        <MenuItem 
                          label="Mis reservaciones" 
                          onClick={() => router.push('/reservaciones')}
                        />
                        {currentUser.isAdmin === true && (<MenuItem 
                          label="Mis vuelos" 
                          onClick={() => router.push('/vuelos')}
                        />)}
                         {currentUser.isAdmin === true && (<MenuItem 
                          label="Agregar un jet nuevo" 
                          onClick={rentModal.onOpen}
                          />)}
                        <hr />
                        <MenuItem 
                          label="Logout" 
                          onClick={() => signOut()}
                        />
                      </>
                    ) : (
                        <>
                  <MenuItem 
                    label="Login" 
                    onClick={loginModal.onOpen}
                  />
                  <MenuItem 
                    label="Sign up" 
                    onClick={registerModal.onOpen}
                  />
                </>
              )}
                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;