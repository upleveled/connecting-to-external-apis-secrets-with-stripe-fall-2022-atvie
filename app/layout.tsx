import './global.scss';

export const metadata = {
  title: 'UpLeveled - stripe',
  icons: {
    shortcut: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ENG">
      <head />
      <body>
        <header>
          <img src="/images/logo.svg" alt="UpLeveled" />
        </header>
        {children}
      </body>
    </html>
  );
}
