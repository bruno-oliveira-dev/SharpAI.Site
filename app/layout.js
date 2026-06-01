import "./globals.css";
import { Space_Grotesk, JetBrains_Mono, Instrument_Serif } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const SITE_URL = "https://sharpai.com.br";
const SITE_NAME = "SharpAI";
const SITE_DESC =
  "Engenharia de IA e automação para times que medem deploy, não tese.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SharpAI · Engenharia & IA",
    template: "%s · SharpAI",
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  authors: [{ name: "SharpAI", url: SITE_URL }],
  creator: "SharpAI",
  publisher: "SharpAI",
  keywords: [
    "engenharia de IA",
    "agentes",
    "RAG",
    "automação",
    "Next.js",
    ".NET",
    "Python",
    "São Paulo",
    "produto",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "SharpAI · Software afiado, para quem envia.",
    description: SITE_DESC,
    images: [{ url: "/assets/sharpai-logo.png", width: 1200, height: 630, alt: "SharpAI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SharpAI · Software afiado, para quem envia.",
    description: SITE_DESC,
    images: ["/assets/sharpai-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: "#08080A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/sharpai-logo.png`,
  description: SITE_DESC,
  email: "brunexx15@gmail.com",
  sameAs: [],
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        <a href="#inicio" className="skip-link">Pular para o conteúdo</a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
      </body>
    </html>
  );
}
