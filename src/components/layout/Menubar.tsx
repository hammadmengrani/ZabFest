"use client"

export interface MenuItem {
    title: string
    url?: string
    child?: MenuItem
    className?: string
}

export default function MobileMenubar({ menuItems = [] }: { menuItems?: Array<MenuItem> }) {
    return (
        <ul className="hidden md:flex flex-row gap-5 text-black font-semibold w-full justify-center">
            {
                menuItems.map((x, key) => (
                    <div key={key}>
                        <li className="px-2">
                            {
                                x.url ? (
                                    <a className="flex w-fit" href={x.url}>
                                        <h3 className="text-[16px] w-fit transition-colors duration-2000 ease-linear hover:text-yellow-400">{x.title}</h3>
                                    </a>
                                ) : (
                                    <button className="transition-colors duration-2000 ease-linear hover:text-yellow-400">
                                        <h3>{x.title}</h3>
                                    </button>
                                )
                            }
                        </li>
                    </div>
                ))
            }
        </ul>
        
    )
}
