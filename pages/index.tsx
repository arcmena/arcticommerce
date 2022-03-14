import Image from "next/image";
import * as stripe from "stripe";

export default function Home({ products }) {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col bg-slate-900">
      <h1 className="text-xl text-gray-300">Arcticommerce</h1>
      <div className="flex items-center justify-center">
        {products.data.map(({ id, images, name }) => (
          <div key={id}>
            <h4 className="text-gray-300">{name}</h4>
            <Image
              src={images[0]}
              blurDataURL={images[0]}
              alt={name}
              width="300"
              height="300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const StripeClient = stripe(process.env.STRIPE_API_KEY);

  const products = await StripeClient.products.list();

  return {
    props: {
      products,
    },
  };
}
