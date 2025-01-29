import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
    return (
        <Link href="/">
            <div className="items-center hidden relative lg:flex">
                <Image src="/logo.svg" alt="Logo" height={150} width={150} />
                <p className="font-semibold text-white text-2xl ml-2.5">
                    {/* Add title here once decided */}
                </p>
            </div>
        </Link>
    )
}