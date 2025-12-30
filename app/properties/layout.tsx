export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col min-h-0">
        {children}
      </div>
    </div>
  )
}

