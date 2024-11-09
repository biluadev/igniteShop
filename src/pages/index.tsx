import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { HomeContainer, Product } from '../styles/pages/home';
import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';
import { stripe } from '../lib/stripe';
import Stripe from 'stripe';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>

      <Head>
        <title>Home | Ignite Shop</title>
      </Head>


      <HomeContainer ref={sliderRef} className="keen-slider">

        {products.map(product => (
          <div key={product.id} className="keen-slider__slide">
            {isMounted ? (
              <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
                <Product>
                  <Image src={product.imageUrl} width={520} height={480} alt="" />
                  <footer>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </footer>
                </Product>
              </Link>
            ) : (
              <Product>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            )}
          </div>
        ))}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100)
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // Revalida a página em 2 horas
  };
}
