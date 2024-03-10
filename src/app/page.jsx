import Link from "next/link";

export default function Home() {
    return (
        <div className="container py-10">
            <Link href="/login">Login</Link>
        </div>
    );
}
