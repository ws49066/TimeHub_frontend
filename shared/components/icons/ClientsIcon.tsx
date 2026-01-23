import Image from "next/image";

interface ISizeLogo {
width: number, height: number, active: boolean
}

export function ClientsIcon({width, height, active}:ISizeLogo) {

    const url = active ? "/icons/clients.svg" : "/icons/clientsBlack.svg"

    return (
        <Image
            src={url}
            alt="clients icon"
            width={width}
            height={height}
            priority
        />
    )
}