import Image from 'next/image'

const Ribbon = () => {
  return (
    <div className="bg-[#1f2934] flex justify-center items-center">
      <div className="flex p-2">
        <Image
          src="https://cdn.shopify.com/s/files/1/0696/9747/0737/files/icon.webp?v=1682445980"
          alt=""
          width={25}
          height={25}
          style={{
            height: '100%'
          }}
        />
        <span className="text-white block p-2 text-xs tracking-[1px]">
          Free UK Delivery on all orders over £50
        </span>
      </div>
    </div>
  )
}

export default Ribbon
