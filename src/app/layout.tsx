import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta content="henry" />
      </head>
      <body className="font-serif font-medium text-slate-100 bg-slate-800 container w-full min-h-screen">
        {children}
      </body>
    </html>
  );
}
