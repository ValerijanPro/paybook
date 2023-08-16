import styles from "@/styles/Home.module.css";
import QRCodeReader from "@/components/QRCodeReader";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div onClick={() => router.push("/qr")} className={styles.scanButton}>
        QR SCAN
      </div>
    </div>
  );
}
