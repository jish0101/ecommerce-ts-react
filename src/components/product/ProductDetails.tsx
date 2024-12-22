import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import P from '../typography/P';
import H1 from '../typography/H1';
import { Product as ProductT } from '@/types/product';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import CartButtons from '../cart/CartButtons';

type Props = {
  product: ProductT;
};

const ProductDetails = ({ product }: Props) => {
  return (
    <div className="md:min-h-[70vh] py-10 w-full space-y-5 md:p-16">
      <H1 className="text-4xl capitalize">{product.name}</H1>
      <P className="text-base md:text-3xl">
        Rs. {product.price.toFixed(2).toLocaleString()}
      </P>

      <Accordion type="single" collapsible>
        <AccordionItem value="Details">
          <AccordionTrigger>
            <P className="text-base">Description</P>
          </AccordionTrigger>
          <AccordionContent>
            <P>{product.desc}</P>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Free Shipping & Exchange">
          <AccordionTrigger>
            <P className="text-base">Free Shipping & Exchange</P>
          </AccordionTrigger>
          <AccordionContent>
            <P>
              Enjoy free shipping on all orders at Falcon Clothing. If you're
              not completely satisfied, take advantage of our hassle-free
              exchange policy. Shop with confidence and convenience today!
            </P>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Secure Payment">
          <AccordionTrigger>
            <P className="text-base">Secure Payment</P>
          </AccordionTrigger>
          <AccordionContent>
            <P>
              Your security is our priority. At Falcon Clothing, we use advanced
              encryption and comply with top industry standards. Choose from
              trusted payment options like credit cards and PayPal, and shop
              with confidence every time.
            </P>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-col gap-10">
        <CartButtons />
        <div className="grid lg:grid-cols-2 gap-4">
          <Button className='border border-foreground/50' variant={'ghost'} size={'lg'}>
            <ShoppingCart /> Add to cart
          </Button>
          <Button size={'lg'}>Buy now</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
