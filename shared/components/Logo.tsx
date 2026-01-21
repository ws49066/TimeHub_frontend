import Image from "next/image";

export function Logo() {
    return (
        <Image
            src="/images/groupLogo.svg"
            alt="Group Logo"
            width={40}
            height={40}
            priority
        />
    )
}