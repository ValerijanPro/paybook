import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import AppButton from "@/components/AppButton";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Image className={styles.logo} src={require("../../public/icon.webp")} />
      <AppButton onClick={() => router.push("/qr")} text={"Scan and Go"} />
    </div>
  );
}
