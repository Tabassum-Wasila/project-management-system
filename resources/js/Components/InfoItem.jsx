export default function InfoItem({label, children}){
    return (
        <div className="mt-4">
            <label className="font-bold text-lg">{label}</label>
            <p className="mt-1">{children}</p>
        </div>
    )
}