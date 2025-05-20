import React from 'react';

interface DiscountProps {
  rate: number;
  discount?: number; // Discount is optional
  className?: string;
  rateClassName?: string;
}

const calculatedDiscount = (rate: number, discount?: number) => {
  if (discount) {
    const discountedPrice = rate - discount;
    const discountPercentage = Math.round((discount / rate) * 100);
    return {
      discountedPrice,
      discountPercentage,
    };
  }
  return {
    discountedPrice: rate,
    discountPercentage: 0,
  };
};

const Discount: React.FC<DiscountProps> = (props) => {
  const { discountedPrice } = calculatedDiscount(props.rate, props.discount);
  const formatRate = (rate: number) => new Intl.NumberFormat('en-IN').format(rate);

  return (
    <div>
      {props.discount ? (
        <div className={`flex md:gap-3 md:text-wrap text-nowrap md:flex-row flex-col gap-2 ${props.className}`}>
          <span className="line-through text-black font-semibold">Rs. {formatRate(props.rate)}.00</span>
          <span className="text-green-500 font-bold">Rs. {formatRate(discountedPrice)}.00</span>
        </div>
      ) : (
        <p className={`${props.rateClassName}`}>Rs. {formatRate(props.rate)}.00</p>
      )}
    </div>
  );
};

export default Discount;
