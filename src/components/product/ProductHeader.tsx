import React from 'react'

type Props = {
    children: React.ReactNode
}

const ProductHeader = ({children}: Props) => {
  return (
    <div className="mx-auto grid lg:max-w-[1380px] lg:grid-cols-5 justify-center gap-6 py-10 md:py-0 p-3 md:min-h-[calc(100vh-70px)] md:gap-2">
      {children}
    </div>
  )
}

export default ProductHeader;