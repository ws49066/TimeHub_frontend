import Image from "next/image";

interface ISizeLogo {
width: number, height: number, active:boolean
}


export function LogsIcons({ width, height, active }: ISizeLogo) {
    const url = active ? "/icons/logs.svg" : "/icons/logsBlack.svg"

    return (
        <Image
            src={url}
            alt=""
            width={width}
            height={height}
            priority
        />
    )
}