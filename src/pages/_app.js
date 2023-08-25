import CartContext from "@/context/cart";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    const lsCode = localStorage.getItem("lastCode");
    if (router.pathname != "/") {
      if (!code || !lsCode) {
        router.push("/");
      } else {
        router.push(`/location/${code || lsCode}`);
      }
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}
