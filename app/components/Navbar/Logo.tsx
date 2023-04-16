'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
    
    return ( 
        <Image
            onClick={() => router.push('/')}
            alt="Logo"
            className="hidden md:block cursor-pointer"
            height="150"
            width="150"
            src="/images/logo.jpeg"
        />
     );
}
 
export default Logo;