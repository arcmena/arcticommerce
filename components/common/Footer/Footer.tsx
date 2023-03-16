import cn from 'classnames'
import Link from 'next/link'
import { paymentIcons, quickLinks, socialIcons } from './data'

const Footer = () => {
  return (
    <footer className="mt-auto block">
      <div className="px-4 py-8 bg-[#1f2934] text-white">
        <div className="pb-8 -m-4 grid grid-cols-1 text-center">
          <div className="pt-4 pb-4 px-4">
            <div className="mb-3">
              <span className="text-lg mb-4 block">About the store</span>
              <p className="text-[15px]">
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
                  className="block p-3"
                  key={`${icon.toString().length + index}`}
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="pt-4 px-4">
            <div className="mx-auto">
              <span className="text-lg mb-4 block">Quick links</span>
              <div>
                <ul>
                  {quickLinks.map((item, index) => (
                    <li
                      key={item.label}
                      className={cn('text-[15px]', {
                        ['mb-2']: index + 1 !== quickLinks.length
                      })}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="max-w-[280px] mx-auto">
              <span className="text-lg mb-4 block">Newsletter</span>
              <div>
                <p className="mb-4 text-[15px]">
                  Be the first to receive updates on new arrivals, special
                  promos and sales.
                </p>
                <form
                  onSubmit={e => e.preventDefault()}
                  className="flex gap-2 text-[#111111]"
                >
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="Your Email"
                    name="contact-email"
                    className="px-4 mb-0 text-base placeholder-gray-400 h-[45px] leading-[45px] appearance-none bg-white rounded-sm border-[1px] border-[#eaeaea] text-[#111111]"
                  />
                  <button
                    type="submit"
                    className="text-sm bg-white tracking-[1px] rounded-sm px-4 text-[#111111]"
                  >
                    OK
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[15px] text-center">
          <div className="p-4">
            <div className="mx-auto">
              <ul className="flex gap-2 justify-center">
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
          <div className="p-4">
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
