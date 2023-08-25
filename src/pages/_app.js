import CartContext from "@/context/cart";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const lsCode = localStorage.getItem("lastCode");
    if (router.pathname != "/" && !router.pathname.includes("location")) {
      if (lsCode) {
        router.push(`/location/?code=${lsCode}`);
      } else {
        router.push("/");
      }
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}
