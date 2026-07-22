import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ivanxavier.dev'),
  title: 'Ivan Xavier Siao | AI Automation Engineer',
  description:
    'I build AI automation systems using n8n and modern AI models to eliminate repetitive tasks, improve operational efficiency, and help businesses respond faster to customers.',
  keywords: [
    'AI Automation',
    'n8n',
    'Workflow Automation',
    'OpenAI',
    'Business Automation',
    'CRM Automation',
    'Email Automation',
    'Lead Qualification',
    'AI Engineer',
  ],
  authors: [{ name: 'Ivan Xavier Siao' }],
  openGraph: {
    title: 'Ivan Xavier Siao | AI Automation Engineer',
    description:
      'I build AI automation systems that save businesses hours every week.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ivan Xavier Siao | AI Automation Engineer',
    description:
      'I build AI automation systems that save businesses hours every week.',
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: '#0a0e1a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>

        <Script
          id="cal-embed"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal; let ar = arguments;
    if (!cal.loaded) {
      cal.ns = {}; cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ["initNamespace", namespace]);
      } else p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, "https://app.cal.com/embed/embed.js", "init");

Cal("init", "30min", {
  origin: "https://app.cal.com"
});

Cal.config = Cal.config || {};
Cal.config.forwardQueryParams = true;

Cal.ns["30min"]("ui", {
  cssVarsPerTheme: {
    light: {
      "cal-brand": "#1F2937"
    },
    dark: {
      "cal-brand": "#60A5FA"
    }
  },
  hideEventTypeDetails: false,
  layout: "month_view"
});
            `,
          }}
        />
      </body>
    </html>
  );
}