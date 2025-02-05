import { metadatas } from '@/data/metadatas';
import HomeLayout from '../(home)/layout';

// Meta Data:
export const metadata = { ...metadatas };

export default function AuthLayout({ children }) {
	return <HomeLayout children ={children}/>;
}
