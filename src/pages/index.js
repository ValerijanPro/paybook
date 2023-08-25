import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import AppButton from "@/components/AppButton";
import Image from "next/image";
import { BsQrCode } from "react-icons/bs";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h3 className={styles.slogan}>Wo Bestellen Einfach Wird</h3>
      <Image className={styles.logo} src={require("../../public/icon.webp")} />
      <AppButton
        className={styles.scanButton}
        onClick={() => router.push("/qr")}
        text={
          <span>
            Scan QR <BsQrCode className={styles.qrIcon} />
          </span>
        }
      />
      <h5 className={styles.subButtonText}>Nur einen Klick entfernt</h5>
    </div>
  );
}
