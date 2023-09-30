import { useEffect, useState } from "react"

type ToastProps = {
    children?: React.ReactNode
    isShown?: boolean
}

// TODO: エラー以外のバリエーションを増やす

export const Toast: React.FC<ToastProps> = ({children, isShown: defaultIsShown}) => {
    const [isShown, setIsShown] = useState(defaultIsShown || false)

    useEffect(() => {
        setIsShown(Boolean(defaultIsShown))
    }, [defaultIsShown])

    if (!isShown) return null

    return (
        <div className="bottom-0 right-0 left-0 z-10 sticky">
            <div className="mx-auto max-w-screen-2xl px-4 pb-4 md:px-8">
                <div className="relative flex flex-wrap rounded-lg bg-warn-500 items-center px-4 py-3 shadow-lg sm:flex-nowrap sm:justify-center sm:gap-3 sm:pr-8 md:px-8">
                    <div className="order-1 inline-block w-11/12 max-w-screen-sm text-sm text-white sm:order-none sm:w-auto md:text-base">
                        {children}
                    </div>

                    <div className="order-2 flex w-1/12 items-start justify-end sm:absolute sm:right-0 sm:order-none sm:mr-2 sm:w-auto xl:mr-3">
                        <button type="button" onClick={() => setIsShown(false)} className="text-white transition duration-100 hover:text-indigo-100 active:text-indigo-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 xl:h-6 xl:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
