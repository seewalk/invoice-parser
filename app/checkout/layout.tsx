import Script from 'next/script';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* Stripe Test Card Widget */}
      {process.env.NODE_ENV === 'development' && (
        <Script
          src="https://js.stripe.com/v3/fingerprinted/js/stripe-fingerprinted-v3.js"
          strategy="lazyOnload"
        />
      )}
    </>
  );
}
