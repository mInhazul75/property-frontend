import '@/styles/tailwind.css';
import '@/styles/globals.css';
import { ReduxProvider } from '@/providers/ReduxProvider';
export default function RootLayout({ children }) {
	return (
		<html lang="en">
	
	
			<body>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
