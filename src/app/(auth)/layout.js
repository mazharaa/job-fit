export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <section>{children}</section>
    </div>
  );
}
