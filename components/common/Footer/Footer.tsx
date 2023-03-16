import cn from 'classnames'
import Link from 'next/link'
import { paymentIcons, quickLinks, socialIcons } from './data'

const Footer = () => {
  return (
    <footer className="mt-auto block">
      <div className="px-4 py-8 md:p-12 bg-[#1f2934] text-white">
        <div className="pb-8 -m-4 grid grid-cols-1 md:grid-cols-8 xl:grid-cols-10 text-center md:text-left">
          <div className="pt-4 pb-4 px-4 md:col-span-3 xl:col-span-2">
            <div className="mb-3">
              <span className="text-lg mb-4 block">About the store</span>
              <p className="text-[15px] md:text-[14px]">
                2023 © Beyond Theme by arcmena for Next.js. <br /> <br /> Lorem
                ipsum dolor, sit amet consectetur adipisicing elit. Provident
                obcaecati ducimus nesciunt quisquam placeat id mollitia alias
                itaque, molestiae, ut, nam eveniet fuga debitis praesentium.
              </p>
            </div>
            <div className="text-white inline-flex mt-4">
              {socialIcons.map((icon, index) => (
                <Link
                  href="#"
                  className={cn('block p-3 md:p-2', {
                    ['pl-0']: index === 0
                  })}
                  key={`${icon.toString().length + index}`}
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="pt-4 px-4 md:col-span-2 md:flex xl:col-span-6">
            <div className="mx-auto">
              <span className="text-lg mb-4 block">Quick links</span>
              <div>
                <ul>
                  {quickLinks.map((item, index) => (
                    <li
                      key={item.label}
                      className={cn('text-[15px] md:text-[14px]', {
                        ['mb-2 md:mb-0']: index + 1 !== quickLinks.length
                      })}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="p-4 md:col-span-3 xl:col-span-2">
            <div className="max-w-[280px] md:max-w-[200px] lg:max-w-[300px] mx-auto">
              <span className="text-lg mb-4 block">Newsletter</span>
              <div>
                <p className="mb-4 text-[15px] md:text-[14px]">
                  Be the first to receive updates on new arrivals, special
                  promos and sales.
                </p>
                <form onSubmit={e => e.preventDefault()}>
                  <div className="flex gap-2 text-[#111111] max-w-[300px]">
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="Your Email"
                      name="contact-email"
                      className="w-full px-4 mb-0 text-base placeholder-gray-400 h-[45px] leading-[45px] appearance-none bg-white rounded-sm border-[1px] border-[#eaeaea] text-[#111111]"
                    />
                    <button
                      type="submit"
                      className="text-sm bg-white tracking-[1px] rounded-sm px-4 text-[#111111]"
                    >
                      OK
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[15px] md:text-[14px] text-center md:grid md:grid-cols-8">
          <div className="hidden md:inline md:col-span-3"></div>
          <div className="p-4 md:col-span-3 order-1 md:order-2 w-full">
            <div className="mx-auto w-full">
              <ul className="flex gap-2 justify-center md:justify-end md:flex-wrap w-full">
                {paymentIcons.map((icon, index) => (
                  <li
                    key={`${icon.toString().length + index}`}
                    className="h-[24px]"
                  >
                    {icon}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-4 md:col-span-2 order-2 md:order-1">
            <span>
              Powered By <Link href="https://nextjs.org">Next.js</Link> and{' '}
              <Link href="https://www.shopify.com">Shopify</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
