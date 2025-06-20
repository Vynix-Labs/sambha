
interface LayoutProps {
    children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,#2B2BCF,#2B2BCF,#020119,#020119)] relative overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
} 